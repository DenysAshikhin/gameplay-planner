"use client"


import { isMobile } from 'mobile-device-detect';
import './card.css';
import { useState, useEffect, useRef } from 'react';
import ReactGA from "react-ga4";
import MouseOverPopover from "../util/Tooltip.jsx";
import { DefaultWeightMap } from '../util/itemMapping.js';
import { cardMapImg, cardLabelImg } from './cardMapping.js';

import mathHelper from '../util/math.js';
import reincHelper from '../util/reincHelper.js';
import helper from '../util/helper.js';

import rightArrow from '../../../public/images/icons/right_arrow_white.svg';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import infoIconRed from '../../../public/images/icons/info_red.svg';
// import chargeImg from '../../../public/images/cards/charge.png'
import chargeImg from '../../../public/images/cards_v2/battery.png'

import greenBorder from '../../../public/images/cards_v2/CardSelectedGreen.png'
import redBorder from '../../../public/images/cards_v2/CardSelectedRed.png'

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
const HEALTHYBONUS = 23;
const FRIESBONUS = 27;
const PROTEINBONUS = 28;
const GHBONUS = 29;
const MININGEXP = 34;
const MININGPWR = 35;


const maxKey = 30;



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
            6: 2455,
            7: 2455,
            8: 2455,
            9: 2455,
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
            6: 2455,
            7: 2455,
            8: 2455,
            9: 2455,
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
            6: 1473,
            7: 1473,
            8: 1473,
            9: 1473,
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
    [HEALTHYBONUS]: {
        id: HEALTHYBONUS, label: "Heal. Pot.", icon: "", weights: {
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
    [FRIESBONUS]: {
        id: FRIESBONUS, label: "Fries", icon: "", weights: {
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
    [PROTEINBONUS]: {
        id: PROTEINBONUS, label: "Protein", icon: "", weights: {
            0: 2,
            1: 2,
            2: 2,
            3: 2,
            4: 2,
            5: 2,
            6: 2,
            7: 2,
            8: 2,
            9: 2,
            10: 2,
            11: 2,
            12: 2,
            13: 2,
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
    [GHBONUS]: {
        id: GHBONUS, label: "GH Dmg", icon: "", weights: {
            0: 3,
            1: 3,
            2: 3,
            3: 3,
            4: 3,
            5: 3,
            6: 3,
            7: 3,
            8: 3,
            9: 3,
            10: 3,
            11: 3,
            12: 3,
            13: 3,
            14: 3,
            15: 3,
            16: 3,
            17: 3,
            18: 3,
            19: 3,
            20: 3,
            21: 3,
            22: 3,
            23: 3,
            24: 3,
            25: 3,
            26: 3,
            27: 3,
            28: 3,
            29: 3,
            30: 3,
        }
    },
    [MININGEXP]: {
        id: MININGEXP, label: "Mining Exp", icon: "", weights: {
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
    [MININGPWR]: {
        id: MININGPWR, label: "Mining Pwr", icon: "", weights: {
            0: 4,
            1: 4,
            2: 4,
            3: 4,
            4: 4,
            5: 4,
            6: 4,
            7: 4,
            8: 4,
            9: 4,
            10: 4,
            11: 4,
            12: 4,
            13: 4,
            14: 4,
            15: 4,
            16: 4,
            17: 4,
            18: 4,
            19: 4,
            20: 4,
            21: 4,
            22: 4,
            23: 4,
            24: 4,
            25: 4,
            26: 4,
            27: 4,
            28: 4,
            29: 4,
            30: 4,
        }
    },
}

function powerFormula(Pow, logBase, customConstant, params) {

    params = params ? params : {};
    const ID = params.ID ? params.ID : 1;
    const isPerm = params.isPerm ? params.isPerm : false;


    let base = 1.2;
    if (!isPerm) {
        switch (ID) {
            case 23:
            case 27:
            case 28:
            case 29:
                base = 1.1;
                break;
            case 34:
                base = 1.09;
                break;
            case 35:
                base = 1.08;
                break;
        }
    }
    else {
        switch (ID) {
            case 23:
            case 27:
            case 28:
            case 29:
            case 34:
            case 35:
                base = 1.1;
        }
    }
    let result = mathHelper.pow(
        base,
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
    23: (Pow) => powerFormula(Pow, 7.0, 0.18, { ID: 23 }),
    27: (Pow) => powerFormula(Pow, 7.0, 0.009, { ID: 27 }),
    28: (Pow) => powerFormula(Pow, 7.0, 0.045, { ID: 28 }),
    29: (Pow) => powerFormula(Pow, 7.0, 0.09, { ID: 29 }),
    34: (Pow) => powerFormula(Pow, 8.0, 0.018, { ID: 34 }),
    35: (Pow) => powerFormula(Pow, 9.0, 0.009, { ID: 35 }),
    _: (Pow) => 1.0
};
const permPowerBonusFormula = {
    17: (Pow) => powerFormula(Pow, 1.5, 0.015, { isPerm: true, ID: 1 }),
    1: (Pow) => powerFormula(Pow, 1.3, 0.018, { isPerm: true, ID: 1 }),
    2: (Pow) => powerFormula(Pow, 1.35, 0.016, { isPerm: true, ID: 1 }),
    3: (Pow) => powerFormula(Pow, 1.325, 0.015, { isPerm: true, ID: 1 }),
    5: (Pow) => powerFormula(Pow, 1.55, 0.001, { isPerm: true, ID: 1 }),
    6: (Pow) => powerFormula(Pow, 1.525, 0.002, { isPerm: true, ID: 1 }),
    9: (Pow) => powerFormula(Pow, 1.325, 0.02, { isPerm: true, ID: 1 }),
    7: (Pow) => powerFormula(Pow, 1.325, 0.016, { isPerm: true, ID: 1 }),
    4: (Pow) => powerFormula(Pow, 1.3, 0.016, { isPerm: true, ID: 1 }),
    8: (Pow) => powerFormula(Pow, 1.35, 0.012, { isPerm: true, ID: 1 }),
    10: (Pow) => powerFormula(Pow, 1.325, 0.011, { isPerm: true, ID: 1 }),
    11: (Pow) => powerFormula(Pow, 1.325, 0.01, { isPerm: true, ID: 1 }),
    12: (Pow) => powerFormula(Pow, 1.4, 0.008, { isPerm: true, ID: 1 }),
    13: (Pow) => powerFormula(Pow, 1.525, 0.002, { isPerm: true, ID: 1 }),
    14: (Pow) => powerFormula(Pow, 1.4, 0.01, { isPerm: true, ID: 1 }),
    15: (Pow) => powerFormula(Pow, 1.3, 0.015, { isPerm: true, ID: 1 }),
    16: (Pow) => powerFormula(Pow, 1.3, 0.02, { isPerm: true, ID: 1 }),
    18: (Pow) => powerFormula(Pow, 1.525, 0.003, { isPerm: true, ID: 1 }),
    19: (Pow) => powerFormula(Pow, 1.5, 0.002, { isPerm: true, ID: 1 }),
    20: (Pow) => powerFormula(Pow, 1.55, 0.001, { isPerm: true, ID: 1 }),
    23: (Pow) => powerFormula(Pow, 7.0, 0.18, { isPerm: true, ID: 23 }),
    27: (Pow) => powerFormula(Pow, 7.0, 0.009, { isPerm: true, ID: 27 }),
    28: (Pow) => powerFormula(Pow, 7.0, 0.045, { isPerm: true, ID: 28 }),
    29: (Pow) => powerFormula(Pow, 7.0, 0.009, { isPerm: true, ID: 29 }),
    34: (Pow) => powerFormula(Pow, 7.0, 0.027, { isPerm: true, ID: 34 }),
    35: (Pow) => powerFormula(Pow, 7.0, 0.009, { isPerm: true, ID: 35 }),
    // _: (Pow) => new Decimal(1.0)
};

const CARD_DISPLAY_IDS = [
    17, 1, 2, 3, 9,
    7, 4, 14, 15, 16,
    8, FRIESBONUS, PROTEINBONUS, GHBONUS, HEALTHYBONUS,
    10, 11, 12, 13,
    6, 5, 19, 18, 20, MININGEXP, MININGPWR
];

const CardCard = ({
    vertical,
    displayMode,
    bonusMode,
    data, card, weightMap, i, applyWeights, cardMap, setCardMap, resetWeights, cardWeightInner,
    cardWeight, setCardWeightNew }) => {

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

    // const [cardWeight, setCardWeight] = useLocalStorage(`cardWeight-${ID}`, -1);
    // const [internalWeight, setInternalWeight] = useState(-1);

    // useEffect(() => {
    //     setInternalWeight(cardWeight);
    // }, [cardWeight])

    let defaultWeight = cardIDMap[ID].weights[data.AscensionCount > maxKey ? maxKey : data.AscensionCount];
    if (data.AscensionCount >= 15) {
        defaultWeight /= 2;
    }
    const finalWeight = cardWeight === -1 ? defaultWeight : cardWeight;

    const [finalAfter, setFinalAfter] = useState(mathHelper.createDecimal(-1));
    const [finalBefore, setFinalBefore] = useState(mathHelper.createDecimal(-1));
    const [flatIncrease, setFlatIncrease] = useState(mathHelper.createDecimal(-1));
    const [percIncrease, setPercentIncrease] = useState(mathHelper.createDecimal(-1));
    const [weightIncrease, setWeightIncrease] = useState(mathHelper.createDecimal(-1));
    const [loggedWeightIncrease, setLoggedWeightIncrease] = useState(mathHelper.createDecimal(-1));
    const [loggedWeightIncrease2, setLoggedWeightIncrease2] = useState(mathHelper.createDecimal(-1));
    const [finalTemp, setFinalTemp] = useState(mathHelper.createDecimal(-1));

    const [refreshMath, setRefreshMath] = useState(true);

    useEffect(() => {


        setRefreshMath(false);

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

        if (finalWeight === 0) {
            let bigsad = -1;
        }

        let percIncrease = mathHelper.divideDecimal(finalAfter, finalBefore);
        let flatIncrease = mathHelper.subtractDecimal(finalAfter, finalBefore);
        let weightIncrease = mathHelper.multiplyDecimal(mathHelper.divideDecimal(mathHelper.subtractDecimal(finalAfter, finalBefore), finalBefore), finalWeight);
        // let loggedWeightIncrease = tempValueAfter.eq(mathHelper.createDecimal(0)) ? mathHelper.createDecimal(0) : mathHelper.logDecimal(percIncrease, finalWeight + 1);
        let loggedWeightIncrease =
            finalBefore.greaterThan(finalAfter) ? mathHelper.createDecimal(-1) :
                mathHelper.multiplyDecimal(
                    mathHelper.logDecimal(mathHelper.addDecimal(finalAfter, 1), mathHelper.addDecimal(finalBefore, 0.0000001)),
                    finalWeight
                );
        let loggedWeightIncrease2 =
            finalBefore.greaterThan(finalAfter) ? mathHelper.createDecimal(-1) :

                mathHelper.logDecimal(
                    mathHelper.multiplyDecimal(
                        mathHelper.addDecimal(finalAfter, 1)
                        , finalWeight + 0.0000001
                    ),
                    finalBefore);

        // let loggedWeightIncrease2 =
        //     finalBefore.greaterThan(finalAfter) ? mathHelper.createDecimal(-1) : mathHelper.logDecimal(mathHelper.addDecimal(finalAfter, 1), finalBefore);

        setFinalTemp(tempValueAfter);
        setFinalAfter(finalAfter);
        setFinalBefore(finalBefore);
        setWeightIncrease(weightIncrease);
        setFlatIncrease(flatIncrease);
        setPercentIncrease(percIncrease);
        setLoggedWeightIncrease(loggedWeightIncrease);
        setLoggedWeightIncrease2(loggedWeightIncrease2);

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
                        loggedWeightIncrease2: loggedWeightIncrease2,
                        weight: finalWeight
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
                        weightIncrease: weightIncrease,
                        loggedWeightIncrease: loggedWeightIncrease,
                        loggedWeightIncrease2: loggedWeightIncrease2,
                        weight: finalWeight
                    };
                    return tempy;
                })
            }

        }



    }, [cardMap, finalWeight, ChargeTransfertPowerPerma, ChargeTransfertPowerTemp, setCardMap,
        cardWeight, setCardWeightNew,
        resetWeights,
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
        refreshMath
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
    if (vertical && false) {
        margin = num % 2 === 0 && num + 1 ? '6px 0' : ''
    }
    else {
        margin = middleCard ? `0 6px ${num > 1 && num % 5 === 0 ? '12px' : ''} 6px` : '';
    }

    let displayLabel = vertical;
    vertical = false;

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
                margin: displayMode === 'original' ? margin : `${num === 1 ? '' : '6px'} 0 0 0`,
                padding: displayMode === 'original' ? '' : '0 6px 0 6px',
                boxSizing: 'border-box',
                position: displayMode === 'original' ? 'relative' : ``,
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
                                    Current Bonus: {finalBefore.toExponential(2).toString()}%
                                </div>
                                <div>
                                    Charged Bonus: {finalAfter.toExponential(2).toString()}%
                                </div>
                                <div>
                                    Absolute Increase: {flatIncrease.toExponential(2).toString()}
                                </div>
                                <div>
                                    Percentage Increase: {mathHelper.multiplyDecimal(percIncrease, 100).toExponential(2).toString()}
                                </div>
                                <div>
                                    Weighted Increase: {weightIncrease.toExponential(2).toString()}
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
                                        src={greenBorder}
                                        unoptimized={true}
                                        priority
                                    />
                                )}
                                {!isPositiveChargeRatio && (
                                    <Image
                                        alt={`picture of the in game ${cardIDMap[ID].label} card`}
                                        fill
                                        src={redBorder}
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
                                    {`${bonusMode === '%gain' || bonusMode === 'xgain' ?
                                        finalBonusDisplay.toNumber() > 9999 ?
                                            helper.roundInt(finalBonusDisplay.toNumber()).toLocaleString()
                                            :
                                            helper.roundTwoDecimal(finalBonusDisplay.toNumber()).toLocaleString()
                                        : finalBonusDisplay.toExponential(2)}${bonusMode === 'xgain' ? 'X' : '%'}`}
                                </div>

                                {/* Final temp */}
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        fontSize: vertical ? '10px' : '13px',
                                        top: vertical ? '24px' : '32px',
                                        right: '8px',
                                    }}
                                >
                                    {`${finalTemp.toExponential(2)}%`}
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
                                    fontSize: vertical ? '12px' : '14px',
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
                                    fontSize: vertical ? '12px' : '14px',
                                    bottom: vertical ? '2px' : '4px',
                                    // width: '100%',
                                    marginLeft: 'auto',
                                    fontSize: '20px'
                                }}
                            >
                                {displayMode === 'logged' && (
                                    <>
                                        {loggedWeightIncrease.toExponential(2).toString()}
                                    </>
                                )}
                                {displayMode === 'logged2' && (
                                    <>
                                        {loggedWeightIncrease2.toExponential(2).toString()}
                                    </>
                                )}
                                {(displayMode !== 'logged' && displayMode !== 'logged2') && (
                                    <>
                                        {displayMode === 'weight' ? weightIncrease.toExponential(2).toString() : percIncrease.toExponential(2).toString() + '%'}
                                    </>
                                )}

                            </div>
                        </div>
                    </MouseOverPopover>
                </>
            )}

        </div >
    );
}

const defaultWeights = {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
    10: -1,
    11: -1,
    12: -1,
    13: -1,
    14: -1,
    15: -1,
    16: -1,
    17: -1,
    18: -1,
    19: -1,
    20: -1,
    21: -1,
    22: -1,
    23: -1,
    24: -1,
    25: -1,
    26: -1,
    27: -1,
    28: -1,
    29: -1,
    30: -1,
    31: -1,
    32: -1,
    33: -1,
    34: -1,
    35: -1,
    36: -1,
    37: -1,
    38: -1,
    39: -1,
    40: -1,
    41: -1,
    42: -1,
    43: -1,
    44: -1,
    45: -1,
    46: -1,
    47: -1,
    48: -1,
    49: -1,
}

const CalcReinc = function (data, reincCardCharges) {

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
    let chargeTimerReduction = ((1 + 0.25 * soulClock) * (1.0 + data.WAPCardChargeTimer * 0.01)) - 1;
    let chargeDuration = 12 * chargeTimerReduction;
    let tickRate = (1.0 + (data.PetsSpecial[67].Active + data.PetsSpecial[68].Active + data.PetsSpecial[74].Active) * 0.1)
    // let remainingCharges = Math.floor((remTime * tickRate) / chargeDuration);
    let remainingCharges = Math.floor(remTime / chargeDuration);

    return { requiredReincLevel, futureReincLevel, levelDiff, reincHr, remTime, soulClock, chargeTimerReduction, chargeDuration, remainingCharges }
}

export default function Cards() {

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


    if (!data.PetsSpecial[74]) {
        return (
            <div>
                <h1>{`Your save is most likely from an older version, please update your game and try with a new save. If that's not the case, please reach out on discord! Link can be found on the gratitude (heart) page`}</h1>
            </div>
        )
    }


    // const foundCards = CardsCollection.filter(card => card.Found === 1);
    const cardsById = CardsCollection.reduce((accum, card) => {
        accum[card.ID] = card;
        return accum;
    }, {});

    let weightedCardInfo = [];

    for (let i = 0; i < CARD_DISPLAY_IDS.length; i++) {
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
                displayMode='original' cardMap={cardMap} setCardMap={setCardMap} data={data} i={i} card={cardsById[CARD_DISPLAY_IDS[i]]} weightMap={weightMap} classes={classes} applyWeights={true} key={`${i}-orig`}></CardCard>
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
                    resetWeights={-3} displayMode='perc' vertical={true} cardMap={cardMap} setCardMap={null} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);


    let loggedWeightIncrease = baseCardArr.sort((b, a) => {
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
                    resetWeights={-3} displayMode='logged' vertical={true} cardMap={cardMap} setCardMap={null} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
            </div>
        )
    }, []);

    let loggedWeightIncrease2 = baseCardArr.sort((b, a) => {

        if (a.loggedWeightIncrease2.eq(0) && !b.loggedWeightIncrease2.eq(0)) {
            return 1;
        }
        if (!a.loggedWeightIncrease2.eq(0) && b.loggedWeightIncrease2.eq(0)) {
            return -1;
        }
        else {
            console.log(a);
            console.log(b);
            console.log('---------')
            let res = a.loggedWeightIncrease2.greaterThan(b.loggedWeightIncrease2) ? 1 : -1;
            return res;
        }
    });
    let finalLoggedWeightIncrease2 = loggedWeightIncrease2.slice(0, 5).map((value, index, arr) => {
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
                    resetWeights={-3} displayMode='logged2' vertical={true} cardMap={cardMap} setCardMap={null} data={data} i={index} card={cardsById[value.ID]} weightMap={weightMap} classes={classes} key={`${index}-perc`}></CardCard>
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


    const chargesMax = data.CurrentCardCharge === data.MaxCardCharge;

    let baseReincInfo = CalcReinc(data);
    let remainingCharges = baseReincInfo.remainingCharges;
    let requiredReincLevel = baseReincInfo.requiredReincLevel;
    let currentReincLevel = baseReincInfo.futureReincLevel;
    let currentReincLevelDiff = baseReincInfo.levelDiff;
    let reincHr = baseReincInfo.reincHr;
    let remTime = baseReincInfo.remTime;
    let chargeTimerReduction = baseReincInfo.chargeTimerReduction;

    let cardChargedReincInfo = CalcReinc(data, numReincCharges);
    let futureReincLevel = cardChargedReincInfo.futureReincLevel;
    let futureReincLevelDiff = cardChargedReincInfo.levelDiff;



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
                        padding: chargesMax ? '0 6px' : '',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255, 0.1)',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        marginTop: '6px',
                        padding: '0 3px'
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
                        </MouseOverPopover >
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
                                src={chargeImg}
                                unoptimized={true}
                            />
                        </div>
                    </div>

                    {/* Charges till Ascension */}
                    <MouseOverPopover tooltip={

                        <div>
                            {`${requiredReincLevel - currentReincLevel} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr =  ${helper.roundTwoDecimal(remTime)} hours remaining`}
                        </div>
                    }
                        opacity={1}
                    >
                        <div
                            style={{ display: 'flex', marginBottom: '0px', marginleft: '36px', alignItems: 'center', minWidth: '270px' }}
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
                                    src={chargeImg}
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

                    </MouseOverPopover >
                </div>
            )}

            <div className='importantText' style={{ display: 'flex', alignItems: 'end' }}>
                <h1 style={{ margin: '6px 6px', fontSize: '32px' }}>
                    Cards Guide
                </h1>
                {/* Charges till Ascension */}
                <MouseOverPopover
                    tooltip={

                        <div>
                            <div>
                                {`Remaining charges are calculated based on your remaining reincarnation levels left to ascend multiplied by your current reincarnation levels / hr. \nThis is calculated based on how many reincarnation levels you would gain if you reincarnate now divded by the current reincarnation duration.`}
                            </div>
                            <div>
                                {`${requiredReincLevel - currentReincLevel} remaining levels at ${helper.roundTwoDecimal(reincHr)} levels/hr =  ${helper.roundTwoDecimal(remTime)} hours remaining`}
                            </div>
                            <div>
                                {`Current charge timer reduction: ${helper.roundTwoDecimal(chargeTimerReduction * 100)}%`}
                            </div>
                        </div>
                    }
                    opacity={1}
                >
                    <div style={{ position: 'relative', height: '24px', width: '24px', marginLeft: '6px', marginBottom: '16px' }}>
                        <Image
                            alt='on hover I in a cirlce icon, shows more information on hover'
                            fill
                            src={infoIcon}
                            unoptimized={true}
                        />
                        {/* </div> */}
                    </div>
                </MouseOverPopover >
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
                        padding: '6px 6px 0 6px',
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
                                    setNewCardWeights({
                                        1: -1,
                                        2: -1,
                                        3: -1,
                                        4: -1,
                                        5: -1,
                                        6: -1,
                                        7: -1,
                                        8: -1,
                                        9: -1,
                                        10: -1,
                                        11: -1,
                                        12: -1,
                                        13: -1,
                                        14: -1,
                                        15: -1,
                                        16: -1,
                                        17: -1,
                                        18: -1,
                                        19: -1,
                                        20: -1,
                                        21: -1,
                                        22: -1,
                                        23: -1,
                                        24: -1,
                                        25: -1,
                                        26: -1,
                                        27: -1,
                                    })

                                }}
                            >Reset Weights</button>
                        </div>

                        {/* display mode selector */}
                        <div style={{ marginRight: '12px', position: 'absolute', right: '12px' }}>
                            <select
                                className='importantText'
                                aria-label='Select a default team preset'
                                style={{ maxWidth: '144px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px', borderColor: '#ff691c' }}
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
                            alignContent:'center',
                            // flexWrap: 'wrap',
                            // alignContent: 'flex-start',
                            // justifyContent: 'center',
                            border: '1.5px solid rgba(255,255,255,0.8)',
                            borderRadius: '6px',
                            overflow: 'auto',
                            height: '48px',
                            minWidth:'256px',
                            minHeight:'40px',
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
                                <div style={{ display: 'flex', justifyContent: 'center' }}>{`Current Charges: ${data?.CurrentCardCharge}`}</div>
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
                            minHeight:'84px'
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
                                style={{ marginTop: '0px', marginBottom: '0px', fontSize: '26px', display: 'flex', alignItems: 'center ' }}
                            >
                                <div>
                                    {`Reincarnation levels to ascend:`}
                                </div>
                                <div style={{ fontWeight: 'normal', marginLeft: '6px' }}>
                                    {`${data.AscensionReincLevelRequired}`}
                                </div>
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
                                    <div style={{ marginRight: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <div>
                                            {`Current Reinc. Level:`}
                                        </div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${currentReincLevel} (+${currentReincLevelDiff})`}
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
                                                    {`How many reincarnation card charges to simulate being used`}
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
                                            </MouseOverPopover>
                                        </div>
                                    </div>
                                    <div style={{ height: '36px', width: '36px', position: 'relative', margin: '0 -3px' }}>
                                        <Image
                                            alt='arrow point to the left'
                                            src={rightArrow}
                                            fill
                                            unoptimized
                                        />
                                    </div>
                                    <div style={{ color: 'green', marginTop: '-10px' }}>
                                        {`+${futureReincLevel - currentReincLevel}`}
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
                                    <div style={{ marginRight: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <div>
                                            {`Future Reinc. Level:`}
                                        </div>
                                        <div style={{ fontWeight: 'normal' }}>
                                            {`${futureReincLevel} (+${futureReincLevelDiff})`}
                                        </div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            // flexDirection: 'column',
                            flexWrap: 'wrap',
                            gap: '6px',
                            justifyContent: 'space-around',
                            width: '100%'
                        }}
                    >

                        {/* Top 5 Weighted increase */}
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
                                width: '100%',
                                maxWidth: '360px',
                                minWidth: '273px',
                                // marginRight:'auto'
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
                                    Best Weight
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
                                    Weighted Gain
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
                                {finalWeightIncrease}
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
                                    EXPERIMENTAL!
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


                        {/* Top 5  logged% increase 2 */}
                        {/* <div
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
                                    EXPERIMENTAL! V2
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
                                {finalLoggedWeightIncrease2}
                            </div>

                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

