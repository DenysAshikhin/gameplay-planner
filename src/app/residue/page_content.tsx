"use client"

import { isMobile } from 'mobile-device-detect';
import './page.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import { BonusMap } from '../util/itemMapping';
import farmingHelper from '../util/farmingHelper';
import mathHelper from '../util/math';
import helper from "../util/helper";


import { residueMap } from './residueMapping';
import MouseOverPopover from "../util/Tooltip";

import infoIcon from '@images/icons/info_white_thick.svg';
import RefreshIcon from '@images/icons/refresh_lightgray.svg';
import greenBorder from '@images/residue/ShopUpgradeSelected.png';
import StillBuying from '@images/residue/StillBuying.png';
import rightArrow from '@images/icons/right_arrow_white.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8"
}]);


const ResidueCard = ({ data, params, defaultWeight, setParentWeights, desiredLevels, futurePurchase }) => {
    // const weight = params.weight(asc_level);
    const [clientWeight, setClientWeight] = useLocalStorage(`${params.label}_residue_weight`, -1);
    const [runTimeWeight, setRunTimeWeight] = useState(params.weight(data.AscensionCount));


    useEffect(() => {
        console.log(`useefect1`)
        if (clientWeight === -1) {
            setRunTimeWeight(defaultWeight);
        }
        else {
            setRunTimeWeight(clientWeight);
        }
    }, [data.AscensionCount, clientWeight, defaultWeight]);

    //Whenever the runtime weight is updated, update the weight map in parent component so it can recalculate to purchase
    useEffect(() => {
        setParentWeights((curr_weights) => {
            if (curr_weights[params.key_inner] !== runTimeWeight) {
                let x = { ...curr_weights };
                x[params.key_inner] = runTimeWeight;
                return x;
            }
            return curr_weights;
        })
    }, [params.key_inner, runTimeWeight, setParentWeights])

    const [hovering, setHovering] = useState(false);

    const level = data[params.key];
    const highestLevel = data[params.highestKey(params.key)];
    const finishedBuying = highestLevel <= level;
    const needPurchase = desiredLevels > 0;
    const asc_level = data.AscensionCount;
    const weight = runTimeWeight === -1 ? params.weight(asc_level) : runTimeWeight;
    const locked = (!hovering) && asc_level < params.unlock;

    if (data.AscensionCount > 39) {
        let bigsad = -1;
    }
    if (params.key == 'CowShopPerkBonus') {
        let bigsad = -1;
    }

    const sweet_locked = data.AscensionCount > 29 && params.key == 'CowShopPotatoBonus';
    const skull_locked = data.AscensionCount > 39 && params.key == 'CowShopPerkBonus';
    const key_locked = sweet_locked || skull_locked;
    // 
    return (
        <div className='importantText residueCard'
            onMouseEnter={() => { if (key_locked) return; setHovering(true); }}
            onMouseLeave={() => { if (key_locked) return; setHovering(false); }}
        >

            {sweet_locked && (
                <div className='hover'
                    style={{ position: 'relative', width: '90%', height: '94%', margin: '6px 8px' }}
                >
                    <Image src={residueMap['locked'].sweetlocked} fill unoptimized alt='sweet potatoe lock' />
                </div>
            )}
            {skull_locked && (
                <div className='hover'
                    style={{ position: 'relative', width: '90%', height: '94%', margin: '6px 8px' }}
                >
                    <Image src={residueMap['locked'].skulllocked} fill unoptimized alt='sweet potatoe lock' />
                </div>
            )}

            {!key_locked && (
                <>
                    <div className='residueCardHeader'>
                        <div>
                            {locked ? `?????` : `${params.label}: ${level}`}
                        </div>
                        {((finishedBuying && needPurchase) || futurePurchase) && !locked && (
                            <div className='futurePurchase'
                                style={futurePurchase ? { color: 'yellow' } : {}}
                            >
                                <div>
                                    {futurePurchase ? `${level + 1}` : `${desiredLevels + level}`}
                                </div>
                                <div>
                                    {futurePurchase ? `+1` : `+${desiredLevels}`}
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
                                        {`Bonus: ${helper.numberWithCommas(params.bonus(level).ceil().toExponential(2))}%`}
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
                            <Image className='noPointerEvent' src={residueMap['locked'].img} fill unoptimized alt={`locked bonus image from in game`} />
                        )}
                        {!locked && (
                            <Image className='noPointerEvent' src={params.img} fill unoptimized alt={`${params.key} bonus from in game`} />
                        )}
                        {(!!needPurchase && finishedBuying) && !locked && (
                            <Image className='noPointerEvent' src={greenBorder} fill unoptimized alt={`Green border to indicate an upgrade should be purchased`} />
                        )}
                        {(!finishedBuying || futurePurchase) && (
                            <Image className='noPointerEvent' src={StillBuying} fill unoptimized alt={`Yellow border to indicate an upgrade is still autobuying`} />
                        )}
                    </div>
                    <div className='residueCardFooter'></div>
                </>
            )}


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
    useEffect(() => {
        let shift_ads = async () => {
            await helper.sleep(2);

            // document.getElementById('in_content_flex').style.justifyContent = 'flex-end';
        }
        shift_ads();
    }, [])


    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport instanceof HTMLMetaElement) {
                    viewport.content = "initial-scale=0.1";
                    viewport.content = "width=1200";
                }
            }, 500);
        }
    }, []);
    const [desiredLevels, setDesiredLevels] = useState({});
    const [forceReinc, setForceReinc] = useState(false);
    const [reincLevelIncrease, setReincLevelIncrease] = useState(0);

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    const dataLoaded = useRef(false);
    useEffect(() => {
        if (!dataLoaded.current) {
            setRunTimeData(clientData);
            dataLoaded.current = true;
        }
    }, [clientData, dataLoaded]);

    const [parentWeights, setParentWeights] = useState({} as { [key: string]: number });

    const finalObject = useMemo(() => {
        let currentResidue = mathHelper.createDecimal(data.CurrentResidueBD);
        let keepLooping = true;

        let bestValue;
        let purchases = {};
        let firstPurchase = true;
        let available = false; //At least one upgrade should be available

        let totalWeight = 0;
        for (const [key, value] of Object.entries(parentWeights)) {
            totalWeight += value;
            purchases[key] = { levels: 0, runningCost: mathHelper.createDecimal(0) };
            if (value > 0 && residueMap[key].unlock <= data.AscensionCount) {
                available = true;
            }
        }

        while (keepLooping) {
            let temp_values = [];
            for (const [key, value] of Object.entries(parentWeights)) {
                let ratio = value / totalWeight;
                let temp_obj = residueMap[key];
                let baseCost = temp_obj.cost(data[temp_obj.key] + purchases[key].levels);
                // let weightedCost = mathHelper.multiplyDecimal(baseCost, ratio);
                let weightedCost = mathHelper.divideDecimal(baseCost, value);

                if (value === 0 || temp_obj.unlock > data.AscensionCount) {
                    continue;
                }
                temp_values.push({ key: key, baseCost: baseCost, level: data[temp_obj.key] + purchases[key].levels });

                if (!bestValue) {
                    bestValue = { key: key, baseCost: baseCost, weightedCost: weightedCost };
                }
                else if (weightedCost.lessThan(bestValue.weightedCost)) {
                    bestValue = { key: key, baseCost: baseCost, weightedCost: weightedCost };
                }

            }
            if (bestValue && available) {
                if (currentResidue.lessThan(bestValue.baseCost)) {
                    keepLooping = false;
                    if (firstPurchase && bestValue) {
                        purchases[bestValue.key].futurePurchase = true;
                    }
                }
                else {
                    purchases[bestValue.key].levels++;
                    purchases[bestValue.key].runningCost = mathHelper.addDecimal(purchases[bestValue.key].runningCost, bestValue.baseCost);
                    currentResidue = mathHelper.subtractDecimal(currentResidue, bestValue.baseCost)
                }
                bestValue = null;
                firstPurchase = false;
            }
            else {
                keepLooping = false;
            }
        }

        return purchases;
    }, [data, parentWeights])

    const stillBuying = useMemo(() => {

        return false;
    }, [])




    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
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
                                    defaultWeight={residueMap[key].weight(data.AscensionCount)}
                                    desiredLevels={!!finalObject[key]?.levels ? finalObject[key]?.levels : 0}
                                    futurePurchase={!!finalObject[key]?.futurePurchase ? finalObject[key]?.futurePurchase : false}
                                    params={{ ...params, key_inner: key, }}
                                    key={index}
                                    setParentWeights={setParentWeights}
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
                                {Object.entries(residueMap).filter((value) => value[0] !== 'locked').sort((a, b) => a[1].order - b[1].order).map((value, index) => {
                                    let key = value[0];
                                    let params = value[1];
                                    if (!finalObject[key]) return null;
                                    if (finalObject[key].levels === 0) return null;

                                    return <ResideOrderCard
                                        data={
                                            {
                                                params: params,
                                                start: data[params.key],
                                                desiredLevel: data[params.key] + finalObject[key].levels,
                                                totalCost: finalObject[key].runningCost
                                            }
                                        }
                                        key={index + key}
                                    />
                                })}

                            </div>
                        )}

                    </div>
                </div>
            </div>
            <div
                style={{

                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                }}
            >

                <div id='right_pillar' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }} />
                {/* <div id='in_content_flex' style={{ display: 'flex', alignItems: 'center', }} /> */}
            </div>
        </div>
    )
};