
import { useEffect, useState } from 'react';

import MouseOverPopover from "../util/Tooltip.jsx";
import useLocalStorage from "use-local-storage";
import mathHelper from '../util/math.js';
import helper from '../util/helper.js';

import Image from 'next/image';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import RefreshIcon from '../../../public/images/icons/refresh_lightgray.svg';

import hp_contagion from '../../../public/images/contagion/1FarmingBg_HealthyPotato.png';
import fry_contagion from '../../../public/images/contagion/2FarmingBg_PhilipJ.png';
import plant_rank_contagion from '../../../public/images/contagion/3FarmingBg_RankExp.png';
import plant_production_contagion from '../../../public/images/contagion/4FarmingBg_Production.png';
import plant_speed_contagion from '../../../public/images/contagion/5FarmingBg_GrowthSpeed.png';
import fry_hp_contagion from '../../../public/images/contagion/6FarmingBg_PhilipJ_HealthyBonus.png';
import shovel_contagion from '../../../public/images/contagion/7FarmingBg_Harvest.png';
import protein_contagion from '../../../public/images/contagion/8FarmingBg_Protein.png';
import pot_exp_contagion from '../../../public/images/contagion/2PotatoExpBg.png';
import skull_conf_contagion from '../../../public/images/contagion/3SkullConfectionBg.png';
import worm_contagion from '../../../public/images/contagion/4Confectionx2Bg.png';
import poop_milk_contagion from '../../../public/images/contagion/5PoopMilkBg.png';
import locked_img from '../../../public/images/contagion/0LockBgV2.png';

const default_weight_overwrite = {
    8: 0.95,
    12: 0.2
}

export default function Outposts({ contagion, setContagionWeights, gh_amount, extra_gh }) {
    const [clientContagionWeight, setContagionWeight] = useLocalStorage(`contagion_${contagion.ID}_weight`, -1);
    const [ContagionWeight, setRunTimeContagionWeight] = useState(-1);

    const [clientEnableContagion, setEnableContagion] = useLocalStorage(`contagion_${contagion.ID}_enable`, true);
    const [EnableContagion, setRunTimeEnableContagion] = useState(true);
    const hp_expo = mathHelper.createDecimal(contagion.HPExpo).toNumber();
    const defaultWeight = default_weight_overwrite[contagion.ID] ? default_weight_overwrite[contagion.ID] : helper.roundFiveDecimal(hp_expo);
    const map_key = contagion.ID;
    const unlocked = !!contagion.Locked;

    const [forceShow, setForceShow] = useState(false);

    useEffect(() => {
        setRunTimeEnableContagion(clientEnableContagion);
    }, [clientEnableContagion])

    useEffect(() => {
        setRunTimeContagionWeight(clientContagionWeight);

        setContagionWeights((current_global_weights) => {

            if (!EnableContagion || !unlocked) {

                let temp = { ...current_global_weights };
                temp[map_key] = 0;
                return temp;
            }
            if (-1 === clientContagionWeight) {
                let temp = { ...current_global_weights };
                temp[map_key] = defaultWeight;
                return temp;
            }

            let temp = { ...current_global_weights };
            temp[map_key] = clientContagionWeight;
            return temp;
        });
    }, [setContagionWeights, clientContagionWeight, defaultWeight, map_key, EnableContagion, unlocked]);

    const contagion_obj_temp = {
        ID: 1,
        Locked: 1,//0 is locked
        Level: mathHelper.createDecimal(32),//current level of the contagion
        BaseBonus: mathHelper.createDecimal(32),//base bonus gain of the contagion
        BaseHP: mathHelper.createDecimal(32),//base health of the contagion
        HPExpo: mathHelper.createDecimal(32),//exponent to use for the hp calc

    };

    const level = mathHelper.createDecimal(contagion.Level).toNumber();
    const displayWeight = ContagionWeight === -1 ? defaultWeight : ContagionWeight;

    let img = hp_contagion;

    switch (contagion.ID) {
        case 1:
            img = hp_contagion;
            break;
        case 2:
            img = fry_contagion;
            break;
        case 3:
            img = plant_rank_contagion;
            break;
        case 4:
            img = plant_production_contagion;
            break;
        case 5:
            img = plant_speed_contagion;
            break;
        case 6:
            img = fry_hp_contagion;
            break;
        case 7:
            img = shovel_contagion;
            break;
        case 8:
            img = protein_contagion;
            break;
        case 9:
            img = pot_exp_contagion;
            break;
        case 10:
            img = skull_conf_contagion;
            break;
        case 11:
            img = worm_contagion;
            break;
        case 12:
            img = poop_milk_contagion;
            break;
        default:
            img = hp_contagion;
    }

    return (
        <div
            style={{
                position: 'relative',
                backgroundColor: 'rgba(255,255,255, 0.17)',
                minHeight: '120px',
            }}
        >
            {(unlocked || forceShow) && (
                <>
                    <div style={{ position: 'absolute', top: '0', left: '0', height: '120px', width: '100%' }}>
                        <Image
                            alt='in game representation of this contagion'
                            fill
                            src={img}
                            unoptimized={true}
                        />
                    </div>
                    <div style={{ position: 'absolute', bottom: '3px', left: '63%', width: '200px', fontWeight: 'bold', fontSize: '21px' }}>
                        {`Lv ${helper.numberWithCommas(level)}`}
                    </div>
                    <div
                        //  className='borderToFadeInAndOutRed' 
                        style={{ position: 'absolute', bottom: '3px', left: '55px', width: '200px', fontWeight: 'bold', fontSize: '21px', color: 'orange' }}>
                        {`# ${helper.numberWithCommas(gh_amount + extra_gh)}`}
                    </div>
                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >

                            <div>
                                {`Enable`}
                            </div>
                            <input
                                aria-label='Enable or disable this conatgion'
                                type="checkbox"
                                onChange={(e) => {
                                    setEnableContagion(e.target.checked ? true : false)
                                }}
                                checked={!!EnableContagion}
                                value={!!EnableContagion}
                            />

                            <input
                                aria-label='Specify the weight/importance for this stat'
                                style={{
                                    width: '55px',
                                    color: ContagionWeight !== defaultWeight && ContagionWeight !== -1 ? 'black' : 'gray',
                                    fontWeight: ContagionWeight !== defaultWeight && ContagionWeight !== -1 ? 'bold' : '',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 6px',
                                    textAlign: 'center'
                                }}
                                type='number'
                                value={displayWeight}
                                onChange={
                                    (e) => {
                                        try {
                                            let x = Number(e.target.value);
                                            // x = Math.floor(x);
                                            if (x < 0 || x > 99) {
                                                return;
                                            }
                                            setContagionWeight(x);
                                            // setCardWeightNew(x);
                                            // setRefreshMath(true);                        
                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                min="0"
                                max="99"
                                step={0.05}
                            />

                            <MouseOverPopover tooltip={

                                <div>
                                    {`The weight (importance) of this stat. Feel free to change this`}
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


                            {(ContagionWeight !== defaultWeight && ContagionWeight !== -1) && (
                                <div className='hover'
                                    style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '6px' }}
                                    onClick={() => {
                                        setContagionWeight(-1);
                                    }}
                                >
                                    <Image src={RefreshIcon} fill unoptimized alt='reset, 2 arrows in a circle' />
                                </div>
                            )}
                        </div>
                    </div>
                </>

            )}

            {(!unlocked && !forceShow) && (
                <div style={{ position: 'absolute', top: '0', left: '0', height: '120px', width: '100%', zIndex: '5' }}>
                    <Image
                        alt='in game representation of a locked contagion'
                        fill
                        src={locked_img}
                        unoptimized={true}
                    />
                </div>
            )}


        </div>
    )
}