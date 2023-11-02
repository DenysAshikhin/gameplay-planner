import brewingAL from '../../../public/images/farming/assembly/Brewing_Exp.png';
import calciumAL from '../../../public/images/farming/assembly/Calcium_Exp.png';
import cardExpAL from '../../../public/images/farming/assembly/Card_Exp.png';
import cardPowerAL from '../../../public/images/farming/assembly/Card_Power.png';
import classAL from '../../../public/images/farming/assembly/Class_Exp.png';
import confectionAL from '../../../public/images/farming/assembly/Confection_Exp.png';
import contagionHPAL from '../../../public/images/farming/assembly/Contagion_HP.png';
import expTokenAL from '../../../public/images/farming/assembly/Expedition_Token_Bonus.png';
import fermentingAL from '../../../public/images/farming/assembly/Fermentation_Exp.png';
import friesBonusAL from '../../../public/images/farming/assembly/Fries_Bonus.png';
import ghDamageAL from '../../../public/images/farming/assembly/Grasshopper_Damage.png';
import healthyAL from '../../../public/images/farming/assembly/Healthy_Potato.png';
import irAL from '../../../public/images/farming/assembly/Item_Rating_Bonus.png';
import milkAL from '../../../public/images/farming/assembly/Milk_Created.png';
import petDmgAL from '../../../public/images/farming/assembly/Pet_Damage.png';
import petLeveAL from '../../../public/images/farming/assembly/Pet_Level_Exp.png';
import petRankAL from '../../../public/images/farming/assembly/Pet_Rank_Exp.png';
import finalProdAL from '../../../public/images/farming/assembly/Plant_Final_Production.png';
import manualHarvestAL from '../../../public/images/farming/assembly/Plant_Manual_Harvest.png';
import plantRankAL from '../../../public/images/farming/assembly/Plant_Rank_Exp.png';
import poopAL from '../../../public/images/farming/assembly/Poop_Created.png';
import potatoesAL from '../../../public/images/farming/assembly/Potatoes_Earned.png';
import proteinAL from '../../../public/images/farming/assembly/Protein_Bonus.png';
import reincAL from '../../../public/images/farming/assembly/Reincarnation_Exp.png';
import reincPointsAL from '../../../public/images/farming/assembly/Reincarnation_Point.png';
import residueAL from '../../../public/images/farming/assembly/Residue_Created.png';
import skullsAL from '../../../public/images/farming/assembly/Skulls_Earned.png';
import starGHAL from '../../../public/images/farming/assembly/Star_Grasshopper.png';
import whackAL from '../../../public/images/farming/assembly/Whack_Score_Bonus.png';
import wormsAL from '../../../public/images/farming/assembly/Worms_Quantity.png';

const PetNames = {
    1: {
        "name": "Cocorico",
        "location": "3-2",
    },
    2: {
        "name": "Rico",
        "location": "3-2",
    },
    3: {
        "name": "Trevor",
        "location": "3-3",
    },
    4: {
        "name": "Bingo",
        "location": "3-4",
    },
    5: {
        "name": "Primfeet",
        "location": "3-6",
    },
    6: {
        "name": "Nidhogg",
        "location": "4-1",
    },
    7: {
        "name": "Vidar",
        "location": "3-5",
    },
    8: {
        "name": "Hiko",
        "location": "3-7",
    },
    9: {
        "name": "Murphy",
        "location": "3-8",
    },
    10: {
        "name": "Aphrodite",
        "location": "3-9",
    },
    11: {
        "name": "Nuts",
        "location": "4-2",
    },
    12: {
        "name": "Alvin",
        "location": "4-7",
    },
    13: {
        "name": "Flash",
        "location": "4-4",
    },
    14: {
        "name": "Cid",
        "location": "4-3",
    },
    15: {
        "name": "Tango",
        "location": "4-5",
    },
    16: {
        "name": "Darti",
        "location": "4-6",
    },
    17: {
        "name": "Arizona",
        "location": "4-9",
    },
    18: {
        "name": "Suijin",
        "location": "5-1",
    },
    19: {
        "name": "Johny Be Good",
        "location": "4-8",
    },
    20: {
        "name": "Nucifera",
        "location": "5-2",
    },
    21: {
        "name": "Barney",
        "location": "5-3",
    },
    22: {
        "name": "Seth",
        "location": "5-4",
    },
    23: {
        "name": "Plyne",
        "location": "5-5",
    },
    24: {
        "name": "Zac",
        "location": "5-6",
    },
    25: {
        "name": "Tock",
        "location": "5-7",
    },
    26: {
        "name": "The Governess",
        "location": "5-8",
    },
    27: {
        "name": "Swamp King",
        "location": "5-9",
    },
    28: {
        "name": "Itzamna",
        "location": "6-1",
    },
    29: {
        "name": "Julian",
        "location": "6-2",
    },
    30: {
        "name": "Yuhuang",
        "location": "6-3",
    },
    31: {
        "name": "Serket",
        "location": "E1C",
    },
    32: {
        "name": "Fujin",
        "location": "E1R",
    },
    33: {
        "name": "Ulrich",
        "location": "E2C",
    },
    34: {
        "name": "Huginn",
        "location": "E2R",
    },
    35: {
        "name": "Esus",
        "location": "E3C",
    },
    36: {
        "name": "Hera",
        "location": "E3R",
    },
    37: {
        "name": "Asterios",
        "location": "E4C",
    },
    38: {
        "name": "Odile",
        "location": "E4R",
    },
    39: {
        "name": "Anubis",
        "location": "E6C",
    },
    40: {
        "name": "Garuda",
        "location": "E6R",
    },
    41: {
        "name": "Tsukuyomi",
        "location": "E7C",
    },
    42: {
        "name": "Nanbozo",
        "location": "E7R",
    },
    43: {
        "name": "Ra",
        "location": "E8C",
    },
    44: {
        "name": "Vishnou",
        "location": "E8R",
    },
    45: {
        "name": "Icare",
        "location": "E9C",
    },
    46: {
        "name": "Olaf",
        "location": "E9R",
    },
    47: {
        "name": "Fafnir",
        "location": "E10C",
    },
    48: {
        "name": "Quetzalcoalt",
        "location": "E10R",
    },
    49: {
        "name": "Professor Inderwind",
        "location": "E12C",
    },
    50: {
        "name": "Dangun",
        "location": "E12R",
    },
    51: {
        "name": "Wako",
        "location": "6-4",
    },
    52: {
        "name": "Papyru",
        "location": "6-5",
    },
    53: {
        "name": "Sigma",
        "location": "6-6",
    },
    54: {
        "name": "Louna",
        "location": "6-7",
    },
    55: {
        "name": "Babou",
        "location": "6-8",
    },
    56: {
        "name": "Niord",
        "location": "6-9",
    },
    57: {
        "name": "Mous",
        "location": "7-1",
    },
    58: {
        "name": "Flafy",
        "location": "7-2",
    },
    59: {
        "name": "Nick",
        "location": "7-3",
    },
    60: {
        "name": "Cherry",
        "location": "7-4",
    },
    61: {
        "name": "Abby",
        "location": "E13C",
    },
    62: {
        "name": "Noop",
        "location": "E13R",
    },
    63: {
        "name": "Juba",
        "location": "E14C",
    },
    64: {
        "name": "David",
        "location": "E14R",
    },
    65: {
        "name": "Viktor",
        "location": "E15C",
    },
    66: {
        "name": "Darko",
        "location": "E15R",
    },
    67: {
        "name": "Ubel",
        "location": "E16C",
    },
    68: {
        "name": "Than",
        "location": "E16R",
    },
    69: {
        "name": "Hirma",
        "location": "E18C",
    },
    70: {
        "name": "Boletus",
        "location": "E18R",
    },
    71: {
        "name": "Froz",
        "location": "E5C",
    },
    72: {
        "name": "Beelzebub",
        "location": "E5R",
    },
    73: {
        "name": "Nasr",
        "location": "E11C",
    },
    74: {
        "name": "Bump",
        "location": "E11R",
    },
    75: {
        "name": "Nyx",
        "location": "E17C",
    },
    76: {
        "name": "Neith",
        "location": "E17R",
    },
    77: {
        "name": "Leon",
        "location": "7-5",
    },
    78: {
        "name": "Puff",
        "location": "7-6",
    },
    79: {
        "name": "Apollo",
        "location": "7-7",
    },
    80: {
        "name": "BigMouth",
        "location": "7-8",
    },
    81: {
        "name": "Neptune",
        "location": "7-9",
    }
    ,
    82: {
        "name": "Strawberry",
        "location": "Any",
    }
}
// export default PetNames;
export const petNames = PetNames;

export function getImageUrl(itemName) {
    return `/images/pets/${itemName}.png`;
}

export const petNameArray = Object.entries(PetNames).map(([key, value]) => {
    return {
        ...value,
        'petId': parseInt(key, 10),
        'img': getImageUrl(value.name)
    };
})

export const petNamesById = petNameArray.reduce((accum, petNameData) => {
    accum[petNameData.petId] = petNameData;
    return accum;
}, {});

export const BonusMap = {
    1: { disabled: false, defaultWeight: 25, id: 1, label: "Potato", img: potatoesAL },
    2: { disabled: false, defaultWeight: 40, id: 2, label: "Class Exp", img: classAL },
    3: { disabled: false, defaultWeight: 60, id: 3, label: "Skull", img: skullsAL },
    4: { disabled: false, defaultWeight: 10, id: 4, label: "Confection Exp", img: confectionAL },
    5: { disabled: false, defaultWeight: 1000, id: 5, label: "Reincarnation Exp", img: reincAL },
    6: { disabled: false, defaultWeight: 1000, id: 6, label: "Item Rating", img: irAL },
    7: { disabled: false, defaultWeight: 10, id: 7, label: "Poop Bonus", img: poopAL },
    8: { disabled: false, defaultWeight: 75, id: 8, label: "Milk Bonus", img: milkAL },
    9: { disabled: false, defaultWeight: 10, id: 9, label: "Whack Score", img: whackAL },
    10: { disabled: false, defaultWeight: 25, id: 10, label: "Brewing Exp", img: brewingAL },
    11: { disabled: false, defaultWeight: 25, id: 11, label: "Calcium Exp", img: calciumAL },
    12: { disabled: false, defaultWeight: 25, id: 12, label: "Fermenting Exp", img: fermentingAL },
    13: { disabled: false, defaultWeight: 200, id: 13, label: "Residue Bonus", img: residueAL },
    14: { disabled: false, defaultWeight: 10, id: 14, label: "Worm Qty", img: wormsAL },
    15: { disabled: true, defaultWeight: 10, id: 15, label: "Larva Qty", img: null },
    16: { disabled: true, defaultWeight: 10, id: 16, label: "Larva EFF", img: null },
    17: { disabled: true, defaultWeight: 30, id: 17, label: "Attack/Hp", img: null },
    18: { disabled: false, defaultWeight: 1000, id: 18, label: "Pet Dmg", img: petDmgAL },
    19: { disabled: false, defaultWeight: 250, id: 19, label: "Pet Level Exp", img: petLeveAL },
    20: { disabled: false, defaultWeight: 500, id: 20, label: "Pet Rank Exp", img: petRankAL },
    21: { disabled: false, defaultWeight: 1000, id: 21, label: "Card Power", img: cardPowerAL },
    22: { disabled: false, defaultWeight: 250, id: 22, label: "Card Exp", img: cardExpAL },
    23: { disabled: false, defaultWeight: 78, id: 23, label: "Healthy Potatoe", img: healthyAL },
    24: { disabled: false, defaultWeight: 300, id: 24, label: "Plant Rank Exp", img: plantRankAL },
    25: { disabled: false, defaultWeight: 640, id: 25, label: "Plant Manual Harvest", img: manualHarvestAL },
    26: { disabled: false, defaultWeight: 400, id: 26, label: "Plant Final Prod", img: finalProdAL },
    27: { disabled: false, defaultWeight: 910, id: 27, label: "Fries Bonus", img: friesBonusAL },
    28: { disabled: false, defaultWeight: 1500, id: 28, label: "Protein Bonus", img: proteinAL },
    29: { disabled: false, defaultWeight: 50, id: 29, label: "Grasshopper Dmg", img: ghDamageAL },
    30: { disabled: false, defaultWeight: 100, id: 30, label: "Contagion HP", img: contagionHPAL },
    31: { disabled: false, defaultWeight: 100, id: 31, label: "Reinc Point Bonus", img: reincPointsAL },
    32: { disabled: true, defaultWeight: 375, id: 32, label: "Plant Growth", img: null },
    33: { disabled: false, defaultWeight: 1000, id: 33, label: 'Exp. Token Bonus', img: expTokenAL },
    1001: { id: 1001, label: "Potato Gain" },
    1002: { id: 1002, label: "Class Exp gain" },
    1003: { id: 1003, label: "Skull Gain" },
    1004: { id: 1004, label: "Worm Qty Gain" },
    1005: { id: 1005, label: "POOP Gain" },
    1006: { id: 1006, label: "Larva Qty Gain" },
    1007: { id: 1007, label: "Whack Gain" },
    1008: { id: 1008, label: "Milk Gain" },
    1009: { id: 1009, label: "Residue Gain" },
    1010: { id: 1010, label: "Card Power Gain" },
    // 1011: {id: 1011, label: "DUNGEON EFF"},
    1011: { id: 1011, label: "Expedition Reward" },
    1012: { id: 1012, label: "Expedition Time Gain" },
    1013: { id: 1013, label: "Expedition Damage" },
    1014: { id: 1014, label: "Card Exp" },
    1015: { id: 1015, label: "Reinc Pts Gain" },
    1016: { id: 1016, label: "Token Gain" },
    5001: { id: 5001, label: "Spawn More Potatoes +1", rootName: 'Spawn More Potatoes', odd: true },
    5002: { id: 5002, label: "Spawn Fewer Potatoes +3", rootName: 'Spawn Fewer Potatoes', odd: true },
    5003: { id: 5003, label: "Potatoes Spawn Speed +3", rootName: 'Potatoes Spawn Speed', odd: true },
    5004: { id: 5004, label: "Minimum Rarity +1", rootName: 'Minimum Rarity', odd: true },
    5005: { id: 5005, label: "Base Residue +1", rootName: 'Base Residue', odd: true },
    5006: { id: 5006, label: "Drop Bonuses Cap", rootName: 'Drop Bonuses Cap', odd: true },
    5007: { id: 5007, label: "Expedition Reward +10%", rootName: 'Expedition Reward' },
    5008: { id: 5008, label: "Pet Damage +10%", rootName: 'Pet Damage' },
    5009: { id: 5009, label: "Breeding Timer +10%", rootName: 'Breeding Timer' },
    5010: { id: 5010, label: "Milk Timer +10%", rootName: 'Milk Timer' },
    5011: { id: 5011, label: "Attack Speed +20%", rootName: 'Attack Speed' },
    5012: { id: 5012, label: "Whack Buff Timer +20%", rootName: 'Whack Buff Timer' },
    5013: { id: 5013, label: "Breeding and Milk Timer +5%", rootName: 'Breeding and Milk Timer' },
    5014: { id: 5014, label: "Faster Charge Tick +10%", rootName: 'Faster Charge Tick' },
    5015: { id: 5015, label: "Growth Speed +10%", rootName: 'Growth Speed' },
    5016: { id: 5016, label: "Grasshopper Damage +25%", rootName: 'Grasshopper Damage' },
};

const standardBonusesWeightListCount = Array.from({ length: 22 }, (x, i) => i);
export const standardBonusesWeightList = standardBonusesWeightListCount.map((idx, i) => BonusMap[i + 1]);
export const standardBonusesWeightById = standardBonusesWeightListCount.reduce((accum, item, i) => {
    accum[i] = item;
    return accum;
}, {});
export const DefaultWeightMappings = {
    1: { id: 1, weight: .0015 },
    2: { id: 2, weight: .003 },
    3: { id: 3, weight: .003 },
    4: { id: 4, weight: .0001 },
    5: { id: 5, weight: 100 },
    6: { id: 6, weight: 50 },
    7: { id: 7, weight: .001 },
    8: { id: 8, weight: .029 },
    9: { id: 9, weight: 0.001 },
    10: { id: 10, weight: .0001 },
    11: { id: 11, weight: .0001 },
    12: { id: 12, weight: .0001 },
    13: { id: 13, weight: 3.051 },
    14: { id: 14, weight: .0029 },
    15: { id: 15, weight: .001 },
    16: { id: 16, weight: .001 },
    17: { id: 17, weight: .005 },
    18: { id: 18, weight: 200 },
    19: { id: 19, weight: 10 },
    20: { id: 20, weight: 10 },
    21: { id: 21, weight: 201 },
    22: { id: 22, weight: 10 },
    31: { id: 31, weight: 50 },
}
const StandardBonusesWeightMap = standardBonusesWeightList.reduce((accum, item, i) => {
    const newItem = {
        ...item, // should be BonusMap {id, label}
        weight: DefaultWeightMappings[item.id].weight
    };

    accum[item.id] = newItem;
    return { ...accum };
}, {});
export const DefaultWeightMap = StandardBonusesWeightMap;