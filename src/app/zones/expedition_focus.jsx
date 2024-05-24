
import { useState, useEffect, useMemo, } from 'react';
import ExpeditionFocus from './expedition_focus.jsx';
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

export default function Zones({
    zoneToClear,
    setZoneToClear,
    hasLocked,
    setHasLocked,
    setOuterCurrentZones,
    setOuterUnlockedIDs,
    targetWave, setTargetWave,
    setSelectedZone, selectedZone,
    teamToRun, setTeamToRun,
    TimeToClear, setCardZones
}) {

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
        let all_zones = [];
        let unlocked_ids = {};
        let unlocked_zones = {};


        data.ExpeditionsCollection.forEach((curr_zone, index) => {
            if (curr_zone.ID === 0) return;
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

            all_zones.push(zone);
            if (curr_zone.Locked === 0) return;
            unlocked_zones[curr_zone.ID] = true;
            current_zones.push(zone);
        });
        current_zones.sort((a, b) => a.order - b.order);
        all_zones.sort((a, b) => a.order - b.order);

        setOuterCurrentZones(current_zones);
        setOuterUnlockedIDs(unlocked_zones);
        setCardZones(all_zones);

        return { current_zones, unlocked_ids };
    }, [setOuterCurrentZones, data,]);


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
            current_zones.forEach((zone_temp) => {
                let zone = JSON.parse(JSON.stringify(zone_temp));
                zone.curr_hp = mathHelper.createDecimal(zone.curr_hp);
                zone.total_hp = mathHelper.createDecimal(zone.total_hp);
                zone.max_hp = mathHelper.createDecimal(zone.max_hp);
                zone.ratio = zone_ratios_client[zone.bonus_id];
                if (!zone.ratio) {
                    return;
                }
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

    const zone_dmg_dealt_map = useMemo(() => {
        let dmg_map = {};
        data.ExpeditionTeam.forEach((cur_team) => {
            if (cur_team.InExpedition === 1) {
                dmg_map[cur_team.WhichExpedition] = mathHelper.createDecimal(cur_team.DamageDoneBD ? cur_team.DamageDoneBD : cur_team.DamageDone);
            }
        });
        return dmg_map;
    }, [data]);

    let zones_in_priority = zone_stuff.zones_in_priority;
    let zone_suggestions = zone_stuff.zone_suggestions;
    let zone_leader = zone_stuff.zone_leader;
    //

    useEffect(() => {

        let hp_goal = 1;
        let hp_goal_difference = -1;
        let zone_to_work = { data: null, index: -1 };

        let earliest_locked_zone = { data: null, index: 99 };
        let goal_wave = targetWave;

        //most likely all are unlocked
        if (selectedZone === -1) {
            data.ExpeditionsCollection.forEach((curr_zone) => {
                if (curr_zone.ID === 0) return;

                let temp_data = zone_data[curr_zone.ID];
                if (curr_zone.Locked === 0 && temp_data.order < earliest_locked_zone.index) {
                    earliest_locked_zone = { data: { ...curr_zone, ...temp_data }, index: temp_data.order }
                }
                if (temp_data.order > zone_to_work.index) {
                    zone_to_work = { data: curr_zone, index: temp_data.order }
                }
            });
            if (earliest_locked_zone.data) {
                earliest_locked_zone = earliest_locked_zone.data;
                setHasLocked(true);
                data.ExpeditionsCollection.forEach((curr_zone) => {
                    let temp = zone_data[curr_zone.ID];
                    if ((earliest_locked_zone.order - 1) === temp?.order) {
                        zone_to_work = { data: { ...curr_zone, ...zone_data[curr_zone.ID] } };
                    }
                });


                goal_wave = targetWave === -1 ? zone_to_work.data.unlock : targetWave;
                if (targetWave === -1) {
                    setTargetWave(goal_wave)
                }
            }

            zone_to_work = zone_to_work.data;
            zone_to_work.max_hp = calc_max_hp(zone_to_work, data);
            zone_to_work.total_hp = calc_total_hp(zone_to_work, data);

            hp_goal = calc_total_hp(zone_to_work, data, { levelOffset: goal_wave === -1 ? 0 : goal_wave - zone_to_work.Room });

        }
        else {
            data.ExpeditionsCollection.forEach((curr_zone) => {
                if (curr_zone.ID === selectedZone) zone_to_work = curr_zone;
            })
            zone_to_work.max_hp = calc_max_hp(zone_to_work, data);
            zone_to_work.total_hp = calc_total_hp(zone_to_work, data);

            hp_goal = calc_total_hp(zone_to_work, data, { levelOffset: targetWave === -1 ? 0 : targetWave - zone_to_work.Room });
        }


        let cur_hp = mathHelper.createDecimal(zone_to_work.CurrentHPBD ? zone_to_work.CurrentHPBD : zone_to_work.CurrentHP);
        let dmg_dealt = mathHelper.subtractDecimal(
            calc_max_hp(zone_to_work, data),
            cur_hp
        )
        hp_goal_difference = mathHelper.subtractDecimal(hp_goal, dmg_dealt);
        let running_hp = calc_total_hp(zone_to_work, data, { levelOffset: -1 })
        hp_goal_difference = mathHelper.subtractDecimal(hp_goal_difference, running_hp);



        zone_to_work = JSON.parse(JSON.stringify(zone_to_work));
        zone_to_work = { ...zone_to_work, ...zone_data[zone_to_work.ID] };
        zone_to_work.label = zone_data[zone_to_work.ID].label;
        zone_to_work.order = zone_data[zone_to_work.ID].order;
        zone_to_work.bonus_id = zone_data[zone_to_work.ID].bonus_id;
        zone_to_work.hp_goal = hp_goal;

        if (zone_dmg_dealt_map[zone_to_work.ID]) {
            hp_goal_difference = mathHelper.subtractDecimal(hp_goal_difference, zone_dmg_dealt_map[zone_to_work.ID]);//s
        }

        zone_to_work.remaining_hp = hp_goal_difference;
        zone_to_work.cur_hp = mathHelper.createDecimal(zone_to_work.CurrentHPBD ? zone_to_work.CurrentHPBD : zone_to_work.CurrentHP);
        let inner_team = [];

        data.PetsExpeditionLoadout[teamToRun].IDs.forEach((inner_id) => {
            if (inner_id === 0) return;
            inner_team.push(pets_global[inner_id]);
        });
        //sS
        let score = petHelper.calculateGroupDamage(inner_team, data);
        inner_team.damage = score;
        inner_team.name = data.PetsExpeditionLoadout[teamToRun].Name;

        zone_to_work.team = inner_team;
        zone_to_work.hours = mathHelper.divideDecimal(hp_goal_difference, inner_team.damage).ceil();
        if (zone_to_work.hours.lessThan(mathHelper.createDecimal(0))) {
            zone_to_work.hours = 0;
            zone_to_work.remaining_hp = mathHelper.createDecimal(0);
        }
        setZoneToClear(zone_to_work);

    }, [
        setHasLocked, setSelectedZone, setTargetWave, setZoneToClear,
        selectedZone, data, teamToRun, targetWave, pets_global, zone_dmg_dealt_map])

    if (data.AscensionCount >= 14) {
        return <></>
    }

    return (<>
        {/* Zone Priority */}
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
            {/* Title Section */}
            <div className='importantText'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                        {`This shows which zones to run, as well as the suggested layout (from your save file) that should be used. In the top right corner it will specify
                        for how long to run it. If it says "infinite" it means its the bost option atm based on your priority list. Come back later to see if this changes!`}
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
                                    position: 'absolute', top: '5%', left: '0', fontWeight: 'bold', fontSize: '16px',

                                    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
                                }}>
                                    {`${cur_exp.label} (${BonusMap[cur_exp.bonus_id].label})`}
                                </div>

                                {/* Hours to Run */}
                                <div style={{
                                    position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginLeft: '-6px',
                                }}
                                >
                                    {`Hours: ${cur_exp.hours === -1 ? 'infinite' : cur_exp.hours}`}
                                </div>

                                {/*Current HP */}
                                <div style={{
                                    position: 'absolute', top: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                                }}
                                >
                                    {`Total HP: ${cur_exp.total_hp.exponent > 100 ? cur_exp.total_hp.toExponential(1) : cur_exp.total_hp.toExponential(2)}`}
                                </div>
                                {/*Target HP */}
                                <div style={{
                                    position: 'absolute', bottom: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginLeft: '6px',
                                }}
                                >
                                    {`Goal HP: ${cur_exp.target_hp.exponent > 100 ? cur_exp.target_hp.toExponential(1) : cur_exp.target_hp.toExponential(2)}`}
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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
            {TimeToClear}
        </div>
    </>
    )
}