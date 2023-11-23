import AttackImg from '../../../public/images/residue/ShopUpgrade1AtkBonusSelected.png';
import HPImg from '../../../public/images/residue/ShopUpgrade2HPBonusSelected.png';
import PotatoImg from '../../../public/images/residue/ShopUpgrade3PotatoBonusSelected.png';
import ClassImg from '../../../public/images/residue/ShopUpgrade4ExpBonusSelected.png';
import SkullImg from '../../../public/images/residue/ShopUpgrade5PerkBonusSelected.png';
import ConfectionImg from '../../../public/images/residue/ShopUpgrade6ConfectionExpBonusSelected.png';
import ReincImg from '../../../public/images/residue/ShopUpgrade7ReincExpBonusSelected.png';
import IRImg from '../../../public/images/residue/ShopUpgrade8ItemRatingBonusSelected.png';
import CalciumImg from '../../../public/images/residue/ShopUpgrade9CalciumBonusSelected.png';
import FermentImg from '../../../public/images/residue/ShopUpgrade10FermentingBonusSelected.png';
import RPImg from '../../../public/images/residue/ShopUpgrade11RéincPointBonusSelected.png';
import MilkImg from '../../../public/images/residue/ShopUpgrade12MilkSelected.png';
import WormImg from '../../../public/images/residue/ShopUpgrade13WormQtySelected.png';
import BrewImg from '../../../public/images/residue/ShopUpgrade14BrewerySelected.png';
import PoopImg from '../../../public/images/residue/ShopUpgrade15PoopSelected.png';
import PetDMGImg from '../../../public/images/residue/ShopUpgrade16PetDamageSelected.png';
import PetEXPImg from '../../../public/images/residue/ShopUpgrade17PetExpSelected.png';
import PetRankImg from '../../../public/images/residue/ShopUpgrade18PetRankSelected.png';
import CardPOWImg from '../../../public/images/residue/ShopUpgrade19CardPowerSelected.png';
import CardEXPImg from '../../../public/images/residue/ShopUpgrade20CardExpSelected.png';
import LockedImg from '../../../public/images/residue/locked.png';

import mathHelper from '../util/math.js';



export const residueMap = {

    'attack': {
        img: AttackImg,
        order: 1,
        label: 'aa',
        unlock: 0,
        key: 'CowShopAttackBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 10;
            const growth = 1.05;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 4 }
    },
    'hp': {
        img: HPImg,
        order: 2,
        label: 'aa',
        unlock: 0,
        key: 'CowShopHPBonus',
        highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 10;
            const growth = 1.05;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 1 }
    },
    'potato': {
        img: PotatoImg,
        order: 3,
        label: 'aa',
        unlock: 0,
        key: 'CowShopPotatoBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 20;
            const growth = 1.0525;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 5 }
    },
    'class': {
        img: ClassImg,
        order: 4,
        label: 'aa',
        unlock: 0,
        key: 'CowShopClassExpBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 30;
            const growth = 1.055;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 5 }
    },
    'skull': {
        img: SkullImg,
        order: 6,
        label: 'aa',
        unlock: 0,
        key: 'CowShopPerkBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 75;
            const growth = 1.06;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 5 }
    },
    'confection': {
        img: ConfectionImg,
        order: 5,
        label: 'aa',
        unlock: 0,
        key: 'CowShopConfectionBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 30;
            const growth = 1.055;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5 }
    },
    'reinc': {
        img: ReincImg,
        order: 7,
        label: 'aa',
        unlock: 0,
        key: 'CowShopReincarnationBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 100;
            const growth = 1.065;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 100 }
    },
    'ir': {
        img: IRImg,
        order: 8,
        label: 'aa',
        unlock: 0,
        key: 'CowShopItemRatingBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 150;
            const growth = 1.07;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 50; return 30; }
    },
    'calcium': {
        img: CalciumImg,
        order: 14,
        label: 'aa',
        unlock: 6,
        key: 'CowShopCalciumBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 5000;
            const growth = 1.1;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5; }
    },
    'ferment': {
        img: FermentImg,
        order: 15,
        label: 'aa',
        unlock: 7,
        key: 'CowShopFermentingExp',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 10000;
            const growth = 1.125;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5; }
    },
    'rp': {
        img: RPImg,
        order: 19,
        label: 'aa',
        unlock: 12,
        key: 'CowShopReincPtsBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 1e9;
            const growth = 1.25;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 2; }
    },
    'milk': {
        img: MilkImg,
        order: 9,
        label: 'aa',
        unlock: 1,
        key: 'CowShopMilkBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 200;
            const growth = 1.075;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 8; }
    },
    'worm_qty': {
        img: WormImg,
        order: 10,
        label: 'aa',
        unlock: 2,
        key: 'CowShopWormQtyBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 300;
            const growth = 1.08;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5 }
    },
    'brew': {
        img: BrewImg,
        order: 11,
        label: 'aa',
        unlock: 3,
        key: 'CowShopBrewExp',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 500;
            const growth = 1.085;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5 }
    },
    'poop': {
        img: PoopImg,
        order: 12,
        label: 'aa',
        unlock: 4,
        key: 'CowShopPoopBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 600;
            const growth = 1.09;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5; }
    },
    'pet_dmg': {
        img: PetDMGImg,
        order: 20,
        label: 'aa',
        unlock: 14,
        key: 'CowShopPetDamageBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 1e11;
            const growth = 1.3;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 100; }
    },
    'pet_exp': {
        img: PetEXPImg,
        order: 13,
        label: 'aa',
        unlock: 5,
        key: 'CowShopPetLevelExp',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 2500;
            const growth = 1.095;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 10; return 50; }
    },
    'pet_rank': {
        img: PetRankImg,
        order: 17,
        label: 'aa',
        unlock: 9,
        key: 'CowShopPetRankExp',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 1e6;
            const growth = 1.175;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 10; return 20; }
    },
    'card_pow': {
        img: CardPOWImg,
        order: 16,
        label: 'aa',
        unlock: 8,
        key: 'CowShopCardPowerBonus',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'card_exp': {
        img: CardEXPImg,
        order: 18,
        label: 'aa',
        unlock: 10,
        key: 'CowShopCardExp',
         highestKey: (key) => {

            let newKeyArr = key.split('CowShop');
            return newKeyArr + 'Highest' + newKeyArr[1];
        },
        bonus: (level) => {
            const base = 1.01;
            const total = mathHelper.pow(base, level);
            const total2 = mathHelper.subtractDecimal(total, 1);
            const total3 = mathHelper.multiplyDecimal(total2, 100);
            return total3;
        },
        cost: (level) => {
            const base = 1e7;
            const growth = 1.2;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 10; return 5; }
    },
    'locked': {
        img: LockedImg
    }
}