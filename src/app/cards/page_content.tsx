"use client"


import { isMobile } from 'mobile-device-detect';
import './card.css';
import { useState, useEffect, useRef } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import MouseOverPopover from "../util/Tooltip";
import { DefaultWeightMap } from '../util/itemMapping';

import mathHelper from '../util/math';
import reincHelper from '../util/reincHelper';
import helper from '../util/helper';

import rightArrow from '@images/icons/right_arrow_white.svg';
import infoIcon from '@images/icons/info_thick.svg';
import infoIconRed from '@images/icons/info_red.svg';
// import chargeImg from '@images/cards/charge.png'
import chargeImg from '@images/cards_v2/battery.png'

import greenBorder from '@images/cards_v2/CardSelectedGreen.png'
import redBorder from '@images/cards_v2/CardSelectedRed.png'

import useLocalStorage from "use-local-storage";

import DefaultSave from '../util/tempSave.json';

import Image from 'next/image';

const PREFIX = 'card';

const classes = {
    card: `${PREFIX}-card`,
    content: `${PREFIX}-content`,
    positiveChargeResult: `${PREFIX}-positiveChargeResult`,
    negativeChargeResult: `${PREFIX}-negativeChargeResult`
};
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import {
    POTATO,
    CLASSEXP,
    SKULL,
    CONFECTIONEXP,
    REINCARNATIONEXP,
    ITEMRATING,
    POOPBONUS,
    MILKBONUS,
    WHACKSCORE,
    BREWINGEXP,
    CALCIUMEXP,
    FERMENTINGEXP,
    RESIDUEBONUS,
    WORMQTY,
    LARVAQTY,
    LARVAEFF,
    ATTACKHP,
    PETDMG,
    PETLEVELEXP,
    PETRANKEXP,
    CARDPOWERB,
    CARDEXPB,
    HEALTHYBONUS,
    FRIESBONUS,
    PROTEINBONUS,
    GHBONUS,
    MININGEXP,
    MININGPWR,
    cardMapImg, cardLabelImg, defaultWeights, CARD_DISPLAY_IDS, permPowerBonusFormula, tempPowerBonusFormula, powerFormula, cardIDMap, maxKey, cardSumWeights
} from '../util/cardMapping';


let reincLevelRequirements = {};

interface CardCardProps {
    vertical,
    displayMode,
    bonusMode,
    data,
    card,
    weightMap,
    i,
    applyWeights,
    cardMap,
    setCardMap,
    resetWeights,
    cardWeightInner,
    cardWeight,
    setCardWeightNew,
    classes,
    key,
}

const CardCard = ({
    vertical,
    displayMode,
    bonusMode,
    data,
    card,
    weightMap,
    i,
    applyWeights,
    cardMap,
    setCardMap,
    resetWeights,
    cardWeightInner,
    cardWeight,
    setCardWeightNew,
    classes,
}: Partial<CardCardProps>) => {

    const {
        // CurrentExp,
        // ExpNeeded,
        Found,
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
    } = card;
    const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

    let defaultWeight = cardIDMap[ID].weights[data.AscensionCount > maxKey ? maxKey : data.AscensionCount];
    let sumWeight = cardSumWeights[data.AscensionCount > maxKey ? maxKey : data.AscensionCount];

    const finalWeight = cardWeight === -1 ? defaultWeight : cardWeight;

    const [finalAfter, setFinalAfter] = useState(mathHelper.createDecimal(-1));
    const [finalBefore, setFinalBefore] = useState(mathHelper.createDecimal(-1));
    const [flatIncrease, setFlatIncrease] = useState(mathHelper.createDecimal(-1));
    const [percIncrease, setPercentIncrease] = useState(mathHelper.createDecimal(-1));
    const [weightIncrease, setWeightIncrease] = useState(mathHelper.createDecimal(-1));
    const [loggedWeightIncrease, setLoggedWeightIncrease] = useState(mathHelper.createDecimal(-1));
    const [finalTemp, setFinalTemp] = useState(mathHelper.createDecimal(-1));

    const [refreshMath, setRefreshMath] = useState(true);

    useEffect(() => {


        setRefreshMath(false);
        if (Found === 0) {
            if (setCardMap)
                setCardMap((e) => {
                    if (!e[ID]) {
                        return e;
                    }
                    let tempy = { ...e };
                    delete tempy[ID]
                    return tempy;
                })
            return;
        }


        if (ID === 18) {
            let bigsad = -1;
        }


        let permValueBefore = mathHelper.createDecimal(PowerPermaBD);
        let perm_empty = false;
        if (permValueBefore.equals(mathHelper.createDecimal(0))) {
            perm_empty = true;
            permValueBefore = mathHelper.createDecimal(0.000000001);
        }
        let tempValueBefore = mathHelper.createDecimal(PowerTempBD);
        let temp_empty = false;
        if (tempValueBefore.equals(mathHelper.createDecimal(0))) {
            temp_empty = true;
            tempValueBefore = mathHelper.createDecimal(0.00000001);
        }




        let permValueAfter = mathHelper.addDecimal(permValueBefore,
            mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma)
        );
        let tempValueAfter = mathHelper.multiplyDecimal(tempValueBefore, (1 - ChargeTransfertPowerTemp));

        let tempBonusBefore = tempPowerBonusFormula[ID](tempValueBefore);
        let permBonusBefore = permPowerBonusFormula[ID](permValueBefore);


        let level_mult = 0.02;
        
        if (ID == 38 || ID == 39) {//only sweet potatoe for now
            level_mult = 0.0025;
        }
        if (ID == 40 || ID == 41) {//only sweet potatoe for now
            level_mult = 0.001;
        }
        

        let finalBefore = mathHelper.multiplyDecimal(
            mathHelper.subtractDecimal(
                mathHelper.multiplyDecimal(tempBonusBefore, permBonusBefore),
                1
            ),
            ((1.0 + Level * level_mult) * 100)
        );
        if(ID == 41){
            let bigsad = -1;
        }

        let temp1 = tempPowerBonusFormula[ID](mathHelper.multiplyDecimal(tempValueBefore, (1.0 - ChargeTransfertPowerTemp)))
        let temp2 = permPowerBonusFormula[ID](
            mathHelper.addDecimal(permValueBefore, mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma))
        )
        let finalAfter =
            mathHelper.multiplyDecimal(
                mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
                (1.0 + Level * level_mult) * 100);
        if (temp_empty && perm_empty) {
            finalBefore = mathHelper.createDecimal(0);
            finalAfter = mathHelper.createDecimal(0);
        }

        let percIncrease = mathHelper.divideDecimal(finalAfter, finalBefore);
        let flatIncrease = mathHelper.subtractDecimal(finalAfter, finalBefore);
        let weightIncrease = mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), finalWeight);

        let loggedWeightIncrease = finalBefore.greaterThan(finalAfter) ? mathHelper.createDecimal(-1) :
            mathHelper.multiplyDecimal(
                mathHelper.multiplyDecimal(
                    mathHelper.subtractDecimal(
                        mathHelper.logDecimal(mathHelper.addDecimal(finalAfter, 1), 10),
                        mathHelper.logDecimal(mathHelper.addDecimal(finalBefore, 1), 10)
                    ),
                    mathHelper.divideDecimal(finalWeight, sumWeight)
                )
                , 100
                // finalWeight
            );
            
        if (ID === 18) {
            let bigsad = -1;
        }

        setFinalTemp(tempValueAfter);
        setFinalAfter(finalAfter);
        setFinalBefore(finalBefore);
        setWeightIncrease(weightIncrease);
        setFlatIncrease(flatIncrease);
        setPercentIncrease(percIncrease);
        setLoggedWeightIncrease(loggedWeightIncrease);

        if (resetWeights !== -3) {
            if (!(ID in cardMap)) {
                setCardMap((e) => {
                    let tempy = { ...e };
                    tempy[ID] = {
                        ID: ID, finalAfter: finalAfter,
                        percIncrease: percIncrease,
                        flatIncrease: flatIncrease,
                        weightIncrease: weightIncrease,
                        loggedWeightIncrease: loggedWeightIncrease,
                        weight: finalWeight
                    };
                    return tempy;
                })
            } else if (!cardMap[ID]?.finalAfter.equals(finalAfter) || !cardMap[ID]?.weightIncrease.equals(weightIncrease)) {
                setCardMap((e) => {
                    let tempy = { ...e };
                    tempy[ID] = {
                        ID: ID, finalAfter: finalAfter, percIncrease: percIncrease,
                        flatIncrease: flatIncrease,
                        weightIncrease: weightIncrease,
                        loggedWeightIncrease: loggedWeightIncrease,
                        weight: finalWeight
                    };
                    return tempy;
                })
            }

        }


    }, [cardMap, finalWeight, ChargeTransfertPowerPerma, ChargeTransfertPowerTemp, setCardMap,
        sumWeight,
        cardWeight, setCardWeightNew,
        resetWeights,
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
        refreshMath,
        Found
    ])


    let displayTotalsRatio = 0;
    let isPositiveChargeRatio = finalAfter.greaterThan(finalBefore);

    let middleCard = false;
    let num = i + 1;

    // if (Math.floor(num / 5) % 2 === 0) {
    //     middleCard = (num > 1) && (num % 2 === 0) && (num % 5 !== 0)
    // } else {
    //     middleCard = (num > 1) && (num % 2 === 1) && (num % 5 !== 0)
    // }
    middleCard = num % 5 == 2 || num % 5 == 4;

    let margin = ``;
    if (vertical && false) {
        margin = num % 2 === 0 && num + 1 ? '6px 0' : ''
    } else if (false) {
        margin = middleCard ? `0 6px ${num > 1 && num % 5 === 0 ? '12px' : '0px'} 6px` : '';
    } else {
        margin = `0 3px 0 3px`;
    }

    let displayLabel = vertical;
    vertical = false;

    let extraText = `(+${mathHelper.subtractDecimal(finalAfter, finalBefore).toExponential(2)})`;
    if (displayMode === 'perc') {
        let tempy = helper.roundTwoDecimal(mathHelper.divideDecimal(finalAfter, finalBefore).toNumber() * 100 - 100);
        extraText = `(${tempy}%)`
    } else if (displayMode === 'flat') {
        let tempy = mathHelper.subtractDecimal(finalAfter, finalBefore).toExponential(2).toString();
        extraText = `(+${tempy})`
    } else if (displayMode === 'weight') {
        let tempy = mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), finalWeight)
        extraText = `(${tempy.toNumber().toExponential(2)})`
    }
    const multiplier = vertical ? 110 : 140;


    let finalBonusDisplay = finalAfter;
    switch (bonusMode) {
        case 'current':
            finalBonusDisplay = finalBefore;
            break;
        case 'future':
            finalBonusDisplay = finalAfter;
            break;
        case '%gain':
            finalBonusDisplay = finalAfter.eq(finalBefore) ? mathHelper.createDecimal(0) : mathHelper.multiplyDecimal(mathHelper.subtractDecimal(percIncrease, 1), 100);
            break;
        case 'xgain':
            finalBonusDisplay = finalAfter.eq(finalBefore) ? mathHelper.createDecimal(0) : percIncrease;
            break;
    }


    return (
        <div
            key={i}
            style={{
                // border: isPositiveChargeRatio ? '2px solid green' : '1px solid black',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                alignItems: displayMode === 'original' ? 'center' : '',
                justifyContent: 'center',
                // justifyContent: displayMode === 'original' ? 'center' : '',
                width: displayMode === 'original' ? `${227 / 227 * multiplier}px` : '100%',
                height: displayMode === 'original' ? `${316 / 227 * multiplier}px` : '48px',
                margin: displayMode === 'original' ? margin : `${num === 1 ? '0' : '6px'} 0 0 0`,
                padding: displayMode === 'original' ? '' : '0 6px 0 6px',
                boxSizing: 'border-box',
                position: displayMode === 'original' ? 'relative' : `static`,
                backgroundColor: 'rgba(255,255,255, 0.1)'
            }}>
            {displayMode === 'original' && (
                <>
                    <MouseOverPopover
                        tooltip={
                            <div style={{ padding: '6px' }}>
                                <h3 style={{ margin: 0, textAlign: 'center' }}>
                                    {cardIDMap[ID].label}
                                </h3>
                                <div>
                                    Current Bonus: {helper.formatNumberString(finalBefore)}%
                                </div>
                                <div>
                                    Charged Bonus: {helper.formatNumberString(finalAfter)}%
                                </div>
                                <div>
                                    Absolute Increase: {helper.formatNumberString(flatIncrease)}
                                </div>
                                <div>
                                    Percentage
                                    Increase: {helper.formatNumberString(mathHelper.multiplyDecimal(percIncrease, 100))}
                                </div>
                                <div>
                                    Weighted Increase: {helper.formatNumberString(weightIncrease)}
                                </div>
                                <div>
                                    Current Weight:{finalWeight}
                                </div>
                            </div>
                        }
                    >
                        <div>
                            <div style={{
                                width: `${227 / 227 * multiplier}px`,
                                height: `${316 / 227 * multiplier}px`,
                                margin: '0 auto', position: 'relative'
                            }}>
                                <Image
                                    alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                    fill
                                    src={cardMapImg[ID].img}
                                    unoptimized={true}
                                    priority
                                />

                                {isPositiveChargeRatio && (
                                    <Image
                                        alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                        fill
                                        src={greenBorder as any}
                                        unoptimized={true}
                                        priority
                                    />
                                )}
                                {!isPositiveChargeRatio && (
                                    <Image
                                        alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                        fill
                                        src={redBorder as any}
                                        unoptimized={true}
                                        priority
                                    />
                                )}

                                {/* Final bonus */}
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        fontSize: vertical ? '13px' : '16px',
                                        top: vertical ? '4px' : '6px',
                                        right: '8px',
                                    }}
                                >
                                    {`${helper.formatNumberString(finalBonusDisplay)}${bonusMode === 'xgain' ? 'X' : '%'}`}
                                </div>

                                {/* Final temp */}
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        fontSize: vertical ? '10px' : '12px',
                                        top: vertical ? '24px' : '32px',
                                        right: '8px',
                                    }}
                                >
                                    {`${helper.formatNumberString(finalTemp)}`}
                                </div>


                                <div
                                    className='importantText'
                                    style={{
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        fontSize: vertical ? '12px' : '14px',
                                        bottom: vertical ? '2px' : '4px',
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    {cardIDMap[ID].label}
                                </div>
                            </div>
                        </div>
                    </MouseOverPopover>


                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: '23px',
                            left: '30px',
                            zIndex: '3',
                        }}
                    >
                        <input
                            aria-label='Specify the weight/importance for this card'
                            style={{
                                width: '55px',
                                color: cardWeight !== defaultWeight && cardWeight !== -1 ? 'black' : 'gray',
                                fontWeight: cardWeight !== defaultWeight && cardWeight !== -1 ? 'bold' : '',
                                borderRadius: '6px',
                                fontSize: '12px',
                                padding: '0 0 0 0',
                                margin: '0',
                                textAlign: 'center'
                            }}
                            type='number'
                            value={finalWeight}
                            onChange={
                                (e) => {
                                    try {
                                        let x = Number(e.target.value);
                                        // x = Math.floor(x);
                                        if (x < 0 || x > 999999) {
                                            return;
                                        }
                                        setCardWeightNew(x);
                                        setRefreshMath(true);

                                        ReactGA.event({
                                            category: "card_interaction",
                                            action: `changed_card_weight`,
                                            label: `${cardIDMap[ID].label}`,
                                            value: x
                                        })
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }}
                            min="0"
                            max="999999"
                        />

                        <MouseOverPopover tooltip={

                            <div>
                                {`The weight (importance) of this card/stat. Feel free to change this`}
                            </div>
                        }
                            opacity={1}
                        >
                            <div style={{ position: 'relative', height: '16px', width: '16px', marginLeft: '2px' }}>
                                <Image
                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                    fill
                                    src={infoIcon}
                                    unoptimized={true}
                                />
                            </div>
                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                        </MouseOverPopover>
                    </div>
                </>
            )}

            {displayMode !== 'original' && (
                <>
                    <MouseOverPopover
                        tooltip={
                            <div style={{ padding: '6px' }}>
                                <h3 style={{ margin: 0, textAlign: 'center' }}>
                                    {cardIDMap[ID].label}
                                </h3>
                                <div>
                                    Current Bonus: {helper.formatNumberString(finalBefore)}%
                                </div>
                                <div>
                                    Charged Bonus: {helper.formatNumberString(finalAfter)}%
                                </div>
                                <div>
                                    Absolute Increase: {helper.formatNumberString(flatIncrease)}
                                </div>
                                <div>
                                    Percentage Increase: {helper.formatNumberString(mathHelper.multiplyDecimal(mathHelper.subtractDecimal(percIncrease, 1), 100))}
                                </div>
                                <div>
                                    Weighted Increase: {helper.formatNumberString(weightIncrease)}
                                </div>
                                <div>
                                    Current Weight:{finalWeight}
                                </div>
                            </div>
                        }


                    >
                        <div style={{
                            display: 'flex',
                            flex: '1',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                // margin: '0 auto',
                                position: 'relative', width: '33px', height: '33px'
                            }}>
                                <Image
                                    alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                    // fill
                                    src={cardLabelImg[ID].img}
                                    unoptimized={true}
                                    priority
                                />
                            </div>
                            <div
                                className='importantText'
                                style={{
                                    fontWeight: 'bold',
                                    bottom: vertical ? '2px' : '4px',
                                    // width: '100%',
                                    // textAlign: 'center',
                                    marginLeft: '6px',
                                    fontSize: '20px'
                                }}
                            >
                                {cardIDMap[ID].label}
                            </div>

                            <div
                                className='importantText'
                                style={{
                                    fontWeight: 'bold',
                                    bottom: vertical ? '2px' : '4px',
                                    // width: '100%',
                                    marginLeft: 'auto',
                                    fontSize: '20px'
                                }}
                            >
                                {displayMode === 'logged' && (
                                    <>
                                        {helper.formatNumberString(loggedWeightIncrease)}
                                    </>
                                )}
                                {(displayMode !== 'logged') && (
                                    <>
                                        {displayMode === 'weight' ? helper.formatNumberString(weightIncrease) : helper.formatNumberString(mathHelper.multiplyDecimal(mathHelper.subtractDecimal(percIncrease, 1), 100)) + '%'}
                                    </>
                                )}

                            </div>
                        </div>
                    </MouseOverPopover>
                </>
            )}

        </div>
    );
}



const CalcReinc = function (data, reincCardCharges?: any) {

    data = JSON.parse(JSON.stringify(data));
    let classExp = mathHelper.multiplyDecimal(data.CurrentLevel, mathHelper.pow(1.001, mathHelper.min(1000.0, data.CurrentLevel)));
    let class2 = mathHelper.max(1.0, mathHelper.subtractDecimal(mathHelper.logDecimal(data.CurrentLevel, 5.0), 2.0));
    let class3 = mathHelper.max(1.0, 1.0 + (data.CurrentLevel / 2000.0 - 0.5));
    let classTotal = mathHelper.multiplyDecimal(classExp, mathHelper.multiplyDecimal(class2, class3))
    let timerBonuses = data.TimerReincBonuses;
    let otherBonuses = mathHelper.createDecimal(data.ReincarnationBonusesBD);


    if (reincCardCharges) {
        const { CardsCollection } = data;
        const cardsById = CardsCollection.reduce((accum, card) => {
            accum[card.ID] = card;
            return accum;
        }, {});

        let card = cardsById[REINCARNATIONEXP];

        const {
            CurrentExp,
            ExpNeeded,
            Found,
            ID,
            Level,
            PowerPermaBD,
            PowerTempBD,
        } = card;
        const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

        let tempValueBefore = mathHelper.createDecimal(PowerTempBD);
        let permValueBefore = mathHelper.createDecimal(PowerPermaBD);

        let tempBonusBefore = tempPowerBonusFormula[ID](tempValueBefore);
        let permBonusBefore = permPowerBonusFormula[ID](permValueBefore);


        let tempValueAfter = mathHelper.multiplyDecimal(tempValueBefore, (1 - ChargeTransfertPowerTemp));
        let permValueAfter = mathHelper.addDecimal(permValueBefore,
            mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma)
        );


        let finalBefore = mathHelper.multiplyDecimal(
            mathHelper.subtractDecimal(
                mathHelper.multiplyDecimal(tempBonusBefore, permBonusBefore),
                1
            ),
            ((1.0 + Level * 0.02) * 100)
        );

        let temp1 = tempPowerBonusFormula[ID](mathHelper.multiplyDecimal(tempValueBefore, (1.0 - ChargeTransfertPowerTemp)))
        let temp2 = permPowerBonusFormula[ID](
            mathHelper.addDecimal(permValueBefore, mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma))
        )
        let finalAfter =
            mathHelper.multiplyDecimal(
                mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
                (1.0 + Level * 0.02) * 100);

        if (reincCardCharges > 1) {
            for (let i = 1; i < reincCardCharges; i++) {
                tempValueBefore = mathHelper.addDecimal(tempValueAfter, 0);
                permValueBefore = mathHelper.addDecimal(permValueAfter, 0);


                tempValueAfter = mathHelper.multiplyDecimal(tempValueBefore, (1 - ChargeTransfertPowerTemp));
                permValueAfter = mathHelper.addDecimal(permValueBefore,
                    mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma)
                );

                temp1 = tempPowerBonusFormula[ID](mathHelper.multiplyDecimal(tempValueBefore, (1.0 - ChargeTransfertPowerTemp)))
                temp2 = permPowerBonusFormula[ID](
                    mathHelper.addDecimal(permValueBefore, mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma))
                )
                finalAfter =
                    mathHelper.multiplyDecimal(
                        mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
                        (1.0 + Level * 0.02) * 100);

            }
        }

        otherBonuses = mathHelper.divideDecimal(otherBonuses, finalBefore);
        otherBonuses = mathHelper.multiplyDecimal(otherBonuses, finalAfter);
    }


    let waves = (1.0 + data.BestProgress / 5000.0);

    let confLog = mathHelper.logDecimal(data.ConfectionTotalLevel / 5000000.0, 2.0)
    let confDiv = mathHelper.divideDecimal(confLog, 2)
    let confection = mathHelper.addDecimal(
        1,
        mathHelper.min(
            mathHelper.max(
                1.0,
                mathHelper.addDecimal(confDiv, 1)
            )
            ,
            data.ConfectionTotalLevel / 5000000.0
        )
    )


    let temp1 = mathHelper.multiplyDecimal(timerBonuses, otherBonuses)

    let currentReincExp = mathHelper.multiplyDecimal(mathHelper.multiplyDecimal(mathHelper.multiplyDecimal(classTotal, temp1), waves), confection);
    let currentReincLevel = mathHelper.createDecimal(data.ReincarnationLevel).toNumber();
    let requiredReincLevel = data.AscensionReincLevelRequired;
    let currReincTime = data.CurrentReincarnationTimer / (60 * 60);

    let calculateRequiredReincarnationXP = reincHelper.calcRequiredReincExp(data);

    let futureReincLevel = currentReincLevel;
    let loopFlag = true;
    while (loopFlag) {

        let required = calculateRequiredReincarnationXP(futureReincLevel);
        if (reincLevelRequirements[futureReincLevel]) {
            required = reincLevelRequirements[futureReincLevel];
        }
        else {
            required = calculateRequiredReincarnationXP(futureReincLevel);
            reincLevelRequirements[futureReincLevel] = required;
        }
        if (currentReincExp.greaterThan(required)) {
            futureReincLevel++;
            currentReincExp = mathHelper.subtractDecimal(currentReincExp, required);
        } else {
            loopFlag = false;
        }
    }

    let levelDiff = futureReincLevel - currentReincLevel;
    if (levelDiff === 0) levelDiff = 1;

    let reincHr = (levelDiff) / currReincTime;
    let remTime = (requiredReincLevel - futureReincLevel) / reincHr;
    let soulClock = data.SoulOldClock;
    let chargeTimerReduction = ((1 + 0.25 * soulClock) * (1.0 + data.WAPCardChargeTimer * 0.01)) - 1;
    let chargeDuration = 12 * chargeTimerReduction;
    let tickRate = (1.0 + (data.PetsSpecial[67].Active + data.PetsSpecial[68].Active + data.PetsSpecial[74].Active) * 0.1)
    // let remainingCharges = Math.floor((remTime * tickRate) / chargeDuration);
    let remainingCharges = Math.floor(remTime / chargeDuration);

    return {
        requiredReincLevel,
        futureReincLevel,
        levelDiff,
        reincHr,
        remTime,
        soulClock,
        chargeTimerReduction,
        chargeDuration,
        remainingCharges
    }
}

export default function Cards() {

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


    const [weightMap, setWeightMap] = useState(DefaultWeightMap);
    const [cardMap, setCardMap] = useState({})
    const [resetCardWeights, setResetCardWeights] = useState(-1);
    const [forceRefresh, setForceRefresh] = useState(false);
    const [numReincCharges, setNumReincCharges] = useState(1);

    const [newCardWeights, setNewCardWeightsRunTime] = useState(defaultWeights)
    const [newCardWeightsClient, setNewCardWeights] = useLocalStorage('newCardWeights', defaultWeights)
    useEffect(() => {

        //Fixes issues with outdated caches
        if (!newCardWeightsClient[40]) {
            setNewCardWeightsRunTime(defaultWeights);
            return setNewCardWeights(defaultWeights);
        }
        setNewCardWeightsRunTime(newCardWeightsClient);
    }, [newCardWeightsClient, setNewCardWeights])

    const { CardsCollection } = data;

    useEffect(() => {
        if (resetCardWeights > 10) {
            setResetCardWeights(-2);
        }
    }, [resetCardWeights]);

    useEffect(() => {
        setRunTimeData(clientData);
        let num = Math.random() * 1000 + 20;
        setResetCardWeights(num);
    }, [clientData]);

    //current, future, % gain
    const [clientDisplayMode, setDisplayMode] = useLocalStorage('displayModeCards', 'current');
    const [displayMode, setRunTimeDisplayMode] = useState('current');
    useEffect(() => {
        setRunTimeDisplayMode(clientDisplayMode);
    }, [clientDisplayMode]);

    
    const [clientHideUnfound, setHideUnfound] = useLocalStorage('hideUnfoundCards', true);
    const [hideUnfound, setRunTimeHideUnfound] = useState(true);
    useEffect(() => {
        setRunTimeHideUnfound(clientHideUnfound);
    }, [clientHideUnfound]);


    if (!data.PetsSpecial[74]) {
        return (
            <div>
                <h1>{`Your save is most likely from an older version, please update your game and try with a new save. If that's not the case, please reach out on discord! Link can be found on the gratitude (heart) page`}</h1>
            </div>
        )
    }


    // const foundCards = CardsCollection.filter(card => card.Found === 1);
    const cardsById = CardsCollection.reduce((accum, card) => {

        if (data.AscensionCount >= 30 && card.ID === 1) {
            return accum;
        }
        else if (data.AscensionCount < 30 && card.ID === 38) {
            return accum;
        }
        if (data.AscensionCount >= 40 && card.ID === 3) {
            return accum;
        }
        else if (data.AscensionCount < 40 && card.ID === 39) {
            return accum;
        }

        if (hideUnfound && card.Found === 0) {
            return accum;
        }

        accum[card.ID] = card;
        return accum;
    }, {});

    let weightedCardInfo = [];

    for (let i = 0; i < CARD_DISPLAY_IDS.length; i++) {
        if (!cardsById[CARD_DISPLAY_IDS[i]]) continue;
        let index = i;
        let index_overwrite = -1;
        let bigsad = CARD_DISPLAY_IDS[i];
        //adding an offset for position/margin but only to cards that come after

        //taking away 1 because the order list technically has extra
        if (i > 2) {
            index -= 1;
        }
        if(index > 5) {
            index -= 1;
        }

        // SWP
        if (CARD_DISPLAY_IDS[i] === 38) {
            index_overwrite = 1;
        }
        // SKP
        if (CARD_DISPLAY_IDS[i] === 39) {
            index_overwrite = 3;
        }

        weightedCardInfo.push(
            <CardCard
                cardWeight={newCardWeights[CARD_DISPLAY_IDS[i]]}
                setCardWeightNew={(value) => {
                    setNewCardWeights((e) => {
                        let temp = { ...e };
                        temp[CARD_DISPLAY_IDS[i]] = value;
                        return temp;
                    })
                }}
                resetWeights={resetCardWeights}
                bonusMode={displayMode}//what bonus to show, current, future, % gain etc
                displayMode='original' cardMap={cardMap} setCardMap={setCardMap} data={data}
                i={index_overwrite === -1 ? index : index_overwrite}
                // i={i}
                card={cardsById[CARD_DISPLAY_IDS[i]]} weightMap={weightMap} classes={classes} applyWeights={true}
                key={`${i}-orig`}></CardCard>
        )
    }

    let baseCardArr = [];
    Object.values(cardMap).forEach((inner_card: any) => {
        if (!cardsById[inner_card.ID]) return;
        baseCardArr.push(inner_card);
    })
    let topPercIncrease = baseCardArr.sort((a, b) => {
        let res = b.percIncrease.greaterThan(a.percIncrease) ? 1 : -1;
        return res;
    });

    let finalPercIncrease = topPercIncrease.slice(0, 5).map((value, index, arr) => {


        return (
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%'
            }}
                key={index}
            >
                <div
                    className='importantText'
                    style={{
                        fontSize: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignSelf: 'start',
                        marginRight: '6px',
                        marginTop: '6px',
                        // position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '2',
                        width: '30px',
                        height: '30px',
                        border: '1.5px solid rgba(255,255,255,0.8)',
                        borderRadius: '15px',
                        backgroundColor: 'rgba(49, 49, 49, 0.8)',
                    }}>
                    <div>
                        {index + 1}
                    </div>
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3} displayMode='perc' vertical={true} cardMap={cardMap} setCardMap={null} data={data}
                    i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes}
                    key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);


    const chargesMax = data.CurrentCardCharge === data.MaxCardCharge;

    let baseReincInfo = CalcReinc(data);
    let remainingCharges = baseReincInfo.remainingCharges;
    let requiredReincLevel = baseReincInfo.requiredReincLevel;
    let currentReincLevel = helper.roundInt(baseReincInfo.futureReincLevel);
    let currentReincLevelDiff = helper.roundInt(baseReincInfo.levelDiff);
    let reincHr = helper.roundTwoDecimal(baseReincInfo.reincHr);
    let remTime = baseReincInfo.remTime;
    let chargeTimerReduction = baseReincInfo.chargeTimerReduction;

    let cardChargedReincInfo = CalcReinc(data, numReincCharges);
    let futureReincLevel = helper.roundInt(cardChargedReincInfo.futureReincLevel);
    let futureReincLevelDiff = helper.roundInt(cardChargedReincInfo.levelDiff);
    let futureReincHr = helper.roundTwoDecimal(cardChargedReincInfo.reincHr);
    let futureRemTime = cardChargedReincInfo.remTime;


    let loggedWeightIncrease = baseCardArr.sort((b, a) => {
        //Sort reinc card to the end, if a charge is not enough to do a reinc. Applicable starting ascension 15.
        if(clientData.AscensionCount > 14) {
            if(a.ID === REINCARNATIONEXP && futureReincLevel < requiredReincLevel) {
                return -1;
            }
            if(b.ID === REINCARNATIONEXP && futureReincLevel < requiredReincLevel) {
                return 1;
            }
        }

        let res = a.loggedWeightIncrease.greaterThan(b.loggedWeightIncrease) ? 1 : -1;
        return res;

    });
    let finalLoggedWeightIncrease = loggedWeightIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={index}>
                <div
                    className='importantText'
                    style={{
                        fontSize: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignSelf: 'start',
                        marginRight: '6px',
                        marginTop: '6px',
                        // position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '2',
                        width: '30px',
                        height: '30px',
                        border: '1.5px solid rgba(255,255,255,0.8)',
                        borderRadius: '15px',
                        backgroundColor: 'rgba(49, 49, 49, 0.8)',
                    }}>
                    {index + 1}
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3} displayMode='logged' vertical={true} cardMap={cardMap} setCardMap={null}
                    data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes}
                    key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);


    let weightIncrease = baseCardArr.sort((a, b) => {
        let res = b.weightIncrease.greaterThan(a.weightIncrease) ? 1 : -1;
        return res;
    });
    let finalWeightIncrease = weightIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%'
            }}
                key={index}
            >
                <div
                    className='importantText'
                    style={{
                        fontSize: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignSelf: 'start',
                        marginRight: '6px',
                        marginTop: '6px',
                        // position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '2',
                        width: '30px',
                        height: '30px',
                        border: '1.5px solid rgba(255,255,255,0.8)',
                        borderRadius: '15px',
                        backgroundColor: 'rgba(49, 49, 49, 0.8)',
                    }}>
                    <div>
                        {index + 1}
                    </div>
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3}
                    displayMode='weight'
                    vertical={true}
                    cardMap={cardMap}
                    setCardMap={null}
                    data={data}
                    i={index}
                    card={cardsById[value.ID]}
                    weightMap={weightMap}
                    classes={classes}
                    key={`${index}-perc`
                    } />
            </div>
        )
    }, []);


    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                paddingLeft: '6px',
                backgroundColor: 'black'
            }}
        >

            {/* Charge Information */}
            {false && (
                <div
                    className={chargesMax ? 'borderToFadeInAndOutRed' : 'whiteBorder' + ' importantText'}
                    style={{
                        display: 'flex',
                        height: '60px',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255, 0.1)',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        marginTop: '6px',
                        padding: '0 3px'
                    }}>
                    {chargesMax && (
                        <MouseOverPopover tooltip={

                            <div>
                                {`You have max card charges!`}
                            </div>
                        }
                            opacity={1}
                        >
                            <div className='elementToFadeInAndOut'
                                style={{ position: 'relative', height: '32px', width: '32px', marginRight: '12px' }}>
                                <Image
                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                    fill
                                    src={infoIconRed}
                                    unoptimized={true}
                                />
                            </div>
                        </MouseOverPopover>
                    )}
                    {/* Current Charge */}
                    <div
                        style={{
                            display: 'flex', marginBottom: '0px', marginRight: '36px', alignItems: 'center'
                        }}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}
                        >
                            {`Current Charges: `}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}>
                            <div style={{ marginRight: '6px' }}>{data?.CurrentCardCharge}</div>
                            <Image
                                alt='in game charge (battery) image'
                                // fill
                                style={{ height: '60px', width: 'auto' }}
                                src={chargeImg as any}
                                unoptimized={true}
                            />
                        </div>
                    </div>

                    {/* Charges till Ascension */}
                    <MouseOverPopover tooltip={
                        <>
                            <div>
                                {`${requiredReincLevel - currentReincLevel} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr =  ${helper.roundTwoDecimal(remTime)} hours remaining`}
                            </div>

                        </>

                    }
                        opacity={1}
                    >
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: '0px',
                                marginleft: '36px',
                                alignItems: 'center',
                                minWidth: '270px'
                            } as any}
                        >
                            <div
                                style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}
                            >
                                {`Remaining Charges in ascension: `}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}>
                                <div style={{ marginRight: '6px' }}>{` ${remainingCharges}`}</div>
                                <Image
                                    alt='in game charge (battery) image'
                                    // fill
                                    style={{ height: '60px', width: 'auto', maxHeight: '65px' }}
                                    src={chargeImg as any}
                                    unoptimized={true}
                                />
                            </div>

                            <div style={{ position: 'relative', height: '55px', width: '55px', marginLeft: '6px' }}>
                                <Image
                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                    fill
                                    src={infoIcon}
                                    unoptimized={true}
                                />
                            </div>
                        </div>

                    </MouseOverPopover>
                </div>
            )}
            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            <div className='importantText' style={{ display: 'flex', alignItems: 'end' }}>
                <h1 style={{ margin: '6px 6px', fontSize: '32px' }}>
                    Cards Guide
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    flex: '1',
                    maxHeight: 'calc(100% - 55px)'
                }}
            >
                {/* Original Cards */}
                <div
                    style={{
                        maxWidth: '747px',
                        padding: '6px 3px 0 3px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                        border: '1.5px solid rgba(255,255,255,0.8)',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255,255,255, 0.1)',
                        overflow: 'auto'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '-3px',
                            marginBottom: '3px',
                            position: 'relative'
                        }}
                    >
                        <div style={{ marginLeft: '12px', position: 'absolute', left: '-9px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }} className='importantText'>
                                <div>{`Hide unfound cards`}</div>
                                <input
                                    aria-label='Hide cards that were never found'
                                    type="checkbox"
                                    onChange={(e) => {
                                        setHideUnfound(e.target.checked ? true : false)
                                    }}
                                    checked={!!hideUnfound}
                                    value={!!hideUnfound as any}
                                />
                            </div>
                        </div>
                        <h3
                            className='importantText'
                            style={{ marginTop: '0', marginBottom: '0', marginRight: '12px' }}
                        >
                            Current Cards
                        </h3>
                        <div>
                            <button
                                onClick={() => {
                                    let num = Math.random() * 1000 + 20;
                                    setNewCardWeights(((curr_weights) => {
                                        let tempNewWeights = {};

                                        for (const [key, value] of Object.entries(curr_weights)) {
                                            tempNewWeights[key] = -1;
                                        }
                                        return tempNewWeights;
                                    }) as any);

                                }}
                            >Reset Weights
                            </button>
                        </div>

                        {/* display mode selector */}
                        <div style={{ marginRight: '12px', position: 'absolute', right: '12px' }}>
                            <select
                                className='importantText'
                                aria-label='Select a default team preset'
                                style={{
                                    maxWidth: '144px',
                                    marginLeft: '12px',
                                    backgroundColor: '#171717',
                                    borderRadius: '4px',
                                    borderColor: '#ff691c'
                                }}
                                onChange={
                                    (selected_mode) => {
                                        setDisplayMode(selected_mode.target.value);
                                    }
                                }
                                value={displayMode}
                            >
                                <option value="current">Current Bonus</option>
                                <option value="future">Future Bonus</option>
                                <option value="%gain">% Gain</option>
                                <option value="xgain">X gain</option>
                                {/* <option value="Current Bonus">Current Bonus</option> */}
                            </select>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'flex-start',
                            maxHeight: 'calc(100% - 22px)',
                            overflow: 'auto'
                        }}
                    >
                        {weightedCardInfo}
                    </div>
                </div>


                {/* next charges + suggestions */}
                <div
                    style={{
                        display: 'flex',
                        flex: '1',
                        flexDirection: 'column',
                        marginLeft: '12px',
                        marginRight: '12px',
                        // border: '1.5px solid rgba(255,255,255,0.8)',
                        // borderRadius: '6px',
                        // backgroundColor: 'rgba(255,255,255, 0.1)',
                        overflow: 'auto'
                    }}
                >

                    {/* Current/Future Charges */}
                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            // flexWrap: 'wrap',
                            // alignContent: 'flex-start',
                            // justifyContent: 'center',
                            border: '1.5px solid rgba(255,255,255,0.8)',
                            borderRadius: '6px',
                            overflow: 'auto',
                            height: '48px',
                            minWidth: '256px',
                            minHeight: '40px',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            marginBottom: '6px',
                        }}
                    >
                        {/* Current Charges */}
                        <div style={{
                            display: 'flex',
                            // flex: "1",
                            justifyContent: 'center',
                            alignItems: 'center',
                            // width: '100%',
                            height: '100%',
                            minWidth: '243px',
                            margin: '0 auto'
                        }}>
                            <h3
                                className='importantText'
                                style={{ marginTop: '6px', marginBottom: '6px', fontSize: '26px' }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>{`Current Charges: ${data?.CurrentCardCharge}`}</div>
                            </h3>
                        </div>

                        {/* Seperater */}
                        {true && (
                            <div style={{ width: '54px', minWidth: '54px', overflow: 'hidden' }}>
                                <svg
                                    style={{
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    viewBox="0 0 100 10" preserveAspectRatio="none">
                                    {/* <polygon fill='rgba(255,255,255, 0.6)' points="66 0 100 0 33 10 0 10" /> */}
                                    <polygon
                                        // stroke="black" strokeWidth="0.5"
                                        fill='rgba(255,255,255, 0.6)' points="75 0 100 0 25 10 0 10" />
                                </svg>
                            </div>
                        )}

                        {/* Future Charges */}
                        <div style={{
                            display: 'flex',
                            // flex: "1",
                            justifyContent: 'center',
                            alignItems: 'center',
                            // width: '100%',
                            height: '100%',
                            minWidth: '296px',
                            margin: '0 auto'
                        }}>
                            <h3
                                className='importantText'
                                style={{ marginTop: '6px', marginBottom: '6px', fontSize: '26px' }}
                            >
                                <div style={{ marginRight: '6px' }}>{`Remaining Charges: ${remainingCharges}`}</div>
                            </h3>
                        </div>
                    </div>

                    {/* Current/Future Reincarnation Levels */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            // alignItems: 'center',
                            border: '1.5px solid rgba(255,255,255,0.8)',
                            borderRadius: '6px',
                            overflow: 'auto',
                            height: '110px',
                            marginBottom: '6px',
                            minHeight: '90px'
                        }}
                    >


                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                        }}>
                            <h3
                                className='importantText'
                                style={{
                                    marginTop: '0px',
                                    marginBottom: '0px',
                                    fontSize: '26px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div>
                                    {`Reincarnation levels to ascend:`}
                                </div>
                                <div style={{ fontWeight: 'normal', marginLeft: '6px' }}>
                                    {`${helper.numberWithCommas(data.AscensionReincLevelRequired)}`}
                                </div>
                                {/* Charges till Ascension */}
                                <MouseOverPopover
                                    tooltip={

                                        <div>
                                            <div>
                                                {`Remaining charges are calculated based on your remaining reincarnation levels left to ascend multiplied by your current reincarnation levels / hr. \nThis is calculated based on how many reincarnation levels you would gain if you reincarnate now divided by the current reincarnation duration.`}
                                            </div>
                                            <div>
                                                {`${helper.numberWithCommas(requiredReincLevel - currentReincLevel)} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr = ${helper.roundTwoDecimal(remTime)} hours remaining`}
                                            </div>
                                            <div>
                                                {`Time remaining WITH CARD CHARGE:`}
                                            </div>
                                            <div>
                                                {`${helper.numberWithCommas(requiredReincLevel - futureReincLevel)} remaining levels at ${helper.roundTwoDecimal(futureReincHr)} levels/hr =  ${helper.roundTwoDecimal(futureRemTime)} hours remaining`}
                                            </div>
                                            <div>
                                                {`Current charge timer reduction: ${helper.roundTwoDecimal(chargeTimerReduction * 100)}%`}
                                            </div>
                                        </div>
                                    }
                                    opacity={1}
                                >
                                    <div style={{
                                        position: 'relative',
                                        height: '24px',
                                        width: '24px',
                                        marginLeft: '12px'
                                    }}>
                                        <Image
                                            alt='on hover I in a cirlce icon, shows more information on hover'
                                            fill
                                            src={infoIcon}
                                            unoptimized={true}
                                        />
                                        {/* </div> */}
                                    </div>
                                </MouseOverPopover>
                            </h3>
                        </div>

                        <div style={{
                            display: 'flex',
                            flex: '1',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: 'rgba(255,255,255, 0.09)',
                        }}>
                            {/* Current Reincarnation levels */}
                            <div style={{
                                display: 'flex',
                                flex: "1",
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                <h3
                                    className='importantText'
                                    style={{ marginTop: '6px', marginBottom: '6px', fontSize: '20px' }}
                                >
                                    <div style={{
                                        marginRight: '6px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <div>
                                            {`Current Reinc. Level:`}
                                        </div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${helper.numberWithCommas(currentReincLevel)} (+${helper.numberWithCommas(currentReincLevelDiff)}, ${reincHr > 1000 ? helper.numberWithCommas(reincHr) : helper.roundTwoDecimal(reincHr)}/hr)`}
                                        </div>
                                    </div>
                                </h3>
                            </div>

                            {/* Seperater */}
                            {true && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {/* Num Charges */}
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                bottom: '23px',
                                                left: '30px',
                                                zIndex: '3',
                                                marginBottom: '-6px'
                                            }}
                                        >
                                            <input
                                                aria-label='How many reinc card charges to simulate being charged'
                                                style={{
                                                    width: '30px',
                                                    // color: cardWeight !== defaultWeight && cardWeight !== -1 ? 'black' : 'gray',
                                                    // fontWeight: cardWeight !== defaultWeight && cardWeight !== -1 ? 'bold' : '',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    padding: '0 0 0 0',
                                                    margin: '0',
                                                    textAlign: 'center'
                                                }}
                                                type='number'
                                                value={numReincCharges}
                                                onChange={
                                                    (e) => {
                                                        try {
                                                            let x = Number(e.target.value);
                                                            x = Math.floor(x);
                                                            if (x < 1 || x > 99) {
                                                                return;
                                                            }
                                                            setNumReincCharges(x);
                                                        } catch (err) {
                                                            console.log(err);
                                                        }
                                                    }}
                                                min="0"
                                                max="999999"
                                            />

                                            <MouseOverPopover tooltip={

                                                <div>
                                                    {`How many reincarnation card charges to simulate being used`}
                                                </div>
                                            }
                                                opacity={1}
                                            >
                                                <div style={{
                                                    position: 'relative',
                                                    height: '16px',
                                                    width: '16px',
                                                    marginLeft: '2px'
                                                }}>
                                                    <Image
                                                        alt='on hover I in a cirlce icon, shows more information on hover'
                                                        fill
                                                        src={infoIcon as any}
                                                        unoptimized={true}
                                                    />
                                                </div>
                                            </MouseOverPopover>
                                        </div>
                                    </div>
                                    <div
                                        style={{ height: '36px', width: '36px', position: 'relative', margin: '0 -3px' }}>
                                        <Image
                                            alt='arrow point to the left'
                                            src={rightArrow as any}
                                            fill
                                            unoptimized
                                        />
                                    </div>
                                    <div style={{ color: 'green', marginTop: '-10px' }}>
                                        {`+${helper.numberWithCommas(futureReincLevel - currentReincLevel)}, ${(futureReincHr - reincHr) > 1000 ? helper.numberWithCommas(helper.roundTwoDecimal(futureReincHr - reincHr)) : helper.roundTwoDecimal(futureReincHr - reincHr)}/hr`}
                                    </div>
                                </div>
                            )}

                            {/* Future Reincarnation Levels */}
                            <div style={{
                                display: 'flex',
                                flex: "1",
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                <h3
                                    className='importantText'
                                    style={{ marginTop: '6px', marginBottom: '6px', fontSize: '20px' }}
                                >
                                    <div style={{
                                        marginRight: '6px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <div>
                                            {`Future Reinc. Level:`}
                                        </div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${helper.numberWithCommas(futureReincLevel)} (+${helper.numberWithCommas(futureReincLevelDiff)}, ${futureReincHr > 1000 ? helper.numberWithCommas(futureReincHr) : helper.roundTwoDecimal(futureReincHr)}/hr)`}
                                        </div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* suggested orders + ads */}
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                // flexDirection: 'column',
                                flexWrap: 'wrap',
                                gap: '6px',
                                justifyContent: 'space-around',
                                flex: '1',
                                alignContent: 'flex-start'
                                // width: '100%'
                            }}
                        >
                            {/* Top 5  logged% increase */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // flexWrap: 'wrap',
                                    alignContent: 'flex-start',
                                    border: '1.5px solid rgba(255,255,255,0.8)',
                                    borderRadius: '6px',
                                    overflow: 'auto',
                                    // height: '250px',
                                    maxWidth: '360px',
                                    minWidth: '273px',
                                    width: '100%',
                                    // marginRight: 'auto'
                                    // marginBottom: '12px',
                                    // marginLeft: '12px'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    // width: '100%',
                                    backgroundColor: 'rgba(255,255,255, 0.06)',
                                }}>
                                    <h3
                                        className='importantText'
                                        style={{ marginTop: '6px', marginBottom: '6px', fontSize: '28px' }}
                                    >
                                        Suggested
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '24px',
                                        padding: '0 12px 0 12px'
                                    }}
                                >
                                    <div className='importantText'>
                                        Card
                                    </div>
                                    <div className='importantText' style={{ marginLeft: 'auto' }}>
                                        Score
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // width: '100%',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255, 0.1)',
                                        padding: '6px'
                                    }}
                                >
                                    {finalLoggedWeightIncrease}
                                </div>
                            </div>
                            {/* Top 5 % increase */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // flexWrap: 'wrap',
                                    alignContent: 'flex-start',
                                    border: '1.5px solid rgba(255,255,255,0.8)',
                                    borderRadius: '6px',
                                    overflow: 'auto',
                                    // height: '250px',
                                    maxWidth: '360px',
                                    minWidth: '273px',
                                    width: '100%',
                                    // marginRight: 'auto'
                                    // marginBottom: '12px',
                                    // marginLeft: '12px'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    // width: '100%',
                                    backgroundColor: 'rgba(255,255,255, 0.06)',
                                }}>
                                    <h3
                                        className='importantText'
                                        style={{ marginTop: '6px', marginBottom: '6px', fontSize: '28px' }}
                                    >
                                        Best Percentage
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '24px',
                                        padding: '0 12px 0 12px'
                                    }}
                                >
                                    <div className='importantText'>
                                        Card
                                    </div>
                                    <div className='importantText' style={{ marginLeft: 'auto' }}>
                                        % Gain
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // width: '100%',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255, 0.1)',
                                        padding: '6px'
                                    }}
                                >
                                    {finalPercIncrease}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id='right_pillar' style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '6px' }} />
                            {/* <div id='in_content_flex' style={{ marginTop: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center', }} /> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

