import Decimal from "break_infinity.js";
import mathHelper from "./math";

const helper = {
  /**
   * Calculates the maximum number of levels that can be bought with the given currency.
   * Uses binary search with exponential growth to efficiently find the maximum affordable level.
   *
   * @param {number} level - Current level
   * @param {Decimal} currency - Available currency to spend
   * @param {(level: number) => Decimal} Cost - Function that returns the cost for a given level
   * @param {number} maxLoops - Maximum iterations for the search (default: 64)
   * @returns {number} Number of levels that can be purchased
   */
  calcMaxBuyLevels: function (
    level: number,
    currency: Decimal,
    Cost: (level: number) => Decimal,
    maxLoops: number = 64,
  ): number {
    if (currency.lessThan(Cost(level))) {
      return 0;
    }

    let iterations = 0;
    let lowerBound = level;
    let upperBound = level > 0 ? level * 2 : 2;

    // Exponential search to find upper bound
    while (
      iterations < maxLoops &&
      Number.isFinite(upperBound) &&
      currency.greaterThanOrEqualTo(Cost(upperBound))
    ) {
      lowerBound = upperBound;
      upperBound *= 2;
      iterations++;
    }

    if (!Number.isFinite(upperBound)) {
      upperBound = Number.MAX_VALUE;
    }

    // Binary search between bounds
    while (iterations < maxLoops && lowerBound < upperBound) {
      let mid = Math.floor((lowerBound + upperBound) / 2);
      if (currency.lessThan(Cost(mid))) {
        upperBound = mid;
      } else {
        lowerBound = mid + 1;
      }
      iterations++;
    }

    return Math.round(lowerBound - level);
  },

  /**
   * Performs an approximate level-up calculation using a divisor for bulk calculation,
   * then refines with exact calculations.
   *
   * @param {number} level - Current level
   * @param {Decimal} exp - Available experience
   * @param {(level: number) => Decimal} ExpCost - Function that returns exp cost for a level
   * @param {number} divisor - Divisor for bulk calculation (default: 100000.0)
   * @param {number} maxLoops - Maximum iterations (default: 64)
   * @returns {{ levelsGained: number, newLevel: number, newExp: Decimal, newExpRequired: Decimal }}
   */
  doApproxLevelUp: function (
    level: number,
    exp: Decimal,
    ExpCost: (level: number) => Decimal,
    divisor: number = 100000.0,
    maxLoops: number = 64,
  ): { levelsGained: number; newLevel: number; newExp: Decimal; newExpRequired: Decimal } {
    let currentLevel = level;
    let currentExp = exp;

    // Bulk calculation using divisor
    let bulkCurrency = currentExp.dividedBy(divisor);
    let bulkLevels = this.calcMaxBuyLevels(currentLevel, bulkCurrency, ExpCost, maxLoops);

    let newLevel = currentLevel + bulkLevels;
    if (bulkLevels > 0) {
      currentExp = currentExp.minus(bulkCurrency);
    }

    // Calculate exp required for the new level
    let newExpRequired = ExpCost(newLevel);

    // Refine with exact calculations - buy remaining affordable levels one by one
    while (currentExp.greaterThanOrEqualTo(newExpRequired)) {
      currentExp = currentExp.minus(newExpRequired);
      newLevel += 1;
      newExpRequired = ExpCost(newLevel);
    }

    let levelsGained = newLevel - level;

    return {
      levelsGained,
      newLevel,
      newExp: currentExp,
      newExpRequired,
    };
  },

  /**
   * Calculates experience gained from the current run.
   * Based on current level, progress, confection levels, and various bonuses.
   *
   * @param {object} data - Player data
   * @returns {Decimal} Experience that will be gained on reincarnation
   */
  calcReincarnationExpGained: function (data: any): Decimal {
    // currentLevel * Pow(1.001, Min(1000, currentLevel))
    let step1 = mathHelper.multiplyDecimal(
      data.CurrentLevel,
      mathHelper.pow(1.001, Math.min(1000, data.CurrentLevel)),
    );

    // Max(1.0, Log(currentLevel, 5.0) - 2.0)
    let step2 = Math.max(1.0, Math.log(data.CurrentLevel) / Math.log(5.0) - 2.0);

    // Max(1.0, 1.0 + (currentLevel / 2000.0 - 0.5))
    let step3 = Math.max(1.0, 1.0 + (data.CurrentLevel / 2000.0 - 0.5));

    // (1.0 + BestProgress / 5000.0)
    let step4 = 1.0 + (data.BestProgress || 0) / 5000.0;

    // (1.0 + Clamp(Log(ConfectionTotalLevel / 5000000.0, 2.0) / 2.0 + 1.0, 0.0, ConfectionTotalLevel / 5000000.0))
    let confectionRatio = (data.ConfectionTotalLevel || 0) / 5000000.0;
    let confectionLog = confectionRatio > 0 ? Math.log(confectionRatio) / Math.log(2.0) : 0;
    let confectionBonus = Math.max(0.0, Math.min(confectionRatio, confectionLog / 2.0 + 1.0));
    let step5 = 1.0 + confectionBonus;

    // TimerReincBonuses (default to 1 if not present)
    let timerBonus = data.TimerReincBonuses || 1.0;

    // ReincarnationBonusesBD (various multipliers from upgrades, default to 1)
    let reincBonuses = data.ReincarnationBonusesBD
      ? mathHelper.createDecimal(data.ReincarnationBonusesBD)
      : mathHelper.createDecimal(1);

    // Combine all multipliers
    let result = mathHelper.multiplyDecimal(step1, step2);
    result = mathHelper.multiplyDecimal(result, step3);
    result = mathHelper.multiplyDecimal(result, step4);
    result = mathHelper.multiplyDecimal(result, step5);
    result = mathHelper.multiplyDecimal(result, timerBonus);
    result = mathHelper.multiplyDecimal(result, reincBonuses);

    return result;
  },

  /**
   * Calculates the next reincarnation level after reincarnating.
   * Mirrors the game's CalcNextReinc coroutine.
   *
   * @param {object} data - Player data containing current reinc level, exp, etc.
   * @returns {{ nextLevel: number, expRemaining: Decimal, expRequired: Decimal, expGained: Decimal }}
   */
  calcNextReincarnation: function (data: any): {
    nextLevel: number;
    expRemaining: Decimal;
    expRequired: Decimal;
    expGained: Decimal;
    totalExp: Decimal;
  } {
    // Get the exp cost function for this player's state
    let expCostFunc = this.calcRequiredReincExp(data);

    // Calculate exp gained from current run
    let expGained = this.calcReincarnationExpGained(data);

    // Total exp = current banked exp + exp from this run
    let currentBankedExp = data.ReincarnationCurrentExpBD
      ? mathHelper.createDecimal(data.ReincarnationCurrentExpBD)
      : mathHelper.createDecimal(0);
    let totalExp = mathHelper.addDecimal(currentBankedExp, expGained);

    // Start from current level
    let currentLevel = data.ReincarnationLevel || 0;

    // Use DoApproxLevelUp to calculate new level
    let result = this.doApproxLevelUp(
      currentLevel,
      totalExp,
      expCostFunc,
      100000.0, // divisor from game code
      64, // maxLoops from game code
    );

    /** DEBUG
      console.log("=== Reincarnation Calculation Debug ===");
      console.log("Current Level:", currentLevel);
      console.log("Exp Gained:", expGained.toString());
      console.log("Banked Exp:", currentBankedExp.toString());
      console.log("Total Exp:", totalExp.toString());
      console.log("Next Level:", result.newLevel);
      console.log("Levels Gained:", result.levelsGained);
      console.log("Exp Remaining:", result.newExp.toString());
    */

    return {
      nextLevel: result.newLevel,
      expRemaining: result.newExp,
      expRequired: result.newExpRequired,
      expGained: expGained,
      totalExp: totalExp,
    };
  },

  /**
   * Calculates the reincarnation level cost required for a specific ascension level.
   * Uses hardcoded values for certain levels and formulas for others, with different
   * scaling rates based on level ranges.
   *
   * @param {number} level - The ascension level to calculate the cost for.
   * @returns {number} The number of reincarnation levels required to reach that ascension level.
   */
  getAscensionLevelCost: function (level: number, data: any): number {
    if (level === 0) return 2500;

    const hardcoded: Record<number, number> = {
      13: 46200,
      14: 53000,
      15: 67500,
      16: 95000,
      17: 112500,
    };

    if (hardcoded[level]) return hardcoded[level];

    let cost = 3000 + level * 750; // This is the base formula for levels before 13

    if (level > 35) {
      cost = 962800 * Math.pow(1.15, level - 35);
    } else if (level > 17) {
      cost = 130000 * Math.pow(1.125, level - 18);
    } else if (level < 13) {
      cost = cost * Math.pow(Math.min(1.1, 1.05 + level * 0.01), level);
    }

    // Apply Sweet Potatoes and Skull Powder Ascension requirement reduction
    if (data.SPAscReqReduc && data.SPAscReqReduc > 0) {
      // 1% base reduction per SWP level
      let SWPReductionRate = 0.01;

      // Each level of SKP increases the reduction rate by 0.01%
      if (data.SKPOAscReqReduc && data.SKPOAscReqReduc > 0) {
        SWPReductionRate += 0.0001 * data.SKPOAscReqReduc; // Add 0.01% per SKP level
      }

      // Apply compounding reduction
      cost = cost * Math.pow(1 - SWPReductionRate, data.SPAscReqReduc);
    }

    return Math.ceil(cost);
  },

  /**
   * Builds a calculator for required reincarnation experience that accounts
   * for residue, expedition reductions, and portal shop bonuses.
   *
   * @param {object} data - Player data containing residue totals, expedition hours, and shop levels.
   * @returns {(currentLevel: number) => Decimal | number} Function that returns required experience for a level.
   */
  calcRequiredReincExp: function (data) {
    let cowShopReduction = 1.0; // 1 = No reduction

    // Only apply Cow Shop Reincarnation Exp Reduction if it's unlocked
    if (data.CowShopReincExpReduc && data.CowShopReincExpReduc === 1) {
      // Add 1 to your total residue (from the TotalResidueBD BigDecimal field)
      let residueAdd = mathHelper.addDecimal(mathHelper.createDecimal(data.TotalResidueBD), 1);

      // Calculate: log base 1.18 of (TotalResidue + 1) - 27.82 | ??? constants from game
      // Then take the max of that result and 0 (so it can't go negative)
      let residueMax = mathHelper.max(
        mathHelper.subtractDecimal(mathHelper.logDecimal(residueAdd, 1.18), 27.82),
        0,
      );

      cowShopReduction = mathHelper
        .max(
          0.01,
          mathHelper.pow(0.95, mathHelper.multiplyDecimal(residueMax, data.CowShopReincExpReduc)),
        )
        .toNumber();
    }

    let expeditionShopReduction = 1.0; // 1 = No reduction

    // Only apply Expedition Shop reduction if you have at least 1 level in it
    if (data.ExpeShopReincExpReducLevel && data.ExpeShopReincExpReducLevel === 1) {
      let expeditionBaseHours = mathHelper.createDecimal(data.TotalExpeditionHours + 100.0);
      let expeditionHoursLogScale = mathHelper.logDecimal(expeditionBaseHours, 1.41);

      expeditionShopReduction = mathHelper
        .max(
          0.01,
          mathHelper.pow(
            0.975,
            mathHelper.multiplyDecimal(
              mathHelper.max(mathHelper.subtractDecimal(expeditionHoursLogScale, 13.5), 0.0),
              data.ExpeShopReincExpReducLevel,
            ),
          ),
        )
        .toNumber();
    }

    let expeditionAndCowShopReduction = mathHelper.multiplyDecimal(
      cowShopReduction,
      expeditionShopReduction,
    );

    // Portal shop exponent calculation
    // Based on game's GM.POSH.boniList[6] which maps to portalShopLevels[18] + portalShopLevels[19]
    // Formula: 1.0 - (0.025 * (level18 + level19)) / 100
    let portalExponent = 1.0;
    if (data.portalShopLevels) {
      let portalReductionLevel =
        0.025 * ((data.portalShopLevels[18] || 0) + (data.portalShopLevels[19] || 0));
      portalExponent = 1.0 - portalReductionLevel / 100;
    }

    // return BigDouble.Round(
    //     BigDouble.Pow(
    //         (5.0 + level * 5.0)
    //         * Math.Pow(Math.Min(1.0025, 1.00005 + Math.Max(0.0, level / 500000.0)), Math.Min(level, 3000.0))
    //         * BigDouble.Pow(1.001, Math.Max(level - 3000.0, 0.0))
    //         * (1.0 + Math.Max(0.0, Math.Min(1.0, (level - 1500.0) / 1000.0)))
    //         * BigDouble.Max(0.01, BigDouble.Pow(0.95, BigDouble.Max(BigDouble.Log(TotalResidueBD + 1, 1.18) - 27.82, 0) * CowShopReincExpReduc))
    //         * Math.Max(0.01, Math.Pow(0.975, Math.Max(Math.Log(TotalExpeditionHours + 100.0, 1.41) - 13.5, 0.0) * ExpeShopReincExpReducLevel)),
    //         (portalShopLevels[18] + portalShopLevels[19])
    //     )
    // );

    return (currentLevel) => {
      let baseXP = 5 + currentLevel * 5;

      // Calculate growth rate based on level
      let levelGrowthModifier = mathHelper.max(0.0, currentLevel / 500000.0);
      let growthRate = mathHelper.min(1.0025, mathHelper.addDecimal(1.00005, levelGrowthModifier));
      let levelsToApplyGrowth = mathHelper.min(currentLevel, 3000.0);

      // Apply base formula with growth rate
      let baseWithGrowth = mathHelper.multiplyDecimal(
        baseXP,
        mathHelper.pow(growthRate, levelsToApplyGrowth),
      );

      // Additional scaling for levels above 3000
      let highLevelScaling = mathHelper.pow(1.001, mathHelper.max(currentLevel - 3000, 0.0));

      // Progressive difficulty increase between levels 1500-2500
      let midLevelDifficultyBonus = mathHelper.addDecimal(
        1,
        mathHelper.max(0.0, mathHelper.min(1.0, (currentLevel - 1500) / 1000)),
      );

      // Combine base calculations
      let baseWithHighLevelScaling = mathHelper.multiplyDecimal(baseWithGrowth, highLevelScaling);
      let baseWithAllScaling = mathHelper.multiplyDecimal(
        baseWithHighLevelScaling,
        midLevelDifficultyBonus,
      );

      // Apply residue and expedition reductions
      let withShopReductions = mathHelper.multiplyDecimal(
        baseWithAllScaling,
        expeditionAndCowShopReduction,
      );

      // Apply portal shop exponent
      let withPortalReduction = mathHelper.pow(withShopReductions, portalExponent);

      // Round to nearest integer (game uses BigDouble.Round, not Ceil)
      let finalRequiredXP = mathHelper.round(withPortalReduction);

      return finalRequiredXP;
    };
  },
};

export default helper;
