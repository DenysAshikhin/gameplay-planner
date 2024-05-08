"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import useLocalStorage from "use-local-storage";

import mathHelper from '../util/math.js';
import { ic_mapping, maxKey, calc_bonus } from './ic_mapping.js';
import Item from './Item.jsx';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import DefaultSave from '../util/tempSave.json';
import MouseOverPopover from "../util/Tooltip.jsx";
import panel_background from '../../../public/images/infinity_corner/panel_background.png';
import star_normal from '../../../public/images/infinity_corner/LastEraTopBackground.png';

export default function Infinity_Corner() {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


    const [upgradeWeightsClient, setUpgradeWeights] = useLocalStorage('ic_upgrade_weights', {});
    const [upgradeWeights, setRunTimeUpgradeWeights] = useState({});

    useEffect(() => {

        let tempVal = JSON.parse(JSON.stringify(upgradeWeightsClient));
        let found = false;

        //Check that we aren't missing any upgrade weights:
        for (const [key, value] of Object.entries(ic_mapping)) {
            if (key === 'star' || key === 'locked') {
                continue;
            }
            if (!tempVal[key]) {
                found = true;
                tempVal[key] = -1;
            }
        }

        if (found) {
            setUpgradeWeights(JSON.parse(JSON.stringify(tempVal)));
        }

        setRunTimeUpgradeWeights(JSON.parse(JSON.stringify(tempVal)));
    }, [data, upgradeWeightsClient, setUpgradeWeights]);


    const bigResults = useMemo(() => {

        let runData = JSON.parse(JSON.stringify(data));
        let runUpgradeWeights = JSON.parse(JSON.stringify(upgradeWeights));
        const star_level = runData[ic_mapping['star'].key];
        let currentPoints = mathHelper.createDecimal(runData['ReincarnationPointCurrentBD']);
        const a_key = runData.AscensionCount > maxKey ? maxKey : runData.AscensionCount;
        let totalWeight = 0;

        //Get sum of all weights
        Object.entries(runUpgradeWeights).forEach((inner_val) => {
            if (inner_val[0] === 'star') {
                return;
            }

            totalWeight += inner_val[1] === -1 ? ic_mapping[inner_val[0]].weight(a_key) : inner_val[1];
        });

        runUpgradeWeights['star'] = -1;

        let futureBuy = null;
        let bestIncreases = [];
        let canAfford = true;

        while (canAfford) {

            let allIncrease = [];


            let starItem = ic_mapping['star'];
            const starLevel = runData[starItem.key];
            const starCost = starItem.cost(starLevel);
            if (starItem.unlock <= a_key) {
                let starIncreaseBonus = 0;
                let starIncreaseWeightedBonus = 0;
                //calc the bonus gain from increasing the star level
                for (const [key, value] of Object.entries(runUpgradeWeights)) {

                    let upgradeItem = ic_mapping[key];

                    if (upgradeItem.unlock > a_key || key === 'star') {
                        continue;
                    }

                    let weight_ratio = (value === -1 ? ic_mapping[key].weight(a_key) : value) / totalWeight;
                    let key_temp = upgradeItem.key;

                    let currentBonus = mathHelper.divideDecimal(calc_bonus(starLevel, runData[key_temp]), 100);
                    let futureBonus = mathHelper.divideDecimal(calc_bonus(starLevel + 1, runData[key_temp]), 100);

                    //((future bonus + 1) / (current bonus + 1)) - 1
                    let increase =
                        mathHelper.subtractDecimal(
                            mathHelper.divideDecimal(
                                mathHelper.addDecimal(futureBonus, 1),
                                mathHelper.addDecimal(currentBonus, 1)
                            ),
                            1
                        );
                    let weightedIncrease = mathHelper.multiplyDecimal(increase, weight_ratio);
                    starIncreaseBonus = mathHelper.addDecimal(increase, starIncreaseBonus);
                    starIncreaseWeightedBonus = mathHelper.addDecimal(weightedIncrease, starIncreaseWeightedBonus);
                }
                const starCostIncrease = mathHelper.divideDecimal(starIncreaseWeightedBonus, starCost);


                const finalStarObj = {
                    level: starLevel,
                    costIncrease: starCostIncrease,
                    weighedIncrease: starIncreaseWeightedBonus,
                    increase: starIncreaseBonus,
                    current_bonus: -1,
                    future_bonus: -1,
                    item: starItem,
                    cost: starCost,
                    ratio: -1,
                    tempIncrease: -1
                };
                allIncrease.push(finalStarObj);
            }


            //calc the bonus gain from all bonuses 
            for (const [key, value] of Object.entries(runUpgradeWeights)) {

                let upgradeItem = ic_mapping[key];

                if (upgradeItem.unlock > a_key || key === 'star') {
                    continue;
                }

                let weight_ratio = (value === -1 ? ic_mapping[key].weight(a_key) : value) / totalWeight;
                let key_temp = upgradeItem.key;
                const level = runData[upgradeItem.key];
                let cost = upgradeItem.cost(level);
                let currentBonus = mathHelper.divideDecimal(calc_bonus(star_level, runData[key_temp]), 100);
                let futureBonus = mathHelper.divideDecimal(calc_bonus(star_level, runData[key_temp] + 1), 100);


                //((future bonus + 1) / (current bonus + 1)) - 1
                let increase =
                    mathHelper.subtractDecimal(
                        mathHelper.divideDecimal(
                            mathHelper.addDecimal(futureBonus, 1),
                            mathHelper.addDecimal(currentBonus, 1)
                        ),
                        1
                    );
                let weightedIncrease = mathHelper.multiplyDecimal(increase, weight_ratio);
                let costIncrease = mathHelper.divideDecimal(weightedIncrease, cost);
                let tempIncrease = mathHelper.divideDecimal(increase, cost);

                const finalObj = {
                    level: level,
                    costIncrease: costIncrease,
                    weighedIncrease: weightedIncrease,
                    increase: increase,
                    current_bonus: currentBonus,
                    future_bonus: futureBonus,
                    item: upgradeItem,
                    cost: cost,
                    ratio: weight_ratio,
                    tempIncrease: tempIncrease
                };

                allIncrease.push(finalObj);
            }

            allIncrease.sort((a, b) => {
                let comparison = a.costIncrease.greaterThan(b.costIncrease) ? -1 : 1;
                return comparison;
            })
            let bestIncrease = allIncrease[0];
            if (bestIncrease) {
                if (currentPoints.greaterThanOrEqualTo(bestIncrease.cost)) {

                    bestIncreases.push(bestIncrease);
                    currentPoints = mathHelper.subtractDecimal(currentPoints, bestIncrease.cost);
                    runData[bestIncrease.item.key]++;
                }
                else {
                    canAfford = false;
                    futureBuy = bestIncrease;
                }
            }
            else {
                canAfford = false;
            }
        }

        let grouped_buys = [];
        let buyMap = {};
        let counter = 0;
        bestIncreases.forEach((inner_val) => {
            counter++;
            if (!buyMap[inner_val.item.label]) {
                buyMap[inner_val.item.label] = { item: inner_val.item, numPurchases: 0 };
            }
            buyMap[inner_val.item.label].numPurchases++;
        });

        for (const [key, value] of Object.entries(buyMap)) {
            grouped_buys.push(value);
        }


        return { buyMap: buyMap, raw_increases: bestIncreases, futureBuy: futureBuy, grouped_buys: grouped_buys, futureBuyMode: grouped_buys.length === 0 };
    }, [upgradeWeights, data])


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >

             {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            {/* Title */}
            <div className='importantText'
                style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '6px 12px 0',
                    border: '1px solid white',
                    borderRadius: '12px',
                    width: '1230px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255, 0.07)',
                }}
            >
                Infinity Corner
                <MouseOverPopover tooltip={
                    <div style={{ padding: '6px' }}>
                        Any affordable purchases are flashing in green, othewise the next best (unaffordable) purchase is in yellow
                    </div>
                }>
                    <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>

                        <Image
                            alt='on hover I in a cirlce icon, shows more information on hover'
                            fill
                            src={infoIcon}
                            unoptimized={true}
                        />
                    </div>
                </MouseOverPopover>
            </div>
            <div style={{
                display: 'flex',
                overflow: 'auto'
            }}>
                {/* Upgrade Master List */}
                <div
                    style={{
                        minWidth: '1230px',
                        minHeight: '750px',
                        width: '1230px',
                        height: '750px',
                        position: 'relative',
                        border: '1px solid white',
                        borderRadius: '12px',
                        overflow: 'auto',
                        margin: '12px 12px 0 12px',

                    }}
                >
                    <Image
                        alt={`panelbackground for the infinity corner`}
                        src={panel_background}
                        fill
                        priority
                        unoptimized
                    />

                    <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '100%',
                        height: '100%'
                    }}>
                        <Image
                            alt={`panelbackground for the infinity corner`}
                            src={star_normal}
                            fill
                            priority
                            unoptimized
                        />
                        {Object.keys(ic_mapping).map((inner_val) => {

                            if (inner_val !== 'locked') {
                                return <Item key={`${inner_val}-item`} map_key={inner_val} data={data} setUpgradeWeights={setUpgradeWeights}
                                    buyMap={bigResults.buyMap}
                                    futureBuyMode={bigResults.futureBuyMode}
                                    futureBuy={bigResults.futureBuy}
                                />
                            }
                            else {
                                return <div key={`${inner_val}-item`} />
                            }
                        })}
                    </div>
                </div>
            </div>
            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }} />
        </div >
    );
}