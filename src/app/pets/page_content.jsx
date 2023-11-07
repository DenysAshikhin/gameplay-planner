"use client"

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import ComboListCSS from './comboList.css';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { petNameArray, BonusMap, petNames } from "../util/itemMapping.js";
import { StaticPetItem } from './PetItem.js';
import ReactGA from "react-ga4";
import helper from '../util/helper.js';
import petHelper from '../util/petHelper.js';
import SearchBox from '../util/search.jsx';

import { Reorder } from 'framer-motion'
import useLocalStorage from "use-local-storage";

import CrossIcon from '../../../public/images/icons/x_icon.svg';
import DragIcon from '../../../public/images/icons/drag_icon.svg';

import DefaultSave from '../util/tempSave.json';
import { mainTeamSuggestions, reincTeamSuggestions, gearTeamSuggestions, statTeamSuggestions } from './teamSuggestions.js';

import Image from 'next/image';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);


const bonusCutOff = 1000;

const comboBonuses = {
    5001: 'Spawn More Potatoes',
    5002: 'Fewer Potatoes Per Wave',
    5003: 'Potatoes Spawn Speed',
    5004: 'Minimum Item Rarity',
    5005: 'Base Residue',
    5006: 'Drop Bonus Cap',
    5007: 'Expedition Reward',
    5008: 'Combo Pet Damage',
    5009: 'Breeding Timer',
    5010: 'Milk Timer',
    5011: 'Attack Speed',
    5012: 'Whack Buff Timer',
    5013: 'Breeding and Milk Timer',
    5014: 'Faster Charge Tick',
    5015: 'Plant Growth Rate +10%',
    5016: 'Grasshopper Damage +25%',
};

function PetComboDisplay({ petCombos, unlockedPets, petMap }) {
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

                                    if (petId === -99) {
                                        let bigsad = -1;
                                    }

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

function populatePets(data, parameters) {
    let petList = {};
    let petBonusMap = {};

    let groundAllowed = parameters.ground;
    let airAllowed = parameters.air;
    let bannedPets = parameters.banned;


    for (let i = 0; i < data.PetsCollection.length; i++) {
        let pet = data.PetsCollection[i];
        if (pet.ID === 0) continue;

        pet.name = petNames[pet.ID].name;

        if (pet.Locked === 0) {
            continue;
        }
        else if (!groundAllowed && pet.Type === 1) {
            continue;
        }
        else if (!airAllowed && pet.Type === 2) {
            continue;
        }
        else if (bannedPets[pet.ID]) {
            continue;
        }

        petList[pet.ID] = pet;
        pet.BonusList.forEach((e) => {
            if (!petBonusMap[e.ID]) {
                petBonusMap[e.ID] = {};
            }
            petBonusMap[e.ID][pet.ID] = pet;
        })
    }
    return { petList, petBonusMap };
}

function calcCurrentBonuses(groundPets, airPets) {
    let currentBonuses = {};
    for (let i = 0; i < groundPets.length; i++) {
        let pet = groundPets[i];
        pet.BonusList.forEach((e) => {
            if (!currentBonuses[e.ID]) {
                currentBonuses[e.ID] = { ...e, count: 0, sum: 0 };
            }
            currentBonuses[e.ID].count++;
            currentBonuses[e.ID].sum += petHelper.calcEquipBonus(pet, e);

        })
    }
    for (let i = 0; i < airPets.length; i++) {
        let pet = airPets[i];
        pet.BonusList.forEach((e) => {
            if (!currentBonuses[e.ID]) {
                currentBonuses[e.ID] = { ...e, count: 0, sum: 0 };
            }
            currentBonuses[e.ID].count++;
            currentBonuses[e.ID].sum += petHelper.calcEquipBonus(pet, e);
        })
    }
    return currentBonuses;
}

function listItem(e) {
    return (
        <div style={{ margin: '6px', border: '1px solid gray' }}>
            <div>
                <div className="dragHandle" style={{ margin: '3px', background: 'green' }} >
                    X
                </div>
            </div>
            {e.item.label}
        </div>
    )
}

function findBestTeam(data, parameters) {

    let res;
    let petList = {};
    let petBonusMap = {};
    let currentBonuses = {};
    let bannedPets = {};

    let groundPets = [];
    const groundLimit = data.SlotGround;
    let airPets = [];
    const airLimit = data.SlotAir;

    let priorities = parameters.priorityList ? parameters.priorityList : [];
    let priorityMap = parameters.priorityMap ? parameters.priorityMap : [];
    let petWhiteList = parameters.petWhiteList ? parameters.petWhiteList : {};
    let tempArr = [];//
    for (let i = 0; i < priorities.length; i++) {
        let curr = priorities[i];
        tempArr.push({ ...priorityMap[curr], selectedPets: [] });
    }
    priorities = tempArr;

    // NOTE need to add counter for bonuses as well!!!
    for (const [key, value] of Object.entries(petWhiteList)) {
        if (value.mode === 'include') {
            if (value.Type === 1 && groundPets.length < groundLimit) {
                groundPets.push(value);
            }
            else if (value.Type === 2 && airPets.length < airLimit) {
                airPets.push(value)
            }

            for (let j = 0; j < value.BonusList.length; j++) {
                let found = priorities.find((cur_pri) => cur_pri.id === value.BonusList[j].ID);
                if (found) {
                    found.current++;
                }
            }

        }
        bannedPets[value.ID] = value;
    }


    res = populatePets(data, { ground: groundPets.length < groundLimit, air: airPets.length < airLimit, banned: bannedPets });
    petList = res.petList;
    petBonusMap = res.petBonusMap;
    currentBonuses = calcCurrentBonuses(groundPets, airPets);//s

    let selectedPetMap = {};
    for (let i = 0; i < priorities.length; i++) {
        selectedPetMap[priorities[i].id] = [];
    }


    while ((groundPets.length < groundLimit || airPets.length < airLimit) && Object.values(petList).length > 0) {

        // let currentPriority = priorities.shift();sssssssss

        let pets = [];
        let scoreTick = 1 / priorities.length;

        let scoreMode = 'unique';//unique || priorities
        let ignoreStat = {};

        for (let j = 0; j < priorities.length; j++) {

            if (priorities[j].count === 0 || (priorities[j].count === priorities[j].current)) {
                ignoreStat[priorities[j].id] = priorities[j];
            }
            else if ((priorities[j].count > priorities[j].current) || (priorities[j].count === -1)) {

                scoreMode = 'priorities';
            }
        }

        for (const [ID, value] of Object.entries(petList)) {
            let pet = { ...value, score: 0, bonuses: [], sharedBonuses: [] };
            if (bannedPets[ID]) {
                continue;
            }

            pet.BonusList.forEach((e) => {

                if (ignoreStat[e.ID] || (e.ID >= 1000)) {
                    return;
                }

                if (scoreMode === 'priorities') {
                    let found = false;

                    for (let j = 0; j < priorities.length; j++) {

                        if (priorities[j].id === e.ID && (priorities[j].count > priorities[j].current || priorities[j].count === -1)) {

                            found = true;
                            pet.bonuses.push(priorities[j]);

                            pet.score += scoreTick * (priorities.length - j);
                            break;
                        }
                    }

                    if (!found) {
                        if (currentBonuses[e.ID]) {
                            pet.score += (scoreTick / (10 * (currentBonuses[e.ID].count + 1)));
                        }
                        else {
                            pet.score += (scoreTick / 10);
                        }
                    }
                }
                //Search for uniques!
                else {
                    if (ignoreStat[e.ID] || e.ID >= 1000) {

                    }
                    else if (currentBonuses[e.ID]) {
                        pet.score += ((0.01) / (currentBonuses[e.ID].count + 1));
                        pet.sharedBonuses.push(BonusMap[e.ID]);
                    }
                    else {
                        pet.score += 1;
                        pet.bonuses.push(BonusMap[e.ID]);
                    }
                }
            });
            pet.score = helper.roundFiveDecimal(pet.score);
            pets.push(pet);
        }


        pets.sort((a, b) => {
            let diff = b.score - a.score;

            if (diff === 0) {
                diff = b.Rank - a.Rank;

                let diff_abs = Math.abs(diff);
                let max = b.Rank > a.Rank ? b.Rank : a.Rank;

                if ((diff_abs / max) <= 0.1) {
                    return b.Level - a.Level;
                }

                if (diff === 0) {
                    diff = b.Level - a.Level;
                }
            }
            return diff
        });
        let bestPet = pets[0];


        //Add pet counters to each priority bonus:
        for (let j = 0; j < bestPet.BonusList.length; j++) {
            let found = priorities.find((cur_pri) => cur_pri.id === bestPet.BonusList[j].ID);
            if (found) {
                found.current++;
            }
        }

        if (bestPet.Type === 1) {
            groundPets.push(bestPet);
        }
        else {
            airPets.push(bestPet);
        }
        bannedPets[bestPet.ID] = bestPet;

        res = populatePets(data, { ground: groundPets.length < groundLimit, air: airPets.length < airLimit, banned: bannedPets });
        petList = res.petList;
        petBonusMap = res.petBonusMap;
        currentBonuses = calcCurrentBonuses(groundPets, airPets);
    }



    let numBonuses = 0;
    for (const [key, value] of Object.entries(currentBonuses)) {
        numBonuses++;
        value.label = BonusMap[key].label;
    }

    return [airPets, groundPets, currentBonuses, selectedPetMap];
}

export default function Pets() {


    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


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
    const [exportPreset, setExportPreset] = useState('');

    // useEffect(() => {


    //     // setTimeout(() => {
    //     //     ReactGA.send({ hitType: "pageview", page: "/pets_", title: "_Pet Combos Page" });
    //     // }, 500);

    // }, []);

    const comboList = data.PetsSpecial;

    let airPets, groundPets, currentBonuses, selectedPetMap;
    [airPets, groundPets, currentBonuses, selectedPetMap] = useMemo(() => {
        return findBestTeam(data, { priorityList: priorityList, priorityMap: priorityMap, petWhiteList: petWhiteList })
    },
        [data, priorityList, priorityMap, petWhiteList]
    );


    let specialCombos = {};
    let partialCombos = {};

    comboList.forEach((combo, index) => {
        if (index === 0) return;

        let matched = true;
        let required = 0;
        let partial = 0;

        if (combo.BonusID === 5009) {
            let bigsad = -1;
        }

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

    let searchList = [];
    for (const [key, value] of Object.entries(BonusMap)) {

        if (value.id >= bonusCutOff || priorityMap[key]) {
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
                            backgroundColor: 'rgba(255,255,255, 0.05)'
                        }}>

                        {/* List Table */}
                        <div
                            style={{ alignSelf: 'flex-start', minWidth: '600px' }}
                        >
                            {/* Priority List */}
                            <div
                                style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}
                            >
                                Priority List
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>

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
                                            aria-label='Select a default team preset'
                                            style={{ maxWidth: '144px', marginLeft: '12px' }}
                                            onChange={
                                                (selected_mode) => {
                                                    setRecommendedSelected(true);
                                                    ReactGA.event({
                                                        category: "pets_interaction",
                                                        action: `selected_recommended_team`,
                                                        label: selected_mode.target.value
                                                    })
                                                    switch (selected_mode.target.value) {
                                                        case 'Main Team':
                                                            setPriorityList(mainTeamSuggestions[data.AscensionCount].priorityList)
                                                            setPriorityMap(mainTeamSuggestions[data.AscensionCount].priorityMap);
                                                            break;
                                                        case 'Reinc. Team':
                                                            setPriorityList(reincTeamSuggestions[data.AscensionCount].priorityList)
                                                            setPriorityMap(reincTeamSuggestions[data.AscensionCount].priorityMap);
                                                            break;
                                                        case 'Gear Team':
                                                            setPriorityList(gearTeamSuggestions[data.AscensionCount].priorityList)
                                                            setPriorityMap(gearTeamSuggestions[data.AscensionCount].priorityMap);
                                                            break;
                                                        case 'Stat Team':
                                                            setPriorityList(statTeamSuggestions[data.AscensionCount].priorityList)
                                                            setPriorityMap(statTeamSuggestions[data.AscensionCount].priorityMap);
                                                            break;
                                                        case 'None':
                                                            setRecommendedSelected(true);
                                                            break;
                                                        default:

                                                    }
                                                }
                                            }
                                            defaultValue={' '}
                                        // value={petWhiteList[e.ID].mode}
                                        >
                                            {!recommendedSelected && (<option value="None">None</option>)}
                                            <option value="Main Team">Main Team</option>
                                            <option value="Reinc. Team">Reinc. Team</option>
                                            <option value="Gear Team">Gear Team</option>
                                            {data.AscensionCount >= 5 && (
                                                <option value="Stat Team">Stat Team</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* List of priorities */}
                            <div style={{
                                display: 'flex', flex: '1',
                                border: '1px solid gray',
                                margin: '6px', justifyContent: 'center', padding: '6px 0',
                                backgroundColor: 'rgba(255,255,255, 0.04)',
                                borderRadius: '6px',
                                maxHeight: '35vh',
                                paddingLeft: '6px'
                            }}>

                                <Reorder.Group
                                    axis="y"
                                    values={priorityList}
                                    // layoutScroll
                                    // style={{ overflowY: "scroll" }}
                                    onReorder={setPriorityList
                                        //     (newList) => {

                                        //     for (let i = 0; i < newList.length; i++) {
                                        //         if (newList[i] !== priorityList[i]) {
                                        //             return setPriorityList(newList)
                                        //         }
                                        //     }
                                        // }sss
                                    }>
                                    {priorityList.map((item, index) => {
                                        let bigsad = -12;
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
                                                        margin: '3px',
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
                                                        {/* <img 
                                                        className='drag noPointerEvents' 
                                                        src={DragIcon} 
                                                        style={{ height: '24px', marginLeft: '3px' }} 
                                                        alt='hand in a fist with index poting at a vertical line with arrows on both ends' 
                                                        /> */}

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
                                margin: '6px', padding: '6px 0',
                                backgroundColor: 'rgba(255,255,255, 0.04)',
                                borderRadius: '6px',
                                padding: '12px 0',
                                maxHeight: '35vh',
                                overflow: 'auto',
                            }}>

                                {Object.values(petWhiteList).map((e, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex', flexDirection: 'column',
                                            width: '200px', height: '60px',
                                            backgroundColor: 'rgba(255,255,255, 0.07)',
                                            borderRadius: '6px',
                                            margin: '6px 0'
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
                                                    <div style={{ color: color,}}>
                                                        {e.sum.toExponential(2) + '%'}
                                                    </div>
                                                    <div style={{ color: color, marginLeft:'6px' }}>
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
                                                        borderRadius: '6px'
                                                    }}
                                                >
                                                    <StaticPetItem petData={{ ...staticPetData, pet: petMap[e.ID] }} />
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
                                                        borderRadius: '6px'
                                                    }}
                                                >

                                                    <StaticPetItem petData={{ ...staticPetData, pet: petMap[e.ID] }} />

                                                </div>
                                            );
                                        }, [])}
                                    </div>
                                </div>
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
                                <div style={{ minWidth: '115px', width: '115px', maxWidth: '115px', marginRight: '12px', fontSize: '20px' }}>
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
                                <div style={{ minWidth: '115px', width: '115px', maxWidth: '115px', marginRight: '12px', fontSize: '20px' }}>
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
                                <div style={{ minWidth: '115px', width: '115px', maxWidth: '115px', marginRight: '12px', fontSize: '20px' }}>
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
                                <div style={{ minWidth: '115px', width: '115px', maxWidth: '115px', marginRight: '12px', fontSize: '20px' }}>
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