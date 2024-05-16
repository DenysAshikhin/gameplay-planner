"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useMemo, } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Zone_CSS from './zone.css';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip.jsx";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";
import mathHelper from '../util/math.js';
import helper from '../util/helper.js';
import petHelper from '../util/petHelper.js';
import Image from 'next/image';
import Priority_list from './priority_list.jsx';

import RefreshIcon from '../../../public/images/icons/refresh_lightgray.svg';
import { zone_priority, zone_ratios, zone_data, calc_max_hp, calc_total_hp } from './zone_lists.js';
import { petNames, BonusMap } from '../util/itemMapping.js';

export default function Zones() {

    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                var viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
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

    const [ZONE_PRIORITY, setZonePriority] = useLocalStorage('zone_priority', zone_priority);
    const [zone_priority_client, setZonePriorityClient] = useState(zone_priority);

    useEffect(() => {
        setZonePriorityClient(ZONE_PRIORITY);
    }, [ZONE_PRIORITY]);

    const [ZONE_RATIOS, setZoneRatios] = useLocalStorage('zone_ratios', zone_ratios);
    const [zone_ratios_client, setZoneRatiosClient] = useState(zone_ratios);

    useEffect(() => {
        setZoneRatiosClient(ZONE_RATIOS);
    }, [ZONE_RATIOS]);

    const pets_global = useMemo(() => {
        let map = {};
        data.PetsCollection.forEach((inner_pet) => {
            if (inner_pet.ID === 0) return;
            let t = petNames;
            map[inner_pet.ID] = JSON.parse(JSON.stringify({ ...inner_pet, ...petNames[inner_pet.ID] }));
        });

        return map;
    }, [data])

    const num_teams = data.ExpeditionLimit;
    let teams = useMemo(() => {
        let teams = [];
        data.PetsExpeditionLoadout.forEach((cur_team, index) => {
            if (index === 0 || cur_team.Locaked === 0) return;
            let inner_team = [];

            cur_team.IDs.forEach((inner_id) => {
                if (inner_id === 0) return;
                inner_team.push(pets_global[inner_id]);
            });

            let score = petHelper.calculateGroupDamage(inner_team, data);
            inner_team.damage = score;
            inner_team.name = cur_team.Name;
            teams.push(inner_team);
        });

        teams.sort((a, b) => {
            return a.damage.greaterThan(b.damage) ? -1 : 1;
        });
        return teams;
    }, [data, pets_global]);


    let current_zones_stuff = useMemo(() => {
        console.log(`udating current zone stuff`)
        let current_zones = [];
        let unlocked_ids = {};
        data.ExpeditionsCollection.forEach((curr_zone, index) => {
            if (curr_zone.ID === 0) return;
            if (curr_zone.Locked === 0) return;
            let zone = JSON.parse(JSON.stringify(curr_zone));

            let curr_hp = mathHelper.createDecimal(zone.CurrentHPBD ? zone.CurrentHPBD : zone.CurrentHP);//s
            let max_hp = calc_max_hp(curr_zone, data);

            zone.curr_hp = curr_hp;
            zone.max_hp = max_hp;
            zone.total_hp = calc_total_hp(zone, data, {});
            zone.label = zone_data[curr_zone.ID].label;
            zone.order = zone_data[curr_zone.ID].order;
            zone.bonus_id = zone_data[curr_zone.ID].bonus_id;
            unlocked_ids[zone_data[curr_zone.ID].bonus_id] = zone;
            current_zones.push(zone);
        });
        current_zones.sort((a, b) => a.order - b.order);

        return { current_zones, unlocked_ids };
    }, [data]);


    let unlocked_ids = current_zones_stuff.unlocked_ids;
    let current_zones = current_zones_stuff.current_zones;

    let zone_stuff = useMemo(() => {
        console.log(`updating zone_stuff`)
        let zones_in_priority = [];
        let zone_suggestions = [];
        let team_index = 0;//counter to determine which team to release

        let zone_leader = {
            current: -1,
            index: -1
        };
        /**
         * {
          ID: 0,
          Room: 1,
          BaseHP: 0,
          BaseHPBD: {
            mantissa: 0,
            exponent: 0,
          },
          HPIncrease: 0,
          CurrentHP: 0,
          CurrentHPBD: {
            mantissa: 0,
            exponent: 0,
          },
          BonusPower: 0,
          ResourceFound: [
            0,
          ],
          CardFound: [
            0,
          ],
          Locked: 0,
        }
         * 
         */
        //sss

        if (teams.length > 0) {
            current_zones.forEach((zone) => {
                zone.ratio = zone_ratios_client[zone.bonus_id];
                // let leader_index = zone_priority.findIndex((element) => element.id === zone.bonus_id);
                let leader_index = zone_priority_client.findIndex((element) => element.id === zone.bonus_id);
                zone.priority_index = leader_index === -1 ? 99 : leader_index;

                if (leader_index === -1) {
                    return;
                }

                zones_in_priority.push(zone);
                if (zone_leader.current === -1 || leader_index < zone_leader.index) {
                    zone_leader.current = zone;
                    zone_leader.index = leader_index;
                }
            })
            zones_in_priority.sort((a, b) => a.priority_index - b.priority_index);
            zone_leader = zone_leader.current;

            //this target hp will be used against all other thing
            zone_leader.target_hp = zone_leader.total_hp;
            //Go through and update target hp's based on zone_leader
            zones_in_priority.forEach((inner_zone) => {
                if (inner_zone.target_hp) return;//meaning it's the leader
                inner_zone.target_hp = mathHelper.multiplyDecimal(zone_leader.target_hp, inner_zone.ratio);
            });

            //go through and fill up the suggestion based on num of teamss
            while (zone_suggestions.length < num_teams) {

                let zone_to_satisfy = null;
                let zone_index = 0;
                let zone_found = false;

                zones_in_priority.forEach((inner_zone, index) => {
                    if (zone_found) return;//found a zone to satisfy by priority
                    //If the amount of damage i dealt to this zone is less than the ratio compared to leader, then I need to hit this more
                    if (inner_zone.target_hp.greaterThan(inner_zone.total_hp)) {
                        zone_to_satisfy = inner_zone;
                        zone_index = index;
                        zone_found = true;
                    }
                });
                if (!zone_to_satisfy) {
                    zone_to_satisfy = zones_in_priority[0];
                }

                let team_to_use = teams[team_index];
                team_index++;

                if (!team_to_use) {
                    let bigsad = -1;
                }

                let hp_diff = mathHelper.subtractDecimal(zone_to_satisfy.target_hp, zone_to_satisfy.total_hp);
                let hours = mathHelper.divideDecimal(hp_diff, team_to_use.damage).toNumber();
                zone_to_satisfy.hours = zone_found === false ? -1 : Math.ceil(hours);
                zone_to_satisfy.team = team_to_use;
                //Either use the found zone/index or the first one by prioritys
                zone_suggestions.push(zone_to_satisfy);
                zones_in_priority.splice(zone_index, 1)
            }
        }
        else {
            zone_leader.current = current_zones[0]
        }

        return {
            zones_in_priority,
            zone_suggestions,
            zone_leader,
            zone_ratios_client,
            zone_priority_client,
        }
    }, [num_teams, teams, zone_ratios_client, zone_priority_client, current_zones])

    let zones_in_priority = zone_stuff.zones_in_priority;
    let zone_suggestions = zone_stuff.zone_suggestions;
    let zone_leader = zone_stuff.zone_leader;



    return (
        <div
            style={{
                display: 'flex',
                // flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding: '12px 12px 3px 12px',
                overflow: 'hidden'
            }}
        >

            {/* Zone Priority */}
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
                {/* Title Section */}
                <div className='importantText'
                    style={{
                        display: 'flex',
                        // alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '271px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                    }}
                >
                    {`Bonus Priority`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            <div>
                                {`The top priority bonus (expedition) that you have unlocked becomes your leader. All zones below it have their progress measured as a ratio of the leaders 
    max hp`}
                            </div>
                            <div>
                                {`For example, if Item Rating (Zucchini) is your leader, and Att/Hp (Butternut) is the next in the list at 20. It means it will only recommend to run butternut when it's max hp is
                                less 20% of zucchini's max hp`}
                            </div>
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

                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            <div>
                                {`Sets the priority list order to default`}
                            </div>
                        </div>
                    }>
                        <div className='hover'
                            style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '12px', marginTop: '0px' }}
                            onClick={() => {
                                setZonePriority(JSON.parse(JSON.stringify(zone_priority)));
                            }}
                        >
                            <Image src={RefreshIcon} fill unoptimized alt='reset, 2 arrows in a circle' />
                        </div>

                    </MouseOverPopover>
                </div>
                <div className='importantText'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '260px',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '6px 6px 6px 6px',
                        maxHeight: '100%'
                    }}
                >

                    <Priority_list
                        priorityList={zone_priority_client}
                        setPriorityList={setZonePriority}
                        zoneRatios={zone_ratios_client}
                        setZoneRatios={setZoneRatios}
                        zone_data={zone_data}
                        default_list={zone_priority}
                        default_ratios={zone_ratios}
                        unlocked_bonuses={unlocked_ids}
                        leader={zone_leader}
                    />
                    {/* <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>

                        {zone_priority.map((curr_val, index) => {
                            return (
                                <div key={`${index}`} style={{ margin: '6px 0' }}>
                                    {`${index + 1}) ${curr_val.label} - ${zone_ratios_client[curr_val.id] * 100}%`}
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>





            {/* zones to run! */}
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
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
                    }}
                >
                    {`Zones To Run`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            {`BLAH BLAH BLAH BLAH`}
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
                        flex: '1',
                        flexDirection: 'column',
                        // gap: '12px',
                        alignSelf: 'flex-start',
                        // alignItems: 'center',
                        justifyContent: 'center',
                        margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '620px',
                        // fontSize: '24px',
                        // fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '6px 6px 6px 6px',
                        maxHeight: '100%'
                    }}
                >

                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                        {zone_suggestions.sort((a, b) => {
                            if (a.hours === -1 && b.hours === -1) {
                                return 0;
                            }
                            else if (a.hours === -1) {
                                return -1;
                            }
                            return 1
                        }).map((cur_exp, index) => {

                            if (!cur_exp?.team?.name) {
                                let bigsad = -1;
                            }

                            return (
                                <div key={`${index}`}
                                    style={{
                                        margin: '6px 0', display: 'flex', position: 'relative',
                                        width: '600px', height: '150px',
                                    }}
                                >
                                    <div style={{ position: 'absolute', width: '600px', height: '150px', top: '0', left: '0' }}>
                                        <Image
                                            alt='on hover I in a cirlce icon, shows more information on hover'
                                            fill
                                            src={zone_data[cur_exp.ID].img}
                                            unoptimized={true}
                                        />
                                    </div>

                                    {/* Center title */}
                                    <div style={{
                                        position: 'absolute', top: '3%', left: '0', fontWeight: 'bold', fontSize: '20px',

                                        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
                                    }}>
                                        {`${cur_exp.label} (${BonusMap[cur_exp.bonus_id].label})`}
                                    </div>

                                    {/* Hours to Run */}
                                    <div style={{
                                        position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginLeft: '-6px',
                                        // color: cur_exp.hours === -1 ? '' : 'green'
                                    }}
                                    >
                                        {`Hours: ${cur_exp.hours === -1 ? 'infinite' : cur_exp.hours}`}
                                    </div>

                                    {/*Current HP */}
                                    <div style={{
                                        position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                                    }}
                                    >
                                        {`Total HP: ${cur_exp.total_hp.toExponential(2)}`}
                                    </div>
                                    {/*Target HP */}
                                    <div style={{
                                        position: 'absolute', bottom: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                                    }}
                                    >
                                        {`Target HP: ${cur_exp.target_hp.toExponential(2)}`}
                                    </div>

                                    {/* Which Team to run */}
                                    <div style={{
                                        position: 'absolute', bottom: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginLeft: '-6px'
                                    }}
                                    >
                                        {`Team to run: ${cur_exp.team.name}`}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Miscelleneous settings */}
            {/* 
            
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
                <div className='importantText'
                    style={{
                        display: 'flex',
                        // alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '400px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                    }}
                >
                    {`Current Expedition Zones`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            {`BLAH BLAH BLAH BLAH`}
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
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '6px 6px 6px 6px',
                        maxHeight: '100%'
                    }}
                >

                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                        {current_zones.map((cur_exp, index) => {
                            return (
                                <div key={`${index}`} style={{ margin: '6px 0', display: 'flex' }}>
                                    <div style={{ color: cur_exp.ID === zone_leader?.ID ? 'blue' : '' }}>
                                        {`${cur_exp.label}: ${cur_exp.Room}`}
                                    </div>
                                    <div style={{ marginLeft: '12px' }}>
                                        {`Total HP: ${cur_exp.total_hp.toExponential(2)}`}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            
            
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>


                <div className='importantText'
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
                        maxHeight: '100%'
                    }}
                >
                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Available GH: ${helper.numberWithCommas(mathHelper.createDecimal(data.GrasshopperTotal).toNumber())} (${helper.numberWithCommas(mathHelper.createDecimal(data.GrasshopperTotal).toNumber() - final_gh_amounts['excess_gh'])})`}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Excess GH: ${final_gh_amounts['excess_gh']}`}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '6px' }}>
                                {`Where to place excess grass hoppers`}
                            </div>
                            <select
                                className='importantText'
                                style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px' }}
                                aria-label='Specify which contagion will receive extra gh'
                                onChange={
                                    (e) => {
                                        setExtraGHID(Number(e.target.value))
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
            </div> */}

            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />


        </div>
    );
}