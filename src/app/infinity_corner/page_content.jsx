"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
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

const prom_list = [105880738755380,
    105868709902550,
    105855478164437,
    105840923252513,
    105824912849396,
    105807301405968,
    105787928818197,
    105766618971649,
    105743178140446,
    105717393226123,
    105689029820367,
    105657830074036,
    105623510353072,
    105612870925345,
    105601699526232,
    105563947833171,
    105552217864102,
    105539901396580,
    105498374534213,
    105485442243315,
    105471863337872,
    105426183789269,
    105411925938554,
    105396955195303,
    105346707691839,
    105330988411425,
    105320957297541,
    105304452053107,
    105249179799297,
    105238647129719,
    105221316623063,
    105210257320006,
    105192060288017,
    105131260808826,
    105119648540616,
    105100541657028,
    105088348775408,
    105068286547640,
    105001407120530,
    104988604594829,
    104967539255673,
    104954096603687,
    104931977997573,
    104858410627752,
    104844295843166,
    104821071306746,
    104810431879019,
    104795611355204,
    104771225591963,
    104760054192850,
    104679130086047,
    104663568536041,
    104637963484638,
    104626233515569,
    104609893888063,
    104583008584090,
    104570692116568,
    104481675599084,
    104464518990203,
    104436289421032,
    104423357130134,
    104405342690809,
    104375701643179,
    104362122737736,
    104264204568504,
    104245289407212,
    104235258293328,
    104204135193317,
    104189877342602,
    104170016423246,
    104159483753668,
    104126804498656,
    104111833755405,
    104004123769250,
    103983269803926,
    103972210500869,
    103937897283106,
    103922178002692,
    103900281339102,
    103888669070892,
    103852640192241,
    103836134947807,
    103717653963036,
    103694662466266,
    103682469584646,
    103644639262063,
    103627308755407,
    103603167683799,
    103590365158098,
    103550643319386,
    103420314236138,
    103402117204149,
    103376769078960,
    103363326426974,
    103321618496326,
    103302511612738,
    103275896081290,
    103261781296704,
    103217987969524,
    103074625977951,
    103054563750183,
    103026617442163,
    103011796918348,
    102965813924809,
    102944748585653,
    102915404962232,
    102899843412226,
    102851561269010,
    102693863078280,
    102671744472166,
    102640933667573,
    102624594040067,
    102573897789690,
    102550673253270,
    102518321908448,
    102501165299567,
    102447934236671,
    102274466226868,
    102250080463627,
    102216111551564,
    102198097112239,
    102142204496198,
    102116599444795,
    102080932087129,
    102062016925837,
    102003329678994,
    101812514868211,
    101785629564238,
    101748178838688,
    101728317919332,
    101666696310147,
    101638466740976,
    101599143479149,
    101578289513825,
    101368393221964,
    101303690532320,
    101274049484690,
    101232760059771,
    101210863396181,
    101142925572055,
    101111802472044,
    101068448575879,
    101045457079109,
    100814571158062,
    100743236442729,
    100710557187717,
    100665035596744,
    100640894525136,
    100565993074037,
    100531679856274,
    100483882185753,
    100229907672601,
    100204559547412,
    100125913023758,
    100089884145107,
    100039696591060,
    100013081059612,
    99930502209775,
    99892671887192,
    99839974955442,
    99560602990975,
    99532656682955,
    99445948890626,
    99406227051914,
    99350895273577,
    99321551650156,
    99230508468211,
    99188800537563,
    98881491376649,
    98823393009395,
    98792582204802,
    98696986863759,
    98653193536579,
    98592190250962,
    98559838906140,
    98459463798045,
    98413480804506,
    98075440727500,
    98011387277602,
    97977418365539,
    97872024502039,
    97823742358823,
    97756486236430,
    97720818878764,
    97610155322089,
    97559459071712,
    97187614987006,
    97116996058494,
    97079545332944,
    96963348598436,
    96910117535540,
    96835967660602,
    96796644398775,
    96674637827541,
    96618745211500,
    96209716718323,
    96131859349638,
    96090569924719,
    95962463024924,
    95903775778081,
    95822025540962,
    95778671644797,
    95644159400012,
    95582537790827,
    95132606448333,
    95046768699358,
    95001247108385,
    94860009251361,
    94795306561717,
    94705176925293,
    94657379254772,
    94509079504896,
    94441141680770,
    93946217204026,
    93851581085781,
    93801393531734,
    93645678794365,
    93574344079032,
    93474976154875,
    93422279223125,
    93258778748887,
    93183877297788,
    92639460373370,
    92535124053005,
    92479792274668,
    92308116776718,
    92229470253064,
    92119917116681,
    92061818749427,
    91881559476580,
    91798980626743,
    91200122009883,
    91085091216681,
    91024087931064,
    90834815694574,
    90748107902245,
    90627325569383,
    90563272119485,
    90364536271171,
    90273493089226,
    89614748610680,
    89487927161174,
    89420671038781,
    89211998398051,
    89185415516380,
    89089820175337,
    88956657653356,
    88886038724844,
    88666932452078,
    88566557343983,
    87841938417582,
    87702117769502,
    87627967894564,
    87397906308159,
    87292512444659,
    87145700764175,
    87067843395490,
    86826278729765,
    86715615173090,
    85918534354049,
    85886634896043,
    85732482631535,
    85650732394416,
    85397089495405,
    85280892760897,
    85119032883163,
    85033195134188,
    84766870090226,
    84644863518992,
    83768074618047,
    83598121746427,
    83507992110003,
    83228350813843,
    83100243914048,
    82921793398847,
    82827157280602,
    82533533919634,
    82399021674849,
    81434553883810,
    81423618563056,
    81385339213449,
    81197966172488,
    81098598248331,
    80790293719315,
    80649055862291,
    80452314169282,
    80347977848917,
    80024258093450,
    79875958343574,
    78815043773431,
    78803014920601,
    78596436142941,
    78486883006558,
    78146977263318,
    77991262525949,
    77774354809406,
    77659324016204,
    77302422985802,
    77138922511564,
    75971916484406,
    75925981264878,
    75912749526765,
    75879805158192,
    75652052055822,
    75531269722960,
    75156523641037,
    74984848143087,
    74745707385599,
    74618885936093,
    74225402550074,
    72941695920201,
    72761436647354,
    72746881735430,
    26258267084263,
    26007169288900,
    25874006766919,
    25460849211599,
    25271576975109,
    25007924289978,
    24868103641898,
    24434288208812,
    24379165945378,
    22967088652517,
    22768352804203,
    22752342401086,
    22475507081698,
    22328695401214,
    21873189196474,
    21832008735758,
    21623336095028,
    21332659009671,
    21178506745163,
    20700225230186,
    19146940208039,
    18927833935273,
    18910222491845,
    18605011552220,
    18443151674486,
    17940956083760];


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
                    width: '1221px',
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
                        minWidth: '1221px',
                        minHeight: '734px',
                        width: '1221px',
                        height: '734px',
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

        </div >
    );
}