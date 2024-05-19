import mathHelper from '../util/math';

// import AttackImg from '@images/infinity_corner/1UpgradeAtk.png';
import AttackImg from "@images/infinity_corner/1UpgradeAtk.png";
import HPImg from '@images/infinity_corner/2UpgradeHP.png';
import PotatoImg from '@images/infinity_corner/3UpgradePotato.png';
import ClassImg from '@images/infinity_corner/4UpgradeClassExpBuy.png';
import SkullImg from '@images/infinity_corner/4UpgradePerk.png';
import ConfectionImg from '@images/infinity_corner/6UpgradeConfection.png';
import CalciumImg from '@images/infinity_corner/12UpgradeCalcium.png';
import FermentImg from '@images/infinity_corner/13UpgradeFermenting.png';
import MilkImg from '@images/infinity_corner/1UpgradeMilkBuy.png';
import BrewImg from '@images/infinity_corner/2UpgradeBrewExpBuy.png';
import PoopImg from '@images/infinity_corner/7UpgradePoop.png';
import PetDMGImg from '@images/infinity_corner/22UpgradePetDamage.png';
import PetEXPImg from '@images/infinity_corner/23UpgradePetRank.png';
import CardPOWImg from '@images/infinity_corner/24UpgradeCardPower.png';
import WhackImg from '@images/infinity_corner/8UpgradeWhackScore.png';
import LarvaEffImg from '@images/infinity_corner/20UpgradeLarvaEff.png';
import IRImg from '@images/infinity_corner/9UpgradeItemRating.png';
import ResidueImg from '@images/infinity_corner/24UpgradeResidue.png';
import star_normal from '@images/infinity_corner/LastEraTopBackground.png';
import LockedImg from '@images/infinity_corner/locked.png';
import SweetPotatoe from '@images/infinity_corner/UpgradeLockSweet.png'

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
const HEALTH = 17;
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
const ATTACK = 99;
const STAR = 98;

export const maxKey = 30;

const itemIDMap = {
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
            14: 614,
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
    [ATTACK]: {
        id: ATTACK, label: "Attack", icon: "", weights: {
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
    [HEALTH]: {
        id: HEALTH, label: "Health", icon: "", weights: {
            0: 0,
            1: 0,
            2: 2,
            3: 2,
            4: 2,
            5: 2,
            6: 2,
            7: 2,
            8: 5,
            9: 5,
            10: 5,
            11: 5,
            12: 5,
            13: 5,
            14: 10,
            15: 10,
            16: 10,
            17: 10,
            18: 10,
            19: 10,
            20: 10,
            21: 10,
            22: 10,
            23: 10,
            24: 10,
            25: 10,
            26: 10,
            27: 10,
            28: 10,
            29: 10,
            30: 10,
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
            6: 245,
            7: 245,
            8: 245,
            9: 245,
            10: 245,
            11: 245,
            12: 245,
            13: 245,
            14: 4910,
            15: 4910,
            16: 4910,
            17: 4910,
            18: 4910,
            19: 4910,
            20: 4910,
            21: 4910,
            22: 4910,
            23: 4910,
            24: 4910,
            25: 4910,
            26: 4910,
            27: 4910,
            28: 4910,
            29: 4910,
            30: 4910,
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
    [STAR]: {
        id: STAR, label: "All Upgrades", icon: "", weights: {
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


export const calc_bonus = function (star_level, item_level, isStar?: boolean) {
    // (level * 2) * (1.0 + GM.PD.REP3UpgradeAllLevel * 0.01) * Math.Pow(1.01 + GM.PD.REP3UpgradeAllLevel * 0.0001, level);
    // (a) * (b) * math.pow(c, item_level);

    if (isStar) {
        return mathHelper.createDecimal(star_level);
    };

    const a = mathHelper.multiplyDecimal(item_level, 2);
    const b = mathHelper.addDecimal(1.0, mathHelper.multiplyDecimal(star_level, 0.01));
    const c = mathHelper.addDecimal(1.01, mathHelper.multiplyDecimal(star_level, 0.0001));
    const d = mathHelper.pow(c, item_level);
    const step1 = mathHelper.multiplyDecimal(a, b);
    const finalCost = mathHelper.multiplyDecimal(step1, d);
    return finalCost;
}


export const ic_mapping = {

    'attack': {
        img: AttackImg,
        order: 1,
        label: 'Attack',
        unlock: 1,
        key: 'REP3AttackLevel',
        left: '2.35%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 1;
            const growth = 1.05;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = ATTACK;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'hp': {
        img: HPImg,
        order: 2,
        label: 'HP',
        unlock: 1,
        key: 'REP3HPLevel',
        left: '17.35%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 1;
            const growth = 1.05;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = HEALTH;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'potato': {
        img: PotatoImg,
        order: 3,
        label: 'Potato',
        unlock: 2,
        key: 'REP3PotatoLevel',
        left: '32.35%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 2;
            const growth = 1.05;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = POTATO;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'class': {
        img: ClassImg,
        order: 4,
        label: 'Class',
        unlock: 2,
        key: 'REP3ClassExpLevel',
        left: '55%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 2;
            const growth = 1.05;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = CLASSEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'skull': {
        img: SkullImg,
        order: 6,
        label: 'Skull',
        unlock: 3,
        key: 'REP3SkullLevel',
        left: '70%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 3;
            const growth = 1.1;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = SKULL;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'confection': {
        img: ConfectionImg,
        order: 5,
        label: 'Conf.',
        unlock: 3,
        key: 'REP3ConfectionLevel',
        left: '85%',
        top: '5%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 3;
            const growth = 1.1;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = CONFECTIONEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'ir': {
        img: IRImg,
        order: 8,
        label: 'IR',
        unlock: 5,
        key: 'REP3ItemRatingLevel',
        left: '32.35%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 5;
            const growth = 1.15;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = ITEMRATING;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'calcium': {
        img: CalciumImg,
        order: 14,
        label: 'Calc.',
        unlock: 8,
        key: 'REP3CalciumLevel',
        left: '2.35%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 50;
            const growth = 1.25;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = CALCIUMEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'ferment': {
        img: FermentImg,
        order: 15,
        label: 'Ferm.',
        unlock: 8,
        key: 'REP3FermentingLevel',
        left: '17.35%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 50;
            const growth = 1.25;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = FERMENTINGEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'milk': {
        img: MilkImg,
        order: 9,
        label: 'Milk',
        unlock: 5,
        key: 'REP3MilkLevel',
        left: '55%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 5;
            const growth = 1.15;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = MILKBONUS;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'brew': {
        img: BrewImg,
        order: 11,
        label: 'Brew',
        unlock: 6,
        key: 'REP3BrewLevel',
        left: '70%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 25;
            const growth = 1.2;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = BREWINGEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'poop': {
        img: PoopImg,
        order: 12,
        label: 'Poop',
        unlock: 4,
        key: 'REP3PoopLevel',
        left: '2.35%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 4;
            const growth = 1.1;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = POOPBONUS;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'pet_dmg': {
        img: PetDMGImg,
        order: 20,
        label: 'Pet Dmg.',
        unlock: 10,
        key: 'REP3PetDmgLevel',
        left: '32.35%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 1000;
            const growth = 1.4;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = PETDMG;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'pet_exp': {
        img: PetEXPImg,
        order: 13,
        label: 'Pet Exp.',
        unlock: 10,
        key: 'REP3PetLevelExpLevel',
        left: '55%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 1000;
            const growth = 1.4;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = PETLEVELEXP;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'card_pow': {
        img: CardPOWImg,
        order: 16,
        label: 'Card Pow.',
        unlock: 12,
        key: 'REP3CardPowerLevel',
        left: '70%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 5000;
            const growth = 1.5;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = CARDPOWERB;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'residue': {
        img: ResidueImg,
        order: 16,
        label: 'Residue',
        unlock: 12,
        key: 'REP3ResidueBonusLevel',
        left: '85%',
        top: '61%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 5000;
            const growth = 1.5;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = RESIDUEBONUS;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'whack': {
        img: WhackImg,
        order: 16,
        label: 'Whack',
        unlock: 4,
        key: 'REP3WhackScoreLevel',
        left: '17.35%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 4;
            const growth = 1.1;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = WHACKSCORE;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'larva_eff': {
        img: LarvaEffImg,
        order: 16,
        label: 'Larve Eff.',
        unlock: 6,
        key: 'REP3LarvaEffLevel',
        left: '85%',
        top: '33%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 25;
            const growth = 1.2;

            const level_next = level;
            const power = mathHelper.pow(growth, level_next);
            const finalCost = mathHelper.multiplyDecimal(growthMulti, power);
            return finalCost;
        },
        weight: (ascension) => {
            const ID = LARVAEFF;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'star': {
        img: star_normal,
        order: 16,
        label: 'All Levels',
        unlock: 3,
        key: 'REP3UpgradeAllLevel',
        left: '0%',
        top: '0%',
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const growthMulti = 370;
            const growth = 1.2;

            const level_next = level;

            const step1 = mathHelper.addDecimal(5, mathHelper.multiplyDecimal(5, level_next));
            const step2 = mathHelper.pow(growth, level_next);
            const step3 = mathHelper.max(
                1,
                mathHelper.pow(
                    1.5,
                    mathHelper.subtractDecimal(level_next, 40)
                )
            );

            const finalCost = mathHelper.multiplyDecimal(step1, mathHelper.multiplyDecimal(step2, step3));
            return finalCost;
        },
        weight: (ascension) => {
            const ID = STAR;
            return itemIDMap[ID].weights[ascension > maxKey ? maxKey : ascension];
        }
    },
    'locked': {
        img: LockedImg,
        sweet_lock: SweetPotatoe
    }
}