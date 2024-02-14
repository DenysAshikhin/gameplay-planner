"use client"

import { isMobile } from 'mobile-device-detect';
import pagecss from './page.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
import { BonusMap } from '../util/itemMapping.js';
import farmingHelper from '../util/farmingHelper.js';
import mathHelper from '../util/math.js';
import helper from "../util/helper.js";


import { residueMap } from './residueMapping.js';
import MouseOverPopover from "../util/Tooltip.jsx";

import infoIcon from '../../../public/images/icons/info_white_thick.svg';
import RefreshIcon from '../../../public/images/icons/refresh_lightgray.svg';
import greenBorder from '../../../public/images/residue/ShopUpgradeSelected.png';
import StillBuying from '../../../public/images/residue/StillBuying.png';
import rightArrow from '../../../public/images/icons/right_arrow_white.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8"
}]);


const ResidueCard = ({ data, params, desiredLevels, setDesiredLevels, forceReinc, reincLevelIncrease }) => {
    // const weight = params.weight(asc_level);
    const [clientWeight, setClientWeight] = useLocalStorage(`${params.label}_residue_weight`, -1);
    const [runTimeWeight, setRunTimeWeight] = useState(1);
    useEffect(() => {
        setRunTimeWeight(clientWeight)
    }, [clientWeight]);

    const [hovering, setHovering] = useState(false);

    const level = data[params.key];

    const asc_level = data.AscensionCount;
    const weight = runTimeWeight === -1 ? params.weight(asc_level) : runTimeWeight;
    const locked = (!hovering) && asc_level < params.unlock;

    const cost = params.cost(level);

    const reinc = residueMap['reinc'];
    const [reincWeightClient, setReincWeight] = useLocalStorage(`${reinc.label}_residue_weight`, -1);
    const [reincWeight, setRunTimeReincWeight] = useState(data[reinc.key]);
    useEffect(() => {
        const reinc = residueMap['reinc'];
        setRunTimeReincWeight(reincWeightClient === -1 ? reinc.weight(asc_level) : reincWeightClient);
    }, [reincWeightClient, asc_level])


    let highestKey = params.highestKey(params.key);
    let highestPurchase = data[highestKey];

    const finishedBuying = level >= highestPurchase;

    let desiredLevel = level;


    let reincOverride = forceReinc && params.key_inner === 'reinc' || (params.key_inner === 'reinc' && reincLevelIncrease > 0);

    let inner_calcs = useMemo(() => {


        let inner_orders = [];
        let needToIncrease = true;
        let inner_params = residueMap[params.key_inner];
        const asc_level = data.AscensionCount;
        const weight = runTimeWeight === -1 ? inner_params.weight(asc_level) : runTimeWeight;
        const level = data[params.key];
        let desiredLevel = level;
        const reinc = residueMap['reinc'];
        const reincLevel = data[reinc.key] + reincLevelIncrease;

        const reincCost = reinc.cost(reincLevel);

        const ratio = weight / reincWeight;
        const weightedCost = mathHelper.multiplyDecimal(reincCost, ratio);


        if (reincOverride) {
            return [[], desiredLevel];
        }


        while (needToIncrease) {
            needToIncrease = false;

            let newCost = inner_params.cost(desiredLevel);
            if (newCost.lessThan(weightedCost)) {
                desiredLevel++;
                needToIncrease = true;
                inner_orders.push({ desiredLevel, newCost, weightedCost: mathHelper.divideDecimal(newCost, weight), weight: weight, params: inner_params });
            }
        }
        return [inner_orders, desiredLevel];
    }, [params.key, params.key_inner, data, reincWeight, runTimeWeight, reincOverride, reincLevelIncrease]);

    let purchaseOrders = inner_calcs[0];
    desiredLevel = inner_calcs[1];

    let needPurchase = desiredLevel > level;

    useEffect(() => {
        let reincOverride = forceReinc && params.key_inner === 'reinc' || (params.key_inner === 'reinc' && reincLevelIncrease > 0);
        if (locked) {

            return setDesiredLevels((curr_levels) => {
                if (!curr_levels[params.key]) {
                    return curr_levels;
                }
                let temp = { ...curr_levels };
                delete temp[params.key];
                return temp;
            })
        }

        if (needPurchase && !desiredLevels[params.key]) {
            setDesiredLevels((curr_levels) => {
                let temp = { ...curr_levels };
                temp[params.key] = {
                    ...params,
                    purchaseOrders: purchaseOrders,
                    desiredLevel: desiredLevel, level: level, weight: weight
                };
                return temp;
            })
        }
        else if (desiredLevels[params.key]?.desiredLevel !== desiredLevel && !reincOverride
            || (desiredLevels[params.key]?.purchaseOrders !== purchaseOrders)) {
            setDesiredLevels((curr_levels) => {
                let temp = { ...curr_levels };
                temp[params.key] = {
                    ...params,
                    purchaseOrders: purchaseOrders,
                    desiredLevel: desiredLevel, level: level, weight: weight
                };
                return temp;
            })
        }
    }, [
        forceReinc,
        desiredLevels,
        desiredLevel,
        level,
        params,
        setDesiredLevels,
        needPurchase,
        purchaseOrders,
        clientWeight,
        runTimeWeight,
        weight,
        locked,
        data,
        reincLevelIncrease
    ])






    return (
        <div className='importantText residueCard'
            onMouseEnter={() => { setHovering(true); }}
            onMouseLeave={() => { setHovering(false); }}
        >
            <div className='residueCardHeader'>
                <div>
                    {locked ? `?????` : `${params.label}: ${level}`}
                </div>
                {((finishedBuying && needPurchase) || (finishedBuying && reincOverride)) && !locked && (
                    <div className='futurePurchase'>
                        <div>
                            {`${reincOverride ? (reincLevelIncrease > 0 ? reincLevelIncrease : 1) + desiredLevel : desiredLevel}`}
                        </div>
                        <div>
                            {`+${reincOverride ? desiredLevel - level + (reincLevelIncrease > 0 ? reincLevelIncrease : 1) : desiredLevel - level}`}
                        </div>
                    </div>
                )}
            </div>
            <div className='residueCardBody'>

                <div style={{ position: 'absolute', right: '9px', top: '9px', zIndex: '2' }}>

                    <MouseOverPopover tooltip={
                        <div>
                            <div>
                                {`Cost: ${params.cost(level).toExponential(2)}`}
                            </div>
                            <div>
                                {`Bonus: ${helper.numberWithCommas(params.bonus(level).ceil().toString())}%`}
                            </div>
                        </div>
                    }>
                        <div style={{ position: 'relative', width: '30px', height: '30px' }}>
                            <Image src={infoIcon} fill unoptimized alt="letter i in a circle" />
                        </div>
                    </MouseOverPopover>
                </div>
                {!locked && (
                    <div style={{ position: 'absolute', left: '8px', bottom: '8px', zIndex: '2', display: 'flex', alignItems: 'center' }}>
                        <div>
                            Weight:
                        </div>
                        <div
                            style={{ marginLeft: '6px' }}
                        >
                            <input
                                aria-label='Specify how important this bonus is'
                                className='importantText textMedium2'
                                style={{ borderRadius: '4px', width: '48px', height: '12px', backgroundColor: '#1D1D1D' }}
                                type='number'
                                value={weight}
                                onChange={
                                    (inner_e) => {

                                        try {
                                            let x = Number(inner_e.target.value);
                                            // x = Math.floor(x);
                                            if (x < 0 || x > 9999) {
                                                return;
                                            }
                                            setClientWeight(x);

                                            ReactGA.event({
                                                category: "residue_interaction",
                                                action: `changed_residue_weight`,
                                                label: `${params.label}`,
                                                value: x
                                            });

                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                min="0"
                                max="9999"
                            />
                        </div>
                        {(weight !== params.weight(asc_level)) && (
                            <div className='hover'
                                style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '6px' }}
                                onClick={() => {
                                    setClientWeight(-1);
                                }}
                            >
                                <Image src={RefreshIcon} fill unoptimized alt='reset, 2 arrows in a circle' />
                            </div>
                        )}
                    </div>
                )}

                {!!locked && (
                    <Image src={residueMap['locked'].img} fill unoptimized alt={`locked bonus image from in game`} />
                )}
                {!locked && (
                    <Image src={params.img} fill unoptimized alt={`${params.key} bonus from in game`} />
                )}
                {(!!needPurchase || (reincOverride)) && !locked && (
                    <Image src={greenBorder} fill unoptimized alt={`Green border to indicate an upgrade should be purchased`} />
                )}
                {!finishedBuying && (
                    <Image src={StillBuying} fill unoptimized alt={`Yellow border to indicate an upgrade is still autobuying`} />
                )}
            </div>
            <div className='residueCardFooter'></div>
        </div>
    )
}

const ResideOrderCard = ({ data }) => {

    return (
        <div className='importantText suggestionCard'>
            <div className='suggestionCardHeader'>
                <div>
                    {`${data.params.label}`}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    {`Cost: ${data.totalCost.toExponential(2).toString()}`}
                </div>
            </div>
            <div className='suggestionCardBody'>
                <div style={{
                    position: 'relative',
                    height: '45px'
                }}>
                    <Image
                        alt={`${data.params.label} bonus holder`}
                        style={{ width: 'auto', height: '100%' }}
                        src={data.params.label_img} unoptimized
                    />


                    <div className='blackTextStroke1'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 'calc(50% - 14px)',
                            left: '48px',
                            fontSize: '27px',
                            fontWeight: 'bold',
                            width: 'calc(100% - 52px)'
                        }}>

                        <div>
                            {`${data.start}`}
                        </div>
                        <div style={{ height: '32px', width: '32px', position: 'relative', margin: '0 3px' }}>
                            <Image
                                alt='arrow point to the left'
                                src={rightArrow}
                                fill
                                unoptimized
                            />
                        </div>
                        <div>
                            {`${data.desiredLevel}`}
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            {`+${data.desiredLevel - data.start}`}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default function Residue() {
    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                var viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = "initial-scale=0.1";
                    viewport.content = "width=1200";
                }
            }, 500);
        }
    }, [isMobile]);
    const [desiredLevels, setDesiredLevels] = useState({});
    const [forceReinc, setForceReinc] = useState(false);
    const [reincLevelIncrease, setReincLevelIncrease] = useState(0);
    const [needToIncreaseReinc, setNeedToIncreaseReinc] = useState(false);
    const increasingReinc = useRef(false);
    const increasingReinc2 = useRef(false);

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    const dataLoaded = useRef(false);
    useEffect(() => {
        if (!dataLoaded.current) {
            setRunTimeData(clientData);
            dataLoaded.current = true;
            setReincLevelIncrease(0);
            setNeedToIncreaseReinc(false);
        }
    }, [clientData, dataLoaded]);


    useEffect(() => {
        if (needToIncreaseReinc && increasingReinc.current === false) {
            increasingReinc.current = true;
            setTimeout(() => {
                setReincLevelIncrease(reincLevelIncrease + 1);
                setNeedToIncreaseReinc(false);
                increasingReinc.current = false;
                increasingReinc2.current = false;
            }, 5);
        }
        
    }, [reincLevelIncrease, needToIncreaseReinc, increasingReinc, increasingReinc2]);//If you remove (reincLevelIncrease) it will to rerender even though it shouldn't need it

    let suggestedPurchases = [];
    let reincParams = residueMap['reinc'];
    let objToIterate = forceReinc ?
        {
            'reinc': {
                ...reincParams,
                purchaseOrders: [
                    {
                        desiredLevel: data[reincParams.key] + 1,
                        newCost: reincParams.cost(data[reincParams.key]),
                        weightedCost: mathHelper.divideDecimal(reincParams.cost(data[reincParams.key]), reincParams.weight(data.AscensionCount)),
                        weight: reincParams.weight(data.AscensionCount),
                        params: reincParams
                    }
                ],
                desiredLevel: data[reincParams.key] + 1, level: data[reincParams.key], weight: reincParams.weight(data.AscensionCount)
            }
        }
        : desiredLevels;


    if (reincLevelIncrease > 0) {

        let reincStart = {
            ...reincParams,
            purchaseOrders: [],
            desiredLevel: data[reincParams.key] + reincLevelIncrease, level: data[reincParams.key], weight: reincParams.weight(data.AscensionCount)
        };

        for (let i = 0; i < reincLevelIncrease; i++) {
            reincStart.purchaseOrders.push({
                desiredLevel: data[reincParams.key] + (i + 1),
                newCost: reincParams.cost(data[reincParams.key] + i),
                weightedCost: mathHelper.divideDecimal(reincParams.cost(data[reincParams.key] + i), reincParams.weight(data.AscensionCount)),
                weight: reincParams.weight(data.AscensionCount),
                params: reincParams
            })
        }
        objToIterate['reinc'] = reincStart;
        // delete objToIterate['CowShopReincarnationBonus'];
    }

    Object.entries(objToIterate).map((val) => {

        val[1].purchaseOrders.forEach((inner_val) => suggestedPurchases.push(inner_val));

        return val[1];
    });

    let stillBuying = data[reincParams.highestKey(reincParams.key)] > data[reincParams.key];

    let currentResidue = mathHelper.createDecimal(data.CurrentResidueBD);


    let runningCost = mathHelper.createDecimal(0);
    let affordableCost = mathHelper.createDecimal(0);
    let affordablePurchases = [];
    let futurePurchases = [];

    suggestedPurchases.sort((a, b) => a.weightedCost.lessThan(b.weightedCost) ? -1 : 1);

    let runningLevels = {};

    suggestedPurchases.forEach((suggestion) => {

        runningCost = mathHelper.addDecimal(runningCost, suggestion.newCost);
        if (runningCost.lessThan(currentResidue)) {
            affordableCost = mathHelper.addDecimal(affordableCost, suggestion.newCost);
            if (affordablePurchases.length === 0) {
                affordablePurchases.push({ ...suggestion, start: suggestion.desiredLevel - 1, totalCost: suggestion.newCost });
                runningLevels[suggestion.params.key] = suggestion.desiredLevel;
            }
            else {
                let current = affordablePurchases[affordablePurchases.length - 1];
                if (current.params.key === suggestion.params.key) {
                    current.desiredLevel++;
                    current.totalCost = mathHelper.addDecimal(current.totalCost, suggestion.newCost);
                    runningLevels[suggestion.params.key] = current.desiredLevel;
                }
                else {
                    affordablePurchases.push({ ...suggestion, start: suggestion.desiredLevel - 1, totalCost: suggestion.newCost });
                    runningLevels[suggestion.params.key] = suggestion.desiredLevel;
                }
            }
        }
        else {
            if (futurePurchases.length === 0) {

                futurePurchases.push({
                    ...suggestion,
                    start: runningLevels[suggestion.params.key] ? runningLevels[suggestion.params.key] : suggestion.desiredLevel - 1,
                    totalCost: suggestion.newCost
                });
            }
            else {
                let current = futurePurchases[futurePurchases.length - 1];
                if (current.params.key === suggestion.params.key) {
                    current.desiredLevel++;
                    current.totalCost = mathHelper.addDecimal(current.totalCost, suggestion.newCost);
                    runningLevels[suggestion.params.key] = current.desiredLevel;
                }
                else {
                    futurePurchases.push({
                        ...suggestion,
                        start: runningLevels[suggestion.params.key] ? runningLevels[suggestion.params.key] : suggestion.desiredLevel - 1,
                        totalCost: suggestion.newCost
                    });
                    runningLevels[suggestion.params.key] = suggestion.desiredLevel;
                }
            }
        }

    });

    useEffect(() => {
        if (!dataLoaded.current) return;
        let inner_arr = [];

        Object.entries(desiredLevels).map((val) => {
            val[1].purchaseOrders.forEach((inner_val) => inner_arr.push(inner_val));
            return val[1];
        });

        if (inner_arr.length === 0) {
            setForceReinc(true);
        }
        else {
            setForceReinc(false);
        }

    }, [desiredLevels, dataLoaded])

    //loop over affordable purchases and combine them into one bulk (no need to step them since it's all bought anyways)
    let finalAffordablePurchasesMap = {};
    affordablePurchases.forEach((inner_val) => {
        if (!finalAffordablePurchasesMap[inner_val.params.key]) {
            finalAffordablePurchasesMap[inner_val.params.key] = inner_val;
        }
        else {
            finalAffordablePurchasesMap[inner_val.params.key].desiredLevel = inner_val.desiredLevel;
        }
    })

    affordablePurchases = [];
    for (const [key, val] of Object.entries(finalAffordablePurchasesMap)) {
        affordablePurchases.push(val);
    }
    affordablePurchases.sort((a, b) => b.weight - a.weight);


    //Meaning we can afford everythingg, pretend like the reinc level went up +1, recalc
    if (futurePurchases.length === 0 && !increasingReinc2.current && dataLoaded.current) {
        // setReincLevelIncrease((inner_val) => inner_val + 1);
        setNeedToIncreaseReinc(true);
        increasingReinc2.current = true;
    }

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flex: '1',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    paddingLeft: '12px'
                }}
            >
                {/* Current Card + Wanted Levels */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'start',
                        width: '900px',
                        border: "2px solid rgba(255,255,255,0.8)",
                        margin: '12px 36px 0 0px',
                        borderRadius: '12px',
                        height: 'calc(100vh - 68px)',
                        paddingBottom: '12px'
                    }}
                >
                    {/* header */}
                    <div
                        style={{ backgroundColor: 'rgba(255,255,255, 0.05)', }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}
                        >
                            {`Current Residue${stillBuying ? ` - STILL BUYING` : ``}`}
                        </div >
                    </div >

                    {/* Card List */}
                    <div style={{
                        height: 'calc(100% - 42px)', padding: '0 6px 0 0'
                    }}>

                        <div style={{
                            display: 'flex', flexWrap: 'wrap', maxHeight: '100%',
                            overflowY: 'auto',
                        }}>
                            {Object.entries(residueMap).filter((value) => value[0] !== 'locked').sort((a, b) => a[1].order - b[1].order).map((value, index) => {
                                let key = value[0];
                                let params = value[1];

                                return <ResidueCard
                                    data={data}
                                    desiredLevels={desiredLevels}
                                    setDesiredLevels={setDesiredLevels}
                                    params={{ ...params, key_inner: key, currentResidue: currentResidue }}
                                    key={index}
                                    forceReinc={forceReinc}
                                    reincLevelIncrease={reincLevelIncrease}
                                />
                            })}
                        </div>
                    </div>
                </div >

                {/* Suggested Purchase Order */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'start',
                        width: '445px',
                        border: "2px solid rgba(255,255,255,0.8)",
                        margin: '12px 36px 12px 0px',
                        borderRadius: '12px',
                        height: 'calc(100vh - 68px)',
                        paddingBottom: '12px',
                        overflow: 'hidden',
                    }}
                >
                    {/* header */}
                    <div
                        style={{ backgroundColor: 'rgba(255,255,255, 0.05)', }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}
                        >
                            Suggested Purchase Order
                        </div >
                    </div >

                    {/* Card List */}
                    <div style={{
                        height: 'calc(100% - 42px)', padding: '0 6px 0 0'
                    }}>
                        {!stillBuying && (
                            <div className='suggestedOrder importantText'
                                style={{
                                    display: 'flex', flexDirection: 'column', height: 'calc(100% - 11px)',
                                    overflowY: 'auto', alignItems: 'center'
                                }}
                            >
                                <h2 style={{ marginBottom: '3px' }}>Affordable Purchase Order</h2>
                                <button
                                    onClick={() => {

                                        ReactGA.event({
                                            category: "residue_interaction",
                                            action: `accept_affordable_order`,
                                        });

                                        let finalLevels = {};
                                        affordablePurchases.forEach((purchase) => {
                                            finalLevels[purchase.params.key] = purchase.desiredLevel
                                        });
                                        setDesiredLevels({});
                                        setRunTimeData((curData) => {
                                            let temp_data = { ...curData };
                                            let leftoverRes = mathHelper.subtractDecimal(currentResidue, affordableCost);
                                            temp_data.CurrentResidueBD = { mantissa: leftoverRes.mantissa, exponent: leftoverRes.exponent };
                                            for (const [key, value] of Object.entries(finalLevels)) {
                                                temp_data[key] = value;
                                            }
                                            return temp_data;
                                        });
                                        setReincLevelIncrease(0);
                                    }}
                                >Accept</button>
                                {affordablePurchases.map((val, index) => {
                                    // return <ResideOrderCard data={val} key={index} />
                                    return <ResideOrderCard data={val} key={index} />
                                })}
                                <h2 style={{ marginBottom: '3px' }}>Future Purchase Order</h2>
                                <button
                                    onClick={() => {

                                        ReactGA.event({
                                            category: "residue_interaction",
                                            action: `accept_future_order`,
                                        });

                                        let finalLevels = {};
                                        futurePurchases.forEach((purchase) => {
                                            finalLevels[purchase.params.key] = purchase.desiredLevel
                                        });
                                        setDesiredLevels({});
                                        setRunTimeData((curData) => {
                                            let temp_data = { ...curData };
                                            let leftoverRes = mathHelper.subtractDecimal(currentResidue, runningCost);
                                            temp_data.CurrentResidueBD = { mantissa: leftoverRes.mantissa, exponent: leftoverRes.exponent };
                                            for (const [key, value] of Object.entries(finalLevels)) {
                                                temp_data[key] = value;
                                            }
                                            return temp_data;
                                        });
                                        setReincLevelIncrease(0);
                                    }}
                                >Accept</button>
                                {futurePurchases.map((val, index) => {
                                    // return <ResideOrderCard data={val} key={index} />
                                    return <ResideOrderCard data={val} key={index} />
                                })}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
};