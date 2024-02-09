import mathHelper from '../util/math.js';

import AttackImg from '../../../public/images/infinity_corner/1UpgradeAtk.png';
import HPImg from '../../../public/images/infinity_corner/2UpgradeHP.png';
import PotatoImg from '../../../public/images/infinity_corner/3UpgradePotato.png';
import ClassImg from '../../../public/images/infinity_corner/4UpgradeClassExpBuy.png';
import SkullImg from '../../../public/images/infinity_corner/4UpgradePerk.png';
import ConfectionImg from '../../../public/images/infinity_corner/6UpgradeConfection.png';
import CalciumImg from '../../../public/images/infinity_corner/12UpgradeCalcium.png';
import FermentImg from '../../../public/images/infinity_corner/13UpgradeFermenting.png';
import MilkImg from '../../../public/images/infinity_corner/1UpgradeMilkBuy.png';
import BrewImg from '../../../public/images/infinity_corner/2UpgradeBrewExpBuy.png';
import PoopImg from '../../../public/images/infinity_corner/7UpgradePoop.png';
import PetDMGImg from '../../../public/images/infinity_corner/22UpgradePetDamage.png';
import PetEXPImg from '../../../public/images/infinity_corner/23UpgradePetRank.png';
import CardPOWImg from '../../../public/images/infinity_corner/24UpgradeCardPower.png';
import WhackImg from '../../../public/images/infinity_corner/8UpgradeWhackScore.png';
import LarvaEffImg from '../../../public/images/infinity_corner/20UpgradeLarvaEff.png';
import IRImg from '../../../public/images/infinity_corner/9UpgradeItemRating.png';
import ResidueImg from '../../../public/images/infinity_corner/24UpgradeResidue.png';
import star_normal from '../../../public/images/infinity_corner/LastEraTopBackground.png';
import LockedImg from '../../../public/images/infinity_corner/ButtonLock #2864.png';

export const ic_mapping = {

    'attack': {
        img: AttackImg,
        order: 1,
        label: 'Attack',
        unlock: 0,
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
        label: 'HP',
        unlock: 0,
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
        label: 'Potato',
        unlock: 0,
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
        label: 'Class',
        unlock: 0,
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
        label: 'Skull',
        unlock: 0,
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
        label: 'Conf.',
        unlock: 0,
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
            const base = 50;
            const growth = 1.0575;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5 }
    },
    'ir': {
        img: IRImg,
        order: 8,
        label: 'IR',
        unlock: 0,
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
        label: 'Calc.',
        unlock: 6,
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
        label: 'Ferm.',
        unlock: 7,
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
            const base = 10000;
            const growth = 1.125;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 0.5; }
    },
    'milk': {
        img: MilkImg,
        order: 9,
        label: 'Milk',
        unlock: 1,
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
            const base = 200;
            const growth = 1.075;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { return 8; }
    },
    'brew': {
        img: BrewImg,
        order: 11,
        label: 'Brew',
        unlock: 3,
        key: 'REP3BrewExp',
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
        label: 'Pet Dmg.',
        unlock: 14,
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
        label: 'Pet Exp.',
        unlock: 5,
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
            const base = 2500;
            const growth = 1.095;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 10; return 50; }
    },
    'card_pow': {
        img: CardPOWImg,
        order: 16,
        label: 'Card Pow.',
        unlock: 8,
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
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'residue': {
        img: ResidueImg,
        order: 16,
        label: 'Residue',
        unlock: 8,
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
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'whack': {
        img: WhackImg,
        order: 16,
        label: 'Whack',
        unlock: 8,
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
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'larva_eff': {
        img: LarvaEffImg,
        order: 16,
        label: 'Larve Eff.',
        unlock: 8,
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
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'star': {
        img: star_normal,
        order: 16,
        label: 'All Levels',
        unlock: 8,
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
            const base = 1e5;
            const growth = 1.15;

            const exp1 = growth + level * 0.0002;
            const pow = mathHelper.pow(exp1, level);
            const finalCost = mathHelper.multiplyDecimal(base, pow).floor();
            return finalCost;

        },
        weight: (ascension) => { if (ascension >= 15) return 100; return 5; }
    },
    'locked': {
        img: LockedImg
    }
}