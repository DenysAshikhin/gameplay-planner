"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

import useLocalStorage from "use-local-storage";
import MouseOverPopover from "../util/Tooltip.jsx";
import FarmingPlant from './FarmPlant.jsx';
import helper from "../util/helper.js";
import farmingHelper from "../util/farmingHelper.js";
import mathHelper from '../util/math.js';
import './page.css';
import ReactGA from "react-ga4";
import Graph from './graph.jsx';
import Timer from './Timer.jsx';
import DefaultSave from '../util/tempSave.json';

import PrestigeStar from '../../../public/images/icons/prestige_star.png'

function generateCombinations(objects, people) {
    const result = [];

    function backtrack(index, remainingObjects, currentCombination) {
        if (index === people) {
            if (remainingObjects === 0) {
                result.push([...currentCombination]);
            }
            return;
        }

        for (let i = 0; i <= remainingObjects; i++) {
            currentCombination[index] = i;
            backtrack(index + 1, remainingObjects - i, currentCombination);
        }
    }

    backtrack(0, objects, []);

    return result;
}

function splitArrayIndices(arr, x) {
    if (x <= 0) {
        return "Invalid value for x";
    }

    const n = arr.length;
    if (n < x) {
        return "Array size is smaller than x";
    }

    const chunkSize = Math.floor(n / x);
    const remainder = n % x;

    const indices = [];
    let start = 0;
    for (let i = 0; i < x; i++) {
        const end = start + chunkSize + (i < remainder ? 1 : 0);
        indices.push([start, end - 1]);
        start = end;
    }

    return indices;
}


const FarmingLanding = () => {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    const [customMultipliers, setCustomMultipliers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const [futureTime, setFutureTime] = useState(0.01);
    const [plantAutos, setPlantAutos] = useLocalStorage("plantAutos", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const [plantAutosClient, setPlantAutosClient] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    useEffect(() => {
        setPlantAutosClient(plantAutos);

    }, [plantAutos]);

    const secondsHour = 3600;
    const farmCalcStarted = useRef({});
    const farmTotals = useRef([]);
    // const [numThreads, setNumThreads] = useState(8);
    const [numThreads, setNumThreadsRunTime] = useState(8);
    const [clientNumThreads, setNumThreads] = useLocalStorage("numThreads", 8);
    useEffect(() => {
        setNumThreadsRunTime(clientNumThreads);
    }, [clientNumThreads]);

    // const [yScale, setYScale] = useState('log');
    const [yScale, setYScaleRunTime] = useState('log');
    const [yScaleClient, setYScale] = useLocalStorage("yScale", 'log');
    useEffect(() => {
        setYScaleRunTime(yScaleClient);
    }, [yScaleClient]);

    const [showFries, setShowFriesRunTime] = useState(true);
    const [showFriesClient, setShowFries] = useLocalStorage("showFries", true);
    useEffect(() => {
        setShowFriesRunTime(showFriesClient);
    }, [showFriesClient])

    const [showHP, setShowHPRunTime] = useState(true);
    const [showHPClient, setShowHP] = useLocalStorage("showHP", true);
    useEffect(() => {
        setShowHPRunTime(showHPClient);
    }, [showHPClient]);

    const [calcedFutureTime, setCalcedFutureTime] = useState(futureTime);//Used to lock in for pic displaying what future time what used when calculating

    const [numSimulatedAutos, setNumSimulatedAutosRunTime] = useState(data.FarmingShopAutoPlotBought);
    const [numSimulatedAutosClient, setNumSimulatedAutos] = useLocalStorage("numSimulatedAutos", data.FarmingShopAutoPlotBought);
    useEffect(() => {
        setNumSimulatedAutosRunTime(numSimulatedAutosClient);
    }, [numSimulatedAutosClient]);

    const [farmCalcProgress, setFarmCalcProgress] = useState({ current: 0, max: 0 });
    const [bestPlantCombo, setBestPlantCombo] = useState([]);//holds the best production, total made, pic and pic% after a calculation
    // const [bestRunningCombo, setBestRunningCombo] = useState({});//same as above, but used to make the graph update during the loading
    const bestRunningCombo = useMemo(() => {
        return {}
    }, []);//same as above, but used to make the graph update during the loading

    const [autoBuyPBC, setAutoBuyPBCRunTime] = useState(data.ASCFarmingShopAutoPage1 === 1);
    const [autoBuyPBCClient, setAutoBuyPBC] = useLocalStorage("autoBuyPBC", data.ASCFarmingShopAutoPage1 === 1);
    useEffect(() => {
        setAutoBuyPBCRunTime(autoBuyPBCClient);
    }, [autoBuyPBCClient]);

    const [lockCustomAuto, setLockCustomAutoRunTime] = useState(false);
    const [lockCustomAutoClient, setLockCustomAuto] = useLocalStorage("lockCustomAuto", false);
    useEffect(() => {
        setLockCustomAutoRunTime(lockCustomAutoClient);
    }, [lockCustomAutoClient]);

    const [forceRankPotion, setForceRankPotionRunTime] = useState(false);
    const [forceRankPotionClient, setForceRankPotion] = useLocalStorage("forceRankPotion", false);
    useEffect(() => {
        setForceRankPotionRunTime(forceRankPotionClient);
    }, [forceRankPotionClient]);

    const [calcAFK, setCalcAFK] = useState(false);
    const [calcStep, setCalcStep] = useState(false);

    const [timeCompleted, setTimeCompleted] = useState(null);

    useEffect(() => {

        let timeout = setTimeout(() => {

            ReactGA.send({ hitType: "pageview", page: "/farming_", title: "_Farming Calculator Page" });
        }, 5000);
        return () => { clearTimeout(timeout) };
    }, [])

    let petPlantCombo = 1;
    let contagionPlantEXP = 1;
    let contagionPlantGrowth = 1;
    let contagionPlantProd = 1;
    let contagionHarvest = 1;

    if (data.GrasshopperCollection[2].Locked > 0) {
        let base = helper.calcPOW(data.GrasshopperCollection[2].BaseBonus);
        let level = helper.calcPOW(data.GrasshopperCollection[2].Level);
        contagionPlantEXP = Math.pow(1 + base * 0.01, level);
    }
    if (data.GrasshopperCollection[3].Locked > 0) {
        let base = helper.calcPOW(data.GrasshopperCollection[3].BaseBonus);
        let level = helper.calcPOW(data.GrasshopperCollection[3].Level);
        contagionPlantProd = Math.pow(1 + base * 0.01, level);
    }
    if (data.GrasshopperCollection[4].Locked > 0) {
        let base = helper.calcPOW(data.GrasshopperCollection[4].BaseBonus);
        let level = helper.calcPOW(data.GrasshopperCollection[4].Level);
        contagionPlantGrowth = Math.pow(1 + base * 0.01, level);
    }
    if (data.GrasshopperCollection[6].Locked > 0) {
        let base = helper.calcPOW(data.GrasshopperCollection[6].BaseBonus);
        let level = helper.calcPOW(data.GrasshopperCollection[6].Level);
        contagionHarvest = Math.pow(1 + base * 0.01, level);
    }

    let soulPlantEXP = Math.pow(1.25, data.SoulLeafTreatment);

    let shopGrowingSpeed = data.FarmingShopPlantGrowingSpeed;
    let manualHarvestFormula = data.FarmingShopPlantManualHarvestFormula;
    // let shopProdBonus = Math.pow(1.25, data.FarmingShopPlantTotalProduction);
    let shopRankEXP = 1 + data.FarmingShopPlantRankExpEarned * 0.1;
    let shopRankLevel = data.FarmingShopPlantRankExpEarned;
    let picPlants = data.FarmingShopPlantImprovement;
    let plants = data.PlantCollection;

    let assemblyPlantExp = 1;
    let assemblyProduction = 1;
    let assemblyPlantharvest = 1;
    if (data?.AssemblerCollection[0].BonusList[1].StartingLevel <= data?.AssemblerCollection[0].Level) {
        assemblyPlantExp *= farmingHelper.calcAssembly(data, 0, 1);
    }
    if (data?.AssemblerCollection[5].BonusList[2].StartingLevel <= data?.AssemblerCollection[5].Level) {
        assemblyPlantExp *= farmingHelper.calcAssembly(data, 5, 2);
    }

    if (data?.AssemblerCollection[3].BonusList[2].StartingLevel <= data?.AssemblerCollection[3].Level) {
        assemblyProduction *= farmingHelper.calcAssembly(data, 3, 2);
    }
    if (data?.AssemblerCollection[7].BonusList[1].StartingLevel <= data?.AssemblerCollection[7].Level) {
        assemblyProduction *= farmingHelper.calcAssembly(data, 7, 1);
    }

    if (data?.AssemblerCollection[7].BonusList[0].StartingLevel <= data?.AssemblerCollection[7].Level) {
        assemblyPlantharvest *= farmingHelper.calcAssembly(data, 7, 0);
    }
    if (data?.AssemblerCollection[9].BonusList[3].StartingLevel <= data?.AssemblerCollection[9].Level) {
        assemblyPlantharvest *= farmingHelper.calcAssembly(data, 9, 3);
    }

    for (let i = 0; i < data.PetsSpecial.length; i++) {
        let t = data.PetsSpecial[i];
        if (t.BonusID === 5015 && t.Active === 1) {
            petPlantCombo += t.BonusPower / 100;
        }
    }

    let potionRankTime = data.SoulPotionHealthyRankTime;
    let potionRank = potionRankTime > 0 ? data.SoulPotionHealthyRankBonus + 1 : 1;
    if (forceRankPotion && potionRank === 1) {
        potionRank = 1.5;
    }

    const modifiers = useMemo(() => {
        // console.log(`setin modif`);
        let tempy =
        {
            time: 0,
            // numAuto: numAuto,
            originalPotionRank: data.SoulPotionHealthyRankTime,
            shopGrowingSpeed: shopGrowingSpeed,
            originalShopGrowingLevel: data.FarmingShopPlantGrowingSpeed,
            originalShopGrowingBonus: data.PlantGrowingSpeedBonus,
            manualHarvestFormula: manualHarvestFormula,
            contagionHarvest: contagionHarvest,
            shopRankEXP: shopRankEXP,
            shopRankLevel: shopRankLevel,
            originalShopRankLevel: data.FarmingShopPlantRankExpEarned,
            originalRankLevelBonus: data.PlantRankExpBonus,
            picPlants: picPlants,
            petPlantCombo: petPlantCombo,
            contagionPlantEXP: contagionPlantEXP,
            contagionPlantGrowth: contagionPlantGrowth,
            soulPlantEXP: soulPlantEXP,
            assemblyPlantExp: assemblyPlantExp,
            assemblyProduction: assemblyProduction,
            assemblyPlantharvest: assemblyPlantharvest,
            manualHarvestBonus: mathHelper.createDecimal(data.PlantManualHarvestBonus).toNumber(),
            shopProdBonus: mathHelper.pow(1.25, data.FarmingShopPlantTotalProduction),
            originalShopProdLevel: data.FarmingShopPlantTotalProduction,
            originalShopProdBonus: data.PlantTotalProductionBonus,
            shopProdLevel: data.FarmingShopPlantTotalProduction,
            contagionPlantProd: contagionPlantProd,
            hpBonus: mathHelper.createDecimal(data.HealthyPotatoBonus),
            nextCosts: farmingHelper.getNextShopCosts(data),
            curPotatoes: mathHelper.createDecimal(data.HealthyPotatoCurrent),
            totalPotatoes: mathHelper.createDecimal(data.HealthyPotatoTotal),
            expBonus: shopRankEXP * soulPlantEXP * contagionPlantEXP * assemblyPlantExp,
            autoBuyPBC: autoBuyPBC,
            // tickRate: Math.floor((futureTime * secondsHour) * 0.0015) < 1 ? 1 : Math.floor((futureTime * secondsHour) * 0.0015),
            tickRate: Math.floor((futureTime * secondsHour) * 0.01) < 1 ? 1 : Math.floor((futureTime * secondsHour) * 0.012),
            potionRankTime: potionRankTime,
            potionRank: potionRank,
            forceRankPotion: forceRankPotion,
            fryBonus: data.FrenchFriesBonus,
            timePassed: data.TimePassedFarming
        }
        tempy.originalShopProdBonus = data.PlantTotalProductionBonus;
        return tempy
    },
        [
            shopGrowingSpeed, manualHarvestFormula, contagionHarvest, shopRankEXP, shopRankLevel, picPlants, petPlantCombo,
            contagionPlantEXP, contagionPlantGrowth, soulPlantEXP, assemblyPlantExp, assemblyProduction, contagionPlantProd, assemblyPlantharvest,
            data, autoBuyPBC, futureTime, potionRank, potionRankTime, forceRankPotion
        ]
    )

    const finalPlants = useMemo(() => {
        // console.log(`generating inter plants`);
        let tempArr = [];
        //
        for (let i = 0; i < plants.length; i++) {
            let plant = plants[i];
            if (plant.Locked === 0) continue;



            plant.prestige = picPlants[i];

            plant.prestigeBonus = Math.pow(1.02, plant.prestige)
            plant.growthTime = farmingHelper.calcGrowthTime(plant, modifiers);

            plant.created = mathHelper.createDecimal(plant.ManuallyCreated);
            plant.totalMade = mathHelper.createDecimal(plant.TotalCreated);

            plant.perHarvest = farmingHelper.calcPlantHarvest(plant, modifiers);
            plant.curExp = plant.CurrentExp.mantissa * (Math.pow(10, plant.CurrentExp.exponent));
            plant.reqExp = plant.ExpNeeded.mantissa * (Math.pow(10, plant.ExpNeeded.exponent));
            //plant.timeToLevel = (plant.reqExp - plant.curExp) / plant.perHarvest * plant.growthTime;

            plant.futureMult = farmingHelper.futureMultBD(plant, modifiers);
            let prod = farmingHelper.calcProdOutput(plant, modifiers);
            plant.production = prod;
            plant.timeToLevel = farmingHelper.calcTimeTillLevel(plant, { ...modifiers, numAuto: plantAutosClient[i] });

            plant.elapsedTime = 0;
            plant.originalRank = plant.Rank;
            tempArr.push(plant);
        }
        return tempArr;
    }, [picPlants, plants, modifiers, plantAutosClient])


    const [calcDone, setCalcDone] = useState(true);
    const [expDiff, setExpDiff] = useState(0);
    const [expDiffFry, setExpDiffFry] = useState(0);

    let tempFuture = useMemo(() => {
        // console.log(`calcing`);

        if (false) {
            let final_steps = [];
            let completeRunTime = 0;

            for (let i = finalPlants.length - 1; i >= 0; i--) {
                let runTime = 0;
                let loop_flag = true;

                let plants_inner = [...finalPlants];
                let modif_inner = { ...modifiers }
                let index = i;
                let autos_inner = Array(numSimulatedAutos).fill(0);
                while (loop_flag) {

                    let temp_time = plants_inner[index].growthTime === 10 ? 60 : plants_inner[index].growthTime;

                    runTime += temp_time;

                    autos_inner[index] = numSimulatedAutos;
                    let temp_result = farmingHelper.calcHPProd(plants_inner, { ...modif_inner, time: temp_time, numAutos: autos_inner });

                    let mult_increase = mathHelper.subtractDecimal(temp_result.plants[index].futureMult, plants_inner[index].futureMult);
                    let mult_increase_ind = mathHelper.divideDecimal(mult_increase, numSimulatedAutos);
                    let mult_increase_perc = mathHelper.divideDecimal(mult_increase_ind, temp_result.plants[index].futureMult).toNumber();

                    let mult_per_s = mult_increase_perc / (temp_time * (index === 0 ? 0.75 : 1));

                    plants_inner = temp_result.plants;
                    modif_inner = temp_result.finalModifiers;
                    const thresh = 0.000024579935867502135 / 3;
                    if (mult_per_s < thresh) {

                        loop_flag = false;
                    }
                }
                completeRunTime += runTime;
                final_steps.push({ time: runTime, autos: autos_inner });
            }

            console.log(final_steps)
            let temp_steps = farmingHelper.calcStepHPProd(finalPlants, { ...modifiers, steps: final_steps });
            console.log(`temp steps: ${completeRunTime} -> ${helper.secondsToString(completeRunTime)}`);
            console.log(temp_steps);


            // console.log(`final duration: ${helper.secondsToString(runTime)}`)
            // let timeTillLevel_temp = farmingHelper.calcTimeTillLevel(finalPlants[6], {...modifiers});

        }

        let tempModif = { ...modifiers, time: secondsHour * futureTime, numAutos: plantAutosClient };

        let result = farmingHelper.calcHPProd(finalPlants, tempModif);

        for (let i = 0; i < result.dataPointsPotatoes.length; i++) {
            let cur = result.dataPointsPotatoes[i];
            cur.time = helper.roundInt(cur.time);
            cur.originalProduction = mathHelper.createDecimal(cur.production.toString());
        }
        for (let i = 0; i < result.dataPointsFries.length; i++) {
            let cur = result.dataPointsFries[i];
            cur.time = helper.roundInt(cur.time);
            cur.originalFry = mathHelper.createDecimal(cur.fries.toString());
        }

        // console.log(`future plants:`);
        // console.log(result);
        let finalFry = farmingHelper.calcFryOutput(result.totalPotatoes, result.finalModifiers);
        // console.log(`rough fry final (pre time bonus): ${finalFry.toExponential(3)}`)
        return result;
    },
        [numSimulatedAutos, finalPlants, modifiers, futureTime, plantAutosClient, secondsHour]);

    //Go through all datapoints, find highest exp, and reduce it for all equally if necessary so JS doesn't break
    const graphObjects = useMemo(() => {
        // console.log(`updating EXPDIFF`);

        const maxExp = 300;
        let currMaxExp = 0;
        let diff_exp = 0;

        let currMaxExpFry = 0;
        let diff_expFry = 0;

        // Go over all the custom input data points first
        for (let i = 0; i < tempFuture.dataPointsPotatoes.length; i++) {
            let cur = tempFuture.dataPointsPotatoes[i];
            if (cur.originalProduction.exponent > currMaxExp) {
                currMaxExp = cur.originalProduction.exponent;
            }
        }

        for (let i = 0; i < tempFuture.dataPointsFries.length; i++) {
            let cur = tempFuture.dataPointsFries[i];
            if (cur.originalFry.exponent > currMaxExpFry) {
                currMaxExpFry = cur.originalFry.exponent;
            }
        }

        if (bestPlantCombo.top10DataPointsPotatoes) {
            // Go over all the top 1 results
            for (let i = 0; i < bestPlantCombo.top10DataPointsPotatoes.length; i++) {
                if (i > 0) break;
                let cur = bestPlantCombo.top10DataPointsPotatoes[i];
                for (let j = 0; j < cur.data.length; j++) {
                    let cur_iner = cur.data[j];
                    if (cur_iner.originalProduction.exponent > currMaxExp) {
                        currMaxExp = cur_iner.originalProduction.exponent;
                    }
                }
            }
            for (let i = 0; i < bestPlantCombo.top10DataPointsFries.length; i++) {
                if (i > 0) break;
                let cur = bestPlantCombo.top10DataPointsFries[i];
                for (let j = 0; j < cur.data.length; j++) {
                    let cur_iner = cur.data[j];
                    if (cur_iner.originalFry.exponent > currMaxExpFry) {
                        currMaxExpFry = cur_iner.originalFry.exponent;
                    }
                }
            }

            // go over the best PIC
            for (let i = 0; i < bestPlantCombo.bestPic.result.result.dataPointsPotatoes.length; i++) {
                let cur = bestPlantCombo.bestPic.result.result.dataPointsPotatoes[i];
                if (cur.originalProduction.exponent > currMaxExp) {
                    currMaxExp = cur.originalProduction.exponent;
                }
            }

            // go over the best PIC %
            for (let i = 0; i < bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
                let cur = bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes[i];
                if (cur.originalProduction.exponent > currMaxExp) {
                    currMaxExp = cur.originalProduction.exponent;
                }
            }
        }


        diff_exp = currMaxExp > maxExp ? currMaxExp - maxExp : 0;
        diff_expFry = currMaxExpFry > maxExp ? currMaxExpFry - maxExp : 0;

        // Reduce all the exponents for custom input first
        for (let i = 0; i < tempFuture.dataPointsPotatoes.length; i++) {
            let cur = tempFuture.dataPointsPotatoes[i];
            cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
            cur.production.exponent -= diff_exp;
            cur.production = cur.production.toNumber();
        }
        for (let i = 0; i < tempFuture.dataPointsFries.length; i++) {
            let cur = tempFuture.dataPointsFries[i];
            cur.fries = mathHelper.createDecimal(cur.originalFry.toString());
            cur.fries.exponent -= diff_expFry;
            cur.fries = cur.fries.toNumber();
        }

        if (bestPlantCombo.top10DataPointsPotatoes) {
            // Go over all the top 1 results
            for (let i = 0; i < bestPlantCombo.top10DataPointsPotatoes.length; i++) {
                if (i > 0) break;
                let cur = bestPlantCombo.top10DataPointsPotatoes[i];
                for (let j = 0; j < cur.data.length; j++) {
                    let cur_iner = cur.data[j];
                    cur_iner.production = mathHelper.createDecimal(cur_iner.originalProduction.toString());
                    cur_iner.production.exponent -= diff_exp;
                    cur_iner.production = cur_iner.production.toNumber();
                }
            }
            for (let i = 0; i < bestPlantCombo.top10DataPointsFries.length; i++) {
                if (i > 0) break;
                let cur = bestPlantCombo.top10DataPointsFries[i];
                for (let j = 0; j < cur.data.length; j++) {
                    let cur_iner = cur.data[j];
                    cur_iner.fries = mathHelper.createDecimal(cur_iner.originalFry.toString());
                    cur_iner.fries.exponent -= diff_expFry;
                    cur_iner.fries = cur_iner.fries.toNumber();
                }
            }

            // go over the best PIC
            for (let i = 0; i < bestPlantCombo.bestPic.result.result.dataPointsPotatoes.length; i++) {
                let cur = bestPlantCombo.bestPic.result.result.dataPointsPotatoes[i];
                cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
                cur.production.exponent -= diff_exp;
                cur.production = cur.production.toNumber();
            }
            // go over the best PIC %
            for (let i = 0; i < bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
                let cur = bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes[i];
                cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
                cur.production.exponent -= diff_exp;
                cur.production = cur.production.toNumber();
            }
        }

        if (expDiff !== diff_exp) {
            setExpDiff(diff_exp);
        }
        if (expDiffFry !== diff_expFry) {
            setExpDiffFry(expDiffFry);
        }

        return {
            customProduction: tempFuture,
            top10Potatoes: bestPlantCombo.top10DataPointsPotatoes,
            top10Fries: bestPlantCombo.top10DataPointsFries,
            bestPic: bestPlantCombo?.bestPic?.result?.result?.dataPointsPotatoes,
            bestPicPerc: bestPlantCombo?.bestPicPerc?.result?.result?.dataPointsPotatoes,
        }

    }, [tempFuture, expDiff, expDiffFry, bestPlantCombo])

    const runningGraphObjects = useMemo(() => {
        // console.log(`updating running EXPDIFF`);

        const maxExp = 300;
        let currMaxExp = 0;
        let diff_exp = 0;

        let runProd = bestRunningCombo.runningProd;

        if (runProd) {
            for (let i = 0; i < runProd.result.result.dataPointsPotatoes.length; i++) {
                let cur_iner = runProd.result.result.dataPointsPotatoes[i];
                if (cur_iner.originalProduction.exponent > currMaxExp) {
                    currMaxExp = cur_iner.originalProduction.exponent;
                }
            }

            diff_exp = currMaxExp > maxExp ? currMaxExp - maxExp : 0;

            for (let i = 0; i < runProd.result.result.dataPointsPotatoes.length; i++) {
                let cur_iner = runProd.result.result.dataPointsPotatoes[i];
                cur_iner.production = mathHelper.createDecimal(cur_iner.originalProduction.toString());
                cur_iner.production.exponent -= diff_exp;
                cur_iner.production = cur_iner.production.toNumber();
            }
        }

        return {
            runningProd: runProd
            // customProduction: tempFuture,
            // top10Potatoes: bestPlantCombo.top10DataPointsPotatoes,
            // bestPic: bestPlantCombo?.bestPic?.result?.result?.dataPointsPotatoes,
            // bestPicPerc: bestPlantCombo?.bestPicPerc?.result?.result?.dataPointsPotatoes,
        }

        // if (bestPlantCombo.top10DataPointsPotatoes) {
        //     // Go over all the top 1 results
        //     for (let i = 0; i < bestPlantCombo.top10DataPointsPotatoes.length; i++) {
        //         if (i > 0) break;
        //         let cur = bestPlantCombo.top10DataPointsPotatoes[i];
        //         for (let j = 0; j < cur.data.length; j++) {
        //             let cur_iner = cur.data[j];
        //             if (cur_iner.originalProduction.exponent > currMaxExp) {
        //                 currMaxExp = cur_iner.originalProduction.exponent;
        //             }
        //         }
        //     }

        //     // go over the best PIC
        //     for (let i = 0; i < bestPlantCombo.bestPic.result.result.dataPointsPotatoes.length; i++) {
        //         let cur = bestPlantCombo.bestPic.result.result.dataPointsPotatoes[i];
        //         if (cur.originalProduction.exponent > currMaxExp) {
        //             currMaxExp = cur.originalProduction.exponent;
        //         }
        //     }
        //     // go over the best PIC %
        //     for (let i = 0; i < bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
        //         let cur = bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes[i];
        //         if (cur.originalProduction.exponent > currMaxExp) {
        //             currMaxExp = cur.originalProduction.exponent;
        //         }
        //     }
        // }


        // diff_exp = currMaxExp > maxExp ? currMaxExp - maxExp : 0;

        // // Reduce all the exponents for custom input first
        // for (let i = 0; i < tempFuture.dataPointsPotatoes.length; i++) {
        //     let cur = tempFuture.dataPointsPotatoes[i];
        //     cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
        //     cur.production.exponent -= diff_exp;
        //     cur.production = cur.production.toNumber();
        // }

        // if (bestPlantCombo.top10DataPointsPotatoes) {
        //     // Go over all the top 1 results
        //     for (let i = 0; i < bestPlantCombo.top10DataPointsPotatoes.length; i++) {
        //         if (i > 0) break;
        //         let cur = bestPlantCombo.top10DataPointsPotatoes[i];
        //         for (let j = 0; j < cur.data.length; j++) {
        //             let cur_iner = cur.data[j];
        //             cur_iner.production = mathHelper.createDecimal(cur_iner.originalProduction.toString());
        //             cur_iner.production.exponent -= diff_exp;
        //             cur_iner.production = cur_iner.production.toNumber();
        //         }
        //     }

        //     // go over the best PIC
        //     for (let i = 0; i < bestPlantCombo.bestPic.result.result.dataPointsPotatoes.length; i++) {
        //         let cur = bestPlantCombo.bestPic.result.result.dataPointsPotatoes[i];
        //         cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
        //         cur.production.exponent -= diff_exp;
        //         cur.production = cur.production.toNumber();
        //     }
        //     // go over the best PIC %
        //     for (let i = 0; i < bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
        //         let cur = bestPlantCombo.bestPicPerc.result.result.dataPointsPotatoes[i];
        //         cur.production = mathHelper.createDecimal(cur.originalProduction.toString());
        //         cur.production.exponent -= diff_exp;
        //         cur.production = cur.production.toNumber();
        //     }
        // }

        // if (expDiff !== diff_exp) {
        //     setExpDiff(diff_exp);
        // }

        // return {
        //     customProduction: tempFuture,
        //     top10Potatoes: bestPlantCombo.top10DataPointsPotatoes,
        //     bestPic: bestPlantCombo?.bestPic?.result?.result?.dataPointsPotatoes,
        //     bestPicPerc: bestPlantCombo?.bestPicPerc?.result?.result?.dataPointsPotatoes,
        // }

    }, [bestRunningCombo])




    let customFuturePlants = [];
    let futurePlants = [];//ss
    for (let i = 0; i < tempFuture.plants.length; i++) {
        let newPlant = tempFuture.plants[i];
        let prestigeTimings = farmingHelper.calcTimeTillPrestige(newPlant, { ...modifiers, time: secondsHour * futureTime, numAuto: plantAutosClient[i] });

        newPlant.nextPrestige = prestigeTimings.prestige;
        newPlant.timeToPrestige = prestigeTimings.remainingTime;

        customFuturePlants.push(newPlant);
        futurePlants.push(newPlant);
    }



    const FarmerWorker = useRef(null);
    const FarmerWorker1 = useRef(null);
    const FarmerWorker2 = useRef(null);
    const FarmerWorker3 = useRef(null);
    const FarmerWorker4 = useRef(null);
    const FarmerWorker5 = useRef(null);
    const FarmerWorker6 = useRef(null);
    const FarmerWorker7 = useRef(null);
    const FarmerWorker8 = useRef(null);
    const FarmerWorker9 = useRef(null);
    const FarmerWorker10 = useRef(null);
    const FarmerWorker11 = useRef(null);
    const workers = [FarmerWorker, FarmerWorker1, FarmerWorker2, FarmerWorker3, FarmerWorker4, FarmerWorker5, FarmerWorker6, FarmerWorker7, FarmerWorker8, FarmerWorker9, FarmerWorker10, FarmerWorker11];

    //Calc best + listeners
    useEffect(() => {

        const findBest = () => {
            let finished = true;
            for (let i = 0; i < 6; i++) {
                if (farmCalcStarted.current[i]) {
                    finished = false;
                }
            }
            if (finished) {
                setTimeCompleted(new Date());
                setBestPlantCombo((currBestCombo) => {
                    console.log(`Time end: ` + (new Date()).getTime())
                    setFarmCalcProgress((curr) => {
                        let newAmount = { ...curr };
                        newAmount.current = 100;
                        newAmount.max = 100;
                        return newAmount;
                    })
                    console.log(`ready to find best`);

                    let bestProd = { prod: mathHelper.createDecimal(0) };
                    let bestPot = { pot: mathHelper.createDecimal(0) };
                    let bestPic = { pic: 0, prod: mathHelper.createDecimal(0) }
                    let bestPicPerc = { pic: 0, prod: mathHelper.createDecimal(0) }

                    let top10DataPointsPotatoes = [];
                    let top10DataPointsFries = [];

                    for (let i = 0; i < farmTotals.current.length; i++) {
                        let cur = farmTotals.current[i];


                        if (!cur.totalPotCombo.result) {
                            continue;
                        }


                        //Have to reset potatoe values again
                        cur.bestPicCombo.potatoeProduction = cur.bestPicCombo.potatoeProduction ? mathHelper.createDecimal(cur.bestPicCombo.potatoeProduction) : cur.bestPicCombo.potatoeProduction;
                        cur.bestPicCombo.result.potatoeProduction = cur.bestPicCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestPicCombo.result.potatoeProduction) : cur.bestPicCombo.result.potatoeProduction;
                        cur.bestPicCombo.result.totalPotatoes = cur.bestPicCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestPicCombo.result.totalPotatoes) : cur.bestPicCombo.result.totalPotatoes;
                        cur.bestPICPercCombo.potatoeProduction = cur.bestPICPercCombo.potatoeProduction ? mathHelper.createDecimal(cur.bestPICPercCombo.potatoeProduction) : cur.bestPICPercCombo.potatoeProduction;
                        cur.bestPICPercCombo.result.potatoeProduction = cur.bestPICPercCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestPICPercCombo.result.potatoeProduction) : cur.bestPICPercCombo.result.potatoeProduction;
                        cur.bestPICPercCombo.result.totalPotatoes = cur.bestPICPercCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestPICPercCombo.result.totalPotatoes) : cur.bestPICPercCombo.result.totalPotatoes;
                        cur.bestProdCombo.result.potatoeProduction = cur.bestProdCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestProdCombo.result.potatoeProduction) : cur.bestProdCombo.result.potatoeProduction;
                        cur.bestProdCombo.result.totalPotatoes = cur.bestProdCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestProdCombo.result.totalPotatoes) : cur.bestProdCombo.result.totalPotatoes;
                        cur.totalPotCombo.result.totalPotatoes = cur.totalPotCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.totalPotCombo.result.totalPotatoes) : cur.totalPotCombo.result.totalPotatoes;
                        cur.totalPotCombo.result.potatoeProduction = cur.totalPotCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.totalPotCombo.result.potatoeProduction) : cur.totalPotCombo.result.potatoeProduction;



                        for (let j = 0; j < cur.top10DataPointsPotatoes.length; j++) {

                            let cur_top = cur.top10DataPointsPotatoes[j];
                            cur_top.result = mathHelper.createDecimal(cur_top.result);

                            for (let k = 0; k < cur_top.data.length; k++) {
                                let cur_data = cur_top.data[k];
                                cur_data.production = cur_data.originalProduction ? mathHelper.createDecimal(cur_data.originalProduction) : mathHelper.createDecimal(cur_data.production);
                                cur_data.time = helper.roundInt(cur_data.time);
                            }
                        }

                        for (let j = 0; j < cur.top10DataPointsFries.length; j++) {

                            let cur_top = cur.top10DataPointsFries[j];
                            cur_top.result = mathHelper.createDecimal(cur_top.result);

                            for (let k = 0; k < cur_top.data.length; k++) {
                                let cur_data = cur_top.data[k];
                                cur_data.fries = cur_data.originalFry ? mathHelper.createDecimal(cur_data.originalFry) : mathHelper.createDecimal(cur_data.fries);
                                cur_data.time = helper.roundInt(cur_data.time);
                            }
                        }


                        for (let j = 0; j < cur.bestPicCombo.result.dataPointsPotatoes.length; j++) {
                            let cur_data = cur.bestPicCombo.result.dataPointsPotatoes[j];
                            cur_data.production = cur_data.originalProduction ? mathHelper.createDecimal(cur_data.originalProduction) : mathHelper.createDecimal(cur_data.production);
                            cur_data.time = helper.roundInt(cur_data.time);
                        }
                        for (let j = 0; j < cur.bestPicCombo.result.dataPointsFries.length; j++) {
                            let cur_data = cur.bestPicCombo.result.dataPointsFries[j];

                            cur_data.fries = cur_data.originalFry ? mathHelper.createDecimal(cur_data.originalFry) : mathHelper.createDecimal(cur_data.fries);

                            cur_data.time = helper.roundInt(cur_data.time);
                        }
                        for (let j = 0; j < cur.bestPICPercCombo.result.dataPointsPotatoes.length; j++) {
                            let cur_data = cur.bestPICPercCombo.result.dataPointsPotatoes[j];
                            cur_data.production = cur_data.originalProduction ? mathHelper.createDecimal(cur_data.originalProduction) : mathHelper.createDecimal(cur_data.production);
                            cur_data.time = helper.roundInt(cur_data.time);
                        }
                        for (let j = 0; j < cur.bestPICPercCombo.result.dataPointsFries.length; j++) {
                            let cur_data = cur.bestPICPercCombo.result.dataPointsFries[j];
                            cur_data.fries = cur_data.originalFry ? mathHelper.createDecimal(cur_data.originalFry) : mathHelper.createDecimal(cur_data.fries);
                            cur_data.time = helper.roundInt(cur_data.time);
                        }


                        top10DataPointsPotatoes.push(...cur.top10DataPointsPotatoes);
                        top10DataPointsFries.push(...cur.top10DataPointsFries);
                        if (cur.bestPicCombo.picGain > bestPic.pic) {
                            bestPic = { pic: cur.bestPicCombo.picGain, result: cur.bestPicCombo, prod: cur.bestPicCombo.potatoeProduction }
                        }
                        else if (cur.bestPicCombo.picGain === bestPic.pic) {
                            if (cur.bestPicCombo.potatoeProduction.greaterThan(bestPic.prod)) {
                                bestPic = { pic: cur.bestPicCombo.picGain, result: cur.bestPicCombo, prod: cur.bestPicCombo.potatoeProduction }
                            }
                        }

                        if (cur.bestPICPercCombo.picGain > bestPicPerc.pic) {
                            bestPicPerc = { pic: cur.bestPICPercCombo.picGain, result: cur.bestPICPercCombo, prod: cur.bestPICPercCombo.potatoeProduction }
                        }
                        else if (cur.bestPICPercCombo.picGain === bestPicPerc.pic) {
                            if (cur.bestPICPercCombo.potatoeProduction.greaterThan(bestPicPerc.prod)) {
                                bestPicPerc = { pic: cur.bestPICPercCombo.picGain, result: cur.bestPICPercCombo, prod: cur.bestPICPercCombo.potatoeProduction }
                            }
                        }


                        if (cur.bestProdCombo.result.potatoeProduction.greaterThan(bestProd.prod)) {
                            bestProd = { prod: cur.bestProdCombo.result.potatoeProduction, result: cur.bestProdCombo }

                        }
                        if (cur.totalPotCombo.result.totalPotatoes.greaterThan(bestPot.pot)) {
                            bestPot = { pot: cur.totalPotCombo.result.totalPotatoes, result: cur.totalPotCombo }
                        }

                        for (let j = 0; j < cur.top10DataPointsPotatoes.length; j++) {
                            cur.top10DataPointsPotatoes[j].obj = cur.totalPotCombo;
                        }

                    }

                    top10DataPointsPotatoes = top10DataPointsPotatoes.sort((a, b) => b.result.compare(a.result)).slice(0, 10);
                    top10DataPointsFries = top10DataPointsFries.sort((a, b) => b.result.compare(a.result)).slice(0, 10);
                    // top10DataPointsFries =[]


                    for (let i = 0; i < top10DataPointsPotatoes.length; i++) {

                        let cur = top10DataPointsPotatoes[i];
                        for (let j = 0; j < cur.data.length; j++) {
                            cur.data[j].time = helper.roundInt(cur.data[j].time);
                            cur.data[j].originalProduction = mathHelper.createDecimal(cur.data[j].production.toString());
                        }
                    }

                    for (let i = 0; i < top10DataPointsFries.length; i++) {
                        let cur = top10DataPointsFries[i];
                        for (let j = 0; j < cur.data.length; j++) {
                            cur.data[j].time = helper.roundInt(cur.data[j].time);
                            cur.data[j].originalFry = mathHelper.createDecimal(cur.data[j].fries.toString());
                        }
                    }

                    for (let i = 0; i < bestPic.result.result.dataPointsPotatoes.length; i++) {
                        let cur = bestPic.result.result.dataPointsPotatoes[i];
                        cur.time = helper.roundInt(cur.time);
                        cur.originalProduction = mathHelper.createDecimal(cur.production.toString());
                    }
                    for (let i = 0; i < bestPic.result.result.dataPointsFries.length; i++) {
                        let cur = bestPic.result.result.dataPointsFries[i];
                        cur.time = helper.roundInt(cur.time);
                        cur.originalFry = mathHelper.createDecimal(cur.fries.toString());
                    }
                    for (let i = 0; i < bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
                        let cur = bestPicPerc.result.result.dataPointsPotatoes[i];
                        cur.time = helper.roundInt(cur.time);
                        cur.originalProduction = mathHelper.createDecimal(cur.production.toString());
                    }
                    for (let i = 0; i < bestPicPerc.result.result.dataPointsFries.length; i++) {
                        let cur = bestPicPerc.result.result.dataPointsFries[i];
                        cur.time = helper.roundInt(cur.time);
                        cur.originalFry = mathHelper.createDecimal(cur.fries.toString());
                    }

                    if (bestProd.result) {
                        bestProd.finalFry = farmingHelper.calcFryOutput(bestProd.result.result.totalPotatoes, bestProd.result.result.finalModifiers);
                        bestPot.finalFry = farmingHelper.calcFryOutput(bestPot.result.result.totalPotatoes, bestPot.result.result.finalModifiers);
                        bestPic.finalFry = farmingHelper.calcFryOutput(bestPic.result.result.totalPotatoes, bestPic.result.result.finalModifiers);
                        bestPicPerc.finalFry = farmingHelper.calcFryOutput(bestPicPerc.result.result.totalPotatoes, bestPicPerc.result.result.finalModifiers);

                        for (let i = 0; i < bestPic.result.plants.length; i++) {

                            bestPic.result.plants[i].created = mathHelper.createDecimal(`${bestPic.result.plants[i].created.mantissa}e${bestPic.result.plants[i].created.exponent}`);
                            bestPic.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPic.result.plants[i].totalMade.mantissa}e${bestPic.result.plants[i].totalMade.exponent}`);
                            bestPic.result.plants[i].production = mathHelper.createDecimal(`${bestPic.result.plants[i].production.mantissa}e${bestPic.result.plants[i].production.exponent}`);

                            bestPicPerc.result.plants[i].created = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].created.mantissa}e${bestPicPerc.result.plants[i].created.exponent}`);
                            bestPicPerc.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].totalMade.mantissa}e${bestPicPerc.result.plants[i].totalMade.exponent}`);
                            bestPicPerc.result.plants[i].production = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].production.mantissa}e${bestPicPerc.result.plants[i].production.exponent}`);

                            bestProd.result.plants[i].created = mathHelper.createDecimal(`${bestProd.result.plants[i].created.mantissa}e${bestProd.result.plants[i].created.exponent}`);
                            bestProd.result.plants[i].totalMade = mathHelper.createDecimal(`${bestProd.result.plants[i].totalMade.mantissa}e${bestProd.result.plants[i].totalMade.exponent}`);
                            bestProd.result.plants[i].production = mathHelper.createDecimal(`${bestProd.result.plants[i].production.mantissa}e${bestProd.result.plants[i].production.exponent}`);

                            bestPot.result.plants[i].created = mathHelper.createDecimal(`${bestPot.result.plants[i].created.mantissa}e${bestPot.result.plants[i].created.exponent}`);
                            bestPot.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPot.result.plants[i].totalMade.mantissa}e${bestPot.result.plants[i].totalMade.exponent}`);
                            bestPot.result.plants[i].production = mathHelper.createDecimal(`${bestPot.result.plants[i].production.mantissa}e${bestPot.result.plants[i].production.exponent}`);
                        }


                        let finalBests = {
                            bestProd: bestProd,
                            prod: bestProd.result.combo,
                            bestPot: bestPot,
                            pot: bestPot.result.combo,
                            bestPic: bestPic,
                            pic: bestPic.result.combo,
                            bestPicPerc: bestPicPerc,
                            picPerc: bestPicPerc.result.combo,
                            top10DataPointsPotatoes: top10DataPointsPotatoes,
                            top10DataPointsFries: top10DataPointsFries
                        }
                        console.log(`Best:`);
                        console.log(finalBests);



                        setCalcDone(true);
                        return finalBests;
                    }
                    else {
                        return currBestCombo;
                    }
                })
            }
        }

        const updateRunningBest = ({ bestProduction }) => {
            //sounded like a good idea, leads to very jerky graphs
            return;
            // setBestRunningCombo((currBestCombo) => {
            //     let bestProd = currBestCombo.prod ? currBestCombo : { prod: mathHelper.createDecimal(0) };
            //     let runningProd = { prod: mathHelper.createDecimal(bestProduction.result.potatoeProduction), result: bestProduction };


            //     if (runningProd.prod.greaterThan(bestProd.prod)) {

            //         setForceGraphUpdate(true);
            //         runningProd.prod = mathHelper.createDecimal(runningProd.prod);
            //         runningProd.result.result.potatoeProduction = mathHelper.createDecimal(runningProd.result.result.potatoeProduction);
            //         runningProd.result.result.totalPotatoes = mathHelper.createDecimal(runningProd.result.result.totalPotatoes);

            //         for (let i = 0; i < runningProd.result.result.dataPointsPotatoes.length; i++) {
            //             let cur = runningProd.result.result.dataPointsPotatoes[i];
            //             cur.originalProduction = mathHelper.createDecimal(cur.production);
            //             cur.production = mathHelper.createDecimal(cur.production);
            //             cur.time = helper.roundInt(cur.time);
            //         }


            //         return { ...currBestCombo, runningProd: runningProd };
            //     }

            //     return currBestCombo;


            //     let bestPot = { pot: mathHelper.createDecimal(0) };
            //     let bestPic = { pic: 0, prod: mathHelper.createDecimal(0) }
            //     let bestPicPerc = { pic: 0, prod: mathHelper.createDecimal(0) }

            //     let top10DataPointsPotatoes = [];
            //     let top10DataPointsFries = [];

            //     for (let i = 0; i < farmTotals.current.length; i++) {
            //         let cur = farmTotals.current[i];


            //         if (!cur.totalPotCombo.result) {
            //             continue;
            //         }


            //         //Have to reset potatoe values again
            //         cur.bestPicCombo.potatoeProduction = cur.bestPicCombo.potatoeProduction ? mathHelper.createDecimal(cur.bestPicCombo.potatoeProduction) : cur.bestPicCombo.potatoeProduction;
            //         cur.bestPicCombo.result.potatoeProduction = cur.bestPicCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestPicCombo.result.potatoeProduction) : cur.bestPicCombo.result.potatoeProduction;
            //         cur.bestPicCombo.result.totalPotatoes = cur.bestPicCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestPicCombo.result.totalPotatoes) : cur.bestPicCombo.result.totalPotatoes;
            //         cur.bestPICPercCombo.potatoeProduction = cur.bestPICPercCombo.potatoeProduction ? mathHelper.createDecimal(cur.bestPICPercCombo.potatoeProduction) : cur.bestPICPercCombo.potatoeProduction;
            //         cur.bestPICPercCombo.result.potatoeProduction = cur.bestPICPercCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestPICPercCombo.result.potatoeProduction) : cur.bestPICPercCombo.result.potatoeProduction;
            //         cur.bestPICPercCombo.result.totalPotatoes = cur.bestPICPercCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestPICPercCombo.result.totalPotatoes) : cur.bestPICPercCombo.result.totalPotatoes;
            //         cur.bestProdCombo.result.potatoeProduction = cur.bestProdCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.bestProdCombo.result.potatoeProduction) : cur.bestProdCombo.result.potatoeProduction;
            //         cur.bestProdCombo.result.totalPotatoes = cur.bestProdCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.bestProdCombo.result.totalPotatoes) : cur.bestProdCombo.result.totalPotatoes;
            //         cur.totalPotCombo.result.totalPotatoes = cur.totalPotCombo.result.totalPotatoes ? mathHelper.createDecimal(cur.totalPotCombo.result.totalPotatoes) : cur.totalPotCombo.result.totalPotatoes;
            //         cur.totalPotCombo.result.potatoeProduction = cur.totalPotCombo.result.potatoeProduction ? mathHelper.createDecimal(cur.totalPotCombo.result.potatoeProduction) : cur.totalPotCombo.result.potatoeProduction;



            //         for (let j = 0; j < cur.top10DataPointsPotatoes.length; j++) {

            //             let cur_top = cur.top10DataPointsPotatoes[j];
            //             cur_top.result = mathHelper.createDecimal(cur_top.result);

            //             for (let k = 0; k < cur_top.data.length; k++) {
            //                 let cur_data = cur_top.data[k];
            //                 cur_data.production = mathHelper.createDecimal(cur_data.production);
            //                 cur_data.time = helper.roundInt(cur_data.time);
            //             }
            //         }

            //         for (let j = 0; j < cur.top10DataPointsFries.length; j++) {

            //             let cur_top = cur.top10DataPointsFries[j];
            //             cur_top.result = mathHelper.createDecimal(cur_top.result);

            //             for (let k = 0; k < cur_top.data.length; k++) {
            //                 let cur_data = cur_top.data[k];
            //                 cur_data.fries = mathHelper.createDecimal(cur_data.fries);
            //                 cur_data.time = helper.roundInt(cur_data.time);
            //             }
            //         }


            //         for (let j = 0; j < cur.bestPicCombo.result.dataPointsPotatoes.length; j++) {
            //             let cur_data = cur.bestPicCombo.result.dataPointsPotatoes[j];
            //             cur_data.production = mathHelper.createDecimal(cur_data.production);
            //             cur_data.time = helper.roundInt(cur_data.time);
            //         }
            //         for (let j = 0; j < cur.bestPicCombo.result.dataPointsFries.length; j++) {
            //             let cur_data = cur.bestPicCombo.result.dataPointsFries[j];
            //             cur_data.fries = mathHelper.createDecimal(cur_data.fries);
            //             cur_data.time = helper.roundInt(cur_data.time);
            //         }
            //         for (let j = 0; j < cur.bestPICPercCombo.result.dataPointsPotatoes.length; j++) {
            //             let cur_data = cur.bestPICPercCombo.result.dataPointsPotatoes[j];
            //             cur_data.production = mathHelper.createDecimal(cur_data.production);
            //             cur_data.time = helper.roundInt(cur_data.time);
            //         }
            //         for (let j = 0; j < cur.bestPICPercCombo.result.dataPointsFries.length; j++) {
            //             let cur_data = cur.bestPICPercCombo.result.dataPointsFries[j];
            //             cur_data.fries = mathHelper.createDecimal(cur_data.fries);
            //             cur_data.time = helper.roundInt(cur_data.time);
            //         }


            //         top10DataPointsPotatoes.push(...cur.top10DataPointsPotatoes);
            //         top10DataPointsFries.push(...cur.top10DataPointsFries);
            //         if (cur.bestPicCombo.picGain > bestPic.pic) {
            //             bestPic = { pic: cur.bestPicCombo.picGain, result: cur.bestPicCombo, prod: cur.bestPicCombo.potatoeProduction }
            //         }
            //         else if (cur.bestPicCombo.picGain === bestPic.pic) {
            //             if (cur.bestPicCombo.potatoeProduction.greaterThan(bestPic.prod)) {
            //                 bestPic = { pic: cur.bestPicCombo.picGain, result: cur.bestPicCombo, prod: cur.bestPicCombo.potatoeProduction }
            //             }
            //         }

            //         if (cur.bestPICPercCombo.picGain > bestPicPerc.pic) {
            //             bestPicPerc = { pic: cur.bestPICPercCombo.picGain, result: cur.bestPICPercCombo, prod: cur.bestPICPercCombo.potatoeProduction }
            //         }
            //         else if (cur.bestPICPercCombo.picGain === bestPicPerc.pic) {
            //             if (cur.bestPICPercCombo.potatoeProduction.greaterThan(bestPicPerc.prod)) {
            //                 bestPicPerc = { pic: cur.bestPICPercCombo.picGain, result: cur.bestPICPercCombo, prod: cur.bestPICPercCombo.potatoeProduction }
            //             }
            //         }


            //         if (cur.bestProdCombo.result.potatoeProduction.greaterThan(bestProd.prod)) {
            //             bestProd = { prod: cur.bestProdCombo.result.potatoeProduction, result: cur.bestProdCombo }

            //         }
            //         if (cur.totalPotCombo.result.totalPotatoes.greaterThan(bestPot.pot)) {
            //             bestPot = { pot: cur.totalPotCombo.result.totalPotatoes, result: cur.totalPotCombo }
            //         }

            //         for (let j = 0; j < cur.top10DataPointsPotatoes.length; j++) {
            //             cur.top10DataPointsPotatoes[j].obj = cur.totalPotCombo;
            //         }

            //     }

            //     top10DataPointsPotatoes = top10DataPointsPotatoes.sort((a, b) => b.result.compare(a.result)).slice(0, 10);
            //     top10DataPointsFries = top10DataPointsFries.sort((a, b) => b.result.compare(a.result)).slice(0, 10);
            //     // top10DataPointsFries =[]


            //     for (let i = 0; i < top10DataPointsPotatoes.length; i++) {

            //         let cur = top10DataPointsPotatoes[i];
            //         for (let j = 0; j < cur.data.length; j++) {
            //             cur.data[j].time = helper.roundInt(cur.data[j].time);
            //             cur.data[j].originalProduction = mathHelper.createDecimal(cur.data[j].production.toString());
            //         }
            //     }

            //     for (let i = 0; i < bestPic.result.result.dataPointsPotatoes.length; i++) {
            //         let cur = bestPic.result.result.dataPointsPotatoes[i];
            //         cur.time = helper.roundInt(cur.time);
            //         cur.originalProduction = mathHelper.createDecimal(cur.production.toString());
            //     }
            //     for (let i = 0; i < bestPicPerc.result.result.dataPointsPotatoes.length; i++) {
            //         let cur = bestPicPerc.result.result.dataPointsPotatoes[i];
            //         cur.time = helper.roundInt(cur.time);
            //         cur.originalProduction = mathHelper.createDecimal(cur.production.toString());
            //     }

            //     if (bestProd.result) {
            //         bestProd.finalFry = farmingHelper.calcFryOutput(bestProd.result.result.totalPotatoes);
            //         bestPot.finalFry = farmingHelper.calcFryOutput(bestPot.result.result.totalPotatoes);
            //         bestPic.finalFry = farmingHelper.calcFryOutput(bestPic.result.result.totalPotatoes);
            //         bestPicPerc.finalFry = farmingHelper.calcFryOutput(bestPicPerc.result.result.totalPotatoes);

            //         for (let i = 0; i < bestPic.result.plants.length; i++) {

            //             bestPic.result.plants[i].created = mathHelper.createDecimal(`${bestPic.result.plants[i].created.mantissa}e${bestPic.result.plants[i].created.exponent}`);
            //             bestPic.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPic.result.plants[i].totalMade.mantissa}e${bestPic.result.plants[i].totalMade.exponent}`);
            //             bestPic.result.plants[i].production = mathHelper.createDecimal(`${bestPic.result.plants[i].production.mantissa}e${bestPic.result.plants[i].production.exponent}`);

            //             bestPicPerc.result.plants[i].created = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].created.mantissa}e${bestPicPerc.result.plants[i].created.exponent}`);
            //             bestPicPerc.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].totalMade.mantissa}e${bestPicPerc.result.plants[i].totalMade.exponent}`);
            //             bestPicPerc.result.plants[i].production = mathHelper.createDecimal(`${bestPicPerc.result.plants[i].production.mantissa}e${bestPicPerc.result.plants[i].production.exponent}`);

            //             bestProd.result.plants[i].created = mathHelper.createDecimal(`${bestProd.result.plants[i].created.mantissa}e${bestProd.result.plants[i].created.exponent}`);
            //             bestProd.result.plants[i].totalMade = mathHelper.createDecimal(`${bestProd.result.plants[i].totalMade.mantissa}e${bestProd.result.plants[i].totalMade.exponent}`);
            //             bestProd.result.plants[i].production = mathHelper.createDecimal(`${bestProd.result.plants[i].production.mantissa}e${bestProd.result.plants[i].production.exponent}`);

            //             bestPot.result.plants[i].created = mathHelper.createDecimal(`${bestPot.result.plants[i].created.mantissa}e${bestPot.result.plants[i].created.exponent}`);
            //             bestPot.result.plants[i].totalMade = mathHelper.createDecimal(`${bestPot.result.plants[i].totalMade.mantissa}e${bestPot.result.plants[i].totalMade.exponent}`);
            //             bestPot.result.plants[i].production = mathHelper.createDecimal(`${bestPot.result.plants[i].production.mantissa}e${bestPot.result.plants[i].production.exponent}`);
            //         }


            //         let finalBests = {
            //             bestProd: bestProd,
            //             prod: bestProd.result.combo,
            //             bestPot: bestPot,
            //             pot: bestPot.result.combo,
            //             bestPic: bestPic,
            //             pic: bestPic.result.combo,
            //             bestPicPerc: bestPicPerc,
            //             picPerc: bestPicPerc.result.combo,
            //             top10DataPointsPotatoes: top10DataPointsPotatoes,
            //             top10DataPointsFries: top10DataPointsFries
            //         }
            //         console.log(`Best:`);
            //         console.log(finalBests);



            //         setCalcDone(true);
            //         return finalBests;
            //     }
            // })

        }


        FarmerWorker.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker1.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker2.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker3.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker4.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker5.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker6.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker7.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker8.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker9.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker10.current = new Worker(new URL('./farmingWorker.js', import.meta.url))
        FarmerWorker11.current = new Worker(new URL('./farmingWorker.js', import.meta.url))


        FarmerWorker.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }
            console.log(`get sm back`)
            farmCalcStarted.current[0] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker1.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    // console.log(`sm1 adding: ${response.updateAmount}`)
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }
            console.log(`get sm1 back`)
            farmCalcStarted.current[1] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker2.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }
            console.log(`get sm2 back`)
            farmCalcStarted.current[2] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker3.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm3 back`)
            farmCalcStarted.current[3] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker4.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm4 back`)
            farmCalcStarted.current[4] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker5.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm5 back`)
            farmCalcStarted.current[5] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker6.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm6 back`)
            farmCalcStarted.current[6] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker7.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm7 back`)
            farmCalcStarted.current[7] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker8.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm8 back`)
            farmCalcStarted.current[8] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker9.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm9 back`)
            farmCalcStarted.current[9] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker10.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm10 back`)
            farmCalcStarted.current[10] = false;
            farmTotals.current.push(response);
            findBest();
        })
        FarmerWorker11.current.addEventListener('message', (event) => {
            let response = event.data;
            if (response.update) {
                if (response.temp) {
                    updateRunningBest({ bestProduction: response.temp })
                }
                return setFarmCalcProgress((curr) => {
                    let newAmount = { ...curr };
                    // newAmount.current++;
                    // return newAmount;
                    newAmount.current += response.updateAmount;
                    return newAmount;
                })
            }

            console.log(`get sm11 back`)
            farmCalcStarted.current[11] = false;
            farmTotals.current.push(response);
            findBest();
        })


        //Clean up on unmounts
        return () => {
            FarmerWorker.current.terminate();
            FarmerWorker1.current.terminate();
            FarmerWorker2.current.terminate();
            FarmerWorker3.current.terminate();
            FarmerWorker4.current.terminate();
            FarmerWorker5.current.terminate();
            FarmerWorker6.current.terminate();
            FarmerWorker7.current.terminate();
            FarmerWorker8.current.terminate();
            FarmerWorker9.current.terminate();
            FarmerWorker10.current.terminate();
            FarmerWorker11.current.terminate();
        }
    }, [])

    let notEnoughAuto = false;

    if (lockCustomAuto) {
        let tempTotal = 0
        for (let i = 0; i < finalPlants.length; i++) {
            tempTotal += plantAutosClient[i];
        }
        if (tempTotal > numSimulatedAutos) {
            ReactGA.event({
                category: "farming_interaction",
                action: `not_enough_autos`,
                label: `${tempTotal - numSimulatedAutos}`,
                value: tempTotal - numSimulatedAutos
            });
            notEnoughAuto = true;
        }
    }

    // let displayPicPerc = bestPlantCombo.pic !== bestPlantCombo.picPerc;
    let displayPicPerc = false;

    return (
        <div style={{ height: '100%', display: 'flex', flex: 1, flexDirection: 'column', paddingLeft: '6px', maxWidth: 'calc(100% - 10px)' }}>
            <div style={{
                display: 'flex', flex: 1,
                flexDirection: 'column',
                width: '100%'
            }}>
                <div
                    style={{ display: 'flex', marginLeft: '-6px' }}
                >

                    {/* Future plants */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* <FarmingPlant data={{ fake: true }} /> */}
                        {customFuturePlants.map((plant, index) => {
                            return <FarmingPlant key={'future' + index} data={
                                {
                                    setPlantAutos: setPlantAutos, plantAutos: plantAutosClient,
                                    plant: plant,
                                    index: index,
                                    customMultipliers: customMultipliers,
                                    setCustomMultipliers: setCustomMultipliers,
                                    allowSetMultipliers: false,
                                    useFutureValues: true,
                                    modifiers: modifiers
                                }
                            } />
                        }
                        )}


                    </div>
                </div>






                <div style={{
                    display: 'flex', width: '100%',
                    flex: 1,
                    margin: '18px 0 0 0'
                    // backgroundColor: 'yellow'
                    // height: '100%'
                    //  height: '-webkit-fill-available' 
                }}>
                    <div
                        style={{
                            color: 'black', width: '650px', display: 'flex', flexDirection: 'column',
                        }}
                    >


                        {/* timer + buttons */}
                        <div
                            style={{ display: 'flex', width: '100%', alignItems: 'center' }}
                        >

                            {/* hours, autos, max, clear */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '1px 25px 0 0',
                                height: '116px',
                                border: '2px solid purple',
                                borderRadius: '5px',
                                padding: '3px'
                                // flex: '1',
                                // flexDirection: 'column',
                                //  width: '172px'
                            }}>

                                <div
                                    style={{ display: 'flex', flexDirection: 'column', width: '298px' }}
                                >

                                    {/* Hours to calc */}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <MouseOverPopover tooltip={
                                            <div>
                                                How many hours into the future to calculate for each plant
                                            </div>
                                        }>
                                            <div
                                                style={{ width: '135px' }}
                                            >
                                                Hours to calculate
                                            </div>

                                        </MouseOverPopover>

                                        <input
                                            style={{
                                                marginLeft: '6px',
                                                width: '48px'
                                                // , WebkitAppearance: 'none' 
                                            }}
                                            type='number'
                                            className='prepNumber'
                                            value={futureTime}
                                            onChange={
                                                (e) => {
                                                    try {
                                                        let x = Number(e.target.value);
                                                        // x = Math.floor(x);
                                                        if (x < 0.01 || x > 99999999) {
                                                            return;
                                                        }
                                                        setFutureTime(x);

                                                        ReactGA.event({
                                                            category: "farming_interaction",
                                                            action: `changed_futureHours`,
                                                            label: `${x}`,
                                                            value: x
                                                        })

                                                    }
                                                    catch (err) {
                                                        console.log(err);
                                                    }
                                                }}
                                            placeholder={futureTime + ''}
                                            min="0.01"
                                            max="99999999"
                                        />
                                    </div>

                                    {/* Max autos */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', width: '100%'
                                    }}>
                                        <MouseOverPopover tooltip={
                                            <div>
                                                How many autos to consider for calculations as the max
                                            </div>
                                        }>
                                            <div
                                                style={{ width: '135px' }}
                                            >Unlocked Autos</div>
                                        </MouseOverPopover>

                                        <input
                                            style={{
                                                width: '48px',
                                                marginLeft: '6px'
                                                // , WebkitAppearance: 'none' 
                                            }}
                                            type='number'
                                            className='prepNumber'
                                            value={numSimulatedAutos}
                                            onChange={
                                                (e) => {
                                                    try {
                                                        let x = Number(e.target.value);
                                                        // x = Math.floor(x);
                                                        if (x < 0 || x > 12) {
                                                            return;
                                                        }
                                                        setNumSimulatedAutos(x);

                                                        ReactGA.event({
                                                            category: "farming_interaction",
                                                            action: `changed_maxAutos`,
                                                            label: `${x}`,
                                                            value: x
                                                        })

                                                    }
                                                    catch (err) {
                                                        console.log(err);
                                                    }
                                                }}
                                            placeholder={numSimulatedAutos + ''}
                                            min="1"
                                            max="12"
                                        />
                                    </div>
                                </div>


                                <div
                                    style={{ display: 'flex', marginTop: '4px', }}
                                >
                                    {/* Max all autos */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center',
                                        margin: '0 12px 0 0'
                                    }}>
                                        {/* <div>Max All Autos</div> */}
                                        <button onClick={(e) => {
                                            let temp = Array(20).fill(numSimulatedAutos);
                                            setPlantAutos(temp);
                                            ReactGA.event({
                                                category: "farming_interaction",
                                                action: `max_auto`,
                                                label: `max_auto`,
                                            })
                                        }}>Max Autos</button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {/* <div>Clear All Autos</div> */}
                                        <button onClick={(e) => {
                                            let temp = Array(20).fill(0);
                                            setPlantAutos(temp);
                                            ReactGA.event({
                                                category: "farming_interaction",
                                                action: `clear_auto`,
                                                label: `clear_auto`,
                                            })
                                        }}>Clear Autos</button>
                                    </div>
                                </div>
                                {/* Show HP + Fry */}
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '160px' }}>Show Fries On Graph</div>
                                        <input type="checkbox" checked={showFries}
                                            id="enable display of fries on the graph"
                                            onChange={(e) => {
                                                setShowFries(e.target.checked ? 1 : 0);
                                                ReactGA.event({
                                                    category: "farming_interaction",
                                                    action: `changed_show_fry`,
                                                    label: `${e.target.checked}`,
                                                })
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '' }}>
                                        <div style={{ width: '160px' }}>Show HP On Graph</div>
                                        <input type="checkbox" checked={showHP}
                                            id="enable display of HP on the graph"
                                            onChange={(e) => {
                                                setShowHP(e.target.checked ? 1 : 0);
                                                ReactGA.event({
                                                    category: "farming_interaction",
                                                    action: `changed_show_HP`,
                                                    label: `${e.target.checked}`,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Calc buttons */}
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                // border: '1px solid black',
                                border: '2px solid purple',
                                borderRadius: '5px',
                                padding: '6px', marginRight: '12px',
                                width: 'calc(100% - 308px)',
                                minHeight: '110px',
                                justifyContent: 'space-between'
                            }}>
                                <MouseOverPopover tooltip={
                                    <div style={{ padding: '6px' }}>
                                        Calculates the best auto distribution for desired time into the future
                                    </div>
                                }>
                                    <div
                                        style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', marginBottom: '3px', marginTop: '-3px' }}
                                    >
                                        Calculate best auto placements
                                    </div>
                                </MouseOverPopover>

                                {/* Calc Start buttons */}
                                <div style={{ display: 'flex', flex: '1' }}>
                                    <div style={{
                                        maxWidth: '50%', margin: '0',
                                        border: notEnoughAuto ? '1px solid black' : '',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <button
                                            disabled={notEnoughAuto || !calcDone}
                                            onClick={(e) => {
                                                setCalcDone(false);
                                                setCalcedFutureTime(futureTime);
                                                console.log(`Time start: ` + (new Date()).getTime())
                                                ReactGA.event({
                                                    category: "farming_interaction",
                                                    action: `clicked_optomise_auto`,
                                                    label: `${futureTime}`,
                                                    value: futureTime
                                                })

                                                let combinations = generateCombinations(numSimulatedAutos, finalPlants.length);
                                                setCalcAFK(true);
                                                setCalcStep(false);
                                                if (lockCustomAuto) {
                                                    let finalCombo = [];
                                                    for (let i = 0; i < combinations.length; i++) {
                                                        let curr = combinations[i];
                                                        let matches = true;
                                                        for (let j = 0; j < finalPlants.length; j++) {
                                                            //Meaning there is not enough assigned to match user's preference
                                                            if (plantAutosClient[j] > curr[j]) {
                                                                matches = false;
                                                                break;
                                                            }
                                                        }
                                                        if (matches) {
                                                            finalCombo.push(curr);
                                                        }
                                                    }
                                                    combinations = finalCombo;
                                                }

                                                // const combinations = generateCombinations(3, finalPlants.length);
                                                let splitArraysIndicies = splitArrayIndices(combinations, numThreads);
                                                if (combinations.length < numThreads) {
                                                    splitArraysIndicies = Array(numThreads).fill([]);
                                                    splitArraysIndicies[0] = [0, combinations.length - 1];
                                                }
                                                farmTotals.current = [];
                                                setFarmCalcProgress((cur) => {
                                                    let temp = { ...cur };
                                                    temp.max = combinations.length;
                                                    temp.current = 0;
                                                    return temp;
                                                })
                                                for (let i = 0; i < numThreads; i++) {
                                                    if (farmCalcStarted.current[i]) {
                                                        continue;
                                                    }

                                                    if (splitArraysIndicies[i].length === 0) continue;

                                                    let worker = workers[i];
                                                    worker.current.postMessage({
                                                        data: {
                                                            combinations: combinations,
                                                            start: splitArraysIndicies[i][0],
                                                            end: splitArraysIndicies[i][1],
                                                            time: futureTime,
                                                            modifiers: { ...modifiers, },
                                                            finalPlants: finalPlants,
                                                            mode: 'afk',
                                                        },
                                                        id: i
                                                    })
                                                    farmCalcStarted.current[i] = true;
                                                }
                                            }}>Calculate AFK
                                        </button>
                                        {notEnoughAuto && (
                                            <div>
                                                Not enough autos remaining!
                                            </div>
                                        )}
                                    </div>


                                    <div style={{
                                        maxWidth: '50%', margin: '0 6px',
                                        border: futureTime < 1 ? '1px solid black' : '',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <button

                                            disabled={futureTime < 1 || !calcDone}
                                            onClick={(e) => {
                                                setCalcDone(false);
                                                setCalcedFutureTime(futureTime);
                                                console.log(`Time start: ` + (new Date()).getTime())
                                                ReactGA.event({
                                                    category: "farming_interaction",
                                                    action: `clicked_optomise_step`,
                                                    label: `${futureTime}`,
                                                    value: futureTime
                                                })

                                                setCalcAFK(false);
                                                setCalcStep(true);


                                                let min = 0.92;
                                                let max = secondsHour * futureTime;
                                                let step_max = 0.009 * finalPlants.length;

                                                let nums = [];
                                                let red = Math.floor(step_max * max);
                                                for (let i = 0; i < finalPlants.length; i++) {
                                                    let timer = farmingHelper.calcGrowthTime(finalPlants[i], modifiers);
                                                    if (timer < red) {
                                                        timer = red;
                                                    }
                                                    nums.push(timer);
                                                }

                                                nums.reverse();
                                                let combinations = farmingHelper.findMultipliersWithMinPercentage(max, nums, min);

                                                console.log(`num combinations: ${combinations.length}`);
                                                let splitArraysIndicies = splitArrayIndices(combinations, numThreads);
                                                if (combinations.length < numThreads) {
                                                    splitArraysIndicies = Array(12).fill([]);
                                                    splitArraysIndicies[0] = [0, combinations.length - 1];
                                                }
                                                farmTotals.current = [];
                                                setFarmCalcProgress((cur) => {
                                                    let temp = { ...cur };
                                                    temp.max = combinations.length;
                                                    temp.current = 0;
                                                    return temp;
                                                })

                                                for (let i = 0; i < numThreads; i++) {
                                                    if (farmCalcStarted.current[i]) {
                                                        continue;
                                                    }
                                                    if (splitArraysIndicies[i].length === 0) continue;
                                                    let worker = workers[i];
                                                    worker.current.postMessage({
                                                        data: {
                                                            baseTimers: nums,
                                                            combinations: combinations,
                                                            start: splitArraysIndicies[i][0],
                                                            end: splitArraysIndicies[i][1],
                                                            time: futureTime,
                                                            modifiers: { ...modifiers, },
                                                            finalPlants: finalPlants,
                                                            mode: 'step',
                                                            numSimulatedAutos: numSimulatedAutos
                                                        },
                                                        id: i
                                                    })
                                                    farmCalcStarted.current[i] = true;
                                                }


                                            }}>Calculate Step</button>
                                        {futureTime < 1 && (
                                            <div>
                                                Minimum 1 future hour!
                                            </div>
                                        )}
                                    </div>
                                    {(farmCalcProgress.current > 0) && (
                                        <div>
                                            {`${helper.roundTwoDecimal(farmCalcProgress.current / farmCalcProgress.max * 100)}%`}
                                        </div>
                                    )}
                                </div>


                                <div
                                    style={{
                                        marginTop: '6px'
                                    }}
                                >
                                    {`Last run time: ${timeCompleted ? timeCompleted.toLocaleString() : 'N/A'}`}
                                </div>

                            </div>

                        </div>

                        {/* Various settings */}
                        <div style={{ display: 'flex', margin: '12px 0 0 0' }}>

                            <div
                                style={{ border: '1px solid black', padding: '3px', width: '345px' }}
                            >



                                <div style={{ display: 'flex' }}>

                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            How many parallel simulations to run, higher number means more CPU usage but quicker result (diminishing returns with more threads)
                                        </div>
                                    }>
                                        <div>
                                            Num threads to use for calculating
                                        </div>
                                    </MouseOverPopover>



                                    <select
                                        style={{ maxWidth: '144px', marginLeft: '12px' }}
                                        onChange={
                                            (e) => {
                                                setNumThreads(Number(e.target.value));
                                                ReactGA.event({
                                                    category: "farming_interaction",
                                                    action: `changed_num_threads`,
                                                    label: `${e.target.value}`,
                                                    value: Number(e.target.value)
                                                })
                                            }
                                        }
                                        value={numThreads + ''}
                                    >
                                        <option id="1 thread calculation" value="1">1</option>
                                        <option id="2 thread calculations" value="2">2</option>
                                        <option id="3 thread calculations" value="3">3</option>
                                        <option id="4 thread calculations" value="4">4</option>
                                        <option id="5 thread calculations" value="5">5</option>
                                        <option id="6 thread calculations" value="6">6</option>
                                        <option id="7 thread calculations" value="7">7</option>
                                        <option id="8 thread calculations" value="8">8</option>
                                        <option id="9 thread calculations" value="9">9</option>
                                        <option id="10 thread calculations" value="10">10</option>
                                        <option id="11 thread calculations" value="11">11</option>
                                        <option id="12 thread calculations" value="12">12</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex' }}>

                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            Whether the simulation should automatically buy Farming Shop page 1 (Plant Boost Corner) upgrades. (This is an ascencion perk)
                                        </div>
                                    }>
                                        <div>
                                            Auto purchase Page 1 (PBC)
                                        </div>
                                    </MouseOverPopover>


                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            setAutoBuyPBC(e.target.checked ? 1 : 0);
                                            ReactGA.event({
                                                category: "farming_interaction",
                                                action: `changed_auto_pbc`,
                                                label: `${e.target.checked}`,
                                            })
                                        }}
                                        id="enable auto purchase of page 1 upgrades"
                                        checked={!!autoBuyPBC}
                                        value={!!autoBuyPBC}
                                    />
                                </div>
                                {/* Lock in checkbox */}
                                <div style={{ display: 'flex' }}>

                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            If checked, generates only possible auto distributions from your `Num Autos` selected above. If there are more autos assigned than you have purchased, then it will be disabled
                                        </div>
                                    }>
                                        <div>
                                            Lock in above `Num Autos`
                                        </div>
                                    </MouseOverPopover>


                                    <input
                                        type="checkbox"
                                        id="enable forcing of minimum number of autos per plant"
                                        onChange={(e) => {
                                            setLockCustomAuto(e.target.checked ? 1 : 0);
                                            ReactGA.event({
                                                category: "farming_interaction",
                                                action: `changed_lock_auto`,
                                                label: `${e.target.checked}`,
                                            })
                                        }}
                                        checked={!!lockCustomAuto}
                                        value={!!lockCustomAuto}
                                    />
                                </div>
                                {/* Ignore current potion, force it always on */}
                                <div style={{ display: 'flex' }}>

                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            If checked, assums plant rank EXP + 50% for the whole run, otherwise uses the remaining potion time in your save
                                        </div>
                                    }>
                                        <div>
                                            Plant Rank Potion Force On
                                        </div>
                                    </MouseOverPopover>


                                    <input

                                        id="enable plant potion considered on entire run"
                                        type="checkbox"
                                        onChange={(e) => {
                                            setForceRankPotion(e.target.checked ? 1 : 0);
                                            ReactGA.event({
                                                category: "farming_interaction",
                                                action: `changed_potion_rank`,
                                                label: `${e.target.checked}`,
                                            })
                                        }}
                                        checked={!!forceRankPotion}
                                        value={!!forceRankPotion}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ marginRight: '6px' }}>
                                        Y-Axis Scale
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            setYScale(yScale === 'auto' ? `Log` : 'auto')
                                        }}
                                    >
                                        {yScale === 'Log' ? `Log` : 'Linear'}
                                    </button>

                                </div>
                            </div>


                            {/* Timer Stuff */}
                            <div
                                style={{
                                    margin: '0 12px 0 24px', border: '1px solid black', padding: '3px',
                                    width: 'calc(100% - 308px)',

                                }}
                            >
                                <h3
                                    style={{
                                        marginBottom: '6px',
                                        marginTop: '0',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    Timer
                                </h3>
                                <div>
                                    <Timer timeCompleted={timeCompleted} />
                                </div>
                            </div>
                        </div>

                        {/* Explanation */}
                        < div style={{ display: 'flex', width: '100%', marginTop: '12px', flexDirection: 'column' }}>

                            <h3 style={{ margin: '0' }}>How to use</h3>
                            <div
                                style={{ display: 'flex' }}>
                                <div style={{ fontWeight: 'bold', marginRight: '12px' }}>
                                    Quickstart:
                                </div>
                                Enter how many hours you want to simulate into the future above (Hours to calculate). This should coincide with how long you want your overall run to be. So if you are 12 hours into a 48 hour run, enter 36hours.
                            </div>
                            <div style={{ marginTop: '6px' }} >
                                <div className='outerExplanation'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='explanationLeft'>
                                            <div className="dot" ></div>
                                            <div className='innerExplanationShort'>
                                                Hours to calculate
                                            </div>
                                        </div>
                                        <div className='explanationInner'>
                                            how far into the future to calculate best auto distributions, as well as future PIC/Levels for plants
                                        </div>
                                    </div>
                                </div>
                                <div className='outerExplanation'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='explanationLeft'>
                                            <div className="dot" ></div>
                                            <div className='innerExplanationShort'>
                                                Calculate best auto placements
                                            </div>
                                        </div>
                                        <div className='explanationInner'>
                                            <div>
                                                Calculate AFK: Best `set-and-forget` distibution
                                            </div>
                                            <div>
                                                Calculate Step: Best possible timing switches of each plant (much more active)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='outerExplanation'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='explanationLeft'>
                                            <div className="dot" ></div>
                                            <div className='innerExplanationShort'>
                                                Num threads to use for calculating
                                            </div>
                                        </div>
                                        <div className='explanationInner'>
                                            How many parallel simulations to run, higher number means more CPU usage but quicker result (diminishing returns with more threads)
                                        </div>
                                    </div>
                                </div>
                                <div className='outerExplanation'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='explanationLeft'>
                                            <div className="dot" ></div>
                                            <div className='innerExplanationShort'>
                                                Auto purchase Page 1 Upgrades (PBC)
                                            </div>
                                        </div>
                                        <div className='explanationInner'>
                                            Whether the simulation should automatically buy Farming Shop page 1 (Plant Boost Corner) upgrades. (This is an ascencion perk)
                                        </div>
                                    </div>
                                </div>
                                <div className='outerExplanation'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className='explanationLeft'>
                                            <div className="dot" ></div>
                                            <div className='innerExplanationShort'>
                                                Lock in above `Num Autos`
                                            </div>
                                        </div>
                                        <div className='explanationInner'>
                                            If checked, generates only possible auto distributions from your `Num Autos` selected above. If there are more autos assigned than you have purchased, then it will be disabled
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >


                    </div>


                    <div style={{
                        width: 'calc(100% - 655px)',

                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        // backgroundColor: 'red',
                        // height: '-webkit-fill-available'
                    }}>

                        {(farmCalcProgress.current === farmCalcProgress.max && farmCalcProgress.current !== 0 && bestPlantCombo.prod && calcDone) && (
                            <>
                                {/* best potato */}
                                {calcAFK && (
                                    <div className='calcResult'>
                                        <>
                                            <div style={{ display: 'flex' }}>
                                                {/* style={{ marginRight: '24px', display: 'flex', alignItems: 'center' }}> */}
                                                <div style={{
                                                    minWidth: '270px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-end',
                                                    marginRight: '2px'
                                                }}>
                                                    <div className='calcInfo'
                                                        style={{
                                                            margin: '-24px 0 16px 0'
                                                        }}
                                                    >
                                                        <div>
                                                            Best Potatoe Generation, {`${100}% Fries`}:
                                                        </div>
                                                    </div>
                                                    <div className='futurePicExplanation'>
                                                        <div>
                                                            Next PIC after {calcedFutureTime} hours + x hours
                                                        </div>
                                                        <div>
                                                            with {numSimulatedAutos} autos per plant
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* sadsd */}
                                                {bestPlantCombo.pot.map((val, index) => {
                                                    return (
                                                        <div className='suggestionHolder' key={index}>
                                                            <MouseOverPopover extraClasses={'suggestionHolder'} key={'popover' + index} tooltip={
                                                                <div>
                                                                    <div>
                                                                        <div>
                                                                            Show how many PIC levels are gained (if any) and the time to hit the NEXT pic with your MAX num autos used
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }>

                                                                <div className='autoPicSuggestion'>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        {`P${index + 1}: ${val} autos`}
                                                                    </div>
                                                                    {bestPlantCombo.bestPot.result.plants[index].picIncrease > 0 && (
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 0 -2px -3px',
                                                                                    fontSize: '22px'
                                                                                }}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 2px -2px 0',
                                                                                    fontSize: '22px',
                                                                                    display: 'flex',
                                                                                    alignContent: 'center'
                                                                                }}
                                                                            >
                                                                                {
                                                                                    (bestPlantCombo.bestPot.result.plants[index].prestige + bestPlantCombo.bestPot.result.plants[index].picIncrease)
                                                                                    - bestPlantCombo.bestPot.result.plants[index].prestige
                                                                                }
                                                                            </div>
                                                                            {/* <img
                                                                             style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}
                                                                             alt='prestige star, yellow star in a red/orange circle'
                                                                            
                                                                             src={PrestigeStar}
                                                                            /> */}
                                                                            <div style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}>
                                                                                <Image
                                                                                    alt='prestige star, yellow star in a red/orange circle'
                                                                                    fill
                                                                                    src={PrestigeStar}
                                                                                    unoptimized={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className='futurePicHolder'>
                                                                    {`${helper.secondsToString(farmingHelper.calcTimeTillPrestige(
                                                                        bestPlantCombo.bestPot.result.plants[index],
                                                                        {
                                                                            ...bestPlantCombo.bestPot.result.result.finalModifiers,
                                                                            // numAuto: bestPlantCombo.bestPic.result.combo[index]
                                                                            numAuto: numSimulatedAutos
                                                                        }
                                                                    ).remainingTime)
                                                                        }`}
                                                                </div>
                                                            </MouseOverPopover>
                                                        </div>
                                                    )
                                                }).reverse()}


                                            </div>
                                            {/* best raw pic levels */}
                                            <div style={{
                                                display: 'flex',
                                                marginTop: '-6px',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{ minWidth: '270px', marginRight: '2px' }}>
                                                    <div className='calcInfo' >
                                                        <div>
                                                            Most PIC (+{`${bestPlantCombo.bestPic.result.picStats.picLevel} -> ${helper.roundTwoDecimal(bestPlantCombo.bestPic.result.picStats.picPercent * 100)}%`})
                                                        </div>
                                                        <div>
                                                            {` ${helper.roundTwoDecimal(
                                                                mathHelper.divideDecimal(bestPlantCombo.bestPic.finalFry, bestPlantCombo.bestProd.finalFry).toNumber()
                                                                * 100)
                                                                }% Fries`}
                                                        </div>
                                                    </div>
                                                    <div className='futurePicExplanation'>
                                                        <div>
                                                            Next PIC after {calcedFutureTime} hours + x hours
                                                        </div>
                                                        <div>
                                                            with {numSimulatedAutos} autos per plant
                                                        </div>
                                                    </div>
                                                </div>
                                                {bestPlantCombo.pic.map((val, index) => {
                                                    return (
                                                        <div className='suggestionHolder' key={index}>
                                                            <MouseOverPopover extraClasses={'suggestionHolder'} key={'popover' + index} tooltip={
                                                                <div>
                                                                    <div>
                                                                        <div>
                                                                            Show how many PIC levels are gained (if any) and the time to hit the NEXT pic with your MAX num autos used
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }>

                                                                <div className='autoPicSuggestion'>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        {`P${index + 1}: ${val} autos`}
                                                                    </div>
                                                                    {bestPlantCombo.bestPic.result.plants[index].picIncrease > 0 && (
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 0 -2px -3px',
                                                                                    fontSize: '22px'
                                                                                }}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 2px -2px 0',
                                                                                    fontSize: '22px',
                                                                                    display: 'flex',
                                                                                    alignContent: 'center'
                                                                                }}
                                                                            >
                                                                                {
                                                                                    (bestPlantCombo.bestPic.result.plants[index].prestige + bestPlantCombo.bestPic.result.plants[index].picIncrease)
                                                                                    - bestPlantCombo.bestPic.result.plants[index].prestige
                                                                                }
                                                                            </div>
                                                                            {/* <img 
                                                                            alt='prestige star, yellow star in a red/orange circle'
                                                                            src={PrestigeStar}
                                                                            style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}
                                                                            /> */}
                                                                            <div style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}>
                                                                                <Image
                                                                                    alt='prestige star, yellow star in a red/orange circle'
                                                                                    fill
                                                                                    src={PrestigeStar}
                                                                                    unoptimized={true}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    )}

                                                                </div>

                                                                <div className='futurePicHolder'>
                                                                    {`${helper.secondsToString(farmingHelper.calcTimeTillPrestige(
                                                                        bestPlantCombo.bestPic.result.plants[index],
                                                                        {
                                                                            ...bestPlantCombo.bestPic.result.result.finalModifiers,
                                                                            numAuto: numSimulatedAutos
                                                                        }
                                                                    ).remainingTime)
                                                                        }`}
                                                                </div>
                                                            </MouseOverPopover>
                                                        </div>
                                                    )
                                                }).reverse()}
                                            </div>
                                        </>
                                    </div>
                                )}


                                {/* Best step by step breakdown */}
                                {calcStep && (
                                    <div className='calcResult'>
                                        <>
                                            {/* <div style={{ display: 'flex' }}>
    
                                                    <div style={{ minWidth: '270px', display: 'flex', justifyContent: 'flex-end', marginRight: '2px' }}>Best order, 100% Fries</div>
                                                    {bestPlantCombo.bestPot.result.result.steps.map((val, index) => {
    
                                                        return <div className='bestSuggestion' >{
                                                            `P${bestPlantCombo.bestPot.result.result.steps.length - index} for ${val.time > secondsHour ? helper.secondsToString(val.time) : helper.secondsToString(val.time)}`
                                                        }</div>
    
                                                    })}
                                                </div> */}


                                            <div style={{ display: 'flex' }}>
                                                {/* style={{ marginRight: '24px', display: 'flex', alignItems: 'center' }}> */}
                                                <div style={{
                                                    minWidth: '270px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-end',
                                                    marginRight: '2px'
                                                }}>
                                                    <div className='calcInfo'
                                                        style={{
                                                            margin: '-24px 0 16px 0'
                                                        }}
                                                    >
                                                        <div>
                                                            Best order, 100% Fries
                                                        </div>
                                                    </div>
                                                    <div className='futurePicExplanation'>
                                                        <div>
                                                            Next PIC after {calcedFutureTime} hours + x hours
                                                        </div>
                                                        <div>
                                                            with {numSimulatedAutos} autos per plant
                                                        </div>
                                                    </div>
                                                </div>


                                                {bestPlantCombo.bestPot.result.result.steps.map((val, index) => {
                                                    return (
                                                        <div className='suggestionHolder' key={index}>
                                                            <MouseOverPopover extraClasses={'suggestionHolder'} key={'popover' + index} tooltip={
                                                                <div>
                                                                    <div>
                                                                        <div>
                                                                            Show how many PIC levels are gained (if any) and the time to hit the NEXT pic with your MAX num autos used
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }>

                                                                <div className='autoPicSuggestion'>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        {`P${bestPlantCombo.bestPot.result.result.steps.length - index} for ${val.time > secondsHour ? helper.secondsToString(val.time) : helper.secondsToString(val.time)}`}
                                                                    </div>
                                                                    {bestPlantCombo.bestPot.result.plants[bestPlantCombo.bestPot.result.result.steps.length - index - 1].picIncrease > 0 && (
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 0 -2px -3px',
                                                                                    fontSize: '22px'
                                                                                }}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    margin: '-6px 2px -2px 0',
                                                                                    fontSize: '22px',
                                                                                    display: 'flex',
                                                                                    alignContent: 'center'
                                                                                }}
                                                                            >
                                                                                {
                                                                                    (bestPlantCombo.bestPot.result.plants[bestPlantCombo.bestPot.result.result.steps.length - index - 1].prestige + bestPlantCombo.bestPot.result.plants[bestPlantCombo.bestPot.result.result.steps.length - index - 1].picIncrease)
                                                                                    - bestPlantCombo.bestPot.result.plants[bestPlantCombo.bestPot.result.result.steps.length - index - 1].prestige
                                                                                }
                                                                            </div>
                                                                            {/* <img 
                                                                            alt='prestige star, yellow star in a red/orange circle'
                                                                            src={PrestigeStar}
                                                                            style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}
                                                                            /> */}
                                                                            <div style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}>
                                                                                <Image
                                                                                    alt='prestige star, yellow star in a red/orange circle'
                                                                                    fill
                                                                                    src={PrestigeStar}
                                                                                    unoptimized={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className='futurePicHolder'>
                                                                    {`${helper.secondsToString(farmingHelper.calcTimeTillPrestige(
                                                                        bestPlantCombo.bestPot.result.plants[bestPlantCombo.bestPot.result.result.steps.length - index - 1],
                                                                        {
                                                                            ...bestPlantCombo.bestPot.result.result.finalModifiers,
                                                                            // numAuto: bestPlantCombo.bestPic.result.combo[index]
                                                                            numAuto: numSimulatedAutos
                                                                        }
                                                                    ).remainingTime)
                                                                        }`}
                                                                </div>
                                                            </MouseOverPopover>
                                                        </div>
                                                    )
                                                })}
                                            </div>




                                            {/* Best PIC */}
                                            {bestPlantCombo.bestPic.pic > 0 && (
                                                <div style={{ display: 'flex', marginTop: '6px', alignItems: 'center' }}>
                                                    <div style={{ minWidth: '270px' }}>
                                                        <div className='calcInfo' >
                                                            <div>
                                                                Most PIC (+{`${bestPlantCombo.bestPic.result.picStats.picLevel} -> ${helper.roundTwoDecimal(bestPlantCombo.bestPic.result.picStats.picPercent * 100)}%`})
                                                            </div>
                                                            <div>
                                                                {` ${helper.roundTwoDecimal(
                                                                    mathHelper.divideDecimal(bestPlantCombo.bestPic.finalFry, bestPlantCombo.bestProd.finalFry).toNumber()
                                                                    * 100)
                                                                    }% Fries`}:
                                                            </div>
                                                        </div>

                                                        <div className='futurePicExplanation'>
                                                            <div>
                                                                Next PIC after {calcedFutureTime} hours + x hours
                                                            </div>
                                                            <div>
                                                                with {numSimulatedAutos} autos per plant
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {bestPlantCombo.bestPic.result.result.steps.map((val, index) => {

                                                        return (
                                                            <MouseOverPopover key={'popover' + index} tooltip={
                                                                <div>
                                                                    <div>
                                                                        <div>
                                                                            Show how many PIC levels are gained (if any) and the time to hit the NEXT pic with your MAX num autos used
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }>


                                                                <div className='suggestionHolder'>
                                                                    <div className='autoPicSuggestion'>
                                                                        {
                                                                            `P${bestPlantCombo.bestPic.result.result.steps.length - index} for ${val.time > secondsHour ? helper.secondsToString(val.time) : helper.secondsToString(val.time)}`
                                                                        }
                                                                        {bestPlantCombo.bestPic.result.plants[bestPlantCombo.bestPic.result.plants.length - 1 - index].picIncrease > 0 && (
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                                                                <div
                                                                                    style={{
                                                                                        margin: '-6px 0 -2px -3px',
                                                                                        fontSize: '22px'
                                                                                    }}
                                                                                >
                                                                                    +
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        margin: '-6px 2px -2px 0',
                                                                                        fontSize: '22px',
                                                                                        display: 'flex',
                                                                                        alignContent: 'center'
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        (bestPlantCombo.bestPic.result.plants[bestPlantCombo.bestPic.result.plants.length - 1 - index].prestige + bestPlantCombo.bestPic.result.plants[bestPlantCombo.bestPic.result.plants.length - 1 - index].picIncrease)
                                                                                        - bestPlantCombo.bestPic.result.plants[bestPlantCombo.bestPic.result.plants.length - 1 - index].prestige
                                                                                    }
                                                                                </div>
                                                                                {/* <img 
                                                                            alt='prestige star, yellow star in a red/orange circle'
                                                                            src={PrestigeStar}
                                                                            style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}
                                                                            /> */}
                                                                                <div style={{ height: '24px', width: '24px', marginTop: '-4px', position: 'relative' }}>
                                                                                    <Image
                                                                                        alt='prestige star, yellow star in a red/orange circle'
                                                                                        fill
                                                                                        src={PrestigeStar}
                                                                                        unoptimized={true}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>


                                                                    <div className='futurePicHolder'>
                                                                        {`${helper.secondsToString(farmingHelper.calcTimeTillPrestige(
                                                                            bestPlantCombo.bestPic.result.plants[bestPlantCombo.bestPic.result.plants.length - 1 - index],
                                                                            {
                                                                                ...bestPlantCombo.bestPic.result.result.finalModifiers,
                                                                                // numAuto: bestPlantCombo.bestPic.result.combo[bestPlantCombo.bestPic.result.plants.length - 1 - index]
                                                                                numAuto: numSimulatedAutos
                                                                            }
                                                                        ).remainingTime)
                                                                            }`}
                                                                    </div>
                                                                </div>
                                                            </MouseOverPopover>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    </div>
                                )}
                            </>
                        )}

                        <div style={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                            position: 'relative',
                            minHeight: '400px',
                            width: '100%'
                        }}>


                            {/* Graph stuff */}
                            <div style={{
                                display: 'flex',
                                flex: 1,
                                position: 'absolute',
                                height: '99%',
                                width: '100%'
                            }}>
                                <Graph
                                    graphObjects={graphObjects}
                                    runningGraphObjects={runningGraphObjects}
                                    showCalc={(farmCalcProgress.current === farmCalcProgress.max && farmCalcProgress.current !== 0 && bestPlantCombo.prod && calcDone)}
                                    yScale={yScale}
                                    bestPic={!!bestPlantCombo?.bestPic?.pic}
                                    expDiff={expDiff}
                                    expDiffFry={expDiffFry}
                                    displayPicPerc={displayPicPerc}
                                    calcDone={calcDone}
                                    calcAFK={calcAFK}
                                    showFries={showFries}
                                    showHP={showHP}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );
};

export default FarmingLanding;
