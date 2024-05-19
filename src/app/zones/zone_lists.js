
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

import apple_domain_img from '../../../public/images/zones/Apple Domain.png';
import avacodo_river_img from '../../../public/images/zones/Avocado River.png';
import banana_volcano_img from '../../../public/images/zones/Banana Volcano.png';
import basil_counter_img from '../../../public/images/zones/Basil Country.png';
import butternut_forest_img from '../../../public/images/zones/Butternut Forest.png';
import cheddar_plain_img from '../../../public/images/zones/Cheddar Plain.png';
import chocolate_world_img from '../../../public/images/zones/Chocolate World.png';
import cinnamon_station_img from '../../../public/images/zones/Cinnamon Station.png';
import croissant_castle_img from '../../../public/images/zones/Croissant Castle.png';
import cucumber_region_img from '../../../public/images/zones/Cucumber Region.png';
import donut_cavern_img from '../../../public/images/zones/Donut Cavern.png';
import emmental_canyon_img from '../../../public/images/zones/Emmental Canyon.png';
import garlic_iceland_img from '../../../public/images/zones/Garlic Iceland.png';
import guacamole_grotto_img from '../../../public/images/zones/Guacamole Grotto.png';
import kiwi_land_img from '../../../public/images/zones/Kiwi Land.png';
import lettuce_sea_img from '../../../public/images/zones/Lettuce Sea.png';
import mozzarella_meadow_img from '../../../public/images/zones/Mozzarella Meadow.png';
import munster_desert_img from '../../../public/images/zones/Munster Desert.png';
import onion_img from '../../../public/images/zones/Onion.png';
import orange_mountain_img from '../../../public/images/zones/Orange Mountain.png';
import pancake_road_img from '../../../public/images/zones/Pancake Road.png';
import salmon_lake_img from '../../../public/images/zones/Salmon Lake.png';
import tune_waterfall_img from '../../../public/images/zones/Tuna Waterfall.png';
import zucchini_field_img from '../../../public/images/zones/Zucchini Field.png';


export const zone_data = {}
zone_data[1] = {
    label: 'Butternut Forest',
    id: 1,
    img: butternut_forest_img,
    bonus_id: att_hp_id,
    order: 1,
    unlock: 5
}
zone_data[2] = {
    label: 'Cheddar Plain',
    id: 2,
    img: cheddar_plain_img,
    bonus_id: class_id,
    order: 2,
    unlock: 10
}
zone_data[3] = {
    label: 'Guacamole Grotto',
    id: 3,
    img: guacamole_grotto_img,
    bonus_id: milk_id,
    order: 3,
    unlock: 15
}
zone_data[4] = {
    label: 'Orange Mountain',
    id: 4,
    img: orange_mountain_img,
    bonus_id: whack_id,
    order: 4,
    unlock: 20
}
zone_data[16] = {
    label: 'Avaocado River',
    id: 16,
    img: avacodo_river_img,
    bonus_id: hp_id,
    order: 5,
    unlock: 6
}
zone_data[5] = {
    label: 'Zucchini Field',
    id: 5,
    img: zucchini_field_img,
    bonus_id: ir_id,
    order: 6,
    unlock: 5
}
zone_data[6] = {
    label: 'Munster Desert',
    id: 6,
    img: munster_desert_img,
    bonus_id: worm_qty_id,
    order: 7,
    unlock: 30
}
zone_data[7] = {
    label: 'Pancake Road',
    id: 7,
    img: pancake_road_img,
    bonus_id: skull_id,
    order: 8,
    unlock: 40
}
zone_data[8] = {
    label: 'Salmon Lake',
    id: 8,
    img: salmon_lake_img,
    bonus_id: ferment_id,
    order: 9,
    unlock: 50
}
zone_data[9] = {
    label: 'Garlic Iceland',
    id: 9,
    img: garlic_iceland_img,
    bonus_id: pet_level_id,
    order: 10,
    unlock: 60
}
zone_data[17] = {
    label: 'Banana Volcano',
    id: 17,
    img: banana_volcano_img,
    bonus_id: gh_id,
    order: 11,
    unlock: 8
}
zone_data[10] = {
    label: 'Cinnamon Station',
    id: 10,
    img: cinnamon_station_img,
    bonus_id: reinc_id,
    order: 12,
    unlock: 25
}
zone_data[11] = {
    label: 'Apple Domain',
    id: 12,
    img: apple_domain_img,
    bonus_id: conf_id,
    order: 13,
    unlock: 75
}
zone_data[12] = {
    label: 'Donut Cavern',
    id: 13,
    img: donut_cavern_img,
    bonus_id: calcium_id,
    order: 14,
    unlock: 90
}
zone_data[13] = {
    label: 'Emmental Canyon',
    id: 14,
    img: emmental_canyon_img,
    bonus_id: res_id,
    order: 15,
    unlock: 105
}
zone_data[14] = {
    label: 'Lettuce Sea',
    id: 15,
    img: lettuce_sea_img,
    bonus_id: card_exp_id,
    order: 16,
    unlock: 120
}
zone_data[18] = {
    label: 'Onion Hilltop',
    id: 18,
    img: onion_img,
    bonus_id: prot_id,
    order: 17,
    unlock: 10
}
zone_data[15] = {
    label: 'Tuna Waterfall',
    id: 16,
    img: tune_waterfall_img,
    bonus_id: card_pow_id,
    order: 18,
    unlock: 50
}
zone_data[19] = {
    label: 'Kiwi Land',
    id: 19,
    img: kiwi_land_img,
    bonus_id: mine_exp_id,
    order: 19,
    unlock: 50
}
zone_data[20] = {
    label: 'Croissant Castle',
    id: 20,
    img: croissant_castle_img,
    bonus_id: pet_rank_id,
    order: 20,
    unlock: 50
}
zone_data[21] = {
    label: 'Mozzarella Meadow',
    id: 21,
    img: mozzarella_meadow_img,
    bonus_id: mine_pow_id,
    order: 21,
    unlock: 50
}
zone_data[22] = {
    label: 'Cucumber Region',
    id: 22,
    img: cucumber_region_img,
    bonus_id: reinc_pts_id,
    order: 22,
    unlock: 50
}
zone_data[23] = {
    label: 'Basil Country',
    id: 23,
    img: basil_counter_img,
    bonus_id: fry_id,
    order: 23,
    unlock: 50
}
zone_data[24] = {
    label: 'Chocolate World',
    id: 24,
    img: chocolate_world_img,
    bonus_id: op_level_id,
    order: 24,
    unlock: 50
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
    BonusMap[card_exp_id]
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
zone_ratios[card_exp_id] = 0.01; //Chris hates me


export const calc_max_hp = function (zone, data, params) {

    const levelOffset = params?.levelOffset ? params.levelOffset : 0;

    const ID = zone.ID;
    const Room = zone.Room + levelOffset;
    const HPIncrease = zone.HPIncrease;
    const BaseHPBD = mathHelper.createDecimal(zone.BaseHPBD ? zone.BaseHPBD : zone.BaseHP);


    const WAPExpeditionScalingReduced = data.WAPExpeditionScalingReduced ? data.WAPExpeditionScalingReduced : 0;
    const ExpeShopExpeditionScalingReductionLevel = data.ExpeShopExpeditionScalingReductionLevel ? data.ExpeShopExpeditionScalingReductionLevel : 0;


    if ((ID >= 16 && ID <= 18) || ID == 23) {
        return mathHelper.multiplyDecimal(
            mathHelper.addDecimal(
                BaseHPBD,
                mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
            ),
            mathHelper.pow(
                1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025) * (Room * (Room + 1) / 2), Room - 1
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
                mathHelper.multiplyDecimal(
                    mathHelper.pow(1.0 + HPIncrease, Room - 1),
                    mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025) * (ID - 17), Room)

                )
            )
        );
    }
    if (Room > 250) {
        let t = mathHelper.pow(1.0 + HPIncrease, Room - 1)
        if (params?.force_logs) {

            console.log(`t: ${t}`)
        }
        let y = (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025)
        let z = mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025), Room - 250)
        let temp = mathHelper.multiplyDecimal(
            mathHelper.pow(1.0 + HPIncrease, Room - 1),

            mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025), Room - 250)
        );
        return (
            mathHelper.multiplyDecimal(
                mathHelper.addDecimal(
                    BaseHPBD,
                    mathHelper.multiplyDecimal(BaseHPBD, 0.05 * (Room - 1))
                ),
                mathHelper.multiplyDecimal(
                    mathHelper.pow(1.0 + HPIncrease, Room - 1),

                    mathHelper.pow(1.0 + HPIncrease * (1.0 - (WAPExpeditionScalingReduced + ExpeShopExpeditionScalingReductionLevel * 2) * 0.0025), Room - 250)
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

export const calc_total_hp = function (zone, data, params) {

    let running_hp = mathHelper.subtractDecimal(zone.max_hp, zone.curr_hp);

    const levelOffset = params?.levelOffset ? params.levelOffset : 0;
    let offset = 1;
    while (offset < (zone.Room + levelOffset)) {
        running_hp = mathHelper.addDecimal(running_hp, calc_max_hp(zone, data, { levelOffset: levelOffset - offset }));
        offset++;
    }

    return running_hp;
}