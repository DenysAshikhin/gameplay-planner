"use client"

import { isMobile } from 'mobile-device-detect';
import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import { BonusMap } from '../util/itemMapping';
import farmingHelper from '../util/farmingHelper';
import mathHelper from '../util/math';

import AssemblyItem from './AssemblyItem';
import AssemblyLine from './AssemblyLine';
import CumulativeAssemblyLine from './CumulativeAssemblyLine';
import MouseOverPopover from "../util/Tooltip";

import infoIcon from '@images/icons/info_white.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';
import helper from '../util/helper';
import { DecimalSource } from 'break_infinity.js';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);



export default function Protein() {

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
    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    const [assemblyBonuses, setAssemblyBonuses] = useState(-1);

    useEffect(() => {
        setRunTimeData(clientData);
        let tempMap = {};
        clientData.AssemblerCollection.forEach((val) => {
            val.BonusList.forEach((inner_val) => {
                tempMap[inner_val.ID] = true;
            })
        })
        setAssemblyBonuses(tempMap as any);

    }, [clientData]);


    const [currentWeights, setCurrentWeights] = useState({});
    const [cumulativeTime, setCumulativeTime] = useLocalStorage(`cumulativeTime`, false);
    const [simplifiedView, setSimplifiedView] = useLocalStorage(`simplifiedView`, false);
    const [numAL, setNumAl] = useLocalStorage(`numAL`, 5);
    const [numTradeCosts, setNumTradeCosts] = useLocalStorage('numTradeCosts', 0);



    // useEffect(() => {
    //     setTimeout(() => {
    //         ReactGA.send({ hitType: "pageview", page: "/protein_", title: "_Protein" });
    //     }, 500);

    // }, [])

    let tempList = [];

    const cutOff = 100;

    Object.values(BonusMap).forEach((val) => {

        if (val.id < cutOff) {
            tempList.push({ ...val, currentWeight: 0 })
        }
    })


    tempList.sort((a, b) => a.label.localeCompare(b.label));

    let tempData = JSON.parse(JSON.stringify(data));

    if (!tempData.ProteinCurrent) {
        return (
            <div>
                <h1>{`Your save is most likely from an older version, please update your game and try with a new save. If that's not the case, please reach out on discord! Link can be found on the gratitude (heart) page`}</h1>
            </div>
        )
    }

    let runningTime: DecimalSource = 0;
    let currProtein = mathHelper.createDecimal(tempData.ProteinCurrent);
    let protRate = farmingHelper.calcProteinPerSecond(tempData);
    let bestAssemblies = [];
    let cumulativePurchasableAssemblies = [];
    let futureAssemblies = [];
    let totalLevels = 0;
    let currentBonusTotals: { [id: number]: number } = {};


    let averageTradeCosts = [];
    if (numTradeCosts > 0) {
        let costs = helper.getAverageTradeCosts(data);
        averageTradeCosts = costs.average_cost_map;
        let proteinCost = averageTradeCosts.find((val) => val.id === 2);
        if (proteinCost) {
            proteinCost = mathHelper.multiplyDecimal(proteinCost.cost, numTradeCosts);
            currProtein = mathHelper.subtractDecimal(currProtein, proteinCost);
        }
    }


    tempData.AssemblerCollection.forEach((inner_val) => {
        totalLevels += inner_val.Level;
        inner_val.BonusList.forEach((inner_bonus) => {
            if (!currentBonusTotals[inner_bonus.ID]) {
                currentBonusTotals[inner_bonus.ID] = 1;
            }
            currentBonusTotals[inner_bonus.ID] *= farmingHelper.calcAssemblyLine(inner_bonus, inner_val.Level);
        })
    });

    if (Object.values(currentWeights).length > 0) {
        for (let i = 0; i < numAL; i++) {
            // let assembliesMap = {};
            let assembliesMap = [];

            for (let c = 0; c < tempData.AssemblerCollection.length; c++) {
                let inner_val = tempData.AssemblerCollection[c];


                if (inner_val.LockQty <= totalLevels && (inner_val.Level < inner_val.LevelMax)) {
                    let increasedBonuses = {};

                    //Calculate increase bonus if this line is upgraded
                    for (let v = 0; v < tempData.AssemblerCollection.length; v++) {
                        let inner_val_nested = tempData.AssemblerCollection[v];
                        for (let b = 0; b < inner_val_nested.BonusList.length; b++) {
                            let inner_bonus = inner_val_nested.BonusList[b];
                            if (!increasedBonuses[inner_bonus.ID]) {
                                increasedBonuses[inner_bonus.ID] = 1;
                            }

                            if (inner_bonus.StartingLevel > (inner_val_nested.Level + 1)) {
                                continue;
                            }

                            let levelToUse = inner_val_nested.ID === inner_val.ID ? inner_val_nested.Level + 1 : inner_val_nested.Level

                            increasedBonuses[inner_bonus.ID] *=
                                farmingHelper.calcAssemblyLine(
                                    inner_bonus,
                                    levelToUse
                                );
                        }
                    }

                    let originalBonuses = [];
                    let newBonuses = [];
                    let cost = farmingHelper.calcAssemblyCost(inner_val.ID, tempData);
                    inner_val.cost = cost;

                    inner_val.BonusList.forEach((inner_bonus) => {
                        originalBonuses.push({ ...inner_bonus, value: farmingHelper.calcAssemblyLine(inner_bonus, inner_val.Level) })
                        newBonuses.push({ ...inner_bonus, Level: inner_val.Level + 1, value: farmingHelper.calcAssemblyLine(inner_bonus, inner_val.Level + 1) })
                    });

                    let weightedImprovement = 0;
                    for (const [key, value] of Object.entries(currentBonusTotals)) {

                        let alternateImprov = (increasedBonuses[key] - value) / value;
                        alternateImprov *= currentWeights[key];
                        weightedImprovement += alternateImprov;
                    }

                    // assembliesMap[inner_val.ID] = {...inner_val, score: weightedImprovement}
                    assembliesMap.push({
                        ...inner_val,
                        score: weightedImprovement,
                        cost_score: mathHelper.divideDecimal(cost, weightedImprovement)
                    });
                }
            }

            // assembliesMap.sort((a, b) => b.score - a.score);
            assembliesMap.sort((a, b) => {
                if (b.cost_score.lessThan(a.cost_score)) {
                    return 1;
                }
                return -1
            });


            let cost = farmingHelper.calcAssemblyCost(assembliesMap[0].ID, tempData);
            let timeToPurchase: DecimalSource = mathHelper.subtractDecimal(cost, currProtein);

            if (currProtein.greaterThan(cost)) {
                timeToPurchase = 0;
                currProtein = mathHelper.subtractDecimal(currProtein, cost);
            }
            else {
                timeToPurchase = mathHelper.divideDecimal(timeToPurchase, protRate);
                currProtein = mathHelper.createDecimal(0);
            }
            if (cumulativeTime) {
                let tempHolder = mathHelper.addDecimal(0, timeToPurchase);
                timeToPurchase = mathHelper.addDecimal(timeToPurchase, runningTime);
                runningTime = mathHelper.addDecimal(runningTime, tempHolder);
            }

            bestAssemblies.push(
                {
                    assembly: JSON.parse(JSON.stringify(assembliesMap[0])),
                    data: JSON.parse(JSON.stringify(tempData)),
                    purchaseTime: timeToPurchase,
                    cost: cost
                }
            );
            tempData.AssemblerCollection[assembliesMap[0].ID].Level++;
            totalLevels++;
            currentBonusTotals = {};
            for (let c = 0; c < tempData.AssemblerCollection.length; c++) {
                let inner_val = tempData.AssemblerCollection[c];
                for (let v = 0; v < inner_val.BonusList.length; v++) {
                    let inner_bonus = inner_val.BonusList[v];
                    if (!currentBonusTotals[inner_bonus.ID]) {
                        currentBonusTotals[inner_bonus.ID] = 1;
                    }
                    currentBonusTotals[inner_bonus.ID] *= farmingHelper.calcAssemblyLine(inner_bonus, inner_val.Level);
                }
            }
        }
    }

    let bestAssemblyFinal = [];
    bestAssemblies.forEach((inner_val) => {

        if (bestAssemblies.length === 0) return;
        if (bestAssemblyFinal.length === 0) {


            return bestAssemblyFinal.push(inner_val);
        }

        let current = bestAssemblyFinal[bestAssemblyFinal.length - 1];

        if (current.assembly.ID !== inner_val.assembly.ID) {
            bestAssemblyFinal.push(inner_val);
        }
        else {
            //create a desired level of + 1
            if (!current.desiredLevel) {
                current.desiredLevel = current.assembly.Level + 2;
            }
            else {
                current.desiredLevel += 1;
            }
            let tempCost = mathHelper.createDecimalString(current.cost);
            let futureCost = mathHelper.createDecimalString(inner_val.cost);
            let newCost = mathHelper.addDecimal(tempCost, futureCost);
            current.cost = newCost;

            if (cumulativeTime) {
                current.purchaseTime = inner_val.purchaseTime;
            }
            else {
                current.purchaseTime = mathHelper.addDecimal(current.purchaseTime, inner_val.purchaseTime);
            }
        }
    });

    bestAssemblies = bestAssemblyFinal;
    //calculate cumulative view for instant buy purchases
    let purchasableAssemblies = bestAssemblies.filter((e) => e.purchaseTime == 0);
    for (let i = 0; i < purchasableAssemblies.length; i++) {
        let matching = cumulativePurchasableAssemblies.find((e) => e.id == purchasableAssemblies[i].assembly.ID);
        if (matching == undefined) {
            matching = {
                id: purchasableAssemblies[i].assembly.ID,
                currentLevel: purchasableAssemblies[i].assembly.Level,
                data: purchasableAssemblies[i].data,
                count: 0,
                totalCost: 0
            };
            cumulativePurchasableAssemblies.push(matching);
        }
        matching.totalCost = mathHelper.addDecimal(matching.totalCost, purchasableAssemblies[i].cost);
        if (!purchasableAssemblies[i].desiredLevel) {
            matching.count++;
        } else {
            matching.count += purchasableAssemblies[i].desiredLevel - purchasableAssemblies[i].assembly.Level;
        }
    }
    cumulativePurchasableAssemblies.sort((a,b) => a.id - b.id);

    futureAssemblies = bestAssemblies.filter((e) => e.purchaseTime > 0);

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div>
            </div>

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            <div style={{
                display: 'flex',
                flex: '1',
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.05)',
                paddingLeft: '12px'
            }}>


                {/* Top x assembly line */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    width: '550px',
                    // maxHeight: 'calc(100% - 49px)',
                    margin: '12px 36px 12px 0px', padding: '12px', borderRadius: '12px'
                }}>
                    {/* header */}
                    <div
                        style={{
                            // display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1'
                            maxHeight: 'calc(100vh - 84px)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', marginTop: '-6px', marginBottom: '6px' }}
                        >
                            Best Purchase Sequence
                        </div >

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-3px', marginBottom: '6px' }}>

                            <div>
                                {/* Cumulative time  */}
                                <div
                                    className='importantText'
                                    style={{ fontSize: '18px', }}
                                >
                                    Use cumulative purchase time:


                                    <input
                                        aria-label='Specify if the time to purchase should be individual or cumlative in order of suggested purchases'
                                        type="checkbox"
                                        onChange={(e) => {
                                            setCumulativeTime((e.target.checked ? 1 : 0) as any)
                                        }}
                                        checked={!!cumulativeTime}
                                        value={!!cumulativeTime as any}
                                    />

                                </div>

                                {/* Minified View */}
                                <div
                                    className='importantText'
                                    style={{ fontSize: '18px', }}
                                >
                                    Use minified view:

                                    <input
                                        aria-label='Specify if each assembly line should be collapsed to hide the bonuses and only show costs, levels and times'
                                        type="checkbox"
                                        onChange={(e) => {
                                            setSimplifiedView((e.target.checked ? 1 : 0) as any)
                                        }}
                                        checked={!!simplifiedView}
                                        value={!!simplifiedView as any}
                                    />

                                </div>
                            </div>



                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* num purchases */}
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '2px' }}>

                                    <MouseOverPopover tooltip={
                                        <div style={{ maxWidth: '814px' }}>
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ fontWeight: 'bold', marginRight: '6px' }}>
                                                    Use cumulative purchase time:
                                                </div>
                                                <div>
                                                    when checked, will display each purchase time as the time necessary to buy all the upgrades before that purchase (inculding itself).
                                                    Otherwise, it will show the current time to purchase if it is the next assembly upgraded
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', marginTop: '12px' }}>
                                                <div style={{ fontWeight: 'bold', marginRight: '6px' }}>
                                                    Num purchases:
                                                </div>
                                                <div>
                                                    will calculate and display the selected number of the next suggested assembly purchases
                                                </div>
                                            </div>
                                        </div>
                                    }>
                                        <div style={{ height: '24px', width: '24px', position: 'relative' }}>
                                            <Image
                                                alt='info icon popup additional information'
                                                src={infoIcon}
                                                fill
                                                unoptimized
                                            />
                                        </div>
                                        {/* <img alt='info icon popup additional information' src={infoIcon} style={{ height: '24px' }} /> */}

                                    </MouseOverPopover>
                                    <div
                                        className='importantText'
                                        style={{ fontSize: '18px', marginRight: '6px', marginLeft:'auto' }}
                                    >
                                        Num purchases
                                    </div>
                                    <input
                                        aria-label='Specify how many average protein trade costs to reserver'
                                        className='importantText textMedium2'
                                        style={{ borderRadius: '4px', width: '36px', height: '65%', backgroundColor: '#2D2D2D' }}
                                        type='number'
                                        value={numAL}
                                        onChange={
                                            (inner_e) => {
                                                try {
                                                    let x = Number(inner_e.target.value);
                                                    // x = Math.floor(x);
                                                    if (x < 1 || x > 99) {
                                                        return;
                                                    }
                                                    setNumAl(x);
                                                }
                                                catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        min="1"
                                        max="99"
                                    />
                                </div>

                                {/* reserve trades */}
                                <div  className='importantText' style={{display:'flex', alignItems:'center'}}>
                                    <div style={{marginRight:'auto'}}>
                                        {`Reserve Trade Costs`}
                                    </div>
                                    <input
                                        aria-label='Specify how many purchases to calculate into the future'
                                        className='importantText textMedium2'
                                        style={{ borderRadius: '4px', width: '36px', height: '65%', backgroundColor: '#2D2D2D' }}
                                        type='number'
                                        value={numTradeCosts}
                                        onChange={
                                            (inner_e) => {
                                                try {
                                                    let x = Number(inner_e.target.value);
                                                    // x = Math.floor(x);
                                                    if (x < 0 || x > 99) {
                                                        return;
                                                    }
                                                    setNumTradeCosts(x);
                                                }
                                                catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        min="0"
                                        max="99"
                                    />
                                </div>
                            </div>

                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flex: '1',
                                overflow: 'hidden',
                                borderBottomLeftRadius: '6px',
                                borderBottomRightRadius: '6px',
                                borderTopRightRadius: '6px'
                            }}
                        >
                            <div style={{
                                overflow: 'auto',
                                maxHeight: 'calc(100vh - 150px)',
                                flex: '1'
                            }}>
                                {cumulativePurchasableAssemblies.length > 0 && (
                                    <>
                                        {cumulativePurchasableAssemblies.map((e, index) => {
                                            return <CumulativeAssemblyLine
                                                assemblyID = {e.id}
                                                currentLevel = {e.currentLevel}
                                                count = {e.count}
                                                totalCost = {e.totalCost}
                                                index = {index + 1}
                                                futureLevel = {e.currentLevel + e.count}
                                                data={e.data}
                                                simplifiedView={simplifiedView}
                                            />
                                        })}
                                    </>
                                )}
                                {futureAssemblies.length > 0 && (
                                    <>
                                        {futureAssemblies.map((e, index) => {
                                            return <AssemblyLine
                                                key={index}
                                                key_inner={index}
                                                data={e.data}
                                                assemblyID={e.assembly.ID}
                                                index={index + 1}
                                                purchaseTime={e.purchaseTime}
                                                cost={e.cost}
                                                futureLevel={e.desiredLevel ? e.desiredLevel : e.assembly.Level + 1}
                                                simplifiedView={simplifiedView}
                                                bigTopMargin={cumulativePurchasableAssemblies.length > 0}
                                            />
                                        })}
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div >


                {/* Weight Table */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '550px',
                    maxHeight: 'calc(100% - 49px)',
                    margin: '12px 0 12px 0', padding: '12px', borderRadius: '12px'
                }}>
                    {/* header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', marginTop: '-6px', marginBottom: '6px' }}
                        >
                            Bonus Weights
                        </div >
                    </div>

                    {/* Actual table */}

                    <div
                        style={{
                            width: '100%',
                            maxHeight: 'calc(100% - 42px)'
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                overflow: 'hidden',
                                borderBottomLeftRadius: '6px',
                                borderBottomRightRadius: '6px'
                            }}
                        >
                            {/* Headers */}
                            <div style={{ display: 'flex' }}>

                                <div style={{
                                    width: '64%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.085)',
                                    borderTopLeftRadius: '6px', boxSizing: 'border-box',
                                    //  borderBottomLeftRadius: '6px',
                                    borderTop: '1.5px solid rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.8)', borderLeft: '1px solid rgba(255,255,255,0.8)',
                                }}>
                                    <div className='importantText' style={{ fontSize: '24px' }} >
                                        Bonus
                                    </div >
                                </div>
                                <div style={{
                                    width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.085)',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    boxSizing: 'border-box',
                                }}>
                                    <div className='importantText' style={{ fontSize: '24px' }} >
                                        Default
                                    </div >
                                </div>
                                <div style={{
                                    width: '18%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.085)',
                                    borderTopRightRadius: '6px', boxSizing: 'border-box',
                                    //  borderBottomRightRadius: '6px',
                                    borderTop: '1.5px solid rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.8)', borderRight: '1px solid rgba(255,255,255,0.8)',
                                }}>
                                    <div className='importantText' style={{ fontSize: '24px' }} >
                                        Current
                                    </div >
                                </div>


                            </div>
                            {/* Weights/Rows */}
                            <div
                                style={{
                                    overflow: 'auto',
                                    maxHeight: 'calc(100% - 30px)',
                                }}
                            >
                                {
                                    tempList.map((e, index) => {

                                        if (assemblyBonuses !== -1 && !(e.id in (assemblyBonuses as any))) {
                                            return <div key={index}></div>
                                        }

                                        if (!e.disabled)
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%', backgroundColor: index % 2 === 0 ? 'rgba(255,255,255, 0.085)' : 'rgba(255,255,255, 0.12)',
                                                        height: '40px',
                                                        borderBottomLeftRadius: index === (tempList.length - 1) ? '6px' : '',
                                                        borderBottomRightRadius: index === (tempList.length - 1) ? '6px' : '',

                                                    }}>
                                                    <AssemblyItem e={{ ...e, index: index }} currentWeights={currentWeights} setCurrentWeights={setCurrentWeights} />
                                                </div>
                                            )
                                        return <div key={index}></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >



            <div
                style={{

                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                }}
            >
                <div id='right_pillar' style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '6px' }} />
                {/* <div id='in_content_flex' style={{
                    marginTop: '1px', display: 'flex',
                    //  justifyContent: 'flex-end', 
                    alignItems: 'center',
                }} /> */}
            </div>
        </div >
    );
};