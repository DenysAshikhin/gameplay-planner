
import {
    BonusMap,
    ir_id,
    reinc_id,
    att_hp_id,
    class_id,
    milk_id,
    whack_id,
    hp_id,
    worm_qty_id,
    skull_id,
    ferment_id,
    pet_level_id,
    gh_id,
    conf_id,
    calcium_id,
    res_id,
    card_exp_id,
    card_pow_id,
    prot_id,
    mine_exp_id,
    mine_pow_id,
    pet_rank_id,
    reinc_pts_id,
    fry_id,
    op_level_id
} from '../util/itemMapping.js';

import mathHelper from '../util/math.js';

export const zone_data = {}
zone_data[1] = {
    label: 'Butternut Forest',
    id: 1,
    img: null,
    bonus_id: att_hp_id,
    order: 1,
}
zone_data[2] = {
    label: 'Cheddar Plain',
    id: 2,
    img: null,
    bonus_id: class_id,
    order: 2,
}
zone_data[3] = {
    label: 'Guacamole Grotto',
    id: 3,
    img: null,
    bonus_id: milk_id,
    order: 3,
}
zone_data[4] = {
    label: 'Orange Mountain',
    id: 4,
    img: null,
    bonus_id: whack_id,
    order: 4,
}
zone_data[16] = {
    label: 'Avaocado River',
    id: 16,
    img: null,
    bonus_id: hp_id,
    order: 5,
}
zone_data[5] = {
    label: 'Zucchini Field',
    id: 5,
    img: null,
    bonus_id: ir_id,
    order: 6,
}
zone_data[6] = {
    label: 'Munster Desert',
    id: 6,
    img: null,
    bonus_id: worm_qty_id,
    order: 7,
}
zone_data[7] = {
    label: 'Pancake Road',
    id: 7,
    img: null,
    bonus_id: skull_id,
    order: 8,
}
zone_data[8] = {
    label: 'Salmon Lake',
    id: 8,
    img: null,
    bonus_id: ferment_id,
    order: 9,
}
zone_data[9] = {
    label: 'Garlic Iceland',
    id: 9,
    img: null,
    bonus_id: pet_level_id,
    order: 10,
}
zone_data[17] = {
    label: 'Banana Volcano',
    id: 17,
    img: null,
    bonus_id: gh_id,
    order: 11,
}
zone_data[10] = {
    label: 'Cinnamon Station',
    id: 10,
    img: null,
    bonus_id: reinc_id,
    order: 12,
}
zone_data[11] = {
    label: 'Apple Domain',
    id: 12,
    img: null,
    bonus_id: conf_id,
    order: 13,
}
zone_data[12] = {
    label: 'Donut Cavern',
    id: 13,
    img: null,
    bonus_id: calcium_id,
    order: 14,
}
zone_data[13] = {
    label: 'Emmental Canyon',
    id: 14,
    img: null,
    bonus_id: res_id,
    order: 15,
}
zone_data[14] = {
    label: 'Lettuce Sea',
    id: 15,
    img: null,
    bonus_id: card_exp_id,
    order: 16,
}
zone_data[18] = {
    label: 'Onion Hilltop',
    id: 18,
    img: null,
    bonus_id: prot_id,
    order: 17,
}
zone_data[15] = {
    label: 'Tuna Waterfall',
    id: 16,
    img: null,
    bonus_id: card_pow_id,
    order: 18,
}
zone_data[19] = {
    label: 'Kiwi Land',
    id: 19,
    img: null,
    bonus_id: mine_exp_id,
    order: 19,
}
zone_data[20] = {
    label: 'Croissant Castle',
    id: 20,
    img: null,
    bonus_id: pet_rank_id,
    order: 20,
}
zone_data[21] = {
    label: 'Mozzarella Meadow',
    id: 21,
    img: null,
    bonus_id: mine_pow_id,
    order: 21,
}
zone_data[22] = {
    label: 'Cucumber Region',
    id: 22,
    img: null,
    bonus_id: reinc_pts_id,
    order: 22,
}
zone_data[23] = {
    label: 'Basil Country',
    id: 23,
    img: null,
    bonus_id: fry_id,
    order: 23,
}
zone_data[24] = {
    label: 'Chocolate World',
    id: 24,
    img: null,
    bonus_id: op_level_id,
    order: 24,
}

export const zone_priority = [
    BonusMap[ir_id],
    BonusMap[reinc_id],
    BonusMap[att_hp_id],
    BonusMap[class_id],
    BonusMap[milk_id],
    BonusMap[pet_level_id],
    BonusMap[res_id],
    BonusMap[skull_id],
    BonusMap[whack_id],
    BonusMap[calcium_id],
    BonusMap[ferment_id],
    BonusMap[prot_id],
    BonusMap[gh_id],
    BonusMap[hp_id],
    BonusMap[conf_id],
    BonusMap[worm_qty_id],
]

export const zone_ratios = {};
zone_ratios[ir_id] = 1;
zone_ratios[reinc_id] = 1;
zone_ratios[att_hp_id] = 0.1;
zone_ratios[class_id] = 0.4;
zone_ratios[milk_id] = 0.5;
zone_ratios[pet_level_id] = 0.6;
zone_ratios[res_id] = 0.3; //Chris hates me
zone_ratios[skull_id] = 0.25;
zone_ratios[whack_id] = 0.1;
zone_ratios[calcium_id] = 0.01;
zone_ratios[ferment_id] = 0.01;
zone_ratios[gh_id] = 0.01;
zone_ratios[hp_id] = 0.01;
zone_ratios[prot_id] = 0.01;
zone_ratios[worm_qty_id] = 0.01; //Chris hates me 
zone_ratios[conf_id] = 0.01; //Chris hates me


export const calc_max_hp = function (zone, data) {

    const ID = zone.ID;
    const Room = zone.Room;
    const HPIncrease = zone.HPIncrease;
    const BaseHPBD = mathHelper.createDecimal(zone.BaseHPBD);

    const WAPExpeditionScalingReduced = data.WAPExpeditionScalingReduced ? data.WAPExpeditionScalingReduced : 0;
    const ExpeShopExpeditionScalingReductionLevel = data.ExpeShopExpeditionScalingReductionLevel ? data.ExpeShopExpeditionScalingReductionLevel : 0;


    if ((ID >= 16 && ID <= 18) || ID == 23) {
        return mathHelper.multiplyDecimal(
            mathHelper.addDecimal(
                BaseHPBD,
                mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
            ),
            mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025) * (Room * (Room + 1) / 2), Room - 1
            )
        );
    }
    if (ID > 18) {
        return (
            mathHelper.multiplyDecimal(
                mathHelper.addDecimal(
                    BaseHPBD,
                    mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
                ),
                mathHelper.pow(1.0 + HPIncrease, Room - 1) * mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025) * (ID - 17), Room)
            )
        );
    }
    if (Room > 250) {
        return (
            mathHelper.multiplyDecimal(
                mathHelper.addDecimal(
                    BaseHPBD,
                    mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
                ),
                mathHelper.pow(1.0 + HPIncrease, Room - 1) * mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025), Room - 250
                )
            )
        );
    }
    return (
        mathHelper.multiplyDecimal(
            mathHelper.addDecimal(
                BaseHPBD,
                mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
            )
            , mathHelper.pow(1.0 + HPIncrease, Room - 1)
        )
    );

}