

import mathHelper from '../util/math.js';
import helper from '../util/helper.js';
import { resource_type } from './outpost_mapping.js';
import { useState, useEffect } from 'react';

import Image from 'next/image'
import rightArrow from '../../../public/images/icons/right_arrow_white.svg';
import outpost_img from '../../../public/images/outposts/Outposticon1.png'

import dense1_img from '../../../public/images/outposts/Outpostdensity1.png'
import dense2_img from '../../../public/images/outposts/Outpostdensity2.png';
import dense3_img from '../../../public/images/outposts/Outpostdensity3.png';
import dense4_img from '../../../public/images/outposts/Outpostdensity4.png';
import dense5_img from '../../../public/images/outposts/Outpostdensity5.png';
import dense6_img from '../../../public/images/outposts/Outpostdensity6.png';
import dense7_img from '../../../public/images/outposts/Outpostdensity7.png';
import dense8_img from '../../../public/images/outposts/Outpostdensity8.png';
import dense9_img from '../../../public/images/outposts/Outpostdensity9.png';

import hardness1_img from '../../../public/images/outposts/OutpostHardness1.png';
import hardness2_img from '../../../public/images/outposts/OutpostHardness2.png';
import hardness3_img from '../../../public/images/outposts/OutpostHardness3.png';
import hardness4_img from '../../../public/images/outposts/OutpostHardness4.png';
import hardness5_img from '../../../public/images/outposts/OutpostHardness5.png';
import hardness6_img from '../../../public/images/outposts/OutpostHardness6.png';
import hardness7_img from '../../../public/images/outposts/OutpostHardness7.png';
import hardness8_img from '../../../public/images/outposts/OutpostHardness8.png';
import hardness9_img from '../../../public/images/outposts/OutpostHardness9.png';

import stone_img from '../../../public/images/outposts/OutpostR1.png';
import brass_img from '../../../public/images/outposts/OutpostR2.png';
import iron_img from '../../../public/images/outposts/OutpostR3.png';
import gold_img from '../../../public/images/outposts/OutpostR4.png';
import platinum_img from '../../../public/images/outposts/OutpostR5.png';

// import miner1 from '../../../public/images/outposts/MiniPortrait1.png';
// import miner2 from '../../../public/images/outposts/MiniPortrait2.png';
// import miner3 from '../../../public/images/outposts/MiniPortrait3.png';
// import miner4 from '../../../public/images/outposts/MiniPortrait4.png';
// import miner5 from '../../../public/images/outposts/MiniPortrait5.png';

//good ones below
// import miner1 from '../../../public/images/outposts/MinerPortrait1.png';
// import miner2 from '../../../public/images/outposts/MinerPortrait2.png';
// import miner3 from '../../../public/images/outposts/MinerPortrait3.png';
// import miner4 from '../../../public/images/outposts/MinerPortrait4.png';
// import miner5 from '../../../public/images/outposts/MinerPortrait5.png';
// import miner1 from '../../../public/images/outposts/MinerPortrait1.png';

import miner1 from '../../../public/images/outposts/MinerPortrait1 - Copy.png';
import miner2 from '../../../public/images/outposts/MinerPortrait2 - Copy.png';
import miner3 from '../../../public/images/outposts/MinerPortrait3 - Copy.png';
import miner4 from '../../../public/images/outposts/MinerPortrait4 - Copy.png';
import miner5 from '../../../public/images/outposts/MinerPortrait5 - Copy.png';



//outpost object:
/*
{
    Density: 55,
    Grade: 2,
    Hardness: 16,
    LeftToMine: BD, -> percent like 13 or 24
    MineralsID: [4,5,3],
}

*/

const MiningDecay = function (data, outpost) {
    let FarmingShopUniqueMainGame = data.FarmingShopUniqueMainGame;
    // let LeftToMine = mathHelper.createDecimal(outpost.LeftToMine).toNumber();
    let LeftToMine = outpost.LeftToMine;
    let temp = Math.min(100.0, LeftToMine + data.CowShopImprovedMining + data.ExpeShopImprovedMiningLevel
        + (
            (
                FarmingShopUniqueMainGame[82] + FarmingShopUniqueMainGame[83] + FarmingShopUniqueMainGame[84] + FarmingShopUniqueMainGame[85] + FarmingShopUniqueMainGame[86] +
                FarmingShopUniqueMainGame[87] + FarmingShopUniqueMainGame[88] + FarmingShopUniqueMainGame[89] + FarmingShopUniqueMainGame[90] + FarmingShopUniqueMainGame[91]
            )
            * 2
        )
    );
    return temp;
}

const HardnessScale = function (data, outpost) {
    // return Hardness * (1.0 - CowShopHardnessScaling * 0.01) * (1.0 - ExpeShopHardnessScalingLevel * 0.01) * (1.0 - WAPHardnessScaling * 0.01);
    let cow_scale = data.CowShopHardnessScaling ? data.CowShopHardnessScaling : 0;
    let cow_part = (1 - cow_scale * 0.01);
    let exp_scale = data.ExpeShopHardnessScalingLevel ? data.ExpeShopHardnessScalingLevel : 0;
    let exp_part = 1 - exp_scale * 0.01;
    let whack_scale = data.WAPHardnessScaling ? data.WAPHardnessScaling : 0;
    let whack_part = 1 - whack_scale * 0.01;

    return outpost.Hardness * cow_part * exp_part * whack_part;
}

// GM.PD.MinersCollection[MinerAssignedID - 1]
const getMiningTick = function (data, outpost, miner) {

    let minerpower = mathHelper.pow(mathHelper.createDecimal(1.65), mathHelper.logDecimal(mathHelper.createDecimal(miner.FinalPower), 3.25));

    let other_half = Math.pow(0.95, outpost.Level) *
        (
            outpost.Level > 50 ?
                Math.pow(0.975, outpost.Level - 50) : 1.0
        ) *
        (
            MiningDecay(data, outpost) > 0.0 ?
                (0.56 * Math.pow(1.031, MiningDecay(data, outpost))) : 1.0
        ) *
        2E-07 / (0.907 * Math.pow(1.025, HardnessScale(data, outpost))
        )

    let temp = mathHelper.min(
        mathHelper.createDecimal(0.1),
        mathHelper.multiplyDecimal(minerpower, other_half)
    );


    return temp;
}

export default function OutpostLine({ data, outpost, borderBottom }) {

    const [miningTarget, setMiningTarget] = useState(0);

    if (!data.CowShopHardnessScaling && data.CowShopHardnessScaling !== 0) return;
    // let res = HardnessScale(data, data.OutpostsCollection[0]);
    // let res2 = MiningDecay(data, data.OutpostsCollection[0]);

    let dense_img = null;
    switch (Math.floor(outpost.Density / 10)) {
        case 0:
            dense_img = dense1_img;
            break;
        case 1:
            dense_img = dense1_img;
            break;
        case 2:
            dense_img = dense2_img;
            break;
        case 3:
            dense_img = dense3_img;
            break;
        case 4:
            dense_img = dense4_img;
            break;
        case 5:
            dense_img = dense5_img;
            break;
        case 6:
            dense_img = dense6_img;
            break;
        case 7:
            dense_img = dense7_img;
            break;
        case 8:
            dense_img = dense8_img;
            break;
        case 9:
            dense_img = dense9_img;
            break;
        default:
            dense_img = dense1_img;
    }

    let hardness_img = null;
    switch (Math.floor(outpost.Hardness / 10)) {
        case 0:
            hardness_img = hardness1_img;
            break;
        case 1:
            hardness_img = hardness1_img;
            break;
        case 2:
            hardness_img = hardness2_img;
            break;
        case 3:
            hardness_img = hardness3_img;
            break;
        case 4:
            hardness_img = hardness4_img;
            break;
        case 5:
            hardness_img = hardness5_img;
            break;
        case 6:
            hardness_img = hardness6_img;
            break;
        case 7:
            hardness_img = hardness7_img;
            break;
        case 8:
            hardness_img = hardness8_img;
            break;
        case 9:
            hardness_img = hardness9_img;
            break;
        default:
            hardness_img = hardness1_img;
    }

    let ore_imgs = [];
    outpost.MineralsID.forEach((curr_ore_id) => {
        switch (curr_ore_id) {
            case 1:
                ore_imgs.push(stone_img);
                break;
            case 2:
                ore_imgs.push(brass_img);
                break;
            case 3:
                ore_imgs.push(iron_img);
                break;
            case 4:
                ore_imgs.push(gold_img);
                break;
            case 5:
                ore_imgs.push(platinum_img);
                break;
            default:
                ore_imgs.push(stone_img);
                break;
        }
    })

    outpost.LeftToMine = mathHelper.createDecimal(outpost.LeftToMine).toNumber();
    let miners = data.MinersCollection[0];//.Locked -> 1 unlocked, 0 lockeds

    let miner_list = [];
    data.MinersCollection.forEach((inner_miner, index) => {
        if (inner_miner.Locked === 0) return;

        let miner_img = null;
        switch (index) {
            case 0:
                miner_img = miner1;
                break;
            case 1:
                miner_img = miner2;
                break;
            case 2:
                miner_img = miner3;
                break;
            case 3:
                miner_img = miner4;
                break;
            case 4:
                miner_img = miner5;
                break;
            default:
                miner_img = miner1;
        }

        let current_tick = getMiningTick(data, outpost, inner_miner).toNumber();
        let minute_tick = current_tick * 60;
        let hour_tick = current_tick * 3600;

        const inner_left_to_mine = mathHelper.createDecimal(outpost.LeftToMine).toNumber();

        let ticks_to_finish = 0;
        let ticks_to_25 = inner_left_to_mine < 25 ? -1 : 0;
        let ticks_to_50 = inner_left_to_mine < 50 ? -1 : 0;
        let ticks_to_75 = inner_left_to_mine < 75 ? -1 : 0;

        const speed_up_mult = 1000;
        for (let i = 0; i < 1; i++) {
            let outpost_inner = JSON.parse(JSON.stringify(outpost));
            outpost_inner.LeftToMine = inner_left_to_mine;
            while (outpost_inner.LeftToMine > 0) {
                let tick_to_subtract = getMiningTick(data, outpost_inner, inner_miner);
                let inner_speedup = Math.max(1, Math.floor(speed_up_mult * outpost_inner.LeftToMine / 100));
                outpost_inner.LeftToMine -= tick_to_subtract.toNumber() * 100 * inner_speedup;
                ticks_to_finish += inner_speedup;

                if (ticks_to_25 === 0 && outpost_inner.LeftToMine < 25) {
                    ticks_to_25 = ticks_to_finish;
                }
                if (ticks_to_50 === 0 && outpost_inner.LeftToMine < 50) {
                    ticks_to_50 = ticks_to_finish;
                }
                if (ticks_to_75 === 0 && outpost_inner.LeftToMine < 75) {
                    ticks_to_75 = ticks_to_finish;
                }


                if (ticks_to_finish > 8.554e+6) {
                    outpost_inner.LeftToMine = 0;
                    if (ticks_to_25 === 0 && outpost_inner.LeftToMine < 25) {
                        ticks_to_25 = -1;
                    }
                    if (ticks_to_50 === 0 && outpost_inner.LeftToMine < 50) {
                        ticks_to_50 = -1;
                    }
                    if (ticks_to_75 === 0 && outpost_inner.LeftToMine < 75) {
                        ticks_to_75 = -1;
                    }
                    ticks_to_finish = -1;
                }

            }
        }

        let return_obj = {
            tick: current_tick,
            minute_tick: minute_tick,
            hour_tick: hour_tick,
            miner_img: miner_img,
            ticks_to_finish: ticks_to_finish,
            ticks_to_25: ticks_to_25,
            ticks_to_50: ticks_to_50,
            ticks_to_75: ticks_to_75,
            left_to_mine: mathHelper.createDecimal(outpost.LeftToMine).toNumber()
        };
        miner_list.push(return_obj);
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'felx-start',
                alignItems: 'center',
                minHeight: '44px',
                width: '100%',
                backgroundColor: 'rgba(255,255,255, 0.07)',
                borderTop: '1px solid white',
                borderLeft: '1px solid white',
                borderRight: '1px solid white',
                borderBottom: borderBottom ? '1px solid white' : '',
                marginTop: '12px'

            }}
        >


            <div style={{ position: 'relative', width: '100%', height: '72px' }}>
                {/* outpost image */}
                <div style={{ position: 'absolute', top: '0', left: '0', width: '71px', height: '71px' }}>
                    <Image
                        alt='in game representation of an outpost'
                        fill
                        src={outpost_img}
                        unoptimized={true}
                    />
                    <div
                        style={{
                            position: 'absolute', bottom: '0', left: '0', width: '100%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.8)'
                        }}
                    >
                        {`${helper.roundTwoDecimal(outpost.LeftToMine)}%`}
                    </div>
                </div>
                {/* density */}
                <div style={{ position: 'absolute', bottom: '0', left: '71px', width: '40px', height: '40px' }}>
                    <Image
                        alt='in game representation of outpost density'
                        fill
                        src={dense_img}
                        unoptimized={true}
                    />
                </div>
                {/* hardness */}
                <div style={{ position: 'absolute', top: '0', left: '71px', width: '240px', height: '32px' }}>
                    <Image
                        alt='in game representation of outpost hardness'
                        fill
                        src={hardness_img}
                        unoptimized={true}
                    />
                </div>
                {/* ores */}
                {ore_imgs.map((inner_img, index) => {
                    return (
                        <div key={index} style={{ position: 'absolute', bottom: '0', left: `${111 + 40 * index}px`, width: '40px', height: '40px' }}>
                            <Image
                                alt='in game representation of outpost mineral'
                                fill
                                src={inner_img}
                                unoptimized={true}
                            />
                        </div>
                    )
                })}

                {/* mining target */}
                <div style={{ position: 'absolute', top: '0', left: '311px', width: '100px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <div>
                        Mining Target
                    </div>
                    <select
                        className='importantText'
                        aria-label='Select mining target'
                        style={{ maxWidth: '144px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                        onChange={
                            (selected_mode) => {
                                setMiningTarget(selected_mode.target.value);
                            }
                        }
                        defaultValue={'0%'}
                    >
                        <option value="0">0%</option>
                        {outpost.LeftToMine > 25 && (
                            <option value="25">25%</option>
                        )}
                        {outpost.LeftToMine > 50 && (
                            <option value="50">50%</option>
                        )}
                        {outpost.LeftToMine > 75 && (
                            <option value="75">75%</option>
                        )}
                    </select>
                </div>

                {/* miners */}
                {miner_list.map((inner_miner, index) => {
                    let ticks_left = 0;
                    switch (miningTarget) {
                        case '0':
                            ticks_left = inner_miner.ticks_to_finish === -1 ? `99+ days` : helper.secondsToString(inner_miner.ticks_to_finish);
                            break;
                        case '25':
                            ticks_left = inner_miner.ticks_to_25 === -1 ? `99+ days` : helper.secondsToString(inner_miner.ticks_to_25);
                            break;
                        case '50':
                            ticks_left = inner_miner.ticks_to_50 === -1 ? `99+ days` : helper.secondsToString(inner_miner.ticks_to_50);
                            break;
                        case '75':
                            ticks_left = inner_miner.ticks_to_75 === -1 ? `99+ days` : helper.secondsToString(inner_miner.ticks_to_75);
                            break;
                        default:
                            ticks_left = inner_miner.ticks_to_finish === -1 ? `99+ days` : helper.secondsToString(inner_miner.ticks_to_finish);
                            break;
                    }

                    return (
                        <div key={index}
                            style={{
                                position: 'absolute', bottom: '0', left: `${411 + 87 * index}px`, width: '85px', height: '72px',
                                border: (outpost.MinerAssignedID - 1) === index ? index === 1 && inner_miner.left_to_mine < 50 ? '2px solid red' : '2px solid blue' : '',
                                boxSizing: 'border-box'
                            }}>
                            <Image
                                alt={`in game representation of outpost a miner# ${index + 1}`}
                                fill
                                src={inner_miner.miner_img}
                                unoptimized={true}
                            />
                            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                                {`${helper.roundTwoDecimal(inner_miner.hour_tick * 100)}% /h`}
                            </div>
                            <div
                                style={{
                                    position: 'absolute', bottom: '0', left: '0', width: '100%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.7)'
                                }}
                            >
                                {`${ticks_left}`}
                            </div>
                        </div>
                    )
                })}
            </div>








            {/* <div>
                {`${bigsad * 100}% /s`}
            </div>
            <div>
                {`${bigsad * 3600 * 100}% /h`}
            </div>
            <div>
                {`${ticks_to_finish / 3600} hours to finish`}
            </div> */}
        </div >
    )
}