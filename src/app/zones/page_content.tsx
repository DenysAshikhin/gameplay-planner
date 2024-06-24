"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useMemo, } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import CardFocus from './card_focus';
import ExpeditionFocus from './expedition_focus';
import './zone.css';
import infoIcon from '@images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";
import Image from 'next/image';

import RefreshIcon from '@images/icons/refresh_lightgray.svg';
import { zone_priority, zone_ratios, zone_data, calc_max_hp, calc_total_hp } from './zone_lists';
import { petNames, BonusMap } from '../util/itemMapping';


const TimeToClear = function ({
    zoneToClear,
    setSelectedZone,
    targetWave,
    setTargetWave,
    hasLocked,
    outerCurrentZones,
    data,
    setTeamToRun
}) {

    return (
        <>
            <div className='importantText'
                style={{
                    display: 'flex',
                    // alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // margin: '6px 12px 0',
                    border: '1px solid white',
                    borderRadius: '12px',
                    width: '630px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255, 0.07)',
                    position: 'relative'
                }}
            >
                <div>
                    {`Time To Clear`}
                </div>
                {zoneToClear && (
                    <div style={{
                        position: 'absolute',
                        right: '6px',
                        bottom: '3.5px'
                    }}>
                        <select
                            className='importantText'
                            aria-label='Select which zone to run to use'
                            style={{ maxWidth: '144px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                            onChange={
                                (selected_mode) => {
                                    setSelectedZone(Number(selected_mode.target.value));
                                    setTargetWave(-1);
                                }
                            }
                            defaultValue={-1}
                        >
                            {hasLocked && (
                                <option value={-1} key={-1}>
                                    {`Next Unlock`}
                                </option>
                            )}
                            {outerCurrentZones.map((cur_zone, index) => {
                                return (
                                    <option value={cur_zone.ID} key={cur_zone.ID}>
                                        {`${cur_zone.label}`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                )}

                <MouseOverPopover tooltip={
                    <div style={{ padding: '6px' }}>
                        {`Let's you see how long to clear certain expeditions`}
                    </div>
                }>
                    <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>
                        <Image
                            alt='on hover I in a cirlce icon, shows more information on hover'
                            fill
                            src={infoIcon}
                            unoptimized={true}
                        />
                    </div>
                </MouseOverPopover>
            </div>
            <div className='importantText'
                style={{
                    display: 'flex',
                    // flex: '1',
                    flexDirection: 'column',
                    // alignSelf: 'flex-start',
                    margin: data.AscensionCount >= 14 ? "6px 0 0 0" : '6px 12px 0',
                    border: '1px solid white',
                    borderRadius: '12px',
                    width: '620px',
                    backgroundColor: 'rgba(255,255,255, 0.07)',
                    padding: '6px 6px 6px 6px',
                    maxHeight: '100%'
                }}
            >

                <div style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                    {zoneToClear && (
                        <div
                            style={{
                                position: 'relative', width: '600px', height: '150px'
                            }}
                        >

                            <div style={{ position: 'absolute', width: '600px', height: '150px', top: '0', left: '0' }}>
                                <Image
                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                    fill
                                    src={zone_data[zoneToClear.ID].img}
                                    unoptimized={true}
                                />
                            </div>
                            {/* Center title */}
                            <div style={{
                                position: 'absolute', top: '5%', left: '0', fontWeight: 'bold', fontSize: '16px',

                                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
                            }}>
                                {`${zoneToClear.label} (${BonusMap[zoneToClear.bonus_id].label})`}
                            </div>

                            {/* Hours to Run */}
                            <div style={{
                                position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginLeft: '-6px',
                            }}
                            >
                                {`Hours: ${zoneToClear.hours.exponent > 6 ? zoneToClear.hours.toExponential(1) : zoneToClear.hours.toNumber()}`}
                            </div>


                            {/*Team Damage */}
                            <div style={{
                                position: 'absolute', bottom: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                            }}
                            >
                                {`Team Damage: ${zoneToClear.team.damage.exponent > 100 ? zoneToClear.team.damage.toExponential(1) : zoneToClear.team.damage.toExponential(2)}`}
                            </div>

                            {/*Target HP */}
                            <div style={{
                                position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                            }}
                            >
                                {`HP Left: ${zoneToClear.remaining_hp.exponent > 100 ? zoneToClear.remaining_hp.toExponential(1) : zoneToClear.remaining_hp.toExponential(2)}`}
                            </div>


                            {/*Target Wave */}
                            <div style={{
                                position: 'absolute', bottom: '5%', left: '0',

                                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
                            }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        {`Wave: `}
                                    </div>
                                    <input
                                        aria-label='What wave we want to get to'
                                        style={{
                                            //  borderRadius: '4px',
                                            width: '60px',
                                            //    height: '65%', 
                                            //    backgroundColor: index % 2 === 0 ? '#2D2D2D' : '#353535'
                                            backgroundColor: '#f3f0f5',
                                            marginLeft: '6px'
                                        }}
                                        type='number'
                                        value={targetWave === -1 ? zoneToClear.Room : targetWave}
                                        onChange={
                                            (inner_e) => {
                                                try {
                                                    let x = Number(inner_e.target.value);
                                                    if (x < 0) {
                                                        return;
                                                    }
                                                    x = Math.floor(x);
                                                    if (x < zoneToClear.Room) {
                                                        return;
                                                    }
                                                    setTargetWave(x);
                                                }
                                                catch (err) {
                                                    console.log(err);
                                                }
                                            }}
                                        min="0"
                                        max="99999999"
                                    />
                                </div>
                            </div>

                            {/* Which Team to run */}
                            <div style={{
                                position: 'absolute', bottom: '5%', right: '6px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '25%', marginLeft: '-6px'
                            }}
                            >
                                <select
                                    className='importantText'
                                    aria-label='Select which team to use'
                                    style={{ maxWidth: '144px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                                    onChange={
                                        (selected_mode) => {
                                            // selected_mode.target.value
                                            setTeamToRun(Number(selected_mode.target.value));
                                        }
                                    }
                                    defaultValue={'None'}
                                >
                                    {data.PetsExpeditionLoadout.map((cur_team, index) => {
                                        if (index === 0) return <></>;
                                        return (
                                            <option value={index} key={index}>
                                                {`${cur_team.Name}`}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div id='in_content_flex' style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }} />
        </>
    )
}


export default function Zones() {

    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport instanceof HTMLMetaElement) {
                    viewport.content = "initial-scale=0.1";
                    viewport.content = "width=1200";
                }
            }, 500);
        }
    }, []);

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


    const [zoneToClear, setZoneToClear] = useState(null);
    const [hasLocked, setHasLocked] = useState(false);
    const [outerCurrentZones, setOuterCurrentZones] = useState([]);
    const [cardZones, setCardZones] = useState([]);
    const [outerUnlockedIDs, setOuterUnlockedIDs] = useState({});
    const [targetWave, setTargetWave] = useState(-1);
    const [selectedZone, setSelectedZone] = useState(-1);
    const [teamToRun, setTeamToRun] = useState(1);


    return (
        <div
            style={{
                display: 'flex',
                // flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding: '12px 12px 3px 12px',
                // overflowY: 'hidden',
                // overflowX:'hidden',
            }}
        >




            {/* Only displayed if A < 14, but still used for come zone calculations */}
            <ExpeditionFocus
                zoneToClear={zoneToClear}
                setZoneToClear={setZoneToClear}
                hasLocked={hasLocked}
                setHasLocked={setHasLocked}
                setOuterCurrentZones={setOuterCurrentZones}
                setOuterUnlockedIDs={setOuterUnlockedIDs}
                targetWave={targetWave}
                setTargetWave={setTargetWave}
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
                teamToRun={teamToRun}
                setTeamToRun={setTeamToRun}
                setCardZones={setCardZones}
                TimeToClear={
                    <TimeToClear
                        data={data}
                        zoneToClear={zoneToClear}
                        setSelectedZone={setSelectedZone}
                        targetWave={targetWave}
                        setTargetWave={setTargetWave}
                        hasLocked={hasLocked}
                        outerCurrentZones={outerCurrentZones}
                        setTeamToRun={setTeamToRun}
                    />
                }
            />

            <div style={{ position: 'relative' }}>
                <CardFocus outerCurrentZones={cardZones} outerUnlockedIDs={outerUnlockedIDs}
                    TimeToClear={
                        <TimeToClear
                            data={data}
                            zoneToClear={zoneToClear}
                            setSelectedZone={setSelectedZone}
                            targetWave={targetWave}
                            setTargetWave={setTargetWave}
                            hasLocked={hasLocked}
                            outerCurrentZones={outerCurrentZones}
                            setTeamToRun={setTeamToRun}
                        />
                    }
                />

            </div>




            <div id='right_pillar' style={{ position: 'absolute', bottom: '0px', right: '0', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', }} />
        </div>
    );
}