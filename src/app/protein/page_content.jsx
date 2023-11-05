"use client"


import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { BonusMap } from '../util/itemMapping.js';
import farmingHelper from '../util/farmingHelper.js';
import mathHelper from '../util/math.js';

import AssemblyItem from './AssemblyItem.jsx';
import AssemblyLine from './AssemblyLine.jsx';
import MouseOverPopover from "../util/Tooltip.jsx";

import infoIcon from '../../../public/images/icons/info_white.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    gtagOptions: {
        send_page_view: false
    },
}]);



export default function Protein() {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


    const [currentWeights, setCurrentWeights] = useState({});
    const [cumulativeTime, setCumulativeTime] = useLocalStorage(`cumulativeTime`, false);
    const [numAL, setNumAl] = useLocalStorage(`numAL`, 5);

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
    let runningTime = 0;
    let currProtein = mathHelper.createDecimal(data.ProteinCurrent);
    let protRate = farmingHelper.calcProteinPerSecond(tempData);
    let bestAssemblies = [];
    let totalLevels = 0;
    let currentBonusTotals = {};

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
            let timeToPurchase = mathHelper.subtractDecimal(cost, currProtein);

            if (currProtein.greaterThan(cost)) {
                timeToPurchase = 0;
                if (cumulativeTime) {
                    currProtein = mathHelper.subtractDecimal(currProtein, cost);
                }
            }
            else {
                timeToPurchase = mathHelper.divideDecimal(timeToPurchase, protRate);
                if (cumulativeTime) {
                    currProtein = mathHelper.createDecimal(0);
                }
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

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
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
                            maxHeight: 'calc(100vh - 50px)'
                        }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', marginTop: '-6px', marginBottom: '6px' }}
                        >
                            Best Purchase Sequence
                        </div >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-3px', marginBottom: '6px' }}>
                            {/* Cumulative time  */}
                            <div
                                className='importantText'
                                style={{ fontSize: '18px', }}
                            >
                                Use cumulative purchase time:


                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        setCumulativeTime(e.target.checked ? 1 : 0)
                                    }}
                                    checked={!!cumulativeTime}
                                    value={!!cumulativeTime}
                                />

                            </div>


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


                            {/* num purchases */}
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '2px' }}>
                                <div
                                    className='importantText'
                                    style={{ fontSize: '18px', marginRight: '6px' }}
                                >
                                    Num purchases
                                </div>
                                <input
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

                                                ReactGA.event({
                                                    category: "protein_interaction",
                                                    action: `changed_num_AL`,
                                                    label: `${x}`,
                                                    value: x
                                                })

                                            }
                                            catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                    min="1"
                                    max="99"
                                />
                            </div>


                        </div>
                        <div
                            style={{
                                height: '100%',
                                overflow: 'hidden',
                                borderBottomLeftRadius: '6px',
                                borderBottomRightRadius: '6px',
                                borderTopRightRadius: '6px'
                            }}
                        >
                            <div style={{
                                overflow: 'auto',
                                maxHeight: 'calc(100vh - 150px)',
                            }}>
                                {bestAssemblies.length > 0 && (
                                    <>
                                        {bestAssemblies.map((e, index) => {
                                            return <AssemblyLine key={index} data={e.data} assemblyID={e.assembly.ID} index={index + 1} purchaseTime={e.purchaseTime} cost={e.cost} />
                                        })}
                                        {/* <AssemblyLine data={bestAssemblies[0].data} assemblyID={bestAssemblies[0].assembly.ID} index={1} purchaseTime={bestAssemblies[0].purchaseTime} cost={bestAssemblies[0].cost} />
                                        <AssemblyLine data={bestAssemblies[1].data} assemblyID={bestAssemblies[1].assembly.ID} index={2} purchaseTime={bestAssemblies[1].purchaseTime} cost={bestAssemblies[1].cost} />
                                        <AssemblyLine data={bestAssemblies[2].data} assemblyID={bestAssemblies[2].assembly.ID} index={3} purchaseTime={bestAssemblies[2].purchaseTime} cost={bestAssemblies[2].cost} />
                                        <AssemblyLine data={bestAssemblies[3].data} assemblyID={bestAssemblies[3].assembly.ID} index={4} purchaseTime={bestAssemblies[3].purchaseTime} cost={bestAssemblies[3].cost} />
                                        <AssemblyLine data={bestAssemblies[4].data} assemblyID={bestAssemblies[4].assembly.ID} index={5} purchaseTime={bestAssemblies[4].purchaseTime} cost={bestAssemblies[4].cost} /> */}
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
                                    border: '1px solid rgba(255,255,255,0.8', boxSizing: 'border-box',
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
                                        if (!e.disabled)
                                            return (
                                                <div style={{
                                                    display: 'flex',
                                                    width: '100%', backgroundColor: index % 2 === 0 ? 'rgba(255,255,255, 0.085)' : 'rgba(255,255,255, 0.12)',
                                                    height: '40px',
                                                    borderBottomLeftRadius: index === (tempList.length - 1) ? '6px' : '',
                                                    borderBottomRightRadius: index === (tempList.length - 1) ? '6px' : '',

                                                }}>
                                                    <AssemblyItem e={{ ...e, index: index }} currentWeight={currentWeights} setCurrentWeights={setCurrentWeights} />
                                                </div>
                                            )
                                        return null
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};