"use client"

import { isMobile } from 'mobile-device-detect';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import ComboListCSS from './comboList.css';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { petNameArray, BonusMap, petNames, getPet } from "../util/itemMapping.js";
import { StaticPetItem } from './PetItem.js';
import ReactGA from "react-ga4";
import { GoogleAdSense } from "next-google-adsense";
import helper from '../util/helper.js';
import petHelper from '../util/petHelper.js';
import SearchBox from '../util/search.jsx';

import { Reorder } from 'framer-motion'
import useLocalStorage from "use-local-storage";

import CrossIcon from '../../../public/images/icons/x_icon.svg';
import DragIcon from '../../../public/images/icons/drag_icon.svg';

import DefaultSave from '../util/tempSave.json';
import { mainTeamSuggestions, reincTeamSuggestions, gearTeamSuggestions, statTeamSuggestions, statTeamMasterList, maxKey } from './teamSuggestions.js';

import Image from 'next/image';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);


const bonusCutOff = 1000;

function PetComboDisplay({ petCombos, unlockedPets, petMap }) {

    if (!BonusMap[petCombos[0].BonusID]) return <></>

    const comboBonusLabel = BonusMap[petCombos[0].BonusID].label;
    const numCombos = petCombos.length;
    let numPossibleCombos = 0;
    let possibleCombosMap = {};

    for (let i = 0; i < petCombos.length; i++) {
        let cur = petCombos[i];
        let possible = true;

        if (!(cur.BonusID in possibleCombosMap)) {

            possibleCombosMap[cur.BonusID] = {};
        }
        //
        for (let j = 0; j < cur.PetID.length; j++) {
            if (cur.PetID[j] === -99) {
                continue;
            }
            if (!(cur.PetID[j] in unlockedPets)) {
                possible = false;
                break;
            }
        }


        //s
        if (possible) {
            numPossibleCombos++;
            possibleCombosMap[cur.BonusID][cur.ID] = true;
        }

        if (cur.PetID.length === 2) {
            cur.PetID.push(-99)
        }

    }

    let completeArray = Array(numCombos).fill(true);

    for (let i = 0; i < numCombos; i++) {
        if (i + 1 > numPossibleCombos) {
            completeArray[i] = false;
        }
    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div
                    style={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'space-between',
                        // backgroundColor: '#4b4b4b',
                    }}
                >
                    <div>
                        {comboBonusLabel}
                    </div>
                    <div
                        style={{ marginLeft: '12px' }}
                    >
                        {completeArray.map((e, index) => {

                            if (e) {
                                return (
                                    <span className='greenDot'
                                        style={{
                                            margin: '0 1px 0 1px'
                                        }}
                                        key={index}
                                    >

                                    </span>
                                )
                            }
                            return (
                                <span className='redDot'
                                    style={{
                                        margin: '0 1px 0 1px'
                                    }}
                                    key={index}
                                >
                                </span>
                            )
                        })}
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails >
                <div
                    style={{
                        display: 'flex', flexDirection: 'column', width: '270px',
                        position: 'relative'
                    }}
                    // className={`greenStripes`}
                    className={`grayStripes`}
                >
                    {petCombos && petCombos.map((petCombo, i) => {
                        const PetIDArray = petCombo.PetID;
                        let margin = ``;
                        if (i === 0) {
                            margin = '0'
                        }
                        else if (possibleCombosMap[petCombo.BonusID][petCombo.ID] === possibleCombosMap[petCombos[i - 1].BonusID][petCombos[i - 1].ID]) {
                            margin = '-5px 0 0 0'
                        }
                        else {
                            margin = '0 0 0 0'
                        }



                        return (
                            <div style={{
                                display: 'flex',
                                margin: margin,
                                border: `5px solid ${possibleCombosMap[petCombo.BonusID][petCombo.ID] ? 'green' : 'red'}`
                            }} key={i}>
                                {PetIDArray.map((petId, j) => {

                                    let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === petId)
                                    return (
                                        <div key={j}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: '90px',
                                                height: '90px',
                                                opacity: petId in unlockedPets || petId === -99 ? `` : `0.6`
                                                // margin: j % 2 === 0 ? '1px 1px 1px 1px' : '1px 0 1px 0'
                                                // border: '1px solid black'
                                            }}
                                            // className={petId in unlockedPets ? `` : 'whiteBackground redBorder'}
                                            className={petId in unlockedPets || petId === -99 ? `lightGrayBackground` : ``}
                                        >
                                            {petId !== -99 && (
                                                <StaticPetItem petData={{ ...staticPetData, pet: petMap[petId] }} highlight={petId in unlockedPets} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    {/* <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            // zIndex: '-2'
                        }}
                        className={`greenStripes`}
                    /> */}


                </div>
            </AccordionDetails>
        </Accordion >
    );
}



export default function Pets() {

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

    const [statMode, setStatMode] = useState(false);
    const [statModePets, setStatModePets] = useState({});

    const [clientUseExpedition, setUseExpedition] = useLocalStorage('useExpedition', false);
    const [useExpedition, setRunTimeUseExpedition] = useState(false);

    useEffect(() => {
        setRunTimeUseExpedition(clientUseExpedition);
    }, [clientUseExpedition]);


    const [groupsCacheRunTime, setGroupsCacheRunTime] = useState({});
    const [groupsCacheClient, setGroupsCache] = useLocalStorage("groupsCache", {});
    useEffect(() => {
        setGroupsCacheRunTime(groupsCacheClient);
    }, [groupsCacheClient]);

    const [manualEnabledPetsLoaded, setManualEnabledPetsLoaded] = useState(false);
    const [manualEnabledPets, setManualEnabledPetsRunTime] = useState({});
    const [manualEnabledPetsClient, setManualEnabledPets] = useLocalStorage("manualEnabledPets", {});
    useEffect(() => {
        setManualEnabledPetsLoaded(true);
        setManualEnabledPetsRunTime(manualEnabledPetsClient);
    }, [manualEnabledPetsClient])


    const [priorityList, setPriorityList] = useState([]);

    const [priorityMap, setPriorityMap] = useState({
        // 1: { mode: 'max', label: BonusMap[1].label, id: 1 },
        // 2: { mode: 'max', label: BonusMap[2].label, id: 2 },
        // 3: { mode: 'max', label: BonusMap[3].label, id: 3 },
        // 4: { mode: 'max', label: BonusMap[4].label, id: 4 },
        // 28: { mode: 'max', label: BonusMap[28].label, id: 28 },s
    });

    const [currentPresetName, setCurrentPresetName] = useState('');
    const [petWhiteList, setPetWhiteList] = useState({});
    const [recommendedSelected, setRecommendedSelected] = useState(false);
    const [customeSelected, setCustomSelected] = useState(false);

    const [customPresets, setCustomPresetsRuntTime] = useState({});
    const [customPresetsClient, setCustomPresets] = useLocalStorage(`customPresets`, {});
    useEffect(() => {
        setCustomPresetsRuntTime(customPresetsClient);
    }, [customPresetsClient]);



    const [loadPreset, setLoadPreset] = useState('');


    const comboList = data.PetsSpecial;

    let airPets, groundPets, currentBonuses, selectedPetMap;
    [airPets, groundPets, currentBonuses, selectedPetMap] = useMemo(() => {
        let result = petHelper.findBestTeam(data,
            {
                statMode: statMode,
                statModePets: statModePets,
                manualEnabledPets: useExpedition ? manualEnabledPets : {},
                priorityList: priorityList,
                priorityMap: priorityMap,
                petWhiteList: petWhiteList
            });
        let currentBonuses = result[2];

        for (const [key, value] of Object.entries(priorityMap)) {
            if (value.id >= 1000) {
                continue;
            }
            if (!currentBonuses[value.id] && value.count !== 0) {
                currentBonuses[value.id] = { ID: value.id, Power: 0, Gain: 0, count: 0, sum: 0, label: value.label }
            }
        }
        return result;
    },
        [data, priorityList, priorityMap, petWhiteList, useExpedition, manualEnabledPets, statMode, statModePets]
    );


    const [statPriorityList, setStatPriorityList] = useState({});
    const [statPriorityMap, setStatPriorityMap] = useState({});
    const [statPriorityWhitelist, setStatPriorityWhitelist] = useState({});

    let preGeneratedTeams = useMemo(() => {

        setRecommendedSelected(true);
        let priorityList = {};
        let priorityMap = {};
        let petWhiteList = {};
        let presetPets = {};

        let mainTeam = {};
        let reincTeam = {};
        let gearTeam = {};
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    priorityList = JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                    priorityMap = JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                    presetPets = mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                    break;
                case 1:
                    priorityList = JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                    priorityMap = JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                    presetPets = reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                    break;
                case 2:
                    priorityList = JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                    priorityMap = JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                    presetPets = gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                    break;
                case 'None':
                    priorityList = [];
                    priorityMap = {};
                    break;
                default:
            }
            let airPets, groundPets, currentBonuses, selectedPetMap;
            [airPets, groundPets, currentBonuses, selectedPetMap] = petHelper.findBestTeam(
                data,
                {
                    priorityList: priorityList,
                    priorityMap: priorityMap,
                    petWhiteList: petWhiteList,
                    manualEnabledPets: useExpedition ? manualEnabledPets : {},
                }
            );

            let combinedList = airPets.concat(groundPets);
            switch (i) {
                case 0:
                    mainTeam = combinedList;
                    break;

                case 1:
                    reincTeam = combinedList;
                    break;

                case 2:
                    gearTeam = combinedList;
                    break;
                default:
            }
        }

        let existingStats = {};

        let poopCombo = {
            satisfied: false,
            requiredID: {
                4: true,
                16: true,
            }
        };

        if (!poopCombo.satisfied) {
            let missed = false;
            Object.keys(poopCombo.requiredID).forEach((inner_val) => {
                let temp = mainTeam.find((a) => {
                    return a.BonusList.find(
                        (b) => {
                            return b.ID === Number(inner_val)
                        }
                    )
                })
                if (!temp) {
                    missed = true;
                }
            });
            if (!missed) {
                poopCombo.satisfied = true;
                poopCombo.team = mainTeam;
            }
        }
        if (!poopCombo.satisfied) {
            let missed = false;
            Object.keys(poopCombo.requiredID).forEach((inner_val) => {
                let temp = reincTeam.find((a) => {
                    return a.BonusList.find(
                        (b) => {
                            return b.ID === Number(inner_val)
                        }
                    )
                })
                if (!temp) {
                    missed = true;
                }
            });
            if (!missed) {
                poopCombo.satisfied = true;
                poopCombo.team = reincTeam;
            }
        }
        if (!poopCombo.satisfied) {
            let missed = false;
            Object.keys(poopCombo.requiredID).forEach((inner_val) => {
                let temp = gearTeam.find((a) => {
                    return a.BonusList.find(
                        (b) => {
                            return b.ID === Number(inner_val)
                        }
                    )
                })
                if (!temp) {
                    missed = true;
                }
            });
            if (!missed) {
                poopCombo.satisfied = true;
                poopCombo.team = gearTeam;
            }
        }

        let fullPetList = mainTeam.concat(reincTeam.concat(gearTeam));
        let fullPetMap = {};
        fullPetList.forEach((inner_val) => {

            fullPetMap[inner_val.ID] = inner_val;

            inner_val.BonusList.forEach((inner_bonus) => {
                if (inner_bonus.ID >= 1000) return;
                if (!existingStats[inner_bonus.ID]) {
                    existingStats[inner_bonus.ID] = 0;
                }
                existingStats[inner_bonus.ID]++;
            })
        });

        let newPriorityList = JSON.parse(JSON.stringify(statTeamMasterList.priorityList));
        let newPriorityMap = JSON.parse(JSON.stringify(statTeamMasterList.priorityMap));
        let newPetWhiteList = statTeamMasterList.petWhiteList ? JSON.parse(JSON.stringify(statTeamMasterList.petWhiteList)) : {};

        setStatPriorityList(newPriorityList);
        setStatPriorityMap(newPriorityMap);
        setStatPriorityWhitelist(newPetWhiteList);
        setStatModePets(fullPetMap);

        for (const [key, value] of Object.entries(newPriorityMap)) {
            //only turn off poop stuff if we have the combo in the other teams
            if (key in poopCombo.requiredID) {
                if (poopCombo.satisfied) {
                    newPriorityMap[key].count = 0;
                }
            }
            //Do not reset card power or exp, also reinc and ir for lower A fallback
            else if (key in existingStats && key !== '21' && key !== '22'
                && key !== '5' && key !== '6'
            ) {
                newPriorityMap[key].count = 0;
            }
        }
    },
        [data, manualEnabledPets, useExpedition])
    // statTeamMasterList

    let specialCombos = {};
    let partialCombos = {};

    comboList.forEach((combo, index) => {
        if (index === 0) return;

        if (!BonusMap[combo.BonusID]) return;

        let matched = true;
        let required = 0;
        let partial = 0;

        for (let i = 0; i < combo.PetID.length; i++) {

            if (combo.PetID[i] <= 0) {
                continue;
            }

            required++;

            let found = false;

            found = airPets.find((pet) => pet.ID === combo.PetID[i]);
            if (found) {
                partial++;
                continue
            }
            found = groundPets.find((pet) => pet.ID === combo.PetID[i]);
            if (found) {
                partial++;
                continue
            }
        }

        if (partial === required) {
            if (!specialCombos[combo.BonusID]) {
                specialCombos[combo.BonusID] = { ...combo, rootName: BonusMap[combo.BonusID].rootName, odd: BonusMap[combo.BonusID].odd, name: BonusMap[combo.BonusID].label, count: 1 };
            }
            else {
                specialCombos[combo.BonusID].count++;
            }

        }
        else if (partial > 0) {
            if (!partialCombos[combo.BonusID]) {
                partialCombos[combo.BonusID] = { ...combo, rootName: BonusMap[combo.BonusID].rootName, odd: BonusMap[combo.BonusID].odd, name: BonusMap[combo.BonusID].label, count: 1 };
            }
            else {
                partialCombos[combo.BonusID].count++;
            }
        }

    });


    const comboByBonusId = comboList.reduce((accum, combo, i) => {
        if (i === 0) return accum;
        accum[combo.BonusID] = accum[combo.BonusID] ? [...accum[combo.BonusID], combo] : [combo];
        return accum;
    }, {});

    let unlockedPetsMap = {};
    let petMap = {};

    const positiveRankedPets = data.PetsCollection.filter(
        (pet) => {
            // const isValidRank = !!pet.Rank;//Instead of relying on defaultRank always = 0, select valid ranks if they exist (not 0)
            petMap[pet.ID] = pet;
            const isValidLocked = !!pet.Locked;
            return isValidLocked;
        }
    )

    let petSearchList = [];
    for (let i = 0; i < positiveRankedPets.length; i++) {
        let cur = positiveRankedPets[i];
        unlockedPetsMap[cur.ID] = cur;
        if (!petWhiteList[cur.ID]) {
            petSearchList.push({ label: cur.name, id: cur.ID });
        }
    }

    let bonusesWithPets = {};
    data.PetsCollection.forEach((bonus_pet) => {
        bonus_pet.BonusList.forEach((pet_bonus_inner) => {
            bonusesWithPets[pet_bonus_inner.ID] = bonus_pet;
        })
    })

    let searchList = [];
    for (const [key, value] of Object.entries(BonusMap)) {

        if (value.id >= bonusCutOff || priorityMap[key] || !bonusesWithPets[value.id]) {
            continue;
        }
        searchList.push({ label: value.label, id: value.id });
    }

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            
            <GoogleAdSense publisherId="pub-1393057374484862" />
            <div
                style={{
                    display: 'flex',
                    flex: '1',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    paddingLeft: '12px'
                }}
            >
                {/* Pet Combos */}
                <div style={{
                    marginTop: '12px',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    maxHeight: 'calc(100% - 40px)',
                    // overflowY: 'auto',
                    padding: '6px',
                    borderRadius: '6px',
                    border: `2px solid rgba(255,255,255,0.7)`,
                }}>
                    <h2 className='importantText' style={{ textAlign: 'center', marginTop: '0', marginBottom: '12px' }}>Pet Combo List</h2>
                    <div style={{ borderRadius: '6px', maxHeight: 'calc(100% - 42px)', height: 'calc(100% - 42px)', overflow: 'hidden' }}>
                        <div
                            className='importantText'
                            style={{
                                display: 'flex', flexDirection: 'column',
                                maxHeight: '100%',
                                overflowY: 'auto'

                            }}>
                            {comboByBonusId && Object.values(comboByBonusId).map((comboArray, i) => {
                                return <PetComboDisplay
                                    petMap={petMap}
                                    petCombos={comboArray}
                                    key={i}
                                    unlockedPets={unlockedPetsMap}
                                />
                            })}
                        </div>
                    </div>
                </div>



                <>
                    {/* Active team builder */}
                    {true && (<div className='teamBuilder importantText'
                        style={{
                            borderRadius: '6px',
                            border: `2px solid rgba(255,255,255,0.7)`,
                            margin: '12px 24px',
                            maxHeight: 'calc(100% - 24px)',
                            overflow: 'auto',
                            display: 'flex',
                            alignItems: 'flex-start',
                            backgroundColor: 'rgba(255,255,255, 0.05)',
                            minWidth: mobileMode ? '903px' : ''
                        }}>

                        {/* List Table */}
                        <div
                            style={{ alignSelf: 'flex-start', minWidth: '580px', margin: '0 12px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Priority List */}
                                <div
                                    style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', }}
                                >
                                    Priority List
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    // flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '12px'
                                }}>

                                <SearchBox
                                    margin='1px 0 0 6px'
                                    data={{
                                        list: searchList
                                    }}
                                    placeholder={`Select a bonus`}
                                    onSelect={(e) => {
                                        ReactGA.event({
                                            category: "pets_interaction",
                                            action: `whitelist_bonus`,
                                            label: e.label,
                                            value: e.id
                                        })

                                        setPriorityMap((curMap) => {
                                            let newMap = { ...curMap };
                                            newMap[e.id] = { mode: 'max', label: BonusMap[e.id].label, id: e.id, count: -1, current: 0 };
                                            return newMap;
                                        });
                                        setPriorityList((curList) => {
                                            let newList = [...curList];
                                            newList.push(e.id);
                                            return newList;
                                        });
                                    }}
                                />
                                <div className='rainbowBorder' style={{ margin: '0 12px 0 0', display: 'flex', borderWidth: '4px', padding: '3px' }}>
                                    <div>
                                        Recommended Presets
                                    </div>
                                    <div>
                                        <select
                                            className='importantText'
                                            aria-label='Select a default team preset'
                                            style={{ maxWidth: '144px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                                            onChange={
                                                (selected_mode) => {
                                                    setRecommendedSelected(true);
                                                    ReactGA.event({
                                                        category: "pets_interaction",
                                                        action: `selected_recommended_team`,
                                                        label: selected_mode.target.value
                                                    })
                                                    let presetPets = {};
                                                    switch (selected_mode.target.value) {
                                                        case 'Main Team':
                                                            setStatMode(false);
                                                            setPriorityList(JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList)))
                                                            setPriorityMap(JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap)));
                                                            presetPets = mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                            break;
                                                        case 'Reinc. Team':
                                                            setStatMode(false);
                                                            setPriorityList(JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList)))
                                                            setPriorityMap(JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap)));
                                                            presetPets = reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                            break;
                                                        case 'Gear Team':
                                                            setStatMode(false);
                                                            setPriorityList(JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList)))
                                                            setPriorityMap(JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap)));
                                                            presetPets = gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                            break;
                                                        case 'Stat Team':
                                                            setPriorityList(JSON.parse(JSON.stringify(statPriorityList)));
                                                            setPriorityMap(JSON.parse(JSON.stringify(statPriorityMap)));
                                                            presetPets = JSON.parse(JSON.stringify(statPriorityWhitelist));
                                                            setStatMode(true);
                                                            break;
                                                        case 'None':
                                                            setStatMode(false);
                                                            setPriorityList([]);
                                                            setPriorityMap({});
                                                            setPetWhiteList({});
                                                            // setRecommendedSelected(true);
                                                            break;
                                                        default:
                                                    }

                                                    let petWhiteListNew = {};
                                                    for (const [key, value] of Object.entries(presetPets)) {
                                                        if (!unlockedPetsMap[key]) {
                                                            petWhiteListNew[key] = { ID: key, name: petNames[key].name, mode: value.mode };
                                                        }
                                                        else {
                                                            petWhiteListNew[key] = { ...unlockedPetsMap[key], mode: value.mode };
                                                        }
                                                    }
                                                    setPetWhiteList(petWhiteListNew);
                                                }
                                            }
                                            defaultValue={'None'}
                                        // value={petWhiteList[e.ID].mode}
                                        >
                                            {!recommendedSelected && (<option value="None">Select Preset</option>)}
                                            <option value="Main Team">Main Team</option>
                                            <option value="Reinc. Team">Reinc. Team</option>
                                            <option value="Gear Team">Gear Team</option>
                                            {data.AscensionCount >= 5 && (
                                                <option value="Stat Team">Stat Team</option>
                                            )}
                                            {recommendedSelected && (<option value="None">Blank</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* List of priorities */}
                            <div style={{
                                display: 'flex', flex: '1',
                                border: '1px solid gray',
                                margin: '6px', justifyContent: 'center',
                                backgroundColor: 'rgba(255,255,255, 0.04)',
                                borderRadius: '6px',
                                maxHeight: '58vh',
                                paddingLeft: '6px',
                                overflow: "hidden"
                            }}>
                                <div style={{ width: '100%', overflow: 'auto' }}>
                                    <Reorder.Group
                                        axis="y"
                                        values={priorityList}
                                        onReorder={setPriorityList}>
                                        {priorityList.map((item, index) => {
                                            let showSelectedPets = false;
                                            let color = 'gray';
                                            let priority = priorityMap[item];
                                            let current = currentBonuses[item];
                                            if (priority.count === -1) {
                                                color = 'white';
                                            }
                                            else if (priority.count === 0) {
                                                color = 'gray';
                                            }
                                            else if (priority.count === current?.count) {
                                                color = '#4caf50'
                                            }
                                            else if (priority.count < current?.count) {
                                                color = '#ffeb3b'
                                            }
                                            else {
                                                color = '#e53935';
                                            }
                                            if (selectedPetMap[item]) {
                                                if (selectedPetMap[item].length > 0) {
                                                    showSelectedPets = true;
                                                }
                                            }//
                                            return (
                                                < Reorder.Item key={item} value={item} style={{ marginLeft: '6px' }}>
                                                    <div
                                                        className='drag'
                                                        style={{
                                                            margin: '6px 3px',
                                                            border: `2px solid ${color}`,
                                                            display: 'flex',
                                                            alignItems: 'center', flexDirection: 'column',
                                                            width: '220px',
                                                            backgroundColor: 'rgba(255,255,255, 0.07)',
                                                            borderRadius: '6px'
                                                        }}>
                                                        <div style={{
                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                            width: '100%', margin: '3px 0 6px 0',
                                                            borderBottom: '1px solid black'
                                                        }}>

                                                            <Image
                                                                className='drag noPointerEvents'
                                                                src={DragIcon}
                                                                style={{ height: '24px', width: 'auto', marginLeft: '3px' }}
                                                                alt='hand in a fist with index poting at a vertical line with arrows on both ends'
                                                            />


                                                            <div style={{ marginLeft: '6px' }}>
                                                                {` ${priorityMap[item].label}`}
                                                            </div>
                                                            <Image
                                                                onClick={(e) => {
                                                                    setPriorityMap((curMap) => {
                                                                        let newMap = { ...curMap };
                                                                        delete newMap[item];
                                                                        return newMap;
                                                                    });
                                                                    setPriorityList((curList) => {
                                                                        let newList = [...curList];
                                                                        newList = newList.filter((cur) => cur !== item);
                                                                        return newList;
                                                                    });
                                                                }}
                                                                className='hover'
                                                                src={CrossIcon}
                                                                alt='red x'
                                                                style={{ height: '16px', width: 'auto', marginRight: '6px' }} />
                                                        </div>

                                                        {/* Extra options */}
                                                        <div style={{ alignSelf: 'flex-start', marginLeft: '6px', marginBottom: '3px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div style={{ marginRight: '6px' }}>
                                                                    Max Pets:
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        aria-label='Select how the bonus will be rewarded'
                                                                        // className='importantText textMedium2'
                                                                        style={{
                                                                            //  borderRadius: '4px',
                                                                            width: '30px',
                                                                            //    height: '65%', 
                                                                            //    backgroundColor: index % 2 === 0 ? '#2D2D2D' : '#353535'
                                                                            backgroundColor: '#f3f0f5'
                                                                        }}
                                                                        type='number' value={priorityMap[item].count}
                                                                        onChange={
                                                                            (inner_e) => {
                                                                                try {
                                                                                    let x = Number(inner_e.target.value);
                                                                                    x = Math.floor(x);
                                                                                    if (x < -1 || x > 6) {
                                                                                        return;
                                                                                    }
                                                                                    setPriorityMap((current_map) => {
                                                                                        let newMap = { ...current_map };
                                                                                        newMap[item].count = x;
                                                                                        return newMap;
                                                                                    })

                                                                                    ReactGA.event({
                                                                                        category: "pet_team_builder",
                                                                                        action: `changed_bonus_max_pets`,
                                                                                        label: `${priorityMap[item].label}`,
                                                                                        value: x
                                                                                    });
                                                                                }
                                                                                catch (err) {
                                                                                    console.log(err);
                                                                                }
                                                                            }}
                                                                        min="-1"
                                                                        max="6"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Reorder.Item>
                                            )
                                        })}
                                    </Reorder.Group>
                                </div>

                            </div>




                            {/* List of whitelisted pets*/}
                            <div
                                style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}
                            >
                                Manual Pet Selection
                            </div>

                            <SearchBox
                                margin='0 0 0 6px'
                                data={{
                                    list: petSearchList
                                }}
                                placeholder={`Select a pet`}
                                onSelect={(e) => {

                                    ReactGA.event({
                                        category: "pets_interaction",
                                        action: `whitelist_pet`,
                                        label: e.label,
                                        value: e.id
                                    })



                                    setPetWhiteList((curr_whitelist) => {
                                        let newList = { ...curr_whitelist };

                                        newList[e.id] = { ...unlockedPetsMap[e.id], mode: 'include' };
                                        return newList;
                                    })
                                }}
                            />


                            <div style={{
                                display: 'flex', flex: '1',
                                flexDirection: 'column',
                                border: '1px solid gray',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '6px',
                                backgroundColor: 'rgba(255,255,255, 0.04)',
                                borderRadius: '6px',
                                maxHeight: '19.5vh',
                                overflow: 'hidden'
                            }}>
                                <div style={{ maxHeight: '100%', overflow: 'auto', width: '100%' }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        {Object.values(petWhiteList).map((e, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex', flexDirection: 'column',
                                                    width: '250px', height: '60px',
                                                    backgroundColor: 'rgba(255,255,255, 0.07)',
                                                    borderRadius: '6px',
                                                    margin: '6px  12px'
                                                }}>
                                                <div style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    width: '100%', height: '32px',
                                                    borderBottom: '1px solid black'
                                                }}>
                                                    <div style={{ fontSize: '24px', marginLeft: '6px' }}>
                                                        {e.name}
                                                    </div>
                                                    <Image
                                                        className='hover'
                                                        src={CrossIcon}
                                                        alt='red x'
                                                        style={{ height: '16px', width: 'auto', marginRight: '6px' }}
                                                        onClick={(click_e) => {
                                                            setPetWhiteList((cur_whitelist) => {
                                                                let newList = { ...cur_whitelist };
                                                                delete newList[e.ID];
                                                                return newList;
                                                            });
                                                        }}
                                                    />
                                                </div>


                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', margin: '6px' }}>
                                                        <div style={{ marginRight: '6px' }}>
                                                            Placement:
                                                        </div>
                                                        <div>
                                                            <select
                                                                aria-label='Specifiy if the pet is included or excluded'
                                                                style={{ maxWidth: '144px' }}
                                                                onChange={
                                                                    (selected_mode) => {
                                                                        setPetWhiteList((cur_whitelist) => {
                                                                            let newList = { ...cur_whitelist };
                                                                            newList[e.ID].mode = selected_mode.target.value;
                                                                            return newList;
                                                                        });
                                                                    }
                                                                }
                                                                defaultValue={petWhiteList[e.ID].mode}
                                                                value={petWhiteList[e.ID].mode}
                                                            >
                                                                <option value="include">include</option>
                                                                <option value="exclude">exclude</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Actual team */}
                        <div style={{ marginRight: '6px', marginTop: '6px' }}>
                            <div
                                style={{
                                    backgroundColor: 'rgba(255,255,255, 0.07)',
                                    padding: '6px',
                                    borderRadius: '6px'
                                }}
                            >
                                <div
                                    style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}
                                >
                                    Best Team

                                </div>
                                {!!recommendedSelected && (
                                    <>
                                        {/* Current Team Bonuses! s*/}
                                        <div style={{ padding: '12px' }}>
                                            {Object.values(currentBonuses).map((e, index) => {
                                                if (e.ID >= bonusCutOff) {
                                                    return null
                                                }
                                                let color = 'lightgray';
                                                let priority = priorityMap[e.ID];
                                                if (priority) {
                                                    if (priority.count === -1) {
                                                        color = 'white';
                                                    }
                                                    else if (priority.count === 0) {
                                                        color = 'gray';
                                                    }
                                                    else if (priority.count === e.count) {
                                                        color = '#4caf50'
                                                    }
                                                    else if (priority.count < e.count) {
                                                        color = '#ffeb3b'; //yellow
                                                    }
                                                    else {
                                                        color = '#e53935'; //reds
                                                    }
                                                }
                                                else {
                                                    color = 'lightgray';
                                                }
                                                return (
                                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '150px' }}>
                                                            {e.label}
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ color: color, }}>
                                                                {e.sum.toExponential(2) + '%'}
                                                            </div>
                                                            <div style={{ color: color, marginLeft: '6px' }}>
                                                                {` (${currentBonuses[e.ID].count})`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }, [])}
                                        </div>

                                        {Object.values(specialCombos).length > 0 && (
                                            <>
                                                < div
                                                    style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
                                                >
                                                    Team Combos
                                                </div>

                                                <div style={{ padding: '12px' }}>
                                                    {Object.values(specialCombos).map((e, index) => {
                                                        return (
                                                            <div key={index} style={{ display: 'flex' }}>
                                                                <div style={{ width: '150px' }}>
                                                                    {e.rootName}
                                                                </div>
                                                                <div>
                                                                    {e.odd && (<>
                                                                        {`x${e.count}`}
                                                                    </>
                                                                    )}
                                                                    {!e.odd && (
                                                                        <>
                                                                            {helper.roundInt((e.BonusPower * e.count)) + '%'}
                                                                        </>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        )
                                                    }, [])}
                                                </div>
                                            </>
                                        )}

                                        {/* Pets */}
                                        <div>

                                            {/* Ground Pets */}
                                            <div style={{ display: 'flex' }}>
                                                {groundPets.map((e, index) => {

                                                    let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === e.ID)
                                                    return (
                                                        <div key={index}
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                width: '90px',
                                                                height: '90px',
                                                                border: '1px gray solid',
                                                                borderRadius: '6px',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            <StaticPetItem
                                                                suggestedPet={true}
                                                                statMode={statMode}
                                                                groupsCacheRunTime={groupsCacheRunTime}
                                                                petData={{ ...staticPetData, pet: petMap[e.ID] }} />
                                                        </div>
                                                    );
                                                }, [])}
                                            </div>
                                            {/* Air Pets */}
                                            <div style={{ display: 'flex' }}>
                                                {airPets.map((e, index) => {

                                                    let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === e.ID)
                                                    return (
                                                        <div key={index}
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                width: '90px',
                                                                height: '90px',
                                                                border: '1px gray solid',
                                                                borderRadius: '6px',
                                                                position: 'relative'
                                                            }}
                                                        >

                                                            <StaticPetItem
                                                                suggestedPet={true}
                                                                statMode={statMode}
                                                                groupsCacheRunTime={groupsCacheRunTime}
                                                                petData={{ ...staticPetData, pet: petMap[e.ID] }} />

                                                        </div>
                                                    );
                                                }, [])}
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>

                            {/* Custom Preset Area */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255, 0.07)',
                                padding: '6px',
                                marginTop: '12px',
                                borderRadius: '6px'
                            }}>
                                {/* header */}
                                <div
                                    style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: "6px" }}
                                >
                                    Custom Presets
                                </div>
                                {/* Save current preset */}
                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <input type='text'
                                        aria-label='Specify name of the current preset to save it under'
                                        onChange={(e) => {

                                            setCurrentPresetName(e.target.value);
                                        }}
                                        style={{
                                            width: '141px', marginRight: '12px'
                                        }}
                                    />
                                    <button disabled={currentPresetName.trim().length === 0}
                                        onClick={(e) => {
                                            ReactGA.event({
                                                category: "pets_interaction",
                                                action: `save_custom_preset`,
                                                label: currentPresetName
                                            })

                                            setCustomPresets((currentPresets) => {
                                                let newPresets = { ...currentPresets };
                                                let newPetWhiteList = {};

                                                for (const [key, value] of Object.entries(petWhiteList)) {
                                                    newPetWhiteList[key] = { ID: key, mode: value.mode }
                                                }

                                                newPresets[currentPresetName] = {
                                                    priorityList: priorityList,
                                                    priorityMap: priorityMap,
                                                    petWhiteList: newPetWhiteList
                                                };
                                                return newPresets;
                                            });
                                        }}
                                    >Save Current</button>
                                </div>
                                {/* Select saved preset */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                    <div style={{ marginRight: '12px', marginLeft: '5px', width: '141px' }}>
                                        Select saved preset
                                    </div>
                                    <select
                                        aria-label='Specify which custom preset to load in'
                                        style={{ width: '90px', marginLeft: '12px' }}
                                        onChange={
                                            (selected_mode) => {
                                                setCustomSelected(true);
                                                setRecommendedSelected(true);
                                                ReactGA.event({
                                                    category: "pets_interaction",
                                                    action: `load_custom_preset`,
                                                    label: selected_mode.target.value
                                                })


                                                switch (selected_mode.target.value) {
                                                    case 'None':
                                                        setCustomSelected(true);
                                                        return;
                                                    default:

                                                }

                                                setPriorityList(customPresets[selected_mode.target.value].priorityList);
                                                setPriorityMap(customPresets[selected_mode.target.value].priorityMap);
                                                let petWhiteListNew = {};
                                                for (const [key, value] of Object.entries(customPresets[selected_mode.target.value].petWhiteList)) {
                                                    if (!unlockedPetsMap[key]) {
                                                        petWhiteListNew[key] = { ID: key, name: petNames[key].name, mode: value.mode };
                                                    }
                                                    else {
                                                        petWhiteListNew[key] = { ...unlockedPetsMap[key], mode: value.mode };
                                                    }
                                                }

                                                setPetWhiteList(petWhiteListNew);
                                            }
                                        }
                                        defaultValue={' '}
                                    // value={petWhiteList[e.ID].mode}
                                    >
                                        {!customeSelected && (<option value="None">None</option>)}
                                        {Object.keys(customPresets).map((e) => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                                {/* Delete saved preset */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                    <div style={{ marginRight: '12px', marginLeft: '5px', width: '141px' }}>
                                        Delete preset
                                    </div>
                                    <select
                                        aria-label='Specify which custom preset to delete'
                                        style={{ width: '90px', marginLeft: '12px' }}
                                        onChange={
                                            (selected_mode) => {
                                                ReactGA.event({
                                                    category: "pets_interaction",
                                                    action: `delete_custom_preset`,
                                                    label: selected_mode.target.value
                                                })

                                                setCustomPresets((current_presets) => {
                                                    let newMap = { ...current_presets };
                                                    delete newMap[selected_mode.target.value];
                                                    return newMap;
                                                });
                                            }
                                        }
                                        value={'None'}
                                    >
                                        <option value="None">None</option>
                                        {Object.keys(customPresets).map((e) => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                            </div>


                            {/* Share/Load presets */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255, 0.07)',
                                padding: '6px',
                                marginTop: '12px',
                                borderRadius: '6px'
                            }}>
                                {/* header */}
                                <div
                                    style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: "6px" }}
                                >
                                    Share Presets
                                </div>
                                {/* import preset */}
                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <input type='text'
                                        aria-label='Enter a preset code to import it'
                                        onChange={(e) => {
                                            setLoadPreset(e.target.value);
                                        }}
                                        style={{
                                            width: '141px', marginRight: '12px'
                                        }}
                                    />
                                    <button disabled={loadPreset.trim().length === 0}
                                        onClick={(e) => {
                                            try {
                                                ReactGA.event({
                                                    category: "pets_interaction",
                                                    action: `imported_custom_preset`,
                                                })
                                                setRecommendedSelected(true);
                                                let importPresetObj = JSON.parse(loadPreset);
                                                setPriorityList(importPresetObj.priorityList);
                                                setPriorityMap(importPresetObj.priorityMap);

                                                let newPetWhiteList = {};
                                                for (const [key, value] of Object.entries(importPresetObj.petWhiteList)) {
                                                    if (!unlockedPetsMap[key]) {
                                                        newPetWhiteList[key] = { ID: key, name: petNames[key].name, mode: value.mode };
                                                    }
                                                    else {
                                                        newPetWhiteList[key] = { ...unlockedPetsMap[key], mode: value.mode };
                                                    }
                                                }

                                                setPetWhiteList(newPetWhiteList);
                                            }
                                            catch (err) {

                                            }

                                        }}
                                    >Import Preset</button>
                                </div>
                                {/* export preset */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }} >

                                    <button
                                        onClick={(e) => {
                                            ReactGA.event({
                                                category: "pets_interaction",
                                                action: `exported_custom_preset`,
                                            })

                                            let presetObj = {};
                                            let newPetWhiteList = {};

                                            for (const [key, value] of Object.entries(petWhiteList)) {
                                                newPetWhiteList[key] = { ID: key, mode: value.mode }
                                            }

                                            presetObj = {
                                                priorityList: priorityList,
                                                priorityMap: priorityMap,
                                                petWhiteList: newPetWhiteList
                                            };
                                            navigator.clipboard.writeText(JSON.stringify(presetObj));
                                        }}
                                    >Copy Current Preset to Clipboard</button>
                                </div>
                            </div>

                            {/* Miscellaneous settings */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255, 0.07)',
                                padding: '6px',
                                marginTop: '12px',
                                borderRadius: '6px'
                            }}>
                                {/* header */}
                                <div
                                    style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: "6px" }}
                                >
                                    Miscellaneous Settings
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }} >


                                    <div style={{}}>
                                        Use expedition pets
                                    </div>
                                    <div>
                                        <input
                                            aria-label='use selected pets from expedition page'
                                            type="checkbox"
                                            onChange={(e) => {
                                                setUseExpedition(e.target.checked ? true : false);
                                                if (statMode) {
                                                    setTimeout(() => {
                                                        setPriorityList(JSON.parse(JSON.stringify(statPriorityList)));
                                                        setPriorityMap(JSON.parse(JSON.stringify(statPriorityMap)));
                                                    }, 100);
                                                }
                                            }}
                                            checked={!!useExpedition}
                                            value={!!useExpedition}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>)}

                    {/* How To Use */}
                    <div className='teamBuilder importantText'
                        style={{
                            borderRadius: '6px',
                            border: `2px solid rgba(255,255,255,0.7)`,
                            margin: '12px 12px 12px 0',
                            maxHeight: 'calc(100% - 24px)',
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            flex: '1',
                            alignItems: 'flex-start',
                            backgroundColor: 'rgba(255,255,255, 0.05)',
                            padding: '6px',
                            minWidth: '260px'
                        }}>
                        <div
                            style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', width: '100%' }}
                        >
                            How To Use
                        </div>
                        <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                            {/* Priority List */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ minWidth: '130px', width: '130px', maxWidth: '130px', marginRight: '12px', fontSize: '20px' }}>
                                    Priority List:
                                </div>
                                <div>
                                    <div>

                                        If you are new, it is recommended to select one of the presets from `Recommended Presets`
                                    </div>
                                    <div>

                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Add any bonus to the priority list, bonuses at the top are weighed more than those below them.
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Setting a value to -1 means it will always reward pets for having this bonus
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Setting a value to 0 means this bonus is not rewarded at all
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Setting a value to x means this bonus is rewarded until x number of pets have this bonus, then the reward is 0
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Recommended Presets */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ minWidth: '130px', width: '130px', maxWidth: '130px', marginRight: '12px', fontSize: '20px' }}>
                                    Recommended Presets:
                                </div>
                                <div>

                                    <div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Main Team: This is the team you will run majority of your run
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Reinc. Team: This is the team you will run when you want to reincarnate - run for at least 1 hour before reincarnation to get pet levels up
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Gear Team: This is the team you will run when searching for new/better gear
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            Stat Team: This is the team you will run on the side for short bursts of time to cover any missing stats from the other 3 team presets
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Custom Presets */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ minWidth: '130px', width: '130px', maxWidth: '130px', marginRight: '12px', fontSize: '20px' }}>
                                    Custom Presets:
                                </div>
                                <div>
                                    <div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            You can save/load your own presets by entering a name and pressing `Save Current`.
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            To load preset in, select it from the drop down next to `Select saved preset`
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            To delete a preset, select it from the drop down next to `Delete preset`
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Share Presets */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ minWidth: '130px', width: '130px', maxWidth: '130px', marginRight: '12px', fontSize: '20px' }}>
                                    Share Presets:
                                </div>
                                <div>
                                    <div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            You can share/import other players presets
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            To share your preset, press `Copy Current Preset...` the value is automatically copied to your clipboard
                                        </div>
                                        <div style={{ margin: '6px 6px 6px 0' }}>
                                            {`To import someone elses preset, copy their shared value into the empty text box and press 'Import Preset'`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>


            </div >
        </div >
    )
}