"use client"


import './card.css';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import MouseOverPopover from "../util/Tooltip.jsx";
import { DefaultWeightMap } from '../util/itemMapping.js';
import { cardMapImg } from './cardMapping.js';

import mathHelper from '../util/math.js';
import reincHelper from '../util/reincHelper.js';
import helper from '../util/helper.js';

import infoIcon from '../../../public/images/icons/info.svg';
import infoIconRed from '../../../public/images/icons/info_red.svg';
import chargeImg from '../../../public/images/cards/charge.png'

import useLocalStorage from "use-local-storage";

import DefaultSave from '../util/tempSave.json';

import Image from 'next/image';
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    gtagOptions: {
        send_page_view: false
    },
}]);

const PREFIX = 'card';

const classes = {
    card: `${PREFIX}-card`,
    content: `${PREFIX}-content`,
    positiveChargeResult: `${PREFIX}-positiveChargeResult`,
    negativeChargeResult: `${PREFIX}-negativeChargeResult`
};


const POTATO = 1;
const CLASSEXP = 2;
const SKULL = 3;
const CONFECTIONEXP = 4;
const REINCARNATIONEXP = 5;
const ITEMRATING = 6;
const POOPBONUS = 7;
const MILKBONUS = 8;
const WHACKSCORE = 9;
const BREWINGEXP = 10;
const CALCIUMEXP = 11;
const FERMENTINGEXP = 12;
const RESIDUEBONUS = 13;
const WORMQTY = 14;
const LARVAQTY = 15;
const LARVAEFF = 16;
const ATTACKHP = 17;
const PETDMG = 18;
const PETLEVELEXP = 19;
const PETRANKEXP = 20;
const CARDPOWERB = 21;
const CARDEXPB = 22;
const cardIDMap = {
    [POTATO]: {
        id: POTATO, label: "Potatoes", icon: "", weights: {
            0: 0,
            1: 0,
            2: 35,
            3: 35,
            4: 35,
            5: 35,
            6: 35,
            7: 35,
            8: 40,
            9: 40,
            10: 40,
            11: 40,
            12: 40,
            13: 40,
            14: 14,
            15: 14,
            16: 14,
            17: 14,
            18: 14,
            19: 14,
            20: 14,
            21: 14,
            22: 14,
            23: 14,
            24: 14,
            25: 14,
            26: 14,
            27: 14,
            28: 14,
            29: 14,
            30: 14,
        }
    },
    [CLASSEXP]: {
        id: CLASSEXP, label: "Class Exp", icon: "", weights: {
            0: 0,
            1: 0,
            2: 46,
            3: 46,
            4: 46,
            5: 46,
            6: 46,
            7: 46,
            8: 46,
            9: 46,
            10: 46,
            11: 46,
            12: 46,
            13: 46,
            14: 31,
            15: 31,
            16: 31,
            17: 31,
            18: 31,
            19: 31,
            20: 31,
            21: 31,
            22: 31,
            23: 31,
            24: 31,
            25: 31,
            26: 31,
            27: 31,
            28: 31,
            29: 31,
            30: 31,
        }
    },
    [SKULL]: {
        id: SKULL, label: "Skulls", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 57,
            4: 57,
            5: 57,
            6: 57,
            7: 57,
            8: 65,
            9: 65,
            10: 65,
            11: 65,
            12: 65,
            13: 65,
            14: 92,
            15: 92,
            16: 92,
            17: 92,
            18: 92,
            19: 92,
            20: 92,
            21: 92,
            22: 92,
            23: 92,
            24: 92,
            25: 92,
            26: 92,
            27: 92,
            28: 92,
            29: 92,
            30: 92,
        }
    },
    [CONFECTIONEXP]: {
        id: CONFECTIONEXP, label: "Confection", icon: "", weights: {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [REINCARNATIONEXP]: {
        id: REINCARNATIONEXP, label: "Reinc.", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 2455,
            11: 2455,
            12: 2455,
            13: 2455,
            14: 2455,
            15: 2455,
            16: 2455,
            17: 2455,
            18: 2455,
            19: 2455,
            20: 2455,
            21: 2455,
            22: 2455,
            23: 2455,
            24: 2455,
            25: 2455,
            26: 2455,
            27: 2455,
            28: 2455,
            29: 2455,
            30: 2455,
        }
    },
    [ITEMRATING]: {
        id: ITEMRATING, label: "Item R.", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 1227,
            6: 1227,
            7: 1227,
            8: 1227,
            9: 1227,
            10: 1227,
            11: 1227,
            12: 1227,
            13: 1227,
            14: 1227,
            15: 2455,
            16: 2455,
            17: 2455,
            18: 2455,
            19: 2455,
            20: 2455,
            21: 2455,
            22: 2455,
            23: 2455,
            24: 2455,
            25: 2455,
            26: 2455,
            27: 2455,
            28: 2455,
            29: 2455,
            30: 2455,
        }
    },
    [POOPBONUS]: {
        id: POOPBONUS, label: "Poop Qty", icon: "", weights: {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [MILKBONUS]: {
        id: MILKBONUS, label: "Milk", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 44,
            6: 44,
            7: 44,
            8: 44,
            9: 44,
            10: 44,
            11: 44,
            12: 44,
            13: 44,
            14: 135,
            15: 135,
            16: 135,
            17: 135,
            18: 135,
            19: 135,
            20: 135,
            21: 135,
            22: 135,
            23: 135,
            24: 135,
            25: 135,
            26: 135,
            27: 135,
            28: 135,
            29: 135,
            30: 135,
        }
    },
    [WHACKSCORE]: {
        id: WHACKSCORE, label: "Whack", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [BREWINGEXP]: {
        id: BREWINGEXP, label: "Brewing", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 2,
            15: 2,
            16: 2,
            17: 2,
            18: 2,
            19: 2,
            20: 2,
            21: 2,
            22: 2,
            23: 2,
            24: 2,
            25: 2,
            26: 2,
            27: 2,
            28: 2,
            29: 2,
            30: 2,
        }
    },
    [CALCIUMEXP]: {
        id: CALCIUMEXP, label: "Calcium", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [FERMENTINGEXP]: {
        id: FERMENTINGEXP, label: "Ferment.", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [RESIDUEBONUS]: {
        id: RESIDUEBONUS, label: "Residue", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 4,
            6: 14,
            7: 114,
            8: 214,
            9: 314,
            10: 414,
            11: 514,
            12: 614,
            13: 614,
            14: 491,
            15: 491,
            16: 491,
            17: 491,
            18: 491,
            19: 491,
            20: 491,
            21: 491,
            22: 491,
            23: 491,
            24: 491,
            25: 491,
            26: 491,
            27: 491,
            28: 491,
            29: 491,
            30: 491,
        }
    },
    [WORMQTY]: {
        id: WORMQTY, label: "Worm Qty", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [LARVAQTY]: {
        id: LARVAQTY, label: "Larve Qty", icon: "", weights: {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [LARVAEFF]: {
        id: LARVAEFF, label: "Larve Eff.", icon: "", weights: {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            22: 1,
            23: 1,
            24: 1,
            25: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
        }
    },
    [ATTACKHP]: {
        id: ATTACKHP, label: "Att. + Hp.", icon: "", weights: {
            0: 0,
            1: 10,
            2: 10,
            3: 10,
            4: 10,
            5: 10,
            6: 10,
            7: 10,
            8: 10,
            9: 10,
            10: 10,
            11: 10,
            12: 10,
            13: 10,
            14: 19,
            15: 19,
            16: 19,
            17: 19,
            18: 19,
            19: 19,
            20: 19,
            21: 19,
            22: 19,
            23: 19,
            24: 19,
            25: 19,
            26: 19,
            27: 19,
            28: 19,
            29: 19,
            30: 19,
        }
    },
    [PETDMG]: {
        id: PETDMG, label: "Pet Dmg", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 2455,
            11: 2455,
            12: 2455,
            13: 2455,
            14: 2455,
            15: 2455,
            16: 2455,
            17: 2455,
            18: 2455,
            19: 2455,
            20: 2455,
            21: 2455,
            22: 2455,
            23: 2455,
            24: 2455,
            25: 2455,
            26: 2455,
            27: 2455,
            28: 2455,
            29: 2455,
            30: 2455,
        }
    },
    [PETLEVELEXP]: {
        id: PETLEVELEXP, label: "Pet Level", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 1473,
            11: 1473,
            12: 1473,
            13: 1473,
            14: 205,
            15: 491,
            16: 491,
            17: 491,
            18: 491,
            19: 491,
            20: 491,
            21: 491,
            22: 491,
            23: 491,
            24: 491,
            25: 491,
            26: 491,
            27: 491,
            28: 491,
            29: 491,
            30: 491,
        }
    },
    [PETRANKEXP]: {
        id: PETRANKEXP, label: "Pet Rank", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 2455 / 5,
            11: 2455 / 5,
            12: 2455 / 5,
            13: 2455 / 5,
            14: 2455 / 5,
            15: 2455 / 5,
            16: 2455 / 5,
            17: 2455 / 5,
            18: 2455 / 5,
            19: 2455 / 5,
            20: 2455 / 5,
            21: 2455 / 5,
            22: 2455 / 5,
            23: 2455 / 5,
            24: 2455 / 5,
            25: 2455 / 5,
            26: 2455 / 5,
            27: 2455 / 5,
            28: 2455 / 5,
            29: 2455 / 5,
            30: 2455 / 5,
        }
    },
    [CARDPOWERB]: {
        id: CARDPOWERB, label: "Card Power", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0,
            24: 0,
            25: 0,
            26: 0,
            27: 0,
            28: 0,
            29: 0,
            30: 0,
        }
    },
    [CARDEXPB]: {
        id: CARDEXPB, label: "Card Exp", icon: "", weights: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0,
            24: 0,
            25: 0,
            26: 0,
            27: 0,
            28: 0,
            29: 0,
            30: 0,
        }
    },
}

function powerFormula(Pow, logBase, customConstant, isPerm = false) {

    let result = mathHelper.pow(
        1.2,
        mathHelper.logDecimal(Pow, logBase)
    );
    result = mathHelper.multiplyDecimal(result, customConstant);

    result = isPerm ? mathHelper.multiplyDecimal(result, 0.5) : result;
    result = mathHelper.addDecimal(result, 1);
    return result;
}
const tempPowerBonusFormula = {
    17: (Pow) => powerFormula(Pow, 1.5, 0.015),
    1: (Pow) => powerFormula(Pow, 1.3, 0.018),
    2: (Pow) => powerFormula(Pow, 1.35, 0.016),
    3: (Pow) => powerFormula(Pow, 1.325, 0.015),
    5: (Pow) => powerFormula(Pow, 1.55, 0.001),
    6: (Pow) => powerFormula(Pow, 1.525, 0.002),
    9: (Pow) => powerFormula(Pow, 1.325, 0.02),
    7: (Pow) => powerFormula(Pow, 1.325, 0.016),
    4: (Pow) => powerFormula(Pow, 1.3, 0.016),
    8: (Pow) => powerFormula(Pow, 1.35, 0.012),
    10: (Pow) => powerFormula(Pow, 1.325, 0.011),
    11: (Pow) => powerFormula(Pow, 1.325, 0.01),
    12: (Pow) => powerFormula(Pow, 1.4, 0.008),
    13: (Pow) => powerFormula(Pow, 1.525, 0.002),
    14: (Pow) => powerFormula(Pow, 1.4, 0.01),
    15: (Pow) => powerFormula(Pow, 1.3, 0.015),
    16: (Pow) => powerFormula(Pow, 1.3, 0.02),
    18: (Pow) => powerFormula(Pow, 1.525, 0.003),
    19: (Pow) => powerFormula(Pow, 1.5, 0.002),
    20: (Pow) => powerFormula(Pow, 1.55, 0.001),
    _: (Pow) => 1.0
};
const permPowerBonusFormula = {
    17: (Pow) => powerFormula(Pow, 1.5, 0.015, true),
    1: (Pow) => powerFormula(Pow, 1.3, 0.018, true),
    2: (Pow) => powerFormula(Pow, 1.35, 0.016, true),
    3: (Pow) => powerFormula(Pow, 1.325, 0.015, true),
    5: (Pow) => powerFormula(Pow, 1.55, 0.001, true),
    6: (Pow) => powerFormula(Pow, 1.525, 0.002, true),
    9: (Pow) => powerFormula(Pow, 1.325, 0.02, true),
    7: (Pow) => powerFormula(Pow, 1.325, 0.016, true),
    4: (Pow) => powerFormula(Pow, 1.3, 0.016, true),
    8: (Pow) => powerFormula(Pow, 1.35, 0.012, true),
    10: (Pow) => powerFormula(Pow, 1.325, 0.011, true),
    11: (Pow) => powerFormula(Pow, 1.325, 0.01, true),
    12: (Pow) => powerFormula(Pow, 1.4, 0.008, true),
    13: (Pow) => powerFormula(Pow, 1.525, 0.002, true),
    14: (Pow) => powerFormula(Pow, 1.4, 0.01, true),
    15: (Pow) => powerFormula(Pow, 1.3, 0.015, true),
    16: (Pow) => powerFormula(Pow, 1.3, 0.02, true),
    18: (Pow) => powerFormula(Pow, 1.525, 0.003, true),
    19: (Pow) => powerFormula(Pow, 1.5, 0.002, true),
    20: (Pow) => powerFormula(Pow, 1.55, 0.001, true),
    // _: (Pow) => new Decimal(1.0)
};

const CARD_DISPLAY_IDS = [
    17, 1, 2, 3, 9,
    7, 4, 14, 15, 16,
    8, 10, 11, 12, 13,
    6, 5, 19, 18, 20
];

const CardCard = ({ vertical, displayMode, data, card, weightMap, i, applyWeights, cardMap, setCardMap, resetWeights }) => {

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

    const [cardWeight, setCardWeight] = useLocalStorage(`cardWeight-${ID}`, -1);

    useEffect(() => {
        if (resetWeights > 10) {
            setCardWeight(-1);
        }
    }, [resetWeights, setCardWeight]);


    let defaultWeight = cardIDMap[ID].weights[data.AscensionCount];
    if (data.AscensionCount >= 15) {
        defaultWeight /= 2;
    }
    const finalWeight = cardWeight === -1 ? defaultWeight : cardWeight;

    const [finalAfter, setFinalAfter] = useState(mathHelper.createDecimal(-1));
    const [finalBefore, setFinalBefore] = useState(mathHelper.createDecimal(-1));
    const [flatIncrease, setFlatIncrease] = useState(mathHelper.createDecimal(-1));
    const [percIncrease, setPercentIncrease] = useState(mathHelper.createDecimal(-1));
    const [weightIncrease, setWeightIncrease] = useState(mathHelper.createDecimal(-1));

    useEffect(() => {

        const permValueBefore = mathHelper.createDecimal(PowerPermaBD);
        const tempValueBefore = mathHelper.createDecimal(PowerTempBD);

        let permValueAfter = mathHelper.addDecimal(permValueBefore,
            mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma)
        );
        let tempValueAfter = mathHelper.multiplyDecimal(tempValueBefore, (1 - ChargeTransfertPowerTemp));

        let tempBonusBefore = tempPowerBonusFormula[ID](tempValueBefore);
        let permBonusBefore = permPowerBonusFormula[ID](permValueBefore);

        let finalBefore = mathHelper.multiplyDecimal(
            mathHelper.subtractDecimal(
                mathHelper.multiplyDecimal(tempBonusBefore, permBonusBefore),
                1
            ),
            ((1.0 + Level * 0.02) * 100)
        )

        let temp1 = tempPowerBonusFormula[ID](mathHelper.multiplyDecimal(tempValueBefore, (1.0 - ChargeTransfertPowerTemp)))
        let temp2 = permPowerBonusFormula[ID](
            mathHelper.addDecimal(permValueBefore, mathHelper.multiplyDecimal(tempValueBefore, ChargeTransfertPowerPerma))
        )
        let finalAfter =
            mathHelper.multiplyDecimal(
                mathHelper.subtractDecimal(mathHelper.multiplyDecimal(temp1, temp2), 1),
                (1.0 + Level * 0.02) * 100);



        let percIncrease = mathHelper.divideDecimal(finalAfter, finalBefore);
        let flatIncrease = mathHelper.subtractDecimal(finalAfter, finalBefore);
        let weightIncrease = mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), finalWeight);

        setFinalAfter(finalAfter);
        setFinalBefore(finalBefore);
        setWeightIncrease(weightIncrease);
        setFlatIncrease(flatIncrease);
        setPercentIncrease(percIncrease);

        if (resetWeights !== -3) {
            if (!(ID in cardMap)) {
                setCardMap((e) => {
                    let tempy = { ...e };
                    tempy[ID] = {
                        ID: ID, finalAfter: finalAfter,
                        percIncrease: percIncrease,
                        flatIncrease: flatIncrease,
                        weightIncrease: weightIncrease
                    };
                    return tempy;
                })
            }
            else if (!cardMap[ID]?.finalAfter.equals(finalAfter) || !cardMap[ID]?.weightIncrease.equals(weightIncrease)) {
                setCardMap((e) => {
                    let tempy = { ...e };
                    tempy[ID] = {
                        ID: ID, finalAfter: finalAfter, percIncrease: percIncrease,
                        flatIncrease: flatIncrease,
                        weightIncrease: weightIncrease
                    };
                    return tempy;
                })
            }

        }
    }, [cardMap, finalWeight, ChargeTransfertPowerPerma, ChargeTransfertPowerTemp, setCardMap,
         
        resetWeights
        ,
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
    ])



    let displayTotalsRatio = 0;
    let isPositiveChargeRatio = finalAfter.greaterThan(finalBefore);

    let middleCard = false;
    let num = i + 1;

    if (Math.floor(num / 5) % 2 === 0) {
        middleCard = (num > 1) && (num % 2 === 0) && (num % 5 !== 0)
    }
    else {
        middleCard = (num > 1) && (num % 2 === 1) && (num % 5 !== 0)
    }


    let margin = ``;
    if (vertical) {
        margin = num % 2 === 0 && num + 1 ? '6px 0' : ''
    }
    else {
        margin = middleCard ? `0 6px ${num > 1 && num % 5 === 0 ? '12px' : ''} 6px` : '';
    }

    let extraText = `(+${mathHelper.subtractDecimal(finalAfter, finalBefore).toExponential(2)})`;
    if (displayMode === 'perc') {
        let tempy = helper.roundTwoDecimal(mathHelper.divideDecimal(finalAfter, finalBefore).toNumber() * 100 - 100);
        extraText = `(${tempy}%)`
    }
    else if (displayMode === 'flat') {
        let tempy = mathHelper.subtractDecimal(finalAfter, finalBefore).toExponential(2).toString();
        extraText = `(+${tempy})`
    }
    else if (displayMode === 'weight') {
        let tempy = mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), finalWeight)
        extraText = `(${tempy.toNumber().toExponential(2)})`
    }

    return (


        <div
            key={i}
            style={{
                border: isPositiveChargeRatio ? '2px solid green' : '1px solid black',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '154px',
                width: '90px',
                // height: '190px',
                // width: '195px',
                padding: '3px',
                margin: margin,
                boxSizing: 'border-box'
            }}>
            <MouseOverPopover tooltip={
                <div style={{ padding: '6px' }}>
                    <div>
                        Current Bonus: {finalBefore.toExponential(2).toString()}%
                    </div>
                    <div>
                        Charged Bonus: {finalAfter.toExponential(2).toString()}%
                    </div>
                    <div>
                        Absolute Increase: {flatIncrease.toExponential(2).toString()}
                    </div>
                    <div>
                        Percentage Increase: {percIncrease.toExponential(2).toString()}
                    </div>
                    <div>
                        Weighted Increase: {weightIncrease.toExponential(2).toString()}
                    </div>
                    <div>
                        Current Weight:{finalWeight}
                    </div>
                </div>
            }>
                <div>
                    <div style={{ fontWeight: 'bold' }}>
                        {cardIDMap[ID].label}
                    </div>
                    {/* <img alt={`picture of the in game ${cardIDMap[ID].label} card`} style={{ height: '75px' }} src={`/fapi_fork_personal/cards/card${ID}.png`} /> */}
                    <div style={{ height: '75px', width: '95%', margin: '0 auto', position: 'relative' }}>
                        <Image
                            alt={`picture of the in game ${cardIDMap[ID].label} card`}
                            fill
                            src={cardMapImg[ID].img}
                            unoptimized={true}
                            priority
                        />
                    </div>
                    <div
                        style={{ color: isPositiveChargeRatio ? 'green' : 'red', marginBottom: '-2px' }}
                    >
                        {`${finalAfter.toExponential(2)}%`}
                    </div>
                    {isPositiveChargeRatio && (
                        <div
                            style={{}}
                        >
                            {/* {extraText} */}
                        </div>
                    )}
                </div>
            </MouseOverPopover>

            {displayMode === 'original' && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <input
                        style={{
                            width: '47px',
                            color: cardWeight === finalWeight ? 'black' : 'gray',
                            fontWeight: cardWeight === finalWeight ? 'bold' : ''
                        }}
                        type='number'
                        value={finalWeight}
                        // value={cardWeight}
                        onChange={
                            (e) => {
                                try {
                                    let x = Number(e.target.value);
                                    // x = Math.floor(x);
                                    if (x < 0 || x > 999999) {
                                        return;
                                    }
                                    setCardWeight(x);
                                    console.log(`updating card: ${ID}  ->>>> ${x}`)

                                    // setCardMap((e) => {
                                    //     let tempy = { ...e };
                                    //     tempy[ID] = {
                                    //         ID: ID, finalAfter: finalAfter,
                                    //         percIncrease: percIncrease,
                                    //         flatIncrease: flatIncrease,
                                    //         weightIncrease: mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), x)
                                    //     };
                                    //     return tempy;
                                    // })


                                    ReactGA.event({
                                        category: "card_interaction",
                                        action: `changed_card_weight`,
                                        label: `${cardIDMap[ID].label}`,
                                        value: x
                                    })

                                }
                                catch (err) {
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
                        <div style={{ position: 'relative', height: '16px', width: '16px', marginLeft: '6px' }}>
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
            )}

        </div>

    );
}

export default function Cards() {

    useEffect(() => {

        let timeout = setTimeout(() => {

            ReactGA.send({ hitType: "pageview", page: "/cards", title: "Card Calculator Page" });
        }, 5000);
        return () => { clearTimeout(timeout) };
    }, []);


    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    const [weightMap, setWeightMap] = useState(DefaultWeightMap);
    const [cardMap, setCardMap] = useState({})
    const [resetCardWeights, setResetCardWeights] = useState(-1);
    const [forceRefresh, setForceRefresh] = useState(false);

    const { CardsCollection } = data;

    useEffect(() => {
        if (resetCardWeights > 10) {
            setResetCardWeights(-2);
        }
    }, [resetCardWeights]);

    // const foundCards = CardsCollection.filter(card => card.Found === 1);
    const cardsById = CardsCollection.reduce((accum, card) => {
        accum[card.ID] = card;
        return accum;
    }, {});

    let weightedCardInfo = [];

    for (let i = 0; i < CARD_DISPLAY_IDS.length; i++) {
        weightedCardInfo.push(
            <CardCard resetWeights={resetCardWeights} displayMode='original' cardMap={cardMap} setCardMap={setCardMap} data={data} i={i} card={cardsById[CARD_DISPLAY_IDS[i]]} weightMap={weightMap} classes={classes} applyWeights={true} key={`${i}-orig`}></CardCard>
        )
    }

    let baseCardArr = [];
    Object.values(cardMap).forEach((inner_card) => {
        baseCardArr.push(inner_card);
    })
    let topPercIncrease = baseCardArr.sort((a, b) => {
        let res = b.percIncrease.greaterThan(a.percIncrease) ? 1 : -1;
        return res;
    });

    let finalPercIncrease = topPercIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ fontSize: '36px', margin: '0 6px 0 0', }}>
                    {index + 1}
                </div>
                <CardCard resetWeights={-3} displayMode='perc' vertical={true} cardMap={cardMap} setCardMap={setCardMap} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);


    let flatIncrease = baseCardArr.sort((a, b) => {
        let res = b.flatIncrease.greaterThan(a.flatIncrease) ? 1 : -1;
        return res;
    });
    let finalFlatIncrease = flatIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={index}>
                <div style={{ fontSize: '36px', margin: '0 6px 0 0', }}>
                    {index + 1}
                </div>
                <CardCard resetWeights={-3} displayMode='flat' vertical={true} cardMap={cardMap} setCardMap={setCardMap} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);

    let weightIncrease = baseCardArr.sort((a, b) => {
        let res = b.weightIncrease.greaterThan(a.weightIncrease) ? 1 : -1;
        return res;
    });
    let finalWeightIncrease = weightIncrease.slice(0, 5).map((value, index, arr) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={index}>
                <div style={{ fontSize: '36px', margin: '0 6px 0 0', }}>
                    {index + 1}
                </div>
                <CardCard resetWeights={-3} displayMode='weight' vertical={true} cardMap={cardMap} setCardMap={setCardMap} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);

    let classExp = mathHelper.multiplyDecimal(data.CurrentLevel, mathHelper.pow(1.001, mathHelper.min(1000.0, data.CurrentLevel)));
    let class2 = mathHelper.max(1.0, mathHelper.subtractDecimal(mathHelper.logDecimal(data.CurrentLevel, 5.0), 2.0));
    let class3 = mathHelper.max(1.0, 1.0 + (data.CurrentLevel / 2000.0 - 0.5));
    let classTotal = mathHelper.multiplyDecimal(classExp, mathHelper.multiplyDecimal(class2, class3))
    let timerBonuses = data.TimerReincBonuses;
    let otherBonuses = mathHelper.createDecimal(data.ReincarnationBonusesBD);
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
    let requiredReincExp = mathHelper.createDecimal(data.ReincarnationExpRequiredBD);
    let currentReincLevel = mathHelper.createDecimal(data.ReincarnationLevel).toNumber();
    let calcedReincExp = reincHelper.calcRequiredReincExp(currentReincLevel, data)
    let requiredReincLevel = data.AscensionReincLevelRequired;
    let currReincTime = data.CurrentReincarnationTimer / (60 * 60);


    let futureReincLevel = currentReincLevel;
    let loopFlag = true;
    while (loopFlag) {

        let required = reincHelper.calcRequiredReincExp(futureReincLevel, data);
        if (currentReincExp.greaterThan(required)) {
            futureReincLevel++;
            currentReincExp = mathHelper.subtractDecimal(currentReincExp, required);
        }
        else {
            loopFlag = false;
        }
    }

    let levelDiff = futureReincLevel - currentReincLevel;
    if (levelDiff === 0) levelDiff = 1;

    let reincHr = (levelDiff) / currReincTime;
    let remTime = (requiredReincLevel - futureReincLevel) / reincHr;
    let soulClock = data.SoulOldClock;
    let chargeDuration = 12 * (1 - 0.25 * soulClock);
    let tickRate = (1.0 + (data.PetsSpecial[67].Active + data.PetsSpecial[68].Active + data.PetsSpecial[74].Active) * 0.1)
    let remainingCharges = Math.floor((remTime * tickRate) / chargeDuration);

    const chargesMax = data.CurrentCardCharge === data.MaxCardCharge;

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                paddingLeft: '6px'
            }}
        >
            <div
                className={chargesMax ? 'borderToFadeInAndOutRed' : ''}
                style={{
                    display: 'flex',
                    // width: '100%',
                    height: '60px',
                    marginTop: '3px',
                    marginBottom: '6px',
                    alignSelf: 'flex-start',
                    // border: chargesMax ? '2px solid red' : '',
                    padding: chargesMax ? '0 6px' : '',
                    alignItems: 'center'
                }}>
                {chargesMax && (
                    <MouseOverPopover tooltip={

                        <div >
                            {`You have max card charges!`}
                        </div>
                    }
                        opacity={1}
                    >
                        <div className='elementToFadeInAndOut' style={{ position: 'relative', height: '32px', width: '32px', marginRight: '12px' }}>
                            <Image
                                alt='on hover I in a cirlce icon, shows more information on hover'
                                fill
                                src={infoIconRed}
                                unoptimized={true}
                            />
                        </div>
                        {/* <img
                            className='elementToFadeInAndOut'
                            alt='on hover I in a cirlce icon, shows more information on hover'
                            style={{ height: '32px', marginLeft: '6px', marginRight: '12px' }}
                            src={infoIconRed} /> */}
                    </MouseOverPopover >
                )}
                {/* Current Charge */}
                <div
                    style={{ display: 'flex', marginBottom: '0px', width: '455px', alignItems: 'center' }}
                >
                    <div
                        style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}
                    >
                        {`Current Charges: ` + data?.CurrentCardCharge}
                    </div>

                    <div style={{ position: 'relative', height: '55px', width: '30px', }}>
                        <Image
                            alt='in game charge (battery) image'
                            fill
                            src={chargeImg}
                            unoptimized={true}
                        />
                    </div>
                    {/* <img 
                    alt='in game charge (battery) image' 
                    style={{ height: '55px' }}
                     src={`/fapi_fork_personal/cards/charge.png`} 
                     /> */}
                </div>

                {/* Charges till Ascencion */}
                <MouseOverPopover tooltip={

                    <div>
                        {` ${requiredReincLevel - futureReincLevel} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr =  ${helper.roundTwoDecimal(remTime)} hours remaining`}
                    </div>
                }
                    opacity={1}
                >
                    <div
                        style={{ display: 'flex', marginBottom: '0px', marginleft: '36px', alignItems: 'center', height: '60px' }}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', fontSize: '48px' }}
                        >
                            {`Remaining Charges in ascencion: ${remainingCharges} `}
                        </div>

                        <div style={{ position: 'relative', height: '55px', width: '30px', }}>
                            <Image
                                alt='in game charge (battery) image'
                                fill
                                src={chargeImg}
                                unoptimized={true}
                            />
                        </div>

                        {/* <img
                            alt='in game charge (battery) image'
                            style={{ height: '55px' }}
                            src={`/fapi_fork_personal/cards/charge.png`}
                        /> */}

                        <div style={{ position: 'relative', height: '55px', width: '55px', marginLeft: '6px' }}>
                            <Image
                                alt='on hover I in a cirlce icon, shows more information on hover'
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                        {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '32px', marginLeft: '6px' }} src={infoIcon} /> */}


                    </div>

                </MouseOverPopover >
            </div>



            <div
                style={{
                    display: 'flex'
                }}
            >
                {/* Original Cards */}
                <div
                    style={{
                        maxWidth: '474px',
                        padding: '6px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                        border: '1px solid black',
                        borderRadius: '6px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >

                        <h3
                            style={{ marginTop: '-3px', marginBottom: '6px', marginRight: '12px' }}
                        >Current Cards</h3>
                        <div>
                            <button
                                onClick={() => {
                                    let num = Math.random() * 1000 + 20;
                                    setResetCardWeights(num);

                                }}
                            >Reset Weights</button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'flex-start'
                        }}
                    >
                        {weightedCardInfo}
                    </div>
                </div>
                {/* Top 5 Weighted increase */}
                <div
                    style={{
                        maxWidth: '474px',
                        padding: '6px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                        border: '1px solid black',
                        borderRadius: '6px',
                        margin: '0 12px 0 24px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >

                        <h3
                            style={{ marginTop: '-3px', marginBottom: '6px' }}
                        >Best Weight</h3>

                        {finalWeightIncrease}
                    </div>

                </div>
                {/* Top 5 % increase */}
                <div
                    style={{
                        maxWidth: '474px',
                        padding: '6px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                        border: '1px solid black',
                        borderRadius: '6px',
                        margin: '0 24px 0 12px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <h3
                            style={{ marginTop: '-3px', marginBottom: '6px' }}
                        >Best Percen.</h3>
                        {finalPercIncrease}
                    </div>
                </div>
            </div>
        </div >
    );
};

