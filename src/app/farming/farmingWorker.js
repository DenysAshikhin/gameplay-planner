import helper from '../util/farmingHelper';
import mathHelper from '../util/math';
import generalHelper from '../util/helper';


// eslint-disable-next-line no-restricted-globals
self.onmessage = ({ data: { data, id, data1 } }) => {

    try {
        const updateCounter = data.updateCounter ? data.updateCounter : 250;
        let finalPlants = data.finalPlants;

        //for some reason the break-infinity values get changed into {mantissa: x, exponent: y} objects, revert

        for (let i = 0; i < finalPlants.length; i++) {
            let cur = finalPlants[i];
            cur.created = mathHelper.createDecimal(cur.created);
            cur.totalMade = mathHelper.createDecimal(cur.totalMade);
            cur.production = mathHelper.createDecimal(cur.production);
        }

        let modifiers = data.modifiers;
        //Same thing for modifiers
        modifiers.shopProdBonus = mathHelper.createDecimal(modifiers.shopProdBonus);
        modifiers.hpBonus = mathHelper.createDecimal(modifiers.hpBonus);
        modifiers.curPotatoes = mathHelper.createDecimal(modifiers.curPotatoes);
        modifiers.totalPotatoes = mathHelper.createDecimal(modifiers.totalPotatoes);
        modifiers.fryBonus = mathHelper.createDecimal(modifiers.fryBonus);
        modifiers.FrenchFriesSCBonus = mathHelper.createDecimal(modifiers.FrenchFriesSCBonus);

        const mode = data.mode;
        const secondsHour = 3600;
        let futureTime = data.time;
        const numSimulatedAutos = data.numSimulatedAutos ? data.numSimulatedAutos : 1;
        // let totalNumAutos = data.FarmingShopAutoPlotBought;
        // let numPlants = finalPlants.length;
        let combinations = data.combinations;


        let totalPot = mathHelper.createDecimal(0);
        let totalPotCombo = {};
        let bestProd = mathHelper.createDecimal(0);
        let bestProdCombo = {};
        let bestPIC = 0;
        let bestPicCombo = { potatoeProduction: 0 };
        let bestPICPerc = 0;
        let bestPICPercCombo = { potatoeProduction: 0 }
        let dataObj = { ...modifiers, time: secondsHour * futureTime };

        let top10DataPointsPotatoes = [];
        let top10DataPointsFries = [];

        let counter = 0;
        let counterMax = data.end - data.start;






        let combo;
        let result;

        let picGained = 0;
        let picPercent = 0;
        let temp;

        for (let i = data.start; i <= data.end; i++) {
            counterMax--;
            counter++;
            combo = combinations[i];
            dataObj.numAutos = combo;
            // let result;
            result = null;

            switch (mode) {
                case 'afk':

                    result = helper.calcHPProd(finalPlants, dataObj);
                    break;
                case 'carlo':
                    result = helper.calcStepHPProd(finalPlants, { ...dataObj, steps: combo });
                    break;
                case 'step':

                    let steps = [];

                    let curStep = 0;
                    let numSteps = 0;
                    let minTime = 0;

                    for (let j = 0; j < combo.length; j++) {
                        if (combo[j] > 0) {
                            numSteps++;
                            minTime += combo[j] * data.baseTimers[j];
                        }
                    }
                    let remaining = (secondsHour * futureTime) - minTime;

                    for (let j = 0; j < data.baseTimers.length; j++) {
                        if (combo[j] > 0) {
                            curStep++;
                        }
                        let autos = Array(data.baseTimers.length).fill(0);
                        autos[j] = numSimulatedAutos;
                        autos.reverse();
                        let runTime = combo[j] * data.baseTimers[j];

                        //If its the last plant that will be grown, give the remaining time to it
                        if (curStep === numSteps && combo[j] > 0) {
                            runTime += remaining;
                        }
                        //otherwise, round off time from other plants
                        else if (combo[j] > 0) {
                            let curPlant = finalPlants[finalPlants.length - 1 - j];
                            let remainder = runTime % curPlant.growthTime;
                            //Round down, add run time
                            if (remainder <= curPlant.growthTime * 0.5) {
                                runTime -= remainder;
                                remaining += remainder;
                            }
                            //Round up, reduce run time
                            else {
                                let diff = curPlant.growthTime - remainder;
                                //Only subtract time from final plant IF there is enough remaining time
                                if (remaining >= diff) {
                                    runTime += diff;
                                    remaining -= diff
                                }
                            }
                        }

                        steps.push({
                            time: generalHelper.roundInt(runTime),
                            autos: autos
                        })
                    }
                    result = helper.calcStepHPProd(finalPlants, { ...dataObj, steps: steps });
                    break;
                default:
                    result = helper.calcHPProd(finalPlants, dataObj);
                    break;
            }

            picGained = 0;
            picPercent = 0;
            temp = null;

            for (let j = 0; j < result.plants.length; j++) {
                let picIncrease = helper.calcMaxPrestige(result.plants[j]);
                picGained += picIncrease;
                picPercent += (Math.pow(1.02, result.plants[j].prestige + picIncrease) - Math.pow(1.02, result.plants[j].prestige));
                result.plants[j].picIncrease = picIncrease;
            }

            if (result.totalPotatoes.greaterThanOrEqualTo(totalPot) === true) {
                totalPot = result.totalPotatoes;
                totalPotCombo = { combo: combo, result: result, plants: result.plants }

                top10DataPointsPotatoes.unshift({ data: result.dataPointsPotatoes, result: totalPot });
                if (top10DataPointsPotatoes.length > 10) {
                    top10DataPointsPotatoes.pop();
                }
                top10DataPointsFries.unshift({ data: result.dataPointsFries, result: totalPot });
                if (top10DataPointsFries.length > 10) {
                    top10DataPointsFries.pop();
                }
            }


            if (result.potatoeProduction.greaterThanOrEqualTo(bestProd) === true) {
                bestProd = result.potatoeProduction;
                bestProdCombo = { combo: combo, result: result, plants: result.plants }
            }

            if (picGained > bestPIC) {
                temp = { combo: combo, result: result, plants: result.plants, potatoeProduction: result.potatoeProduction, picGain: picGained, picStats: { picLevel: picGained, picPercent: picPercent } };
                bestPIC = picGained;
                bestPicCombo = temp;
            }
            else if (picGained === bestPIC) {
                if (result.potatoeProduction.greaterThanOrEqualTo(bestPicCombo.potatoeProduction)) {
                    temp = { combo: combo, result: result, plants: result.plants, potatoeProduction: result.potatoeProduction, picGain: picGained, picStats: { picLevel: picGained, picPercent: picPercent } };
                    bestPIC = picGained;
                    bestPicCombo = temp;
                }
            }
            if (picPercent > bestPICPerc) {
                temp = { combo: combo, result: result, plants: result.plants, potatoeProduction: result.potatoeProduction, picGain: picPercent, picStats: { picLevel: picGained, picPercent: picPercent } };

                bestPICPerc = picPercent;
                bestPICPercCombo = temp;
            }
            else if (picPercent === bestPICPerc) {
                if (result.potatoeProduction.greaterThanOrEqualTo(bestPICPercCombo.potatoeProduction)) {
                    temp = { combo: combo, result: result, plants: result.plants, potatoeProduction: result.potatoeProduction, picGain: picPercent, picStats: { picLevel: picGained, picPercent: picPercent } };

                    bestPICPerc = picPercent;
                    bestPICPercCombo = temp;
                }
            }

            if (counter % updateCounter === 0) {
                // eslint-disable-next-line no-restricted-globals
                self.postMessage({
                    update: true,
                    temp: temp,
                    updateAmount: updateCounter
                })
            }
        }
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
            update: true,
            updateAmount: counterMax
        })

        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
            success: true,
            totalPotCombo: totalPotCombo,
            bestProdCombo: bestProdCombo,
            bestPicCombo: bestPicCombo,
            bestPICPercCombo: bestPICPercCombo,
            top10DataPointsPotatoes: top10DataPointsPotatoes,
            top10DataPointsFries: top10DataPointsFries
        })
    }
    catch (err) {
        console.log(err);
    }
}