"use client"


import { isMobile } from 'mobile-device-detect';
import './card.css';
import './page.css';
import { useState, useEffect } from 'react';

import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import MouseOverPopover from "../util/Tooltip";
import { DefaultWeightMap } from '../util/itemMapping';

import mathHelper from '../util/math';
import reincHelper from '../util/reincHelper';
import helper from '../util/helper';

import rightArrow from '@images/icons/right_arrow_white.svg';
import infoIcon from '@images/icons/info_thick.svg';

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
    REINCARNATIONEXP,
    cardMapImg,
    cardLabelImg,
    defaultWeights,
    CARD_DISPLAY_IDS,
    permPowerBonusFormula,
    tempPowerBonusFormula,
    cardIDMap,
    maxKey,
    cardSumWeights
} from '../util/cardMapping';

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
    i,
    cardMap,
    setCardMap,
    resetWeights,
    cardWeight,
    setCardWeightNew,
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
        cardWeight, setCardWeightNew, sumWeight,
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
    } else if (displayMode === 'xgain') {
        let tempy = mathHelper.divideDecimal(finalAfter, finalBefore).toExponential(2).toString();
        extraText = `(+${tempy})`
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
            className={`card-wrapper ${displayMode === 'original' ? 'card-wrapper--original' : 'card-wrapper--list'}`}
            style={displayMode !== 'original' ? { marginTop: num === 1 ? '0' : '6px' } : undefined}
        >
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
                                    Score: {helper.formatNumberString(loggedWeightIncrease)}
                                </div>
                                <div>
                                    Current Weight:{finalWeight}
                                </div>
                            </div>
                        }
                    >
                        <div>
                            <div className="card-image-wrapper">
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
                                <div className="card-bonus-label">
                                    {`${helper.formatNumberString(finalBonusDisplay)}${bonusMode === 'xgain' ? 'X' : '%'}`}
                                </div>

                                {/* Final temp */}
                                <div className="card-temp-label">
                                    {`${helper.formatNumberString(finalTemp)}`}
                                </div>


                                <div className="importantText card-name-label">
                                    {cardIDMap[ID].label}
                                </div>
                            </div>
                        </div>
                    </MouseOverPopover>


                    <div className="card-weight-input">
                        <input
                            aria-label='Specify the weight/importance for this card'
                            className="card-weight-field"
                            style={{
                                color: cardWeight !== defaultWeight && cardWeight !== -1 ? 'black' : 'gray',
                                fontWeight: cardWeight !== defaultWeight && cardWeight !== -1 ? 'bold' : '',
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
                            <div className="card-info-icon">
                                <Image
                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                    fill
                                    src={infoIcon}
                                    unoptimized={true}
                                />
                            </div>
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
                                    Score: {helper.formatNumberString(loggedWeightIncrease)}
                                </div>
                                <div>
                                    Current Weight:{finalWeight}
                                </div>
                            </div>
                        }


                    >
                        <div className="card-list-inner">
                            <div className="card-list-icon">
                                <Image
                                    alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                    // fill
                                    src={cardLabelImg[ID].img}
                                    unoptimized={true}
                                    priority
                                />
                            </div>
                            <div className="importantText card-list-name">
                                {cardIDMap[ID].label}
                            </div>

                            <div className="importantText card-list-value">
                                {displayMode === 'logged' && (
                                    <>
                                        {helper.formatNumberString(loggedWeightIncrease)}
                                    </>
                                )}
                                {displayMode === 'weight' && (
                                    <>
                                        {helper.formatNumberString(weightIncrease)}
                                    </>
                                )}
                                {displayMode === 'xgain' && (
                                    <>
                                        {helper.formatNumberString(percIncrease) + 'X'}
                                    </>
                                )}
                                {(['logged','weight','xgain'].indexOf(displayMode) < 0) && (
                                    <>
                                        {helper.formatNumberString(mathHelper.multiplyDecimal(mathHelper.subtractDecimal(percIncrease, 1), 100)) + '%'}
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



/**
 * CalcReinc provides the core implementation for the CalcReinc routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by CalcReinc.
 */
const CalcReinc = function (data, reincCardCharges?: any, skipAscensions: number = 0) {
    data = JSON.parse(JSON.stringify(data));

    // Apply card charges bonus if specified
    if (reincCardCharges) {
        const { CardsCollection } = data;
        const cardsById = CardsCollection.reduce((accum, card) => {
            accum[card.ID] = card;
            return accum;
        }, {});

        let card = cardsById[REINCARNATIONEXP];

        const {
            ID,
            Level,
            PowerPermaBD,
            PowerTempBD,
        } = card;
        const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

        let otherBonuses = mathHelper.createDecimal(data.ReincarnationBonusesBD);
        let tempValueBefore = mathHelper.createDecimal(PowerTempBD);
        let permValueBefore = mathHelper.createDecimal(PowerPermaBD);

        let tempBonusBefore = tempPowerBonusFormula[ID](tempValueBefore);
        let permBonusBefore = permPowerBonusFormula[ID](permValueBefore);

        let finalBefore = mathHelper.multiplyDecimal(
            mathHelper.subtractDecimal(
                mathHelper.multiplyDecimal(tempBonusBefore, permBonusBefore),
                1
            ),
            ((1.0 + Level * 0.02) * 100)
        );

        // Calculate bonus after applying charges
        let tempValueAfter = mathHelper.multiplyDecimal(tempValueBefore, (1 - ChargeTransfertPowerTemp));
        let permValueAfter = mathHelper.addDecimal(permValueBefore,
            mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma)
        );

        let temp1 = tempPowerBonusFormula[ID](mathHelper.multiplyDecimal(tempValueBefore, (1.0 - ChargeTransfertPowerTemp)))
        let temp2 = permPowerBonusFormula[ID](
            mathHelper.addDecimal(permValueBefore, mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma))
        )
        let finalAfter = mathHelper.multiplyDecimal(
            mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
            (1.0 + Level * 0.02) * 100);

        // Apply multiple charges if needed
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

                finalAfter = mathHelper.multiplyDecimal(
                    mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
                    (1.0 + Level * 0.02) * 100
                );
            }
        }

        // Update bonuses with card charge effect
        otherBonuses = mathHelper.divideDecimal(otherBonuses, finalBefore);
        otherBonuses = mathHelper.multiplyDecimal(otherBonuses, finalAfter);
        data.ReincarnationBonusesBD = otherBonuses;
    }

    let currentReincLevel = mathHelper.createDecimal(data.ReincarnationLevel).toNumber();
    let requiredReincLevel = reincHelper.getAscensionLevelCost(data.AscensionCount + skipAscensions, data);
    let currReincTime = data.CurrentReincarnationTimer / (60 * 60);

    // Use the new efficient reincarnation calculation
    let tempTime1 = new Date().getTime();
    let reincResult = reincHelper.calcNextReincarnation(data);
    let tempTime2 = new Date().getTime();
    console.log(`time to calc reinc: ${tempTime2 - tempTime1}ms`)

    let futureReincLevel = reincResult.nextLevel;
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

/**
 * Cards provides the core implementation for the Cards routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by Cards.
 */
export default function Cards() {
    // Note: mobileMode is set but not used in this file (isMobile is used directly instead)
    // Kept for consistency with other page components where it is used for conditional styling
    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        // Other pages force width=1200 for their non-responsive layout.
        // Reset to device-width so our responsive CSS works correctly.
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport instanceof HTMLMetaElement) {
            viewport.content = 'width=device-width, initial-scale=1';
        }
    }, []);

    const [clientData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);


    const [weightMap] = useState(DefaultWeightMap);
    const [cardMap, setCardMap] = useState({})
    const [resetCardWeights, setResetCardWeights] = useState(-1);

    const [numReincCharges, setNumReincCharges] = useState(1);
    const [skipAscensions, setSkipAscensions] = useState(0);

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
            <div className="rank-item" key={index}>
                <div className="importantText rank-badge">
                    <div>{index + 1}</div>
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3} displayMode='perc' vertical={true} cardMap={cardMap} setCardMap={null} data={data}
                    i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes}
                    key={`${index}-perc`} />
            </div>
        )
    }, []);

    let finalXIncrease = topPercIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div className="rank-item" key={index}>
                <div className="importantText rank-badge">
                    <div>{index + 1}</div>
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3} displayMode='xgain' vertical={true} cardMap={cardMap} setCardMap={null} data={data}
                    i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes}
                    key={`${index}-perc`} />
            </div>
        )
    }, []);


    const chargesMax = data.CurrentCardCharge === data.MaxCardCharge;

    let baseReincInfo = CalcReinc(data, undefined, skipAscensions);
    let remainingCharges = baseReincInfo.remainingCharges;
    let requiredReincLevel = baseReincInfo.requiredReincLevel;
    let currentReincLevel = helper.roundInt(baseReincInfo.futureReincLevel);
    let currentReincLevelDiff = helper.roundInt(baseReincInfo.levelDiff);
    let reincHr = helper.roundTwoDecimal(baseReincInfo.reincHr);
    let remTime = baseReincInfo.remTime;
    let chargeTimerReduction = baseReincInfo.chargeTimerReduction;

    let cardChargedReincInfo = CalcReinc(data, numReincCharges, skipAscensions);
    let futureReincLevel = helper.roundInt(cardChargedReincInfo.futureReincLevel);
    let futureReincLevelDiff = helper.roundInt(cardChargedReincInfo.levelDiff);
    let futureReincHr = helper.roundTwoDecimal(cardChargedReincInfo.reincHr);
    let futureRemTime = cardChargedReincInfo.remTime;


    let loggedWeightIncrease = baseCardArr.sort((b, a) => {
        //Applicable starting ascension 15: special handling of the reincarnation card.
        if(clientData.AscensionCount > 14) {
            //Sort reinc card to the end, if a charge is not enough to ascend. 
            if(a.ID === REINCARNATIONEXP && futureReincLevel < requiredReincLevel) {
                return -1;
            }
            if(b.ID === REINCARNATIONEXP && futureReincLevel < requiredReincLevel) {
                return 1;
            }
            //Sort reinc card to the end, if no charge is needed to ascend
            if(a.ID === REINCARNATIONEXP && currentReincLevel > requiredReincLevel) {
                return -1;
            }
            if(b.ID === REINCARNATIONEXP && currentReincLevel > requiredReincLevel) {
                return 1;
            }
        }

        let res = a.loggedWeightIncrease.greaterThan(b.loggedWeightIncrease) ? 1 : -1;
        return res;

    });
    let finalLoggedWeightIncrease = loggedWeightIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div className="rank-item" key={index}>
                <div className="importantText rank-badge">
                    {index + 1}
                </div>
                <CardCard
                    cardWeight={newCardWeights[value.ID]}
                    resetWeights={-3} displayMode='logged' vertical={true} cardMap={cardMap} setCardMap={null}
                    data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes}
                    key={`${index}-perc`} />
            </div>
        )
    }, []);


    let weightIncrease = baseCardArr.sort((a, b) => {
        let res = b.weightIncrease.greaterThan(a.weightIncrease) ? 1 : -1;
        return res;
    });
    let finalWeightIncrease = weightIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div className="rank-item" key={index}>
                <div className="importantText rank-badge">
                    <div>{index + 1}</div>
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
                    key={`${index}-perc`} />
            </div>
        )
    }, []);


    return (
        <div className="cards-page">

            {/* Charge Information */}

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            <div className="importantText cards-page__header">
                <h1 className="cards-page__title">
                    Cards Guide
                </h1>
            </div>

            <div className="cards-page__content">
                {/* Original Cards */}
                <div className="cards-panel">
                    <div className="cards-panel__header">
                        <div className="cards-panel__toggle">
                            <div className="importantText" style={{ display: 'flex', alignItems: 'center' }}>
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
                            className="importantText"
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
                        <div className="cards-panel__mode-select">
                            <select
                                className="importantText cards-mode-select"
                                aria-label='Select a default team preset'
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
                    <div className="cards-panel__list">
                        {weightedCardInfo}
                    </div>
                </div>


                {/* next charges + suggestions */}
                <div className="cards-side">

                    {/* Current/Future Charges */}
                    <div className={`charges-row${chargesMax ? ' highlight blink-red' : ''}`}>
                        {/* Current Charges */}
                        <div className="charges-cell charges-cell--current">
                            <h3
                                className="importantText"
                                style={{ marginTop: '6px', marginBottom: '6px', fontSize: '26px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {`Current Charges: ${data?.CurrentCardCharge}`}
                                </div>
                            </h3>
                        </div>

                        {/* Separator */}
                        {true && (
                            <div className="charges-sep">
                                <svg
                                    viewBox="0 0 100 10" preserveAspectRatio="none">
                                    {/* <polygon fill='rgba(255,255,255, 0.6)' points="66 0 100 0 33 10 0 10" /> */}
                                    <polygon
                                        // stroke="black" strokeWidth="0.5"
                                        fill='rgba(255,255,255, 0.6)' points="75 0 100 0 25 10 0 10" />
                                </svg>
                            </div>
                        )}

                        {/* Future Charges */}
                        <div className="charges-cell charges-cell--future">
                            <h3
                                className="importantText"
                                style={{ marginTop: '6px', marginBottom: '6px', fontSize: '26px' }}
                            >
                                <div style={{ marginRight: '6px' }}>{`Remaining Charges: ${remainingCharges}`}</div>
                            </h3>
                        </div>
                    </div>

                    {/* Current/Future Reincarnation Levels */}
                    <div className="reinc-panel">

                        <div className="reinc-panel__header">
                            <h3 className="importantText">
                                <div style={{ fontSize: '20px' }}>
                                    {`Reinc levels required for ascending:`}
                                </div>
                                <div style={{ fontWeight: 'normal', marginLeft: '6px' }}>
                                    {`${helper.numberWithCommas(requiredReincLevel)}`}
                                </div>
                                {/* Charges till Ascension */}
                                <MouseOverPopover
                                    tooltip={
                                        <div>
                                            <p style={{ marginTop: '0', fontSize: '13px' }}>
                                                <b>Remaining charges</b> = Time to next ascension / charge duration.
                                                <br />
                                                <b>Time to ascension</b> = Remaining reinc levels required / current reinc levels per hour.
                                            </p>
                                            <p style={{ fontSize: '15px', marginBottom: '8px' }}>
                                                <b>Without card charge:</b>
                                                <br />
                                                {`${helper.numberWithCommas(requiredReincLevel - currentReincLevel)} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr ≈ `}<b>{`${helper.roundTwoDecimal(remTime)} hours remaining`}</b>
                                            </p>
                                            <p style={{ fontSize: '15px', marginTop: 0 }}>
                                                <b>With card charge:</b>
                                                <br />
                                                {`${helper.numberWithCommas(requiredReincLevel - futureReincLevel)} remaining levels at ${helper.roundTwoDecimal(futureReincHr)} levels/hr ≈ `}<b>{`${helper.roundTwoDecimal(futureRemTime)} hours remaining`}</b>
                                            </p>
                                            <p style={{ marginBottom: '0' }}>
                                                {`Current charge timer reduction: `}<b>{`${helper.roundTwoDecimal(chargeTimerReduction * 100)}%`}</b>
                                            </p>
                                        </div>
                                    }
                                    opacity={1}
                                >
                                    <div className="large-info-icon">
                                        <Image
                                            alt='on hover I in a cirlce icon, shows more information on hover'
                                            fill
                                            src={infoIcon}
                                            unoptimized={true}
                                        />
                                    </div>
                                </MouseOverPopover>
                                <div className="skip-asc">
                                    <label className="importantText skip-asc__label">
                                        Skip
                                    </label>
                                    <input
                                        type='number'
                                        min="0"
                                        value={skipAscensions}
                                        onChange={(e) => {
                                            try {
                                                let x = Number(e.target.value);
                                                x = Math.floor(x);
                                                if (x < 0 || x > 99) {
                                                    return;
                                                }
                                                setSkipAscensions(x);
                                            } catch (err) {
                                                console.log(err);
                                            }
                                        }}
                                        className="skip-asc__input"
                                    />
                                    <label className="importantText skip-asc__label--after">
                                        ascension{skipAscensions !== 1 ? 's' : ''}
                                    </label>
                                </div>
                            </h3>
                        </div>

                        <div className="reinc-panel__body">
                            {/* Current Reincarnation levels */}
                            <div className="reinc-cell">
                                <h3
                                    className="importantText"
                                    style={{ marginTop: '6px', marginBottom: '6px', fontSize: '20px' }}
                                >
                                    <div className="reinc-level">
                                        <div>{`Reinc levels without charge:`}</div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${helper.numberWithCommas(currentReincLevel)} (+${helper.numberWithCommas(currentReincLevelDiff)}, ${reincHr > 1000 ? helper.numberWithCommas(reincHr) : helper.roundTwoDecimal(reincHr)}/hr)`}
                                        </div>
                                    </div>
                                </h3>
                            </div>

                            {/* Separator */}
                            {true && (
                                <div className="reinc-sep">
                                    {/* Num Charges */}
                                    <div>
                                        <div className="reinc-charges-input-row">
                                            <input
                                                aria-label='How many reinc card charges to simulate being charged'
                                                className="reinc-charges-input"
                                                type='number'
                                                value={numReincCharges}
                                                onChange={(e) => {
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
                                            <MouseOverPopover
                                                tooltip={
                                                    <div>
                                                        {`How many reincarnation card charges to simulate being used`}
                                                    </div>
                                                }
                                                opacity={1}
                                            >
                                                <div className="small-info-icon">
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
                                    <div className="reinc-arrow">
                                        <Image
                                            alt='arrow point to the left'
                                            src={rightArrow as any}
                                            fill
                                            unoptimized
                                        />
                                    </div>
                                    <div className="reinc-diff">
                                        {`+${helper.numberWithCommas(futureReincLevel - currentReincLevel)}, ${(futureReincHr - reincHr) > 1000 ? helper.numberWithCommas(helper.roundTwoDecimal(futureReincHr - reincHr)) : helper.roundTwoDecimal(futureReincHr - reincHr)}/hr`}
                                    </div>
                                </div>
                            )}

                            {/* Future Reincarnation Levels */}
                            <div className="reinc-cell">
                                <h3
                                    className="importantText"
                                    style={{ marginTop: '6px', marginBottom: '6px', fontSize: '20px' }}
                                >
                                    <div className="reinc-level">
                                        <div>{`Reinc levels after charge:`}</div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${helper.numberWithCommas(futureReincLevel)} (+${helper.numberWithCommas(futureReincLevelDiff)}, ${futureReincHr > 1000 ? helper.numberWithCommas(futureReincHr) : helper.roundTwoDecimal(futureReincHr)}/hr)`}
                                        </div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* suggested orders + ads */}
                    <div className="suggestions-area">
                        <div className="suggestions-list">
                            {/* Top 5 logged% increase */}
                            <div className="suggestion-box">
                                <div className="suggestion-box__header">
                                    <h3
                                        className="importantText"
                                        style={{ marginTop: '6px', marginBottom: '6px', fontSize: '28px' }}
                                    >
                                        Suggested
                                    </h3>
                                </div>
                                <div className="suggestion-box__labels">
                                    <div className="importantText">Card</div>
                                    <div className="importantText" style={{ marginLeft: 'auto' }}>Score</div>
                                </div>
                                <div className="suggestion-box__body">
                                    {finalLoggedWeightIncrease}
                                </div>
                            </div>
                            {/* Top 5 % increase */}
                            <div className="suggestion-box">
                                <div className="suggestion-box__header">
                                    <h3
                                        className="importantText"
                                        style={{ marginTop: '6px', marginBottom: '6px', fontSize: '28px' }}
                                    >
                                        Best {displayMode == 'xgain' ? 'Gain' : 'Percentage'}
                                    </h3>
                                </div>
                                <div className="suggestion-box__labels">
                                    <div className="importantText">Card</div>
                                    <div className="importantText" style={{ marginLeft: 'auto' }}>
                                        {displayMode == 'xgain' ? 'X' : '%'} Gain
                                    </div>
                                </div>
                                <div className="suggestion-box__body">
                                    {displayMode == 'xgain' ? finalXIncrease : finalPercIncrease}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id='right_pillar' style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '6px' }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

