import helper from './helper.js';
import mathHelper from './math.js';

var farmingHelper = {
    findMultipliersWithMinPercentage: function (sum, numbers, minPercentage) {
        const multipliers = [];
        function backtrack(index, currentSum, currentMultipliers) {

            if (index === numbers.length) {
                // const productSum = currentMultipliers.reduce((acc, multiplier, i) => acc + multiplier * numbers[i], 0);
                if ((currentMultipliers.reduce((acc, multiplier, i) => acc + multiplier * numbers[i], 0)) >= minPercentage * sum) {
                    multipliers.push([...currentMultipliers]);
                }
                return;
            }
            // let max = Math.floor((sum - currentSum) / numbers[index]);
            for (let multiplier = 0; multiplier <= (Math.floor((sum - currentSum) / numbers[index])); multiplier++) {
                currentMultipliers[index] = multiplier;
                // let tempSum = currentSum + multiplier * numbers[index];
                if ((currentSum + multiplier * numbers[index]) < sum) {
                    backtrack(index + 1, currentSum + multiplier * numbers[index], currentMultipliers);
                }
            }
        }

        backtrack(0, 0, []);
        return multipliers;
    },
    calcGrowthTime: function (plant, modifiers) {
        let growingBonus = mathHelper.createDecimal(modifiers.originalShopGrowingBonus);
        growingBonus = mathHelper.divideDecimal(growingBonus, (1 + 0.05 * modifiers.originalShopGrowingLevel));
        growingBonus = mathHelper.multiplyDecimal(growingBonus, (1 + 0.05 * modifiers.shopGrowingSpeed)).toNumber();

        let num = Math.floor(plant.TimeNeeded / plant.prestigeBonus / growingBonus);
        return num < 10 ? 10 : num;
    },
    calcPlantHarvest: function (plant, modifiers) {
        // let num = helper.roundInt((1 + plant.Rank) * Math.pow(1.05, plant.Rank)) * Math.pow(1.02, plant.prestige) * modifiers.manualHarvestBonus;
        return helper.roundInt((1 + plant.Rank) * Math.pow(1.05, plant.Rank)) * Math.pow(1.02, plant.prestige) * modifiers.manualHarvestBonus;
    },
    calcShopProdBonus: function (modifiers_input, shopLevel) {
        // shopLevel = shopLevel || shopLevel === 0 ? shopLevel : modifiers_input.FarmingShopPlantTotalProduction;
        return mathHelper.pow(1.25, shopLevel || shopLevel === 0 ? shopLevel : modifiers_input.FarmingShopPlantTotalProduction);
    },
    calcProdOutput: function (plant_input, modifiers_input) {

        // let TotalCreated = plant_input.totalMade;
        // let shopProdBonus = modifiers_input.shopProdBonus;
        // let prestige = plant_input.prestige;

        let PlantTotalProductionBonus = mathHelper.createDecimal(modifiers_input.originalShopProdBonus);
        PlantTotalProductionBonus = mathHelper.divideDecimal(PlantTotalProductionBonus, this.calcShopProdBonus(null, modifiers_input.originalShopProdLevel));
        PlantTotalProductionBonus = mathHelper.multiplyDecimal(modifiers_input.shopProdBonus, PlantTotalProductionBonus);

        let plantMult = plant_input.futureMult;

        let output = mathHelper.multiplyDecimal(
            mathHelper.multiplyDecimal(
                mathHelper.multiplyDecimal(
                    plant_input.totalMade, plantMult),
                PlantTotalProductionBonus),
            mathHelper.createDecimal(Math.pow(1.02, plant_input.prestige))
        );

        if (plant_input.ID === 1) {
            output = mathHelper.multiplyDecimal(output, modifiers_input.hpBonus);
            output = mathHelper.pow(output, modifiers_input.hpBonusExponent)
        }

        return output;
    },
    calcFryOutput: function (potatoes, modifiers) {

        if (!potatoes) return 0;
        if (potatoes.lessThan(10000000000000000)) return 0;


        let timerBonus = 0;
        let timePassed = modifiers.timePassed ? modifiers.timePassed : 0;
        if (timePassed > 1800) {
            if (timePassed < 86400) {
                timerBonus = timePassed / 86400;
            }
            else {
                // 1.0 + (timePassed - 86400.0) / (172800.0 + (timePassed - 86400.0) * 0.5);
                //1 + (step1) / (172800 + (step2) * 0.5)
                let step1 = timePassed - 86400;
                let step2 = timePassed - 86400;
                let step3 = (172800 + step2 * 0.5);
                let step4 = step1 / step3;
                timerBonus = 1 + step4;
            }
        }

        // BigDouble.Round(
        // (Log10(HealthyPotatoTotal) - 15.75)
        //  * (36 - Min(Log10(HealthyPotatoTotal), 31))
        //  * Pow(1.15, Log10(HealthyPotatoTotal) - 16.0)
        //  * FrenchFriesBonus 
        //  * TimerFriesPrestigeBonuses);
        // BigDouble.Round(step1 * step2 * step3  * GM.PD.FrenchFriesBonus * GM.PD.TimerFriesPrestigeBonuses);
        let log10 = mathHelper.logDecimal(potatoes, 10);
        let step1 = mathHelper.subtractDecimal(log10, 15.75);

        let log2 = log10;
        log2 = log2.lessThan(31) ? log2 : 31;
        let step2 = mathHelper.subtractDecimal(36, log2);

        let log3 = mathHelper.subtractDecimal(log10, 16);
        let step3 = mathHelper.pow(1.15, log3);

        let inter1 = mathHelper.multiplyDecimal(step1, step2);
        let inter2 = mathHelper.multiplyDecimal(inter1, step3);
        let frenchBonus = mathHelper.createDecimal(modifiers.fryBonus);
        let step4 = mathHelper.multiplyDecimal(inter2, frenchBonus);
        let step5 = mathHelper.multiplyDecimal(step4, timerBonus);
        let step6 = mathHelper.pow(step5, modifiers.fryBonusExponent);
        return step6;

    },
    calcCarryOverEXP_OLD: function ({ plant, numAutos, expTick }) {

        let leftOver = 0;
        let numLevels = 1;
        if (numAutos > 1) {
            let individualEXP = expTick / numAutos;
            let ticksNeededEXP = Math.ceil((plant.reqExp - plant.curExp) / individualEXP);
            if (numAutos > ticksNeededEXP) {
                leftOver = (numAutos - ticksNeededEXP) * individualEXP;
                let futureReq = 10 + 5 * (plant.Rank + numLevels) * Math.pow(1.05, (plant.Rank + numLevels));
                while (leftOver > futureReq) {
                    leftOver -= futureReq;
                    numLevels++;
                    futureReq = 10 + 5 * (plant.Rank + numLevels) * Math.pow(1.05, (plant.Rank + numLevels));
                }
            }
            else {
                leftOver = 0;
            }
        }
        else {

            leftOver = 0;
        }

        let reqExp = 10 + 5 * (plant.Rank + numLevels) * Math.pow(1.05, plant.Rank + numLevels);
        return { leftOver, numLevels, reqExp };
    },
    calcCarryOverEXP: function ({ plant, numAutos, expTick }) {

        let leftOver = 0;
        let numLevels = 0;
        let numEXP = plant.curExp + numAutos * expTick;
        let reqExp = 10 + 5 * (plant.Rank + numLevels) * Math.pow(1.05, plant.Rank + numLevels);

        //need to handle two cases: 1 auto, just go up as much as you can
        // >1 autos

        while (numEXP >= reqExp) {
            numEXP -= reqExp;
            numLevels++;
            reqExp = 10 + 5 * (plant.Rank + numLevels) * Math.pow(1.05, plant.Rank + numLevels);
        }

        leftOver = numEXP;
        return { leftOver, numLevels, reqExp };
    },
    calcEXPBonus: function (modifiers) {
        // let originalBonus = modifiers.originalRankLevelBonus;
        // let originalLevel = modifiers.originalShopRankLevel;
        // let currentShopLevel = modifiers.shopRankLevel;
        // let originalPotion = modifiers.originalPotionRank;
        // let currentPotion = modifiers.potionRank;

        let expBonus = mathHelper.createDecimal(modifiers.originalRankLevelBonus);
        expBonus = mathHelper.divideDecimal(expBonus, 1 + modifiers.originalShopRankLevel * 0.1);
        expBonus = mathHelper.divideDecimal(expBonus, modifiers.originalPotionRank > 0 ? 1.5 : 1);

        expBonus = mathHelper.multiplyDecimal(expBonus, 1 + modifiers.shopRankLevel * 0.1);
        expBonus = mathHelper.multiplyDecimal(expBonus, modifiers.potionRank);
        expBonus = expBonus.toNumber();

        return expBonus;
    },
    futureMultBD: function (plant, modifiers) {
        return mathHelper.pow(
            (1 + 0.05 * (1 + modifiers.manualHarvestFormula * 0.02)),
            mathHelper.logDecimal(plant.created, 1.25)
        );
    },
    calcFutureMult: function (plant_input, modifiers_input) {

        let plant = modifiers_input.string === false ? plant_input : JSON.parse(JSON.stringify(plant_input));
        let modifiers = modifiers_input.string === false ? modifiers_input : JSON.parse(JSON.stringify(modifiers_input));
        
        let numAutos = modifiers.numAuto || modifiers?.numAuto === 0 ? modifiers.numAuto : 1;
        plant.growthTime = this.calcGrowthTime(plant, modifiers);

        if (numAutos === 0) {
            plant.production = this.calcProdOutput(plant, modifiers);
            return plant;
        }

        let remainingTime = modifiers.time;
        let newExpBonus = this.calcEXPBonus(modifiers);
        let expTick = plant.prestigeBonus * newExpBonus;
        let elapsedTime = 0;
        while (remainingTime > 0) {

            plant.timeToLevel = this.calcTimeTillLevel(plant, modifiers);
            elapsedTime = 0;

            let rankIncrease = false;
            if (plant.timeToLevel > remainingTime) {
                elapsedTime = remainingTime;
            }
            else {
                elapsedTime = plant.timeToLevel;
                rankIncrease = true;
            }

            remainingTime -= elapsedTime;
            plant.elapsedTime += elapsedTime;

            let numHarvests = 0;
            if (plant.elapsedTime >= plant.growthTime) {
                numHarvests = Math.floor(plant.elapsedTime / plant.growthTime);

                let toCreate = plant.perHarvest * numHarvests * numAutos;

                plant.created = mathHelper.addDecimal(plant.created, toCreate);
                plant.totalMade = mathHelper.addDecimal(plant.totalMade, toCreate);

                plant.futureMult = this.futureMultBD(plant, modifiers);

                if (rankIncrease) {

                    let leftOver = this.calcCarryOverEXP({ plant, expTick: expTick * numHarvests, numAutos });
                    // let leftOver = this.calcCarryOverEXP({ plant, expTick: expTick , numAutos });
                    plant.curExp = leftOver.leftOver;
                    plant.Rank += leftOver.numLevels;
                    plant.perHarvest = this.calcPlantHarvest(plant, modifiers);
                    // plant.reqExp = 10 + 5 * plant.Rank * Math.pow(1.05, plant.Rank);
                    plant.reqExp = leftOver.reqExp;
                }
                else {
                    plant.curExp = plant.curExp + numHarvests * expTick * numAutos;
                }
                plant.elapsedTime = plant.elapsedTime % plant.growthTime;
            }
        }

        plant.production =  this.calcProdOutput(plant, modifiers);
        return plant;
    },
    calcTimeTillLevel: function (plant_input, modifiers_input) {
        let plant = plant_input;
        let modifiers = modifiers_input;
        let numAutos = modifiers.numAuto || modifiers?.numAuto === 0 ? modifiers.numAuto : 1;
        if (numAutos === 0) return Infinity;

        let remExp = plant.reqExp - plant.curExp;
        let newExpBonus = this.calcEXPBonus(modifiers);
        let expBonus = plant.prestigeBonus * newExpBonus * numAutos;

        let ticksTillLevel = Math.ceil((remExp) / expBonus);
        return ticksTillLevel * plant.growthTime - plant.elapsedTime;
    },
    getNextShopCosts: function (data) {

        let prodCost = 1;
        let prodLevel = data.FarmingShopPlantTotalProduction || data.FarmingShopPlantTotalProduction === 0 ? data.FarmingShopPlantTotalProduction : data.shopProdLevel;
        let growthCost = 1;
        let growthLevel = data.FarmingShopPlantGrowingSpeed || data.FarmingShopPlantGrowingSpeed === 0 ? data.FarmingShopPlantGrowingSpeed : data.shopGrowingSpeed;
        let expCost = 1;
        let expLevel = data.FarmingShopPlantRankExpEarned || data.FarmingShopPlantRankExpEarned === 0 ? data.FarmingShopPlantRankExpEarned : data.shopRankLevel;

        let temp1 = mathHelper.pow(
            1.05, prodLevel - 50
        );
        let temp2 = mathHelper.multiplyDecimal(100, temp1);
        let temp3 = mathHelper.pow(temp2, prodLevel);
        let temp4 = mathHelper.multiplyDecimal(100000000, temp3);
        prodCost = prodLevel > 50 ? temp4 : mathHelper.multiplyDecimal(100000000, mathHelper.pow(100, prodLevel));


        growthCost = mathHelper.multiplyDecimal(
            mathHelper.pow(500, growthLevel),
            10000000000
        );
        expCost =
            mathHelper.multiplyDecimal(
                mathHelper.pow(250, expLevel),
                1000000000000000
            );

        return { prodCost, growthCost, expCost };
    },
    calcMaxPrestige: function (plant_input) {

        let start = plant_input.prestige;
        let runningHarvests = 0;
        let flag = true;
        while (flag) {
            let requiredPerPic = 10 * Math.pow(2, start);
            let requiredHarvests = runningHarvests + requiredPerPic;
            if (plant_input.created.greaterThanOrEqualTo(requiredHarvests)) {
                start++;
                runningHarvests += requiredPerPic;
            }
            else {
                flag = false;
            }
        }
        return start - plant_input.prestige;
    },
    calcTimeTillPrestige: function (plant_input, modifiers_input) {
        let plant = JSON.parse(JSON.stringify(plant_input));
        this.resetPlantBD(plant);
        let modifiers = JSON.parse(JSON.stringify(modifiers_input));
        this.resetModifiersBD(modifiers);
        let numAutos = modifiers.numAuto || modifiers?.numAuto === 0 ? modifiers.numAuto : 1;
        let prestiged = false;
        let totalTime = 0;
        let runningHarvests = 0;
        let newExpBonus = this.calcEXPBonus(modifiers);
        let expTick = plant.prestigeBonus * newExpBonus;

        while (!prestiged) {
            let timeToLevel = this.calcTimeTillLevel(plant, modifiers);
            let requiredPerPic = 10 * Math.pow(2, plant.prestige);
            let requiredHarvests = runningHarvests + requiredPerPic;
            let remainingHarvests = mathHelper.subtractDecimal(requiredHarvests, plant.created);//minimum number of ticks
            let timeTillPrestige =
                mathHelper.multiplyDecimal(
                    mathHelper.divideDecimal(
                        remainingHarvests,
                        (plant.perHarvest * numAutos)
                    ).ceil(),
                    plant.growthTime
                ).ceil().toNumber()
                ;

            if (numAutos === 0 && remainingHarvests.greaterThan(0)) {
                prestiged = true;
                totalTime = Infinity;
            }
            else if (timeTillPrestige <= 0) {
                prestiged = true;

                if (totalTime <= 0) {
                    plant.prestige++;
                    prestiged = false;
                    runningHarvests += requiredPerPic;
                }

            }
            else if (timeTillPrestige > timeToLevel) {
                plant.elapsedTime += timeToLevel;
                let ticks = Math.floor(plant.elapsedTime / plant.growthTime);

                plant.created = mathHelper.addDecimal(plant.created, ticks * plant.perHarvest * numAutos);
                plant.totalMade = mathHelper.addDecimal(plant.totalMade, ticks * plant.perHarvest * numAutos);

                let rankRes = this.calcCarryOverEXP({ plant, numAutos, expTick: expTick * ticks })
                plant.Rank += rankRes.numLevels;
                plant.curExp = rankRes.leftOver;
                plant.reqExp = rankRes.reqExp;
                plant.perHarvest = this.calcPlantHarvest(plant, modifiers);
                totalTime += timeToLevel;
                plant.elapsedTime = plant.elapsedTime % plant.growthTime;
            }
            else {
                prestiged = true;
                plant.elapsedTime += timeTillPrestige;
                let ticks = Math.floor(plant.elapsedTime / plant.growthTime);

                plant.created = mathHelper.addDecimal(plant.created, ticks * plant.perHarvest * numAutos);
                plant.totalMade = mathHelper.addDecimal(plant.totalMade, ticks * plant.perHarvest * numAutos);
                totalTime += timeTillPrestige;
                plant.elapsedTime = plant.elapsedTime % plant.growthTime;
            }
        }
        return { remainingTime: totalTime, prestige: plant.prestige, prestiged: prestiged }
    },
    resetPlantBD: function (plant) {

        plant.totalMade = plant?.totalMade?.mantissa || plant?.totalMade?.mantissa === 0 ? plant.totalMade : mathHelper.createDecimal(plant.totalMade);
        plant.created = plant?.created?.mantissa || plant?.created?.mantissa === 0 ? plant.created : mathHelper.createDecimal(plant.created);
        plant.production = plant?.production?.mantissa || plant?.production?.mantissa === 0 ? plant.production : mathHelper.createDecimal(plant.production);
        plant.futureMult = mathHelper.createDecimal(plant.futureMult);

    },
    resetModifiersBD: function (modifiers) {
        modifiers.shopProdBonus = modifiers?.shopProdBonus?.mantissa || modifiers?.shopProdBonus?.mantissa === 0 ? modifiers.shopProdBonus : mathHelper.createDecimal(modifiers.shopProdBonus);
        modifiers.hpBonus = modifiers?.hpBonus?.mantissa || modifiers?.hpBonus?.mantissa === 0 ? modifiers.hpBonus : mathHelper.createDecimal(modifiers.hpBonus);
        modifiers.curPotatoes = modifiers?.curPotatoes?.mantissa || modifiers?.curPotatoes.mantissa === 0 ? modifiers.curPotatoes : mathHelper.createDecimal(modifiers.curPotatoes);
        modifiers.totalPotatoes = modifiers?.totalPotatoes?.mantissa || modifiers?.totalPotatoes?.mantissa === 0 ? modifiers.totalPotatoes : mathHelper.createDecimal(modifiers.totalPotatoes);
    },
    calcHPProd: function (plants_input, modifiers_input) {
        let plants = JSON.parse(JSON.stringify(plants_input));
        for (let i = 0; i < plants.length; i++) {
            this.resetPlantBD(plants[i])
        }
        let modifiers = JSON.parse(JSON.stringify(modifiers_input));
        this.resetModifiersBD(modifiers);
        modifiers.nextCosts.prodCost = mathHelper.createDecimal(modifiers.nextCosts.prodCost)
        modifiers.nextCosts.growthCost = mathHelper.createDecimal(modifiers.nextCosts.growthCost)
        modifiers.nextCosts.expCost = mathHelper.createDecimal(modifiers.nextCosts.expCost)

        let numAutos = modifiers.numAutos;
        let simulationTime = modifiers.time; //time in seconds
        let startTime = modifiers.startTime ? modifiers.startTime : 0;//used for consistent tick timings
        const runningTime = modifiers.runningTime ? modifiers.runningTime : 0;//Used for calculating end timings if necessary

        const dataPointsMax = modifiers.maxSteps ? modifiers.maxSteps : 100;
        const tickStart = modifiers.tickStart ? modifiers.tickStart : 0;

        let tickRate = modifiers.tickRate ? modifiers.tickRate : 60 * 1;
        let dataPointThreshold = modifiers.dataPointThreshold ? modifiers.dataPointThreshold : (simulationTime / tickRate) < dataPointsMax ? 1 : helper.roundInt((simulationTime / tickRate) / dataPointsMax);
        let dataPointsPotatoes = [];
        let dataPointsFries = [];

        let totalPotatoes = modifiers.totalPotatoes;
        let currPotatoes = modifiers.curPotatoes;
        let prevPlantsProd = Array(plants.length).fill(0);
        for (let i = 0; i < plants.length; i++) {
            prevPlantsProd[i] = plants[i].production;
        }

        // let runTime = 0;
        let i = 0;
        let finalPass = false;
        // tickRate = 2;
        let prodMult = 1;
        if (tickRate > 2) {
            if (tickRate >= 2592) {
                prodMult = 0.95;
            }
            else if (tickRate >= 1728) {
                prodMult = 0.95;
            }
            else if (tickRate >= 864) {
                prodMult = 0.95;
            }
            else if (tickRate >= 140) {
                prodMult = 0.95;
            }
            else {
                prodMult = 0.95;
            }
        }
        prodMult = 0.95;
        const fryMult = 1.05;
        //Iterate over each second
        for (; i < simulationTime / tickRate || finalPass; i++) {
            //Calculate new values for each plant
            let HPInitial = 0;
            for (let j = plants.length - 1; j >= 0; j--) {
                let curr = plants[j];

                let toAdd = j === plants.length - 1 ? 0 :
                    tickRate > 1 ?
                        //Some basic calculus to find total assuming linear growth
                        mathHelper.multiplyDecimal(mathHelper.addDecimal(prevPlantsProd[j + 1], plants[j + 1].production), 0.45 * tickRate * prodMult)
                        :
                        mathHelper.multiplyDecimal(plants[j + 1].production, tickRate);
                curr.totalMade = mathHelper.addDecimal(curr.totalMade, toAdd);
                let res = this.calcFutureMult(curr, { ...modifiers, time: tickRate, numAuto: numAutos[j], string: false });
                curr = res;
                if (curr.ID === 1) {
                    HPInitial = prevPlantsProd[j];
                }
                prevPlantsProd[j] = curr.production;

            }

            // modifiers.passedTime += tickRate;
            modifiers.timePassed += tickRate;


            //Reduce plant rank potion timer, or set it the bonus to 0 if necessary
            if (modifiers.potionRank > 1 && !modifiers.forceRankPotion) {
                modifiers.potionRankTime -= tickRate;
                if (modifiers.potionRankTime < 0) {
                    modifiers.potionRank = 1;
                }
            }

            let curTime = helper.roundInt(i * tickRate + startTime);

            let HPToAdd = tickRate > 1 ?
                mathHelper.multiplyDecimal(mathHelper.addDecimal(HPInitial, plants[0].production), 0.45 * tickRate * prodMult)
                :
                plants[0].production;

            HPToAdd = mathHelper.divideDecimal(HPToAdd, modifiers.originalPotionRank > 0 ? 1.5 : 1);
            HPToAdd = mathHelper.multiplyDecimal(HPToAdd, modifiers.potionRank);

            totalPotatoes = mathHelper.addDecimal(totalPotatoes, HPToAdd);
            currPotatoes = mathHelper.addDecimal(currPotatoes, HPToAdd);

            if (modifiers.autoBuyPBC) {
                let updateCosts = false;
                let boughtUpgrade = true;
                while (boughtUpgrade) {
                    boughtUpgrade = false;
                    if (currPotatoes.greaterThanOrEqualTo(modifiers.nextCosts.prodCost) === true) {
                        currPotatoes = mathHelper.subtractDecimal(currPotatoes, modifiers.nextCosts.prodCost);
                        modifiers.shopProdLevel++;
                        modifiers.shopProdBonus = this.calcShopProdBonus(modifiers, modifiers.shopProdLevel);
                        updateCosts = true;
                        boughtUpgrade = true;
                    }
                    if (currPotatoes.greaterThanOrEqualTo(modifiers.nextCosts.growthCost) === true) {
                        // currPotatoes -= modifiers.nextCosts.growthCost;
                        currPotatoes = mathHelper.subtractDecimal(currPotatoes, modifiers.nextCosts.growthCost);
                        modifiers.shopGrowingSpeed++;
                        updateCosts = true;
                        boughtUpgrade = true;
                    }
                    if (currPotatoes.greaterThanOrEqualTo(modifiers.nextCosts.expCost) === true) {
                        currPotatoes = mathHelper.subtractDecimal(currPotatoes, modifiers.nextCosts.expCost);
                        modifiers.shopRankLevel++;
                        modifiers.shopRankEXP = 1 + modifiers.shopRankLevel * 0.1;
                        updateCosts = true;
                        boughtUpgrade = true;
                    }
                    if (updateCosts) {
                        let nextCosts = this.getNextShopCosts(modifiers);
                        modifiers.nextCosts = nextCosts
                    }
                }

            }


            if (i % dataPointThreshold === 0 && curTime >= tickStart && curTime <= (simulationTime + runningTime)) {
                dataPointsPotatoes.push({ "time": curTime, "production": totalPotatoes })
                dataPointsFries.push({ "time": curTime, "fries": mathHelper.multiplyDecimal(farmingHelper.calcFryOutput(totalPotatoes, modifiers), fryMult) })
            }

            if (!modifiers.skipFinal) {

                if (finalPass && curTime >= (simulationTime + runningTime)) {
                    break;
                }
                if (!finalPass && curTime < (simulationTime + runningTime)) {
                    finalPass = true;
                }
            }
        }

        if (i > 0 && !modifiers.skipFinal) {

            let curTime = helper.roundInt(i * tickRate + startTime);
            modifiers.passedTime = i * tickRate + startTime;
            //Handling rare case when you have to add, but only once due to intervals duration, but only at the end, and didn't fit in the for loop above
            if (dataPointsPotatoes.length === 0) {
                dataPointsPotatoes.push({ "time": curTime, "production": totalPotatoes })
                dataPointsFries.push({ "time": curTime, "fries": mathHelper.multiplyDecimal(farmingHelper.calcFryOutput(totalPotatoes, modifiers), fryMult) })
            }
            else if (dataPointsPotatoes[dataPointsPotatoes.length - 1].production !== totalPotatoes) {
                if (curTime > (simulationTime + runningTime)) {

                    let timeIncrease = curTime - dataPointsPotatoes[dataPointsPotatoes.length - 1].time;
                    let increase = mathHelper.divideDecimal(
                        (mathHelper.subtractDecimal(
                            totalPotatoes,
                            dataPointsPotatoes[dataPointsPotatoes.length - 1].production
                        )
                        ),
                        timeIncrease
                    );


                    // let temp_increase =  mathHelper.multiplyDecimal(mathHelper.addDecimal(HPInitial, plants[0].production), 0.5 * tickRate * prodMult);



                    let trueTimeIncrease = (simulationTime + runningTime) - dataPointsPotatoes[dataPointsPotatoes.length - 1].time;
                    let finalPotatoes = mathHelper.addDecimal(
                        dataPointsPotatoes[dataPointsPotatoes.length - 1].production,
                        mathHelper.multiplyDecimal(increase, trueTimeIncrease)
                    );

                    let newObj = { time: dataPointsPotatoes[dataPointsPotatoes.length - 1].time + trueTimeIncrease, production: finalPotatoes };
                    dataPointsPotatoes.push(newObj);

                    dataPointsFries.push({ "time": dataPointsPotatoes[dataPointsPotatoes.length - 1].time + trueTimeIncrease, "fries": mathHelper.multiplyDecimal(farmingHelper.calcFryOutput(totalPotatoes, modifiers), fryMult) })

                    //This means the `current` potatoes aren't updated to reflect the backwards fill/fix but it shouldn't be a big deal, and not used for anything atm
                    totalPotatoes = finalPotatoes;
                }
            }
        }

        return {
            totalPotatoes: totalPotatoes,
            potatoeProduction: plants[0].production,
            plants: plants,
            nextCosts: modifiers.nextCosts,
            dataPointsPotatoes: dataPointsPotatoes,
            dataPointsFries: dataPointsFries,
            finalModifiers: modifiers,
        };
    },
    calcStepHPProd: function (plants_input, modifiers_input) {
        let plants = JSON.parse(JSON.stringify(plants_input));
        for (let i = 0; i < plants.length; i++) {
            this.resetPlantBD(plants[i])
        }
        let modifiers = JSON.parse(JSON.stringify(modifiers_input));
        this.resetModifiersBD(modifiers);
        let steps = modifiers.steps;
        let res = -1;
        let potatoeSteps = [];
        let frySteps = [];
        let runningTime = 0;


        const dataPointsMax = modifiers.maxSteps ? modifiers.maxSteps : 100;

        let tickRate = modifiers.tickRate ? modifiers.tickRate : 60 * 1;
        let dataPointThreshold = (modifiers_input.time / tickRate) < dataPointsMax ? 1 : helper.roundInt((modifiers_input.time / tickRate) / dataPointsMax);

        for (let i = 0; i < steps.length; i++) {
            if (steps[i].time === 0) continue;
            res = this.calcHPProd(plants, {
                ...modifiers,
                numAutos: steps[i].autos,
                time: steps[i].time,
                dataPointThreshold: dataPointThreshold,
                startTime: potatoeSteps.length > 0 ? potatoeSteps[potatoeSteps.length - 1].time : 0,
                runningTime: runningTime,
                skipFinal: i < (steps.length - 1),
                tickStart: potatoeSteps.length > 0 ? potatoeSteps[potatoeSteps.length - 1].time + dataPointThreshold * tickRate : 0,
            });
            modifiers = res.finalModifiers;
            modifiers.totalPotatoes = res.totalPotatoes;
            plants = res.plants;
            potatoeSteps = potatoeSteps.concat(res.dataPointsPotatoes);
            frySteps = frySteps.concat(res.dataPointsFries)
            steps[i].obj = { text: `P${steps.length - i} for ${steps[i].time}`, numAutos: steps[i].autos, time: steps[i].time }

            runningTime += steps[i].time;

        }

        if (res === -1) {
            res = {};
            res.dataPointsPotatoes = potatoeSteps;
            res.dataPointsFries = frySteps;
            res.steps = steps;
        }
        else {
            res.dataPointsPotatoes = potatoeSteps;
            res.dataPointsFries = frySteps;
            res.steps = steps;
        }



        return res;
    },
    calcAssemblyHP: function (data) {
        let bonus = 1;

        if (data?.AssemblerCollection[0].BonusList[0].StartingLevel <= data?.AssemblerCollection[0].Level) {
            let gain = data?.AssemblerCollection[0].BonusList[0].Gain;
            let level = (data?.AssemblerCollection[0].Level - data?.AssemblerCollection[0].BonusList[0].StartingLevel)
            bonus = Math.pow(1 + gain, level);
        }

        return bonus;
    },
    calcAssembly: function (data, line_num, bonus_num) {
        let bonus = 1;

        if (data?.AssemblerCollection[line_num].BonusList[bonus_num].StartingLevel <= data?.AssemblerCollection[line_num].Level) {
            let gain = data?.AssemblerCollection[line_num].BonusList[bonus_num].Gain;
            let level = Math.max(0, data.AssemblerCollection[line_num].Level - (data.AssemblerCollection[line_num].BonusList[bonus_num].StartingLevel - 1));
            bonus = Math.pow(1 + gain, level);
        }

        return bonus;
    },
    calcAssemblyLine: function (line, al_level) {
        let bonus = 1;

        if (line.StartingLevel <= al_level) {
            let gain = line.Gain;
            let level = Math.max(0, al_level - (line.StartingLevel - 1));
            bonus = Math.pow(1 + gain, level);
        }
        return bonus;
    },
    calcAssemblyCost: function (id, data) {
        let finalCost = mathHelper.createDecimal(-1);
        let costReduction = mathHelper.createDecimal(data.AssemblyCostReductionBonus);
        let assembly = data.AssemblerCollection[id];
        let baseCost = mathHelper.createDecimal(assembly.BaseCost)

        let step1 = mathHelper.addDecimal(
            baseCost,
            mathHelper.multiplyDecimal(baseCost, assembly.Level)
        );

        let temp = 1 + assembly.CostExpo + assembly.CostExpo * assembly.Level * 0.02
        let powStepBase = mathHelper.createDecimal(temp);
        let step2 = mathHelper.pow(powStepBase, assembly.Level)
        finalCost = mathHelper.divideDecimal(mathHelper.multiplyDecimal(step1, step2), costReduction)
        // finalCost =
        //     (level + startingCost * level)
        //     * pow(1 + assembly.CostExpo + assembly.CostExpo * assembly.BaseCost * 0.02, assembly.BaseCost)
        //     / costReduction;

        return finalCost;
    },
    calcProteinPerSecond: function (data) {
        let proteinBonus = mathHelper.createDecimal(data.ProteinBonus);
        let proteinExponent = 1 + 0.03
            * (
                (data.FarmingShopUniqueProtein[18] ? data.FarmingShopUniqueProtein[18] : 0)
                + (data.FarmingShopUniqueProtein[19] ? data.FarmingShopUniqueProtein[19] : 0)
                + (data.FarmingShopUniqueProtein[20] ? data.FarmingShopUniqueProtein[20] : 0)
                + (data.FarmingShopUniqueProtein[21] ? data.FarmingShopUniqueProtein[21] : 0)
            );
        let frenchTotal = mathHelper.createDecimal(data.FrenchFriesTotal);

        let result = mathHelper.createDecimal(1);
        if (frenchTotal.greaterThan(10000000000.0)) {
            let log1 = mathHelper.logDecimal(frenchTotal, 5);
            log1 = mathHelper.subtractDecimal(log1, 13.48);
            let log2 = mathHelper.logDecimal(frenchTotal, 10.0);
            log2 = mathHelper.subtractDecimal(log2, 8);
            result = mathHelper.multiplyDecimal(
                mathHelper.multiplyDecimal(log1, mathHelper.pow(1.1, log2)),
                proteinBonus);
            result = mathHelper.pow(result, proteinExponent)
        }
        return result;
    },
    calcContagionBonus: function (data, index) {
        let bonus = 1;

        if (data.GrasshopperCollection[index].Locked > 0) {
            let base = helper.calcPOW(data.GrasshopperCollection[index].BaseBonus);
            let level = helper.calcPOW(data.GrasshopperCollection[index].Level);
            bonus *= Math.pow(1 + base * 0.01, level);
        }
        return bonus;
    },
    calcExpeditionHP: function (data) {
        let bonus = 1;

        if (data.ExpeditionsCollection[16].Locked > 0) {
            let temp = data.ExpeditionsCollection[16];
            let res = Math.pow(1 + temp.BonusPower, temp.Room - 1);
            bonus = res;
        }
        return bonus;
    },
    calcUniqueHPBonus: function (data) {
        let bonus = 1;

        for (let i = 0; i < data.FarmingShopUniqueHealthy.length; i++) {
            bonus *= (data.FarmingShopUniqueHealthy[i] + 1);
        }
        return bonus;
    },
    calcFriesHPBonus: function (data) {
        let bonus = 1;

        let totalFries = helper.calcPOW(data.FrenchFriesTotal);
        let shopFryBonus = 0.01 * data.FarmingShopFriesHealthyBonus + 0.1;
        let contagionFryBonus = this.calcContagionBonus(data, 5);
        let fryBonus = shopFryBonus * contagionFryBonus;
        bonus *= 1 + totalFries * fryBonus;
        return bonus;
    },
    calcPetHPBonus: function (data) {
        let bonus = 1;

        let activePets = data.EquipedPetID;
        let allPets = data.PetsCollection;

        let neededMap = {};
        for (let i = 0; i < activePets.length; i++) {
            if (activePets[i] > 0) {
                neededMap[activePets[i]] = true;
            }
        }

        for (let i = 0; i < allPets.length; i++) {
            let curr = allPets[i];
            if (curr.ID in neededMap) {
                // let rank = curr.Rank;
                // let bonusInner = 0;

                for (let j = 0; j < curr.BonusList.length; j++) {
                    let bonusInner = curr.BonusList[j];
                    if (bonusInner.ID === 23) {

                        //public double GetPetBonus(int Bonus)
                        //(Math.Pow(1.0 + petDataBonus.Gain, petData.Level) - 1.0 + Math.Max(0.0, (Math.Log(petData.Level + 1, 1.0125) * 0.005 - 1.0) * 0.5)) * (1.0 + Math.Log(petData.Rank + 1, 1.075) * 0.005) * 0.5
                        //(x1                                                     + x3) * (x5) * 0.5


                        // (
                        //     Math.Pow(1.0 + petDataBonus.Gain, petData.Level)
                        //     - 1.0
                        //     + Math.Max(
                        //         0.0, 
                        //         (Math.Log(petData.Level + 1, 1.0125) * 0.005 - 1.0) * 0.5)
                        // )

                        let x1 = Math.pow(1.0 + bonusInner.Gain, curr.Level) - 1.0;
                        let x2 = helper.calculateLogarithm(1.0125, curr.Level + 1);
                        let x3 = Math.max(0.0, (x2 * 0.005 - 1.0) * 0.5);
                        let x4 = helper.calculateLogarithm(1.075, curr.Rank + 1);
                        let x5 = 1.0 + x4 * 0.005;

                        let tot1 = (x1 + x3);
                        let tot2 = tot1 * x5;
                        let tot3 = tot2 * 0.5;

                        bonus += tot3;
                    }
                }
            }
        }

        return bonus;
    }
    // ,
    // calcHPBonus: function (data) {

    //     let legitBonus = helper.calcPOW(data.HealthyPotatoBonus);
    //     return legitBonus;
    // }
}

export default farmingHelper;