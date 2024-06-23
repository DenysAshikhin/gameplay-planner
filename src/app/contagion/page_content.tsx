'use client';

import SaveGameData from '@app/SaveGameData';

import infoIcon from '@images/icons/info_thick.svg';
import helper from '@util/helper';
import mathHelper from '@util/math';
import DefaultSave from '@util/tempSave.json';
import MouseOverPopover from '@util/Tooltip';

import useMobileViewport from '@util/useMobileViewport';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import useLocalStorage from 'use-local-storage';

import { ContagionWeights } from './contagion_line';
import ContagionRow from './contagion_row';

ReactGA.initialize([ {
    trackingId: 'G-GGLPK02VH8',
} ]);

export default function Contagion() {
    useMobileViewport();

    const [ clientData ] = useLocalStorage('userData', DefaultSave as SaveGameData);
    const [ data, setRunTimeData ] = useState(DefaultSave as SaveGameData);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [ clientData ]);

    const [ contagionWeights, setContagionWeights ] = useState({} as ContagionWeights);

    const { excess_gh, contagionAmounts } = useMemo(() => {
        let gh_available = mathHelper.createDecimal(data.GrasshopperTotal).toNumber();
        let used_gh = 0;
        let contagionAmounts: { [id: number | string]: { weight?: number, gh_amount?: number } } = {};
        let totalWeights = 0;

        for (const [ key, value ] of Object.entries(contagionWeights)) {
            totalWeights += value;
            contagionAmounts[key] = { weight: value };
        }
        for (const [ key, value ] of Object.entries(contagionWeights)) {
            let gh_amount = Math.floor(value / totalWeights * gh_available);
            contagionAmounts[key].gh_amount = gh_amount;
            used_gh += gh_amount;
        }

        const excess_gh = gh_available - used_gh;

        return { excess_gh, contagionAmounts };
    }, [ contagionWeights, data ]);

    const [ client_extra_gh_id, setExtraGHID ] = useLocalStorage('extra_gh_id', 1);
    const [ extra_gh_id, setRunTimeExtraGHID ] = useState(1);

    useEffect(() => {
        setRunTimeExtraGHID(client_extra_gh_id);
    }, [ client_extra_gh_id ]);

    //GrasshopperAssigned -> BD
    //GrasshopperTotal -> BD
    //GrasshopperCollection -> array of contagions
    //contagion obj:
    const contagion = {
        ID: 1,
        Locked: 1,//0 is locked
        Level: mathHelper.createDecimal(32),//current level of the contagion
        BaseBonus: mathHelper.createDecimal(32),//base bonus gain of the contagion
        BaseHP: mathHelper.createDecimal(32),//base health of the contagion
        HPExpo: mathHelper.createDecimal(32),//exponent to use for the hp calc

    };

    let mergedContagionData = data.GrasshopperCollection.map(item => {
        return { ...item, gh_amount: contagionAmounts[item.ID]?.gh_amount };
    });

    return (
        <div
            style={{
                display: 'flex',
                // flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding: '12px 12px 3px 12px',
                overflow: 'hidden',
            }}
        >

            {/* Contagion Distribution */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 102px)',
            }}>

                <div className="importantText"
                     style={{
                         display: 'flex',
                         // alignSelf: 'flex-start',
                         alignItems: 'center',
                         justifyContent: 'center',
                         // margin: '6px 12px 0',
                         border: '1px solid white',
                         borderRadius: '12px',
                         width: '855px',
                         fontSize: '24px',
                         fontWeight: 'bold',
                         backgroundColor: 'rgba(255,255,255, 0.07)',
                     }}
                >
                    {`Suggested Grasshopper Placement Per Contagion`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            Shows the suggested distribution of grasshoppers for each contagion
                        </div>
                    }>
                        <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>

                            <Image
                                alt="on hover I in a cirlce icon, shows more information on hover"
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                    </MouseOverPopover>
                </div>
                <div className="importantText"
                     style={{
                         display: 'flex',
                         flexDirection: 'column',
                         // gap: '12px',
                         alignSelf: 'flex-start',
                         // alignItems: 'center',
                         justifyContent: 'center',
                         margin: '6px 12px 0',
                         border: '1px solid white',
                         borderRadius: '12px',
                         width: '900px',
                         // fontSize: '24px',
                         // fontWeight: 'bold',
                         backgroundColor: 'rgba(255,255,255, 0.07)',
                         padding: '6px 6px 6px 6px',
                         maxHeight: '100%',
                     }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        maxHeight: '100%',
                    }}>
                        {mergedContagionData.map((curr_contagion, index) => {
                            if (index % 2 === 0) {
                                const nextContagion = mergedContagionData[index + 1];

                                return <ContagionRow
                                    data={data}
                                    key={index}
                                    contagion={curr_contagion}
                                    nextContagion={nextContagion}
                                    setContagionWeights={setContagionWeights}
                                    excess_gh={excess_gh}
                                    extra_gh_id={extra_gh_id}
                                />;
                            }
                            return null;

                        })}
                    </div>
                </div>
            </div>

            {/* Miscelleneous settings */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 58px)',
            }}>

                <div className="importantText"
                     style={{
                         display: 'flex',
                         // alignSelf: 'flex-start',
                         alignItems: 'center',
                         justifyContent: 'center',
                         // margin: '6px 12px 0',
                         border: '1px solid white',
                         borderRadius: '12px',
                         width: '500px',
                         fontSize: '24px',
                         fontWeight: 'bold',
                         backgroundColor: 'rgba(255,255,255, 0.07)',
                     }}
                >
                    {`Miscellaneous Settings`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            Shows some stats and lets you select where extra grasshoppers are carried over
                        </div>
                    }>
                        <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>

                            <Image
                                alt="on hover I in a cirlce icon, shows more information on hover"
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                    </MouseOverPopover>
                </div>
                <div className="importantText"
                     style={{
                         display: 'flex',
                         flexDirection: 'column',
                         // gap: '12px',
                         alignSelf: 'flex-start',
                         // alignItems: 'center',
                         justifyContent: 'center',
                         margin: '6px 12px 0',
                         border: '1px solid white',
                         borderRadius: '12px',
                         width: '490px',
                         // fontSize: '24px',
                         // fontWeight: 'bold',
                         backgroundColor: 'rgba(255,255,255, 0.07)',
                         padding: '6px 6px 6px 6px',
                         maxHeight: '100%',
                     }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        maxHeight: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Available GH: ${helper.numberWithCommas(mathHelper.createDecimal(data.GrasshopperTotal).toNumber())} (${helper.numberWithCommas(mathHelper.createDecimal(data.GrasshopperTotal).toNumber() - excess_gh)})`}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Excess GH: ${excess_gh}`}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Where to place excess grass hoppers`}
                            </div>
                            <select
                                className="importantText"
                                style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px' }}
                                aria-label="Specify which contagion will receive extra gh"
                                onChange={
                                    (e) => {
                                        setExtraGHID(Number(e.target.value));
                                    }
                                }
                                // defaultValue={comboSelector + ''}
                                value={extra_gh_id + ''}
                            >
                                <option value="1">Healthy Potatoes</option>
                                <option value="2">Fry earned</option>
                                <option value="3">Plant Exp</option>
                                <option value="4">Plant Production</option>
                                <option value="5">Plant Growth</option>
                                <option value="6">Fry to HP Bonus</option>
                                <option value="7">Harvest Formula</option>
                                <option value="8">Protein</option>
                                <option value="9">Potatoe + Class</option>
                                <option value="10">Skull + Confection</option>
                                <option value="11">Worm + Larva</option>
                                <option value="12">Poop + Milk</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="in_content_flex" style={{
                    marginTop: 'auto',
                    marginBottom: '3px',
                    marginLeft: 'calc(50% - 160px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}/>

            </div>

            <div id="right_pillar" style={{
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}/>
        </div>
    );
}
