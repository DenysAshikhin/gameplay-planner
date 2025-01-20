"use client"

import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import useLocalStorage from "use-local-storage";

import { isMobile } from 'mobile-device-detect';
import './JSONDisplay.css'; // Add this line to import the CSS file
import { BonusMap, petNameArray, petNames, getPet, DefaultWeightMap } from '../util/itemMapping';
import PetItemCoin from './PetItemCoin';
import ItemSelection from "../util/ItemSelection copy";
import MouseOverPopover from "../util/Tooltip";

import helper from '../util/helper';
import mathHelper from '../util/math';
import xIcon from "@images/icons/x_icon.svg"
import pinIcon from "@images/icons/pin-line-icon.svg"
import trashIcon from "@images/icons/trash-can-icon.svg"
import infoIcon from '@images/icons/info.svg';
import infoIconRedThick from '@images/icons/info_red_thick.svg';
import infoIconGreenThick from '@images/icons/info_green_thick.svg';
import infoIconAmber from '@images/icons/info_amber.svg';
import rankExplain from "@images/rank_explain.png"
import missing from "@images/pets/missing.png"

import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import SearchBox from '../util/search';
import petHelper from '../util/petHelper';
import DefaultSave from '../util/tempSave.json';
import {
    mainTeamSuggestions, reincTeamSuggestions, gearTeamSuggestions,
    // statTeamSuggestions,
    maxKey
} from '../pets/teamSuggestions';

ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);
let groupCache = {};
function setGroupCache(newCache) {
    groupCache = newCache;
}

const defaultPetSelection = petNameArray.map(petData => petData.petId);

function ScoreSection({ data, group, totalScore, defaultRank }) {
    const { baseGroupScore, groupScoreMax, dmgCount, timeCount, synergyBonus, groupScore, groupRankScore } = petHelper.calculateGroupScore(group, defaultRank);
    const score = groupRankScore;
    // const displayedDamage = (score * 5 * data.PetDamageBonuses).toExponential(2);
    const displayedDamage = helper.formatNumberString(mathHelper.multiplyDecimal(data.petDamageBD, score * 5));
    return (
        <>
            <ul>
                {/* <li key="totalScore">
                    {`True Damage: ${(5 * groupScoreMax * Number(data?.PetDamageBonuses)).toExponential(2)}`}
                </li> */}
                <li key="totalScore">
                    {`Per Rank Damage: ${displayedDamage}`}
                </li>
                <li key="baseGroupScore">
                    Group Base: {helper.formatNumberString(Number(baseGroupScore))}
                </li>
                <li key="damageBonus">
                    Dmg Bonus: {helper.formatNumberString(Number(1 + dmgCount * petHelper.EXP_DMG_MOD))}x
                </li>
                <li key="timeBonus">
                    Time Bonus: {helper.formatNumberString(Number(1 + timeCount * petHelper.EXP_TIME_MOD))}x
                </li>
                <li key="synergyBonus">
                    Synergy: {helper.formatNumberString(Number(synergyBonus))}x
                </li>
                <li key="petDamageBonus">
                    {/* PetDmgMod: {Number(data?.PetDamageBonuses).toExponential(2)} */}
                    PetDmgMod: {helper.formatNumberString(data?.petDamageBD)}
                </li>
            </ul>
        </>
    );
}



import Head from 'next/head';


export default function Expeditions() {


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

    const [petDamageBD, setpetDamageBD] = useState(mathHelper.createDecimal(1));
    (data as any).petDamageBD = petDamageBD;

    const [petWhiteList, setPetWhiteListRunTime] = useState([]);
    const [petWhiteListClient, setPetWhiteList] = useLocalStorage("petWhiteList", []);
    useEffect(() => {

        let petWhiteListClientTemp = [];
        let foundOld = false;
        for (const [key, value] of Object.entries(petWhiteListClient)) {
            if (value.placement === 'rel') {
                foundOld = true;
            }
            else {
                petWhiteListClientTemp.push(value);
            }
        }
        if (foundOld) {
            setPetWhiteList(petWhiteListClientTemp);
        }
        setPetWhiteListRunTime(petWhiteListClientTemp);
    }, [petWhiteListClient, setPetWhiteList]);

    const [manualEnabledPetsLoaded, setManualEnabledPetsLoaded] = useState(false);
    const [manualEnabledPets, setManualEnabledPetsRunTime] = useState({});
    const [manualEnabledPetsClient, setManualEnabledPets] = useLocalStorage("manualEnabledPets", {});
    useEffect(() => {
        setManualEnabledPetsLoaded(true);
        setManualEnabledPetsRunTime(manualEnabledPetsClient);
    }, [manualEnabledPetsClient])


    const [clientUsePromos, setUsePromos] = useLocalStorage('usePromos', false);
    const [usePromos, setRunTimeUsePromos] = useState(false);
    useEffect(() => {
        setRunTimeUsePromos(clientUsePromos);
    }, [clientUsePromos]);

    const [clientMaxTopStat, setMaxTopStat] = useLocalStorage('maxTopStat', false);
    const [maxTopStat, setRunTimeMaxTopStat] = useState(false);
    useEffect(() => {
        setRunTimeMaxTopStat(clientMaxTopStat);
    }, [clientMaxTopStat]);

    const [clientIgnorePetRanks, setIgnorePetRanks] = useLocalStorage('ignorePetRanksPets', false);
    const [ignorePetRanks, setRunTimeIgnorePetRanks] = useState(false);
    useEffect(() => {
        setRunTimeIgnorePetRanks(clientIgnorePetRanks);
    }, [clientIgnorePetRanks]);

    const [clientEqualisePets, setEqualisePets] = useLocalStorage('clientEqualisePets', false);
    const [equalisePets, setRunTimeEqualisePets] = useState(false);
    useEffect(() => {
        setRunTimeEqualisePets(clientEqualisePets);
    }, [clientEqualisePets]);

    const [enabledBonusHighlight, setEnabledBonusHighlightRunTime] = useState({});
    const [enabledBonusHighlightClient, setEnabledBonusHighlight] = useLocalStorage("enabledBonusHighlight", {});
    useEffect(() => {
        setEnabledBonusHighlightRunTime(enabledBonusHighlightClient);
    }, [enabledBonusHighlightClient]);

    const [showAllBonusTally, setShowAllBonusTallyRunTime] = useState(false);
    const [showAllBonusTallyClient, setShowAllBonusTally] = useLocalStorage("showAllBonusTally", false);
    useEffect(() => {
        setShowAllBonusTallyRunTime(showAllBonusTallyClient);
    }, [showAllBonusTallyClient]);

    const [leftOverBonus1, setLeftOverBonus1RunTime] = useState(1016);
    const [leftOverBonus1Client, setLeftOverBonus1] = useLocalStorage("leftOverBonus1", 1016);
    useEffect(() => {
        setLeftOverBonus1RunTime(leftOverBonus1Client);
    }, [leftOverBonus1Client]);

    const [hideLocked, setHideLockedRunTime] = useState(false);
    const [hideLockedClient, setHideLocked] = useLocalStorage("hideLocked", false);
    useEffect(() => {
        setHideLockedRunTime(hideLockedClient);
    }, [hideLockedClient]);

    const [activeCustomBonuses, setActiveCustomBonusesRunTime] = useState([]);
    const [activeCustomBonusesClient, setActiveCustomBonuses] = useLocalStorage("activeCustomBonuses", []);
    useEffect(() => {
        setActiveCustomBonusesRunTime(activeCustomBonusesClient);
    }, [activeCustomBonusesClient]);

    const [groupRankCritera, setGroupRankCriteriaRunTime] = useState(1);//1 = overall damage + modifiers, 2 = token/hr + (damage and modifiers), 3 = advanced/custom
    const [groupRankCriteraClient, setGroupRankCriteria] = useLocalStorage("groupRankCriteria", 1);
    useEffect(() => {
        setGroupRankCriteriaRunTime(groupRankCriteraClient);
    }, [groupRankCriteraClient]);

    const [defaultRank, setDefaultRankRunTime] = useState(1);
    const [defaultRankClient, setDefaultRank] = useLocalStorage("defaultRank", 1);
    useEffect(() => {
        setDefaultRankRunTime(defaultRankClient);
    }, [defaultRankClient]);

    const [comboSelector, setComboSelectorRunTime] = useState(1);
    const [comboSelectorClient, setComboSelector] = useLocalStorage("comboSelector", 1);
    useEffect(() => {
        setComboSelectorRunTime(comboSelectorClient);
    }, [comboSelectorClient]);

    const [numTeams, setNumTeamsRunTime] = useState(1);
    const [numTeamsClient, setNumTeams] = useLocalStorage("numTeams", 1);
    useEffect(() => {
        setNumTeamsRunTime(numTeamsClient);
    }, [numTeamsClient]);


    const [groupsCacheRunTime, setGroupsCacheRunTime] = useState({});
    const [groupsCacheClient, setGroupsCache] = useLocalStorage("groupsCache", {});
    useEffect(() => {
        setGroupsCacheRunTime(groupsCacheClient);
    }, [groupsCacheClient]);


    const tokenSelections = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
    const [hoveredBonus, setHoveredBonus] = useState(0);
    const [activePet, setActivePet] = useState(-1);
    const [groups, setGroups] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);
    const [failedFilters, setFailedFilters] = useState([]);
    const [originalPets, setOriginalPets] = useState([]);
    const [refreshGroups, setRefreshGroups] = useState(false);
    const [weightMap, setWeightMap] = useState(DefaultWeightMap);
    const [selectedItems, setSelectedItems] = useState(defaultPetSelection);
    const [tokenDamageBias, setTokenDamageBias] = useState(15);
    const [recommendedSelected, setRecommendedSelected] = useState(false);
    const [defaultSpecialCombo, setDefaultSpecialCombo] = useState(1.0);

    const includeLocked = false;

    useEffect(() => {
        let recalculate = true;

        setRefreshGroups(false);
        console.log(`handle groups called`)
        const petData = data?.PetsCollection || [];
        if (petData.length === 0) return null;
        const selectedItemsById = petData.reduce((accum, item) => {
            accum[parseInt(item.ID as any, 10)] = item;
            return accum;
        }, {})


        const localPets = selectedItems.filter((e) => e < 9999).map(petId => selectedItemsById[petId]);
        const keyString = selectedItems.sort().join(',');
        let groups = groupCache[keyString];
        if (groups && !recalculate) {
            setGroups(groups);
        } else {
            groups = petHelper.findBestGroups(
                localPets,
                defaultRank,
                groupRankCritera,
                numTeams === -1 ? data.ExpeditionLimit : numTeams,
                {
                    tokenDamageBias: tokenDamageBias,
                    activeBonuses: activeCustomBonuses,
                    setFailedFilters: setFailedFilters,
                    petWhiteList: petWhiteList,
                    usePromos: usePromos,
                    maxTopStat: maxTopStat,
                    ignorePetRanks: ignorePetRanks,
                    equalisePets: equalisePets,
                }
            );
            setGroupCache({ ...groupCache, [keyString]: groups })
            setGroups(groups);
            let groupCacheMap = {};
            groups.forEach((inner_group) => {
                inner_group.forEach((group_pet) => {

                    let finalPet = JSON.parse(JSON.stringify(group_pet));
                    finalPet.name = petNames[finalPet.ID] ? petNames[finalPet.ID].name : petNames[9999].name;
                    groupCacheMap[group_pet.ID] = finalPet;

                });
            });
            setGroupsCache(groupCacheMap);
        }
    }, [setGroupsCache, activeCustomBonuses, defaultRank, groupRankCritera, numTeams, petWhiteList, tokenDamageBias, refreshGroups, data, selectedItems, usePromos, maxTopStat, equalisePets, ignorePetRanks])


    const dataLoaded = useRef(false);

    useEffect(() => {


        if (dataLoaded.current === false && manualEnabledPetsLoaded) {

            dataLoaded.current = true;
            let uploadedData = clientData;
            uploadedData.PetDamageBonuses = mathHelper.createDecimal(uploadedData.PetDamageBonusesBD) as any;
            (clientData as any).petDamageBD = uploadedData.PetDamageBonuses;
            setpetDamageBD(uploadedData.PetDamageBonuses as any);

            let specialPetCombo = 1;
            for (let i = 0; i < uploadedData.PetsSpecial.length; i++) {
                let t = uploadedData.PetsSpecial[i];
                if (t.BonusID === 5007 && t.Active === 1) {
                    specialPetCombo += t.BonusPower / 100;
                }
            }
            specialPetCombo = helper.roundThreeDecimal(specialPetCombo);

            setComboSelector(specialPetCombo);
            setDefaultSpecialCombo(specialPetCombo);

            if (numTeams === -1) {
                setNumTeams(uploadedData.ExpeditionLimit);
            }
            setGroupCache({});

            uploadedData.PetsCollection.sort((a, b) => a.ID - b.ID);

            let tempPets = [];
            let origPets = [];
            const positiveRankedPets = uploadedData.PetsCollection.filter(
                (pet) => {
                    const isValidLocked = includeLocked ? true : !!pet.Locked;
                    if (isValidLocked) {
                        origPets.push(pet);
                    }
                    //If set to 0, we manually want this pet disabled
                    if ((isValidLocked && manualEnabledPets[pet.ID] !== 0) || manualEnabledPets[pet.ID] === 1) {
                        tempPets.push(pet);
                        return true;
                    }
                    return false;
                    // return isValidRank && isValidLocked;
                }
            ).map((pet) => pet.ID);
            setSelectedItems(positiveRankedPets);
            setOriginalPets(origPets);
            setSelectedPets(tempPets);

            setRefreshGroups(true);

            setRunTimeData(clientData);
        }
    }, [manualEnabledPets, manualEnabledPetsLoaded, clientData, includeLocked, numTeams, setComboSelector, setData, setNumTeams]);


    useEffect(() => {
        setRefreshGroups(true)
    }, [defaultRank, comboSelector, groupRankCritera, numTeams, tokenDamageBias, activeCustomBonuses,])


    let whiteListAlertText = '';

    let totalTokensHR = 0;
    let damageTotal = mathHelper.createDecimal(0);

    let bonusTotals = {
        // 1001: 0, //potatoe gain
        // 1002: 0, //class exp gain
        // 1003: 0, //skull gain
        1009: 0, // residue gain
        1010: 0, //card power gain
        1011: 0, // expedition reward
        1012: 0, //dungeon time gain
        1013: 0, //dungeon damage
        1014: 0, //card exp
        1015: 0, //reinc pts gain
        1016: 0 // token gain
    };
    let bonusPets = {};
    let totalMessages = [];

    let relWhiteListMap = {};

    let filterablePets = [];
    let equippedPets = {};
    let whitelistedPets = {};


    const maxPets = 4;
    const maxType = 2 * numTeams;
    const manualGroups = {};
    let numGround = 0;
    let numAir = 0;

    for (let i = 0; i < petWhiteList.length; i++) {
        let cur = petWhiteList[i];
        let inner_pet = cur.pet;

        if (cur.placement === 'blacklist') {
            continue;
        }
        if (inner_pet.Type === 1) {
            numGround++;
        }
        else {
            numAir++;
        }

        // used to show which group it got sorted into
        if (cur.placement === `auto`) {
            relWhiteListMap[cur.id] = { ...cur };
        }
        else if (cur.placement === 'team') {

            if (!manualGroups[cur.parameters.team]) {
                manualGroups[cur.parameters.team] = [];
            }
            manualGroups[cur.parameters.team].push(inner_pet);
            if (manualGroups[cur.parameters.team].length > maxPets) {
                whiteListAlertText = `Group ${cur.parameters.team + 1} has too many pets!`;
            }

            if (whiteListAlertText.length === 0) {

                let airy = 0;
                let groundy = 0;
                manualGroups[cur.parameters.team].forEach((manual_pet) => {
                    if (manual_pet.Type === 1) {
                        groundy++;
                    }
                    else {
                        airy++;
                    }
                });
                if (airy > (maxPets / 2)) {
                    whiteListAlertText = `Group ${cur.parameters.team} has too many air pets!`;
                }
                else if (airy > (maxPets / 2)) {
                    whiteListAlertText = `Group ${cur.parameters.team} has too many ground pets!`;
                }
            }
        }
    }

    if (whiteListAlertText.length === 0) {
        if (numAir > maxType) {
            whiteListAlertText = `There are too many air pets!`;
        }
        else if (numGround > maxType) {
            whiteListAlertText = `There are too many ground pets!`;
        }
    }

    const finalTokenBonus = data.ExpeditionTokenBonuses * data.ExpeditionResourceBonuses * comboSelector / defaultSpecialCombo;

    // if (groups && groupRankCritera === 2)
    if (groups.length > 0)
        groups.map((group, index) => {
            // damageTotal += (petHelper.calculateGroupScore(group, defaultRank).groupScore) * 5 * data.PetDamageBonuses;
            damageTotal = mathHelper.addDecimal(damageTotal, mathHelper.multiplyDecimal(petDamageBD, petHelper.calculateGroupScore(group, 0).groupScore * 5));
            group.forEach((pet) => {

                if (!equippedPets[pet.ID]) {
                    equippedPets[pet.ID] = pet;
                }

                if (pet.ID in relWhiteListMap) {
                    relWhiteListMap[pet.ID].finalGroup = index;
                }

                pet.BonusList.forEach((bon) => {
                    if (bon.ID in bonusTotals) bonusTotals[bon.ID]++;
                })
            })


            const groupBests = petHelper.calculateBestHours(
                group,
                null,
                {
                    clover: data.SoulGoldenClover,
                    residueToken: data.CowShopExpeditionToken,
                    data: data,
                    finalTokenBonus: finalTokenBonus
                },
                comboSelector
            )[tokenSelections[index]];
            // totalTokensHR += groupBests.tokenHR;
            // totalTokensHR += groupBests.totalTokens / groupBests.hours;
            totalTokensHR += groupBests.tokenHR / groupBests.hours;
        })

    if (selectedPets) {
        for (let i = 0; i < selectedPets.length; i++) {
            selectedPets[i].BonusList.forEach((bonus) => {
                if (!bonusPets[bonus.ID]) {
                    bonusPets[bonus.ID] = { total: 0, pets: [] }
                }
                bonusPets[bonus.ID].total++;
                bonusPets[bonus.ID].pets.push(selectedPets[i])
            })
        }
    }

    for (const [key, value] of Object.entries(bonusTotals)) {
        if (activeCustomBonuses.find((a) => a.id === Number(key)) || showAllBonusTally)
            totalMessages.push({ text: `${BonusMap[key].label}: ${value}/${bonusPets[key] ? bonusPets[key].total : 0} pets`, bonus: key })
    }


    if (groupRankCritera === 1) {
        selectedPets.map((pet) => {
            let found;
            try {

                //Awful way to do it, but need to check we haven't already added pet to table
                found = petWhiteList.find((a) => a.id === pet.ID);
            }
            catch (err) {
                console.log(err);
            }

            if (found) {

                if (!whitelistedPets[pet.ID]) {
                    whitelistedPets[pet.ID] = pet;
                }

                return;
            }
            if (pet.ID > 0)
                filterablePets.push({ id: pet.ID, label: getPet(pet.ID).name })

        })
    }

    const leftOverIgnore = {
        17: true,//attack speed
        30: true,//contagion hp damage
        27: true,//fries bonus
        19: true,//Pet LEVEL Exp
        // TODO: why duplicate properties?
        //18: true,//Pet Dmg
        20: true,//Pet Rank Exp
        //26: true,//Plant Final Prod
        32: true,//Plant Growth
        25: true,//Plant Manual Harvest
        26: true,//Plant Final Prod
        24: true,//Plant Rank Exp
        31: true,//Reinc Point Bonus
        //18: true,//Pet Dmg
        //18: true,//Pet Dmg
        //18: true,//Pet Dmg
        //18: true,//Pet Dmg
        18: true,//Pet Dmg
    }
    let leftOver1Pets = [];

    selectedPets.map((e, index) => {
        let found = e.BonusList.find((inner_bonus) => inner_bonus.ID === leftOverBonus1);
        if (found) {
            let tempy = { ...e };

            if (equippedPets[e.ID]) {
                tempy.equipped = true;
            }
            if (whitelistedPets[e.ID]) {
                tempy.whitelisted = true;
            }

            leftOver1Pets.push(tempy);
        }
    });

    const handleItemSelected = (items) => {
        setSelectedItems(items);

        const petData = data?.PetsCollection || [];
        let localPets = [];
        let enabledPets = {};

        for (let i = 0; i < items.length; i++) {
            localPets.push(petData[items[i]])
            enabledPets[items[i]] = 1;
        }

        setSelectedPets(localPets);
        setManualEnabledPets((curr_pets) => {

            let newEnabled = { ...curr_pets };

            //First check which ones should now be marked as 0 (disabled)
            for (const [key, value] of Object.entries(curr_pets)) {
                if (!enabledPets[key]) {
                    newEnabled[key] = 0;
                }
            }

            //Any others are now enabled
            for (const [key, value] of Object.entries(enabledPets)) {

                newEnabled[key] = 1;
            }

            //Go over previously selected pets, and if never logged them before, and are not tracked still, means they were disabled
            for (let i = 0; i < selectedItems.length; i++) {
                if (!newEnabled[selectedItems[i]]) {
                    newEnabled[selectedItems[i]] = 0;
                }
            }

            return newEnabled;
        });

        if (items) {
            setRefreshGroups(true);
        }
    };

    leftOver1Pets = leftOver1Pets.sort((a, b) => petHelper.calculatePetBaseDamage(b, defaultRank) - petHelper.calculatePetBaseDamage(a, defaultRank))

    let bonusesWithPets = {};
    data.PetsCollection.forEach((bonus_pet) => {
        bonus_pet.BonusList.forEach((pet_bonus_inner) => {
            bonusesWithPets[pet_bonus_inner.ID] = bonus_pet;
        })
    })

    let filterableBonuses = Object.values(BonusMap)
        .filter((e) => !!e && !leftOverIgnore[e.id] && !!bonusesWithPets[e.id])
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((inner_e) => {
            if (inner_e.id < 5000) {
                if (inner_e.id >= 1000 && !inner_e.label.includes(`Expedition`)) {
                    inner_e.label = `Expedition ` + inner_e.label;
                }
                return inner_e;
            }
        })


    let unlockedPetsMap = {};

    const positiveRankedPets = data.PetsCollection.filter(
        (pet) => {
            const isValidLocked = !!pet.Locked;
            return isValidLocked;
        }
    )

    for (let i = 0; i < positiveRankedPets.length; i++) {
        let cur = positiveRankedPets[i];
        unlockedPetsMap[cur.ID] = cur;
    }

    return (
        <div
            // className="grid-container"
            style={{
                // gridTemplateColumns: '4fr 4fr 2fr',
                // columnGap: '12px',
                width: 'calc(100% - 0px)',
                background: 'black',
                display: 'flex',
                overflow: 'auto'
            }}
        >

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            {/* Grid Left */}
            <div
                className='importantText'
                style={{
                    height: 'calc(100vh - 52px)',
                    border: '2px solid rgba(255,255,255,0.8)',
                    margin: '6px 12px 6px 6px',
                    padding: '0px 0 0px 0px',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    width: '33%',
                    minWidth: '283px',
                    maxWidth: '590px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '300px',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255, 0.05)',
                    }}
                >

                    {/* Title header */}
                    <div style={{ backgroundColor: 'rgba(255,255,255, 0.12)', }}>

                        <div
                            style={{
                                fontSize: '32px', fontWeight: 'bold', width: '100%', borderBottom: '0px solid rgba(255,255,255,0.8)',
                                textAlign: 'center'
                            }}>
                            Best Teams
                        </div>
                        <div style={{
                            display: 'flex', fontSize: '20px',
                            // fontWeight: 'bold',
                            borderTop: '2px solid rgba(255,255,255,0.8)',
                            borderBottom: '2px solid rgba(255,255,255,0.8)',
                            textAlign: 'center'
                        }}>
                            <div style={{ width: '50%', borderRight: '2px solid rgba(255,255,255,0.8)' }}>
                                {`Total Damage: ${helper.formatNumberString(damageTotal, 3)}`}
                            </div>
                            <div style={{ width: '50%' }}>
                                {`Total tokens/hr: ${helper.formatNumberString(helper.roundThreeDecimal(totalTokensHR), 3)}`}
                            </div>
                        </div>
                    </div>


                    {/* <div id='in_content_flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} /> */}



                    <div style={{ overflow: 'auto' }}>

                        {groups.reduce((accum, group, index) => {
                            let groupLabel = ``;

                            const groupTotal = petHelper.calculateGroupScore(group, defaultRank);
                            // let tokenScore = groupTotal.tokenMult * (Math.pow(1 + petHelper.SOUL_CLOVER_STEP, data.SoulGoldenClover)) * (1 + 0.05 * data.SoulGoldenClover) * comboSelector;s
                            // let tokenScore = groupTotal.tokenMult * (Math.pow(1 + petHelper.SOUL_CLOVER_STEP, data.SoulGoldenClover)) * comboSelector * data.ExpeditionTokenBonuses;
                            // tokenScore = tokenScore.toExponential(3);
                            let tempTokenScore = petHelper.calculateBestHours(group, null, {
                                clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data,
                                finalTokenBonus: finalTokenBonus
                            }, comboSelector)[tokenSelections[index]]
                            let tokenScore = helper.formatNumberString(tempTokenScore.tokenHR / tempTokenScore.hours, 3);
                            const score = groupTotal.groupScore;
                            // const displayedDamage = (score * 5 * data.PetDamageBonuses).toExponential(2);
                            const displayedDamage = helper.formatNumberString(mathHelper.multiplyDecimal(petDamageBD, groupTotal.groupRankScore * 5));
                            // const trueDamage = (5 * groupTotal.groupScoreMax * Number(data?.PetDamageBonuses)).toExponential(2);
                            const trueDamage = helper.formatNumberString(mathHelper.multiplyDecimal(petDamageBD, 5 * groupTotal.groupScoreMax));

                            let tokenInfo: ReturnType<typeof petHelper.calculateBestHours> | string = ``;

                            let groupLabelDamage = ``;
                            let groupLabelToken = ``;
                            let groupRankDamage = ``;

                            switch (groupRankCritera) {
                                case 1://damage
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupRankDamage = `Rank Dmg: ${displayedDamage}`
                                    groupLabelDamage = `Game Dmg: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, {
                                        clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data,
                                        finalTokenBonus: finalTokenBonus
                                    }, comboSelector);

                                    break;
                                case 2://token
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupLabelDamage = `Damage: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, {
                                        clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data,
                                        finalTokenBonus: finalTokenBonus
                                    }, comboSelector);
                                    break;
                                case 3://Advanced
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupLabelDamage = `Damage: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, {
                                        clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data,
                                        finalTokenBonus: finalTokenBonus
                                    }, comboSelector);
                                    break;
                                default:
                                    break;

                            }

                            // const totalScore = Number(Number(data?.PetDamageBonuses) * score * 5).toExponential(3);
                            const totalScore = helper.formatNumberString(mathHelper.multiplyDecimal(petDamageBD, score * 5), 3);
                            const groupTooltip = (
                                <div className="groups-tooltip">
                                    <span className="groups-tooltip-content">
                                        <h3>Group Score ({totalScore})</h3>
                                        <ScoreSection data={data} group={group} totalScore={totalScore} defaultRank={defaultRank} />
                                    </span>
                                </div>
                            );

                            let GroupTitle = <div
                                className="grid-row"
                                key={(1 + index) * 9001}
                                style={{
                                    backgroundColor: 'rgba(255,255,255, 0.12)',
                                }}
                            >
                                <div
                                    style={{ display: 'flex', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.8)' }}
                                >
                                    <div
                                        style={{ borderRight: '1px solid rgba(255,255,255,0.8)', width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {groupRankDamage}
                                    </div>


                                    <div
                                        style={{ width: '33%', borderRight: '1px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <div style={{ margin: '0 12px' }}>

                                            {groupLabelDamage}
                                        </div>
                                    </div>
                                    <div
                                        style={{ width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}
                                    >
                                        <div style={{ margin: '0 12px' }}>
                                            {groupLabelToken}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            let GroupIcons =
                                <div
                                    style={{
                                        display: 'flex', padding: '6px 6px 3px 6px',

                                        backgroundColor: 'rgba(255,255,255, 0.05)',
                                    }}
                                >
                                    {!!group && group.map((petData, idx) => {
                                        const { ID } = petData;
                                        // let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === ID)

                                        // if (!staticPetData) {
                                        //     staticPetData = {
                                        //         ...petNames[9999]
                                        //     }
                                        // }
                                        let staticPetData = getPet(ID);


                                        return (
                                            <div
                                                key={ID}
                                                style={{
                                                    position: 'relative',
                                                    display: 'flex',
                                                    // flex: '1',
                                                    width: 'calc(25% - 3px)',
                                                    height: 'auto',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <PetItemCoin
                                                    petData={staticPetData}
                                                    fullPetData={petData}
                                                    data={data}
                                                    isSelected={true}
                                                    onClick={() => { }}
                                                    weightMap={weightMap}
                                                    defaultRank={defaultRank}
                                                    borderActive={petData.BonusList.find((a) => a.ID === hoveredBonus) || ID === activePet}
                                                    enabledBonusHighlight={enabledBonusHighlight}
                                                />
                                                <div
                                                    className="hover"
                                                    style={{
                                                        position: 'absolute', top: '0', right: '0',
                                                    }}
                                                    onClick={(e) => {

                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];

                                                            let pet_inner = temp.find((sample_pet) => sample_pet.id === petData.ID);
                                                            if (!pet_inner) {
                                                                temp.push({ label: staticPetData.name, id: staticPetData.petId, placement: 'team', parameters: { team: index, damageBias: 17 }, pet: petData });
                                                            }
                                                            else {
                                                                pet_inner.placement = 'team';
                                                                pet_inner.parameters = { team: index };
                                                                pet_inner.pet = petData;
                                                            }
                                                            return temp;
                                                        })

                                                        setRefreshGroups(true);
                                                        return;
                                                    }}
                                                >
                                                    <div style={{ width: '20px', height: '20px', position: 'relative', zIndex: '2' }} >
                                                        <Image
                                                            fill
                                                            src={pinIcon}
                                                            alt='push pin'
                                                        />
                                                    </div>
                                                    {/* <img
                                                        alt='push pin'
                                                        style={{ width: '20px' }}
                                                        src={pinIcon}
                                                    /> */}
                                                </div>
                                                <div
                                                    className="hover"
                                                    style={{
                                                        position: 'absolute', bottom: '0', right: '0',
                                                    }}
                                                    onClick={(e) => {

                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];

                                                            let pet_inner = temp.find((sample_pet) => sample_pet.id === petData.ID);
                                                            if (!pet_inner) {
                                                                temp.push({
                                                                    label: staticPetData.name,
                                                                    id: staticPetData.petId,
                                                                    placement: 'blacklist',
                                                                    parameters: { team: 0, damageBias: 17 },
                                                                    pet: petData
                                                                });
                                                            }
                                                            else {
                                                                pet_inner.placement = 'blacklist';
                                                                pet_inner.parameters = { team: 0 }
                                                                pet_inner.pet = petData;
                                                            }

                                                            return temp;
                                                        })

                                                        setRefreshGroups(true);
                                                        return;

                                                    }}
                                                >
                                                    <div style={{ width: '20px', height: '20px', position: 'relative', zIndex: '2' }} >
                                                        <Image
                                                            src={trashIcon}
                                                            alt='trash can'
                                                            fill
                                                        />
                                                    </div>
                                                    {/* <img alt='trash can'
                                                        style={{ width: '20px' }}
                                                        src={trashIcon} /> */}
                                                </div>
                                            </div>

                                        );
                                    })}
                                </div>

                            let finalRow = <div
                                key={'group' + index}
                                style={{
                                    display: 'flex',
                                    // TODO: double border?
                                    //border: groupRankCritera === 2 && groupTotal.tokenRewardCount > 0 ? '1px black rgba(255,255,255,0.8)' : 'none',
                                    marginTop: index === 0 ? '16px' : '22px',
                                    marginLeft: '6px',
                                    marginRight: '6px',
                                    marginBottom: '12px',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                }}>
                                <div
                                    style={{ display: 'flex', backgroundColor: 'rgba(255,255,255, 0.12)', borderRight: `1px solid rgba(255,255,255,0.8)` }}
                                >
                                    <MouseOverPopover tooltip={groupTooltip} extraClasses={`maxHeight`}>
                                        <div
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2px' }}
                                        >
                                            <div style={{ fontSize: '20px' }}>
                                                {index + 1}
                                            </div>
                                            <div style={{ height: '18px', width: '18px', margin: '0 0 0 0', position: 'relative' }} >
                                                <Image
                                                    fill
                                                    src={infoIcon}
                                                    alt={`letter "I" in a circle, shows more information on hover`}
                                                />
                                            </div>
                                            {/* <img alt={`letter "I" in a circle, shows more information on hover`} style={{ height: '16px', margin: '0 0 0 6px' }} src={infoIcon} /> */}
                                        </div>
                                    </MouseOverPopover>
                                </div>
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
                                >
                                    {GroupTitle}
                                    {GroupIcons}
                                </div>
                            </div>
                            accum.push(finalRow);

                            return accum;
                        }, [])}
                    </div>
                </div>
            </div>

            {/* Grid Center */}
            <div
                className='importantText'
                style={{
                    border: '2px solid rgba(255,255,255,0.8)',
                    margin: '6px 12px 6px 6px',
                    maxHeight: 'calc(100vh - 46px)',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    width: '33%',
                    minWidth: '410px',
                    // maxWidth: '590px'
                }}>

                {/* Header */}
                <div style={{
                    display: 'flex', width: '100%', borderBottom: '2px solid  rgba(255,255,255,0.8)', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255, 0.12)',
                }}>

                    <div style={{ fontSize: '32px', fontWeight: 'bold', }}>
                        Configuration
                    </div>
                    <div style={{ height: '30px', alignSelf: 'center', marginLeft: '12px' }} >
                        <MouseOverPopover
                            opacity={1}
                            tooltip={
                                <div>
                                    {/* <img alt='screenshot of game text explaining how pet ranks work' src={rankExplain} style={{ height: '50px' }} /> */}
                                    <Image alt='screenshot of game text explaining how pet ranks work' src={rankExplain} style={{ height: '50px' }} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', minWidth: "90px" }}>Explanation/How To Use: </div>
                                        <div style={{ marginLeft: '12px', maxWidth: '724px' }}>
                                            Whitelist (make sure they are on an expedition team) any important pets (such as those that have item rating, reincarnation exp, residue) or ones that you have equipped
                                            often. The expedition ranks will make those pets level faster and give bigger bonuses when actively equipped </div>
                                    </div>
                                </div>
                            }
                        >
                            <div style={{ height: '30px', width: '30px', position: 'relative' }} >

                                <Image
                                    alt='Letter "I" inside a circle, shows more information on hover'
                                    src={infoIconAmber}
                                    fill
                                />
                            </div>
                            {/* <img alt='Letter "I" inside a circle, shows more information on hover' src={infoIconAmber} style={{ height: '30px' }} /> */}
                        </MouseOverPopover>
                    </div>
                </div>


                {/* Info Configs */}
                <div
                    style={{ padding: '6px 3px 1px 3px', overflow: 'auto', maxHeight: 'calc(100% - 45px)', overflowAnchor: 'none' }}
                >
                    <div style={{
                        display: 'flex',
                        // flexDirection: 'column',
                        backgroundColor: 'rgba(255,255,255, 0.05)',
                        margin: '6px 6px',
                        padding: '6px',
                        border: '1px solid rgba(255,255,255,0.8)', overflowAnchor: 'none'
                    }}>

                        <div style={{ marginRight: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <div>{`Ignore Pets Rank`}</div>
                                <input
                                    aria-label='Force pets to rank 1'
                                    type="checkbox"
                                    onChange={(e) => {
                                        setDefaultRank(e.target.checked ? 1 : 0)
                                    }}
                                    checked={!!defaultRank}
                                    value={!!defaultRank as any}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                                <div>
                                    {`Token Bonuses: ${helper.formatNumberString(helper.roundThreeDecimal(finalTokenBonus), 3)}`}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <MouseOverPopover tooltip={
                                    <div>
                                        Expedition reward from active pets special combo (0, 10%, 20%)
                                    </div>
                                }>
                                    <div style={{ marginRight: '12px' }}>
                                        Exp. Reward Combo
                                    </div>
                                </MouseOverPopover>
                                <select
                                    className='importantText'
                                    style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px' }}
                                    aria-label='Specify desired combo bonus'
                                    // disabled={refreshGroups}
                                    onChange={
                                        (e) => {
                                            setComboSelector(Number(e.target.value))
                                        }
                                    }
                                    // defaultValue={comboSelector + ''}
                                    value={comboSelector + ''}
                                >
                                    <option
                                        value="1">1.0</option>
                                    <option
                                        value="1.1">1.1</option>
                                    <option
                                        value="1.2">1.2</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                <div
                                    style={{
                                        marginRight: '12px'
                                    }}>
                                    Number of teams:
                                </div>
                                <input
                                    id='prepFormInput'
                                    className='importantText'
                                    style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px', fontSize: '14px' }}
                                    aria-label='Number of teams to calculate'
                                    type='number'
                                    value={numTeams}
                                    onChange={
                                        (e) => {
                                            try {
                                                let x = Number(e.target.value);
                                                x = Math.floor(x);
                                                if (x < 1 || (x > data.ExpeditionLimit + 1)) {
                                                    return;
                                                }
                                                setNumTeams(e.target.value as any);
                                            }
                                            catch (err) {
                                                console.log(err);
                                            }
                                            // console.log(`pressed: ${e.target.value}`)

                                        }}
                                    placeholder={numTeams + ''}
                                    min="1"
                                    max={`${data.ExpeditionLimit + 1}`}
                                />
                            </div>

                            {groupRankCritera === 1 && (
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>

                                    <div>{`Show all bonus totals`}</div>
                                    <input
                                        aria-label='Displays bonuses whose backgrounds can be coloured in'
                                        // disabled={refreshGroups}
                                        type="checkbox" onChange={(e) => {
                                            setShowAllBonusTally(e.target.checked ? true : false)
                                        }} />
                                </div>
                            )}
                        </div>
                        {/* <div id='in_content_flex' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} /> */}
                    </div>

                    {/* Card to toggle bonuses */}
                    {showAllBonusTally && (
                        <div style={{
                            display: 'flex', flexDirection: 'column',
                            backgroundColor: 'rgba(255,255,255, 0.05)',
                            margin: '6px 6px',
                            padding: '6px',
                            border: '1px solid rgba(255,255,255,0.8)',
                        }}>
                            <div
                                style={{
                                    margin: '6px 0 6px 0',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                {totalMessages.map((e, index) => {
                                    if (index % 2 !== 0 && index > 0) return;

                                    let firstDmgBias: any = Number(e.bonus);
                                    let secondDmgBias: any = (index + 1) < totalMessages.length ? Number(totalMessages[index + 1].bonus) : null;

                                    let firstFailMsg = failedFilters[e.bonus];
                                    let secondFailMsg = secondDmgBias ? failedFilters[totalMessages[index + 1].bonus] : null;

                                    if (firstFailMsg) {
                                        console.log(`aaa`)
                                    }

                                    activeCustomBonuses.forEach((active_bon) => {
                                        if (active_bon.placement !== 'rel') return null;
                                        // return;
                                        if (active_bon.id === firstDmgBias) {
                                            firstDmgBias = <div
                                                style={{
                                                    // margin: '6px 0 6px 0',
                                                    display: 'flex'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginRight: '12px'
                                                    }}
                                                >
                                                    {`damage bias`}
                                                </div>
                                                <input
                                                    aria-label='Damage bias to control when a pet should be put in'
                                                    type='number'
                                                    className='prepNumber'
                                                    value={active_bon.relThresh}
                                                    onChange={
                                                        (num) => {
                                                            try {
                                                                let x = Number(num.target.value);
                                                                x = Math.floor(x);
                                                                if (x < 0 || x > 100) {
                                                                    return;
                                                                };

                                                                setActiveCustomBonuses((bonuses) => {
                                                                    let newBonuses = [...bonuses];
                                                                    let bonus = newBonuses.find((a) => a.id === active_bon.id);
                                                                    bonus.relThresh = x;
                                                                    return newBonuses;
                                                                })
                                                            }
                                                            catch (err) {
                                                                console.log(err);
                                                            }
                                                        }}
                                                    placeholder={1 + ''}
                                                    min="0"
                                                    max="100"
                                                />
                                            </div>
                                        }
                                        if (active_bon.id === secondDmgBias) {
                                            secondDmgBias = <div
                                                style={{
                                                    // margin: '6px 0 6px 0',
                                                    display: 'flex'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginRight: '12px'
                                                    }}
                                                >
                                                    {`damage bias`}
                                                </div>
                                                <input
                                                    aria-label='Damage bias to control when a pet should be put in'
                                                    type='number'
                                                    className='prepNumber'
                                                    value={active_bon.relThresh}
                                                    onChange={
                                                        (num) => {
                                                            try {
                                                                let x = Number(num.target.value);
                                                                x = Math.floor(x);
                                                                if (x < 0 || x > 100) {
                                                                    return;
                                                                };

                                                                setActiveCustomBonuses((bonuses) => {
                                                                    let newBonuses = [...bonuses];
                                                                    let bonus = newBonuses.find((a) => a.id === active_bon.id);
                                                                    bonus.relThresh = x;
                                                                    return newBonuses;
                                                                })
                                                            }
                                                            catch (err) {
                                                                console.log(err);
                                                            }
                                                        }}
                                                    placeholder={1 + ''}
                                                    min="0"
                                                    max="100"
                                                />
                                            </div>
                                        }
                                    })

                                    return (
                                        <div
                                            key={e.bonus}
                                            style={{
                                                display: 'flex'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '50%'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        // margin: '6px 0 6px 0'
                                                        // color: helper.bonusColorMap[e.bonus].color
                                                    }}
                                                    onMouseEnter={(e_inner) => {
                                                        setHoveredBonus(Number(e.bonus))
                                                    }}
                                                    onMouseLeave={(e_inner) => {
                                                        setHoveredBonus(-1);
                                                    }}

                                                >
                                                    {totalMessages[index].text}
                                                    <div>
                                                        <div style={{ display: 'flex' }}>
                                                            <div>{`Enable highlight`}</div>
                                                            <input
                                                                aria-label={`Enables the highlight for this bonus`}
                                                                type="checkbox"
                                                                onChange={(e_inner) => {
                                                                    setEnabledBonusHighlight({ ...enabledBonusHighlight, [e.bonus]: e_inner.target.checked ? 1 : 0 })
                                                                }}
                                                                checked={enabledBonusHighlight[e.bonus]}
                                                            />
                                                            <div
                                                                style={{
                                                                    width: '24px',
                                                                    background: helper.bonusColorMap[e.bonus].color
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="dmgBias">
                                                        {isNaN(firstDmgBias) &&


                                                            <MouseOverPopover tooltip={
                                                                <div>
                                                                    <div>
                                                                        How aggressively to slot in these pets
                                                                    </div>
                                                                    <div>
                                                                        Higher value means these pets need to be stronger to considered, lower means smaller threshold to slot them in
                                                                    </div>
                                                                    <div>
                                                                        This is based on the best team at each step without these pets, vs with it.
                                                                    </div>
                                                                </div>
                                                            }>
                                                                {firstDmgBias}
                                                            </MouseOverPopover>



                                                        }
                                                    </div>
                                                    {!!firstFailMsg &&
                                                        <div
                                                            style={{ color: 'red' }}>
                                                            {firstFailMsg}
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                            {(index + 1 < totalMessages.length) && (
                                                <div
                                                    key={totalMessages[index + 1].bonus}
                                                    style={{
                                                        width: '50%'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            // margin: '6px 0 6px 0'
                                                        }}
                                                        onMouseEnter={(e_inner) => {
                                                            setHoveredBonus(Number(totalMessages[index + 1].bonus))
                                                        }}
                                                        onMouseLeave={(e_inner) => {
                                                            setHoveredBonus(-1);
                                                        }}
                                                    >
                                                        {totalMessages[index + 1].text}
                                                        <div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div>{`Enable highlight`}</div>
                                                                <input
                                                                    aria-label='Enables highlighting of pets with this bonus'
                                                                    type="checkbox"
                                                                    onChange={(e_inner) => {
                                                                        setEnabledBonusHighlight({ ...enabledBonusHighlight, [totalMessages[index + 1].bonus]: e_inner.target.checked ? 1 : 0 })
                                                                    }}
                                                                    checked={enabledBonusHighlight[totalMessages[index + 1].bonus]}
                                                                />
                                                                <div
                                                                    style={{
                                                                        width: '24px',
                                                                        background: helper.bonusColorMap[totalMessages[index + 1].bonus].color
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='dmgBias'>

                                                            {isNaN(secondDmgBias) && secondDmgBias}
                                                        </div>
                                                        {!!secondFailMsg &&
                                                            <div
                                                                style={{ color: 'red' }}>
                                                                {secondFailMsg}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Show Pet Whitelist */}
                    {groupRankCritera === 1 && (
                        <div
                            style={{
                                margin: '16px 6px',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1',
                                border: '1px solid rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255, 0.05)',
                                // padding: '6px 6px 6px 6px'
                            }}
                        >
                            <div style={{}}>
                                <div>
                                    <h4 style={{ margin: '6px', textAlign: 'center', fontSize: '20px' }}>Pet Whitelist</h4>
                                    <h4 style={{ margin: '6px', textAlign: 'center', fontSize: '20px', color: 'red' }}>{`${whiteListAlertText}`}</h4>
                                </div>
                                {/* Pet whitelist stuff */}
                                <div style={{ margin: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
                                    <SearchBox data={{
                                        list: filterablePets
                                    }}
                                        onSelect={(e) => {
                                            setPetWhiteList((curr) => {
                                                let temp = [...curr];
                                                let petObj = data.PetsCollection.find((search_pet) => search_pet.ID === e.id);
                                                temp.push({ ...e, placement: 'auto', parameters: { team: 0, damageBias: 17 }, pet: petObj });
                                                return temp;
                                            })
                                            setRefreshGroups(true);
                                        }}
                                    />
                                    <div style={{}}>
                                        <button 
                                            onClick={(e) => {
                                                setPetWhiteList([]);
                                        }}
                                        >Clear Whitelist</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                        <div
                                            style={{ display: 'flex', justifyContent: 'space-between' }}
                                        >
                                            <div
                                                style={{ marginRight: '6px' }}
                                            >
                                                Team Presets
                                            </div>
                                            <select
                                                className='importantText'
                                                style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px' }}
                                                aria-label='Select your in game teams to quickly add those pets to whitelist'
                                                onChange={
                                                    (e) => {

                                                        let selectedTeam = data.PetsLoadout[Number(e.target.value)];

                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];
                                                            // temp.push({ ...e, placement: 'blacklist', parameters: { team: 0, damageBias: 17 } });

                                                            for (let x = 0; x < selectedTeam.IDs.length; x++) {
                                                                let selected = selectedTeam.IDs[x];
                                                                if (selected > 0) {
                                                                    let base = {
                                                                        id: selected,
                                                                        label: petNames[selected].name,
                                                                        // placement: 'rel',
                                                                        placement: 'auto',
                                                                        parameters: { team: 0, damageBias: 17 },
                                                                        pet: data.PetsCollection.find((pet_search) => pet_search.ID === selected)
                                                                    }
                                                                    if (!temp.find((inner_find) => inner_find.id === base.id)) {
                                                                        temp.push(base);
                                                                    }
                                                                }
                                                            }
                                                            return temp;
                                                        })
                                                        setRefreshGroups(true);
                                                    }
                                                }
                                                value={''}
                                            >
                                                {
                                                    [<option value='' key={'initial one'}>Select Team</option>, ...data.PetsLoadout.map((cur, index) => {

                                                        if (cur.Locked === 0) return;

                                                        return (
                                                            <option
                                                                key={index}
                                                                value={index}

                                                            >{cur.Name}</option>
                                                        )
                                                    })]
                                                }
                                            </select>
                                        </div>
                                        <div
                                            style={{ display: 'flex', justifyContent: 'space-between' }}
                                        >
                                            <div
                                                style={{ marginRight: '6px' }}
                                            >
                                                Recommended Teams
                                            </div>
                                            <select
                                                aria-label='Select a default team preset'
                                                className='importantText'
                                                style={{ maxWidth: '144px', backgroundColor: '#171717', borderRadius: '4px', marginLeft: '12px' }}
                                                onChange={
                                                    (selected_mode) => {
                                                        setRecommendedSelected(true);
                                                        let priorityList = {};
                                                        let priorityMap = {};
                                                        let petWhiteList = {};
                                                        let presetPets = {};

                                                        switch (selected_mode.target.value) {
                                                            case 'Main Team':
                                                                priorityList = JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                                                                priorityMap = JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                                                                presetPets = mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(mainTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                                break;
                                                            case 'Reinc. Team':
                                                                priorityList = JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                                                                priorityMap = JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                                                                presetPets = reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(reincTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                                break;
                                                            case 'Gear Team':
                                                                priorityList = JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                                                                priorityMap = JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                                                                presetPets = gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(gearTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                                break;
                                                            case 'Stat Team':
                                                                // TODO: statTeamSuggestions does not exist anymore so I commented this out
                                                                // priorityList = JSON.parse(JSON.stringify(statTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityList));
                                                                // priorityMap = JSON.parse(JSON.stringify(statTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].priorityMap));
                                                                // presetPets = statTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList ? JSON.parse(JSON.stringify(statTeamSuggestions[data.AscensionCount > maxKey ? maxKey : data.AscensionCount].petWhiteList)) : {};
                                                                break;
                                                            case 'None':
                                                                priorityList = [];
                                                                priorityMap = {};
                                                                break;
                                                            default:

                                                        }

                                                        let petWhiteListNew = {};
                                                        for (const [key, value] of Object.entries(presetPets)) {
                                                            if (!unlockedPetsMap[key]) {
                                                                petWhiteListNew[key] = { ID: key, name: petNames[key].name, mode: (value as any).mode };
                                                            }
                                                            else {
                                                                petWhiteListNew[key] = { ...unlockedPetsMap[key], mode: (value as any).mode };
                                                            }
                                                        }
                                                        petWhiteList = petWhiteListNew;
                                                        let airPets, groundPets, currentBonuses, selectedPetMap;
                                                        [airPets, groundPets, currentBonuses, selectedPetMap] = petHelper.findBestTeam(
                                                            data,
                                                            {
                                                                manualEnabledPets: manualEnabledPets,
                                                                priorityList: priorityList,
                                                                priorityMap: priorityMap,
                                                                petWhiteList: petWhiteList,
                                                                usePromos: usePromos,
                                                                maxTopStat: maxTopStat
                                                            }
                                                        );

                                                        let combinedList = airPets.concat(groundPets);

                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];

                                                            for (let x = 0; x < combinedList.length; x++) {
                                                                let selected = combinedList[x].ID;
                                                                if (selected > 0) {
                                                                    let base = {
                                                                        id: selected,
                                                                        label: petNames[selected].name,
                                                                        // placement: 'rel',
                                                                        placement: 'auto',
                                                                        parameters: { team: 0, damageBias: 17 },
                                                                        pet: data.PetsCollection.find((pet_search) => pet_search.ID === selected)
                                                                    }
                                                                    if (!temp.find((inner_find) => inner_find.id === base.id)) {
                                                                        temp.push(base);
                                                                    }
                                                                }
                                                            }
                                                            return temp;
                                                        })
                                                        setRefreshGroups(true);
                                                    }
                                                }
                                                defaultValue={' '}
                                            // value={petWhiteList[e.ID].mode}
                                            >
                                                {!recommendedSelected && (<option value="None">Select Preset</option>)}
                                                <option value="Main Team">Main Team</option>
                                                <option value="Reinc. Team">Reinc. Team</option>
                                                <option value="Gear Team">Gear Team</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='importantText'
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: numGround > maxType ? 'red' : ''
                                }}
                            >
                                {`Ground Pets (${numGround}/${maxType})`}
                            </div>

                            {/* Pet white/black list */}
                            <div
                                style={{
                                    display: 'flex',
                                    margin: '0 0 0 0',
                                    borderTop: '1px solid rgba(255,255,255,0.8)',
                                    borderBottom: '1px solid rgba(255,255,255,0.8)',
                                    backgroundColor: 'rgba(255,255,255, 0.12)',
                                }}
                            >

                                {/* Pet */}
                                <div
                                    style={{
                                        // background: 'red',
                                        width: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                >
                                    Pet
                                </div>

                                {/* placement */}
                                <div
                                    style={{
                                        // background: 'yellow',
                                        width: '25%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRight: '1px solid rgba(255,255,255,0.8)',
                                        borderLeft: '1px solid rgba(255,255,255,0.8)',
                                    }}
                                >
                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            <div>
                                                Determines the order in which the pets are slotted in:
                                            </div>
                                            <div>
                                                Blacklist: Omits this pet from any group
                                            </div>
                                            <div>
                                                Group: Forces the pet to go into a certain group
                                            </div>
                                            <div>
                                                Auto:  Tries to find optimal placement automatically
                                            </div>
                                            {/* <div>
                                                Relative: Tries to find optimal placement automatically based on `damage bias`
                                            </div> */}
                                        </div>
                                    }>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Placement
                                            </div>
                                            <div style={{ height: '18px', width: '18px', position: 'relative', marginLeft: '6px' }} >
                                                <Image
                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                    src={infoIcon}
                                                    fill
                                                />
                                            </div>
                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                                        </div>
                                    </MouseOverPopover>

                                </div>
                                {/* Parameters */}
                                <div
                                    style={{
                                        // background: 'blue',
                                        width: '25%',
                                        display: 'flex',
                                        // boxShadow: `0 0 0 1px #ecf0f5`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            <div>
                                                <div>
                                                    In Placement=Group, determines which group the pet is placed in
                                                </div>
                                                <div>
                                                    In Placement=Auto, tried to find the optimal placement automatically
                                                </div>
                                                {/* <div>
                                                    In Placement=Relative, determines which group the pet is placed in based on the bias number (higher means more damage necessary to placed in)
                                                </div> */}
                                            </div>
                                        </div>
                                    }>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Parameters
                                            </div>
                                            <div style={{ height: '18px', width: '18px', position: 'relative', marginLeft: '6px' }} >
                                                <Image
                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                    src={infoIcon}
                                                    fill
                                                />
                                            </div>
                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                                        </div>
                                    </MouseOverPopover>
                                </div>
                            </div>

                            <div style={{
                                margin: '0 0 0 0',
                            }}>
                                {petWhiteList.sort((a, b) => a.label.localeCompare(b.label)).map((pet, index) => {

                                    if (pet.pet.Type === 2) return <></>;

                                    let petLabel = pet.label;
                                    let petGroup = ``
                                    if (pet.id in relWhiteListMap) {
                                        // petLabel += ` (Group: ${relWhiteListMap[pet.id].finalGroup + 1})`
                                        petGroup += `(Group: ${relWhiteListMap[pet.id].finalGroup + 1})`
                                    }

                                    let showRed = false;//Too high
                                    let showGreen = false;// Too low
                                    let hoverMsg = ``;

                                    //Check whether this pet is placed too low or too high
                                    if (pet.placement !== `blacklist`) {

                                        let group_index = groups.findIndex((temp_e) => {
                                            return temp_e.find((temp_e2) => temp_e2.ID === pet.id)
                                        });

                                        if (group_index > -1) {

                                            //Check if this pet got put in too high

                                            let group = groups[group_index];

                                            //Can only check if not on bottom
                                            if (group_index !== (groups.length - 1)) {
                                                //By default only need to check twice (2gnd or 2air)
                                                const maxChecks = 2;
                                                let originalGroupScore = petHelper.calculateGroupScore(group, defaultRank).groupScore;
                                                let tempGroup = [];
                                                let triedPets = {};

                                                for (let i = 0; i < maxChecks; i++) {//
                                                    let foundNew = false;

                                                    for (let j = 0; j < groups[group_index + 1].length; j++) {

                                                        let temp_pet = groups[group_index + 1][j];

                                                        if (temp_pet.Type === pet.pet.Type) {

                                                            if (!(temp_pet.ID in triedPets) && !foundNew) {
                                                                triedPets[temp_pet.ID] = true;
                                                                foundNew = true;
                                                                tempGroup = [...group];
                                                                let ind = tempGroup.findIndex((temp_repl) => temp_repl.ID === pet.pet.ID)
                                                                tempGroup[ind] = temp_pet;
                                                            }
                                                        }
                                                    }

                                                    let newGroupScore = petHelper.calculateGroupScore(tempGroup, defaultRank).groupScore;

                                                    if (newGroupScore > originalGroupScore) {
                                                        showRed = true;
                                                        hoverMsg = `${petLabel} might be too high, try ${pet.placement === 'rel' ? `increase` : `lowering`} the value to drop them to a lower team`
                                                    }
                                                    tempGroup = [];
                                                }
                                            }


                                            //If they are not too high, check if they are too low (except for team 1)
                                            if (!showRed && group_index > 0) {
                                                //By default only need to check twice (2gnd or 2air)
                                                const maxChecks = 2;
                                                let originalGroupScore = petHelper.calculateGroupScore(groups[group_index - 1], defaultRank).groupScore;
                                                let tempGroup = [];
                                                let triedPets = {};

                                                for (let i = 0; i < maxChecks; i++) {//
                                                    let foundNew = false;

                                                    for (let j = 0; j < groups[group_index - 1].length; j++) {

                                                        let temp_pet = groups[group_index - 1][j];
                                                        if (temp_pet.Type === pet.pet.Type) {
                                                            if (!(temp_pet.ID in triedPets) && !foundNew) {
                                                                triedPets[temp_pet.ID] = true;
                                                                foundNew = true;
                                                                tempGroup = [...groups[group_index - 1]];
                                                                let ind = tempGroup.findIndex((temp_repl) => temp_repl.ID === temp_pet.ID)
                                                                tempGroup[ind] = pet.pet;
                                                            }
                                                        }
                                                    }

                                                    let newGroupScore = petHelper.calculateGroupScore(tempGroup, defaultRank).groupScore;

                                                    if (newGroupScore > originalGroupScore) {
                                                        showGreen = true;
                                                        hoverMsg = ` ${petLabel} might be too low, try ${pet.placement === 'rel' ? `lowering` : `increasing`} the value to bump them to a higher team`
                                                    }
                                                    tempGroup = [];
                                                }
                                            }

                                        }
                                        //Has a nan placement -> suggest decreasing the rel value
                                        else {
                                            hoverMsg = `Try lowering this value until ${petLabel} is put in`;
                                            showGreen = true;
                                        }

                                    }

                                    return (
                                        <div
                                            key={pet.label}
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '25px',
                                                backgroundColor: (index % 2) === 0 ? 'rgba(255,255,255, 0.07)' : 'rgba(255,255,255, 0.005)',
                                                color: numGround > maxType ? 'red' : ''
                                            }}

                                        >
                                            {/* Pet name + delete */}
                                            <div style={{
                                                width: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',
                                            }}
                                                onMouseEnter={() => {
                                                    setActivePet(pet.id)
                                                }}
                                                onMouseLeave={() => {
                                                    setActivePet(-1);
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        zIndex: '1'
                                                    }}

                                                >
                                                    <div
                                                        style={{
                                                            marginLeft: '6px'
                                                        }}
                                                    >
                                                        {petLabel}
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginRight: '34px'
                                                        }}
                                                    >
                                                        {petGroup}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        height: '12px', width: '12px',
                                                        margin: '0 12px 0 auto',
                                                        zIndex: '2',
                                                        position: 'relative'
                                                    }}
                                                    onClick={(e) => {
                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];
                                                            temp = temp.filter((inner_pet) => {
                                                                return inner_pet.id !== pet.id
                                                            });
                                                            return temp;
                                                        })
                                                        setRefreshGroups(true);
                                                    }}
                                                >
                                                    <Image
                                                        alt='X (cross to remove)'
                                                        src={xIcon}
                                                        fill
                                                    />
                                                </div>

                                            </div>
                                            {/* Pet Placement */}
                                            <div style={{
                                                width: '25%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRight: '1px solid rgba(255,255,255,0.8)',
                                                borderLeft: '1px solid rgba(255,255,255,0.8)',
                                                borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',

                                            }}>

                                                <select
                                                    className='importantText'
                                                    style={{ maxWidth: '144px', backgroundColor: (index % 2) === 0 ? '#252525' : '#171717', borderRadius: '4px' }}
                                                    aria-label='Select what kind of placement the pet will have'
                                                    value={pet.placement}
                                                    onChange={
                                                        (choice) => {
                                                            console.log(choice);
                                                            setPetWhiteList((curr) => {
                                                                let temp = [...curr];
                                                                let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                tempPet.placement = choice.target.value;
                                                                return temp;
                                                            })
                                                            setRefreshGroups(true);
                                                        }
                                                    }
                                                >
                                                    <option value={'blacklist'}>Blacklist</option>
                                                    <option value={'team'}>Group</option>
                                                    <option value={`auto`}>Auto</option>
                                                    {/* <option value={`rel`}>Relative</option> */}
                                                </select>

                                            </div>
                                            {/* parameters */}
                                            <div
                                                // @ts-ignore TODO: disabled does not work for divs
                                                disabled={pet.placement === 'blacklist'}
                                                style={{
                                                    width: '25%',
                                                    position: 'relative',
                                                    opacity: pet.placement === 'blacklist' ? '0.4' : '',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',
                                                }}
                                            >
                                                {pet.placement === 'team' && (
                                                    <div style={{ marginLeft: (showGreen || showRed) ? '22px' : '' }}>
                                                        <select
                                                            className='importantText'
                                                            style={{ maxWidth: '144px', backgroundColor: (index % 2) === 0 ? '#252525' : '#171717', borderRadius: '4px', width: '44px' }}
                                                            aria-label='Select what team the pet will be placed in'
                                                            value={pet.parameters.team}
                                                            onChange={
                                                                (choice) => {
                                                                    setPetWhiteList((curr) => {
                                                                        let temp = [...curr];
                                                                        let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                        tempPet.parameters.team = Number(choice.target.value);
                                                                        return temp;
                                                                    })
                                                                    setRefreshGroups(true);
                                                                }
                                                            }
                                                        >
                                                            {Array.apply(null, Array(Number(numTeams)))
                                                                .map((e, index) => {
                                                                    return <option value={index} key={index}>{index + 1}</option>
                                                                })}


                                                        </select>

                                                    </div>
                                                )}
                                                {pet.placement === `rel` && (
                                                    <div style={{ marginLeft: (showGreen || showRed) ? '22px' : '' }}>
                                                        <input
                                                            className='importantText textMedium2'
                                                            aria-label='Damage bias to control when the pet should go in'
                                                            style={{
                                                                maxWidth: '36px',
                                                                backgroundColor: '#1b1b1b',
                                                                borderRadius: '4px',
                                                                // @ts-ignore TODO: duplicated property
                                                                backgroundColor: (index % 2) === 0 ? '#252525' : '#171717',
                                                            }}
                                                            type='number'
                                                            // className='prepNumber'
                                                            value={pet.parameters.damageBias}
                                                            onChange={
                                                                (e) => {
                                                                    try {
                                                                        let x = Number(e.target.value);
                                                                        x = Math.floor(x);
                                                                        if (x < 0 || x > 100) {
                                                                            return;
                                                                        }

                                                                        setPetWhiteList((curr) => {
                                                                            let temp = [...curr];
                                                                            let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                            tempPet.parameters.damageBias = Number(x);
                                                                            return temp;
                                                                        })
                                                                        setRefreshGroups(true);
                                                                    }
                                                                    catch (err) {
                                                                        console.log(err);
                                                                    }
                                                                }}
                                                            placeholder={pet.parameters.damageBias + ''}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                )}
                                                {(pet.placement === 'blacklist' || pet.placement === 'auto') && (
                                                    <>Unavailable</>
                                                )}
                                                {(showGreen || showRed) && (
                                                    <div
                                                    // style={{ position: 'absolute', right: '5%' }}
                                                    >

                                                        <MouseOverPopover
                                                            // @ts-ignore TODO: muiHeight does not exist
                                                            muiHeight={'20px'}
                                                            tooltip={<div>{hoverMsg}</div>} style={{ display: 'flex', alignItems: 'center', height: '20px' }}>

                                                            <div style={{ height: '20px', width: '20px', marginLeft: '3px', marginTop: '2px', position: 'relative' }}>
                                                                <Image
                                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                                    src={showGreen ? infoIconGreenThick : infoIconRedThick}
                                                                    fill
                                                                />
                                                            </div>


                                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover'
                                                                style={{ height: '18px', marginLeft: '6px', marginTop: '2px' }}
                                                                src={showGreen ? infoIconGreen : infoIconRed} /> */}
                                                        </MouseOverPopover>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>


                            <div className='importantText'
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    borderTop: '1px solid rgba(255,255,255,0.8)',
                                    paddingTop: '6px',
                                    paddingBottom: '6px',
                                    color: numAir > maxType ? 'red' : ''
                                    // marginTop: '6px'
                                }}
                            >
                                {`Air Pets (${numAir}/${maxType})`}
                            </div>

                            {/* Pet white/black list */}
                            <div
                                style={{
                                    display: 'flex',
                                    margin: '0 0 0 0',
                                    borderTop: '1px solid rgba(255,255,255,0.8)',
                                    borderBottom: '1px solid rgba(255,255,255,0.8)',
                                    backgroundColor: 'rgba(255,255,255, 0.12)',
                                }}
                            >

                                {/* Pet */}
                                <div
                                    style={{
                                        // background: 'red',
                                        width: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                >
                                    Pet
                                </div>

                                {/* placement */}
                                <div
                                    style={{
                                        // background: 'yellow',
                                        width: '25%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRight: '1px solid rgba(255,255,255,0.8)',
                                        borderLeft: '1px solid rgba(255,255,255,0.8)',
                                    }}
                                >
                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            <div>
                                                Determines the order in which the pets are slotted in:
                                            </div>
                                            <div>
                                                Blacklist: Omits this pet from any group
                                            </div>
                                            <div>
                                                Group: Forces the pet to go into a certain group
                                            </div>
                                            <div>
                                                Auto:  Tries to find optimal placement automatically
                                            </div>
                                            {/* <div>
                                                Relative: Tries to find optimal placement automatically based on `damage bias`
                                            </div> */}
                                        </div>
                                    }>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Placement
                                            </div>
                                            <div style={{ height: '18px', width: '18px', position: 'relative', marginLeft: '6px' }} >
                                                <Image
                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                    src={infoIcon}
                                                    fill
                                                />
                                            </div>
                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                                        </div>
                                    </MouseOverPopover>

                                </div>
                                {/* Parameters */}
                                <div
                                    style={{
                                        // background: 'blue',
                                        width: '25%',
                                        display: 'flex',
                                        // boxShadow: `0 0 0 1px #ecf0f5`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            <div>
                                                <div>
                                                    In Placement=Group, determines which group the pet is placed in
                                                </div>
                                                <div>
                                                    In Placement=Auto, tried to find the optimal placement automatically
                                                </div>
                                                {/* <div>
                                                    In Placement=Relative, determines which group the pet is placed in based on the bias number (higher means more damage necessary to placed in)
                                                </div> */}
                                            </div>
                                        </div>
                                    }>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Parameters
                                            </div>
                                            <div style={{ height: '18px', width: '18px', position: 'relative', marginLeft: '6px' }} >
                                                <Image
                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                    src={infoIcon}
                                                    fill
                                                />
                                            </div>
                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                                        </div>
                                    </MouseOverPopover>
                                </div>
                            </div>

                            <div style={{
                                margin: '0 0 0 0',
                            }}>
                                {petWhiteList.sort((a, b) => a.label.localeCompare(b.label)).map((pet, index) => {

                                    if (pet.pet.Type === 1) return <></>;

                                    let petLabel = pet.label;
                                    let petGroup = ``
                                    if (pet.id in relWhiteListMap) {
                                        // petLabel += ` (Group: ${relWhiteListMap[pet.id].finalGroup + 1})`
                                        petGroup += `(Group: ${relWhiteListMap[pet.id].finalGroup + 1})`
                                    }

                                    let showRed = false;//Too high
                                    let showGreen = false;// Too low
                                    let hoverMsg = ``;

                                    //Check whether this pet is placed too low or too high
                                    if (pet.placement !== `blacklist`) {

                                        let group_index = groups.findIndex((temp_e) => {
                                            return temp_e.find((temp_e2) => temp_e2.ID === pet.id)
                                        });

                                        if (group_index > -1) {

                                            //Check if this pet got put in too high

                                            let group = groups[group_index];

                                            //Can only check if not on bottom
                                            if (group_index !== (groups.length - 1)) {
                                                //By default only need to check twice (2gnd or 2air)
                                                const maxChecks = 2;
                                                let originalGroupScore = petHelper.calculateGroupScore(group, defaultRank).groupScore;
                                                let tempGroup = [];
                                                let triedPets = {};

                                                for (let i = 0; i < maxChecks; i++) {//
                                                    let foundNew = false;

                                                    for (let j = 0; j < groups[group_index + 1].length; j++) {

                                                        let temp_pet = groups[group_index + 1][j];

                                                        if (temp_pet.Type === pet.pet.Type) {

                                                            if (!(temp_pet.ID in triedPets) && !foundNew) {
                                                                triedPets[temp_pet.ID] = true;
                                                                foundNew = true;
                                                                tempGroup = [...group];
                                                                let ind = tempGroup.findIndex((temp_repl) => temp_repl.ID === pet.pet.ID)
                                                                tempGroup[ind] = temp_pet;
                                                            }
                                                        }
                                                    }

                                                    let newGroupScore = petHelper.calculateGroupScore(tempGroup, defaultRank).groupScore;

                                                    if (newGroupScore > originalGroupScore) {
                                                        showRed = true;
                                                        hoverMsg = `${petLabel} might be too high, try ${pet.placement === 'rel' ? `increase` : `lowering`} the value to drop them to a lower team`
                                                    }
                                                    tempGroup = [];
                                                }
                                            }


                                            //If they are not too high, check if they are too low (except for team 1)
                                            if (!showRed && group_index > 0) {
                                                //By default only need to check twice (2gnd or 2air)
                                                const maxChecks = 2;
                                                let originalGroupScore = petHelper.calculateGroupScore(groups[group_index - 1], defaultRank).groupScore;
                                                let tempGroup = [];
                                                let triedPets = {};

                                                for (let i = 0; i < maxChecks; i++) {//
                                                    let foundNew = false;

                                                    for (let j = 0; j < groups[group_index - 1].length; j++) {

                                                        let temp_pet = groups[group_index - 1][j];
                                                        if (temp_pet.Type === pet.pet.Type) {
                                                            if (!(temp_pet.ID in triedPets) && !foundNew) {
                                                                triedPets[temp_pet.ID] = true;
                                                                foundNew = true;
                                                                tempGroup = [...groups[group_index - 1]];
                                                                let ind = tempGroup.findIndex((temp_repl) => temp_repl.ID === temp_pet.ID)
                                                                tempGroup[ind] = pet.pet;
                                                            }
                                                        }
                                                    }

                                                    let newGroupScore = petHelper.calculateGroupScore(tempGroup, defaultRank).groupScore;

                                                    if (newGroupScore > originalGroupScore) {
                                                        showGreen = true;
                                                        hoverMsg = ` ${petLabel} might be too low, try ${pet.placement === 'rel' ? `lowering` : `increasing`} the value to bump them to a higher team`
                                                    }
                                                    tempGroup = [];
                                                }
                                            }

                                        }
                                        //Has a nan placement -> suggest decreasing the rel value
                                        else {
                                            hoverMsg = `Try lowering this value until ${petLabel} is put in`;
                                            showGreen = true;
                                        }

                                    }

                                    return (
                                        <div
                                            key={pet.label}
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '25px',
                                                backgroundColor: (index % 2) === 0 ? 'rgba(255,255,255, 0.07)' : 'rgba(255,255,255, 0.005)',
                                                color: numAir > maxType ? 'red' : ''
                                            }}

                                        >
                                            {/* Pet name + delete */}
                                            <div style={{
                                                width: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',
                                            }}
                                                onMouseEnter={() => {
                                                    setActivePet(pet.id)
                                                }}
                                                onMouseLeave={() => {
                                                    setActivePet(-1);
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        zIndex: '1'
                                                    }}

                                                >
                                                    <div
                                                        style={{
                                                            marginLeft: '6px'
                                                        }}
                                                    >
                                                        {petLabel}
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginRight: '34px'
                                                        }}
                                                    >
                                                        {petGroup}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        height: '12px', width: '12px',
                                                        margin: '0 12px 0 auto',
                                                        zIndex: '2',
                                                        position: 'relative'
                                                    }}
                                                    onClick={(e) => {
                                                        setPetWhiteList((curr) => {
                                                            let temp = [...curr];
                                                            temp = temp.filter((inner_pet) => {
                                                                return inner_pet.id !== pet.id
                                                            });
                                                            return temp;
                                                        })
                                                        setRefreshGroups(true);
                                                    }}
                                                >
                                                    <Image
                                                        alt='X (cross to remove)'
                                                        src={xIcon}
                                                        fill
                                                    />
                                                </div>

                                            </div>
                                            {/* Pet Placement */}
                                            <div style={{
                                                width: '25%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRight: '1px solid rgba(255,255,255,0.8)',
                                                borderLeft: '1px solid rgba(255,255,255,0.8)',
                                                borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',

                                            }}>

                                                <select
                                                    className='importantText'
                                                    style={{ maxWidth: '144px', backgroundColor: (index % 2) === 0 ? '#252525' : '#171717', borderRadius: '4px' }}
                                                    aria-label='Select what kind of placement the pet will have'
                                                    value={pet.placement}
                                                    onChange={
                                                        (choice) => {
                                                            console.log(choice);
                                                            setPetWhiteList((curr) => {
                                                                let temp = [...curr];
                                                                let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                tempPet.placement = choice.target.value;
                                                                return temp;
                                                            })
                                                            setRefreshGroups(true);
                                                        }
                                                    }
                                                >
                                                    <option value={'blacklist'}>Blacklist</option>
                                                    <option value={'team'}>Group</option>
                                                    <option value={`auto`}>Auto</option>
                                                    {/* <option value={`rel`}>Relative</option> */}
                                                </select>

                                            </div>
                                            {/* parameters */}
                                            <div
                                                // @ts-ignore TODO: disabled does not work for divs
                                                disabled={pet.placement === 'blacklist'}
                                                style={{
                                                    width: '25%',
                                                    position: 'relative',
                                                    opacity: pet.placement === 'blacklist' ? '0.4' : '',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)'
                                                }}
                                            >
                                                {pet.placement === 'team' && (
                                                    <div style={{ marginLeft: (showGreen || showRed) ? '22px' : '' }}>
                                                        <select
                                                            className='importantText'
                                                            style={{ maxWidth: '144px', backgroundColor: (index % 2) === 0 ? '#252525' : '#171717', borderRadius: '4px', width: '44px' }}
                                                            aria-label='Select what team the pet will be placed in'
                                                            value={pet.parameters.team}
                                                            onChange={
                                                                (choice) => {
                                                                    setPetWhiteList((curr) => {
                                                                        let temp = [...curr];
                                                                        let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                        tempPet.parameters.team = Number(choice.target.value);
                                                                        return temp;
                                                                    })
                                                                    setRefreshGroups(true);
                                                                }
                                                            }
                                                        >
                                                            {Array.apply(null, Array(Number(numTeams)))
                                                                .map((e, index) => {
                                                                    return <option value={index} key={index}>{index + 1}</option>
                                                                })}


                                                        </select>

                                                    </div>
                                                )}
                                                {pet.placement === `rel` && (
                                                    <div style={{ marginLeft: (showGreen || showRed) ? '22px' : '' }}>
                                                        <input
                                                            className='importantText textMedium2'
                                                            aria-label='Damage bias to control when the pet should go in'
                                                            style={{
                                                                maxWidth: '36px', backgroundColor: '#1b1b1b', borderRadius: '4px',
                                                                // @ts-ignore TODO: duplicate property
                                                                backgroundColor: (index % 2) === 0 ? '#252525' : '#171717',
                                                            }}
                                                            type='number'
                                                            // className='prepNumber'
                                                            value={pet.parameters.damageBias}
                                                            onChange={
                                                                (e) => {
                                                                    try {
                                                                        let x = Number(e.target.value);
                                                                        x = Math.floor(x);
                                                                        if (x < 0 || x > 100) {
                                                                            return;
                                                                        }

                                                                        setPetWhiteList((curr) => {
                                                                            let temp = [...curr];
                                                                            let tempPet = temp.find((inner_pet) => inner_pet.id === pet.id);
                                                                            tempPet.parameters.damageBias = Number(x);
                                                                            return temp;
                                                                        })
                                                                        setRefreshGroups(true);
                                                                    }
                                                                    catch (err) {
                                                                        console.log(err);
                                                                    }
                                                                }}
                                                            placeholder={pet.parameters.damageBias + ''}
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>
                                                )}
                                                {(pet.placement === 'blacklist' || pet.placement === 'auto') && (
                                                    <>Unavailable</>
                                                )}
                                                {(showGreen || showRed) && (
                                                    <div
                                                    // style={{ position: 'absolute', right: '5%' }}
                                                    >
                                                        <MouseOverPopover
                                                            // @ts-ignore TODO: muiHeight does not exist
                                                            muiHeight={'20px'}
                                                            tooltip={<div>{hoverMsg}</div>} style={{ display: 'flex', alignItems: 'center', height: '20px' }}>

                                                            <div style={{ height: '20px', width: '20px', marginLeft: '3px', marginTop: '2px', position: 'relative' }}>
                                                                <Image
                                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                                    src={showGreen ? infoIconGreenThick : infoIconRedThick}
                                                                    fill
                                                                />
                                                            </div>


                                                            {/* <img alt='on hover I in a cirlce icon, shows more information on hover'
                                                                style={{ height: '18px', marginLeft: '6px', marginTop: '2px' }}
                                                                src={showGreen ? infoIconGreen : infoIconRed} /> */}
                                                        </MouseOverPopover>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>



                        </div>
                    )}

                    {/* Left Over Pets*/}
                    {groupRankCritera === 1 && (
                        <div
                            style={{
                                margin: '12px 6px',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1',
                                border: '1px solid rgba(255,255,255,0.8)',
                            }}
                        >
                            {/* Alerting overall impossible filters combinations */}
                            {failedFilters['generic'] && (
                                <div
                                    style={{ fontWeight: 'bold', color: 'red', display: 'flex', width: '100%', justifyContent: 'center' }}

                                >
                                    {failedFilters['generic']}
                                </div>
                            )}

                            {/* left over pets */}
                            {(
                                <div
                                    style={{ display: 'flex', width: '100%', flexDirection: 'column', }}
                                >
                                    {/* Title */}
                                    <div
                                        style={{ display: 'flex', margin: '6px', alignSelf: 'center' }}
                                    >
                                        <h4 style={{ margin: '0', fontSize: '20px', textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                {`Pet Bonus Finder`}
                                            </div>
                                            <div style={{ fontSize: '16px', fontWeight: 'normal', color: numGround >= maxType ? 'red' : '', marginLeft: "6px" }}>
                                                {`(${numGround} / ${maxType} Ground)`}
                                            </div>
                                            <div style={{ marginLeft: '6px', fontSize: '16px', fontWeight: 'normal', }}>
                                                {`&`}
                                            </div>
                                            <div style={{ fontSize: '16px', fontWeight: 'normal', color: numAir >= maxType ? 'red' : '', marginLeft: "6px" }}>
                                                {`(${numAir} / ${maxType} Air) `}
                                            </div>
                                        </h4>

                                    </div>

                                    {/* Table */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '6px 0 0 0',
                                            // paddingLeft: '6px'
                                        }}
                                    >
                                        <div style={{ marginLeft: '6px' }}>

                                            <SearchBox
                                                updateBox={true}
                                                placeholder='Enter a bonus'
                                                data={{
                                                    list: filterableBonuses
                                                }}
                                                onSelect={(e) => {
                                                    console.log(e);
                                                    setLeftOverBonus1(Number(e.id));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Headers */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            borderTop: '1px solid rgba(255,255,255,0.8)',
                                            borderBottom: '1px solid rgba(255,255,255,0.8)',
                                            backgroundColor: 'rgba(255,255,255, 0.14)',
                                            margin: '6px 0 0 0'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '70%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRight: '1px solid rgba(255,255,255,0.8)',
                                            }}
                                        >
                                            {`${BonusMap[leftOverBonus1].label} Pets`}
                                        </div>

                                        {/* placement */}
                                        <div
                                            style={{
                                                width: '30%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <MouseOverPopover tooltip={
                                                <div style={{ padding: '6px' }}>
                                                    <div>The {`pet's`} damage </div>
                                                </div>
                                            }>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div>
                                                        Damage
                                                    </div>
                                                </div>
                                            </MouseOverPopover>
                                        </div>

                                    </div>
                                    {/* Pets */}
                                    <div style={{ margin: '0 0px 0 0px', }}>
                                        {leftOver1Pets.map((pet, index) => {
                                            let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === pet.ID)

                                            if (!staticPetData) {
                                                staticPetData = {
                                                    img: missing,
                                                    location: '??-??',
                                                    name: 'Unknown',
                                                    petId: pet.ID
                                                }
                                            }
                                            return (
                                                <div
                                                    key={pet.ID}
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        backgroundColor: (index % 2) === 0 ? 'rgba(255,255,255, 0.09)' : 'rgba(255,255,255, 0.03)',
                                                    }}
                                                >
                                                    {/* Pet name + pin */}
                                                    <div style={{
                                                        width: '70%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                    }}
                                                    >
                                                        <div
                                                            style={{
                                                                // position: 'absolute',
                                                                width: '100%',
                                                                display: 'flex',
                                                                flex: '1',
                                                                justifyContent: 'space-between',
                                                                // alignContent: 'space-between',
                                                                // zIndex: '-1'
                                                            }}

                                                        >
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',
                                                                    paddingLeft: '6px',

                                                                }}
                                                            >
                                                                {/* {petNames[pet.ID].name} */}
                                                                <PetItemCoin
                                                                    showNameOnly={true}
                                                                    grayBackground={pet.equipped}
                                                                    key={pet.ID}
                                                                    petData={staticPetData}
                                                                    fullPetData={pet}
                                                                    data={data}
                                                                    onClick={() => { }}
                                                                    weightMap={weightMap}
                                                                    defaultRank={defaultRank}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Pin icon */}
                                                        {!pet.whitelisted && (
                                                            <div
                                                                style={{
                                                                    height: 'calc(100% - 1px)',
                                                                    width: '24px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',

                                                                }}
                                                            >
                                                                <div style={{
                                                                    position: 'relative',
                                                                    width: '20px', height: '20px'
                                                                }}
                                                                    onClick={(e) => {
                                                                        setPetWhiteList((curr) => {
                                                                            let temp = [...curr];

                                                                            let pet_inner = temp.find((sample_pet) => sample_pet.id === pet.ID);
                                                                            if (!pet_inner) {
                                                                                temp.push({
                                                                                    label: petNames[pet.ID]?.name ? petNames[pet.ID].name : "Unknown",
                                                                                    pet: pet,
                                                                                    id: pet.ID,
                                                                                    placement: 'auto',
                                                                                    parameters: { team: 0, damageBias: 17 }
                                                                                }
                                                                                );
                                                                            }
                                                                            else {
                                                                                throw new Error(`should not have an existing pet in this list!`)
                                                                            }
                                                                            return temp;
                                                                        })

                                                                        setRefreshGroups(true);
                                                                        return;

                                                                    }}
                                                                >
                                                                    <Image
                                                                        fill
                                                                        src={pinIcon}
                                                                        alt='push pin'
                                                                    />
                                                                </div>
                                                                {/* <img alt='push pin'
                                                                    style={{
                                                                        maxHeight: '12px',
                                                                    }}
                                                                    onClick={(e) => {
                                                                        setPetWhiteList((curr) => {
                                                                            let temp = [...curr];

                                                                            let pet_inner = temp.find((sample_pet) => sample_pet.id === pet.ID);
                                                                            if (!pet_inner) {
                                                                                temp.push({ label: petNames[pet.ID].name, id: pet.ID, placement: 'rel', parameters: { team: 0, damageBias: 17 } });
                                                                            }
                                                                            else {
                                                                                throw new Error(`should not have an existing pet in this list!`)
                                                                            }
                                                                            return temp;
                                                                        })

                                                                        setRefreshGroups(true);
                                                                        return;

                                                                    }}
                                                                    src={pinIcon}
                                                                /> */}
                                                            </div>
                                                        )}

                                                    </div>
                                                    {/* Pet Damage */}
                                                    <div style={{
                                                        width: '30%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderTop: index === 0 ? '' : '1px solid rgba(255,255,255,0.8)',
                                                        borderLeft: '1px solid rgba(255,255,255,0.8)',
                                                    }}>
                                                        {helper.roundTwoDecimal(petHelper.calculatePetBaseDamage(pet, defaultRank))}
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Grid Right */}
            <div style={{ display: 'flex', flex: '1' }}>
                <div
                    className='importantText'
                    style={{
                        border: '2px solid rgba(255,255,255,0.8)',
                        borderRadius: '6px',
                        marginTop: '6px',
                        marginRight: '6px',
                        maxHeight: 'calc(100vh - 50px)',
                        backgroundColor: 'rgba(255,255,255, 0.05)',
                        // width: 'calc(100% - 66%)',
                        minWidth: '200px',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            borderBottom: '2px solid rgba(255,255,255,0.8)',
                            backgroundColor: 'rgba(255,255,255,0.12)',
                            justifyContent: 'center'
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: '30px' }}>
                                {`Available Pets`}
                            </div>
                            <div style={{ fontWeight: 'bold', alignSelf: 'end', marginLeft: '6px', marginBottom: '5px', fontSize: '16px' }}>
                                (click to enable/disable)
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>

                            <div className='hover' style={{
                                width: '100%',
                                borderBottom: '2px solid rgba(255,255,255,0.8)',
                                display: 'flex',
                                backgroundColor: 'rgba(255,255,255,0.12)'
                            }}>
                                <div style={{ width: '25%', borderRight: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }} onClick={(e) => {
                                    ReactGA.event({
                                        category: "expedition_pets",
                                        action: 'enabled_all',
                                        label: 'expedition'
                                    })
                                    if (data.PetsCollection) {
                                        let petArr = [];
                                        for (let i = 1; i < data.PetsCollection.length; i++) {
                                            petArr.push(data.PetsCollection[i].ID)
                                        }
                                        handleItemSelected(petArr);
                                    }

                                }}>
                                    Enable All
                                </div>
                                <div className='hover' style={{ width: '25%', borderRight: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}
                                    onClick={(e) => {
                                        ReactGA.event({
                                            category: "expedition_pets",
                                            action: 'disabled_all',
                                            label: 'expedition'
                                        })
                                        if (data.PetsCollection) {
                                            handleItemSelected([]);
                                        }

                                    }}>
                                    Disable All
                                </div>
                                <div className='hover' style={{ width: '25%', borderRight: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}
                                    onClick={(e) => {
                                        ReactGA.event({
                                            category: "expedition_pets",
                                            action: 'reset_all',
                                            label: 'expedition'
                                        })
                                        if (data.PetsCollection) {
                                            let petArr = [];
                                            for (let i = 0; i < originalPets.length; i++) {
                                                petArr.push(originalPets[i].ID)
                                            }
                                            handleItemSelected(petArr);
                                            setManualEnabledPets({});
                                        }

                                    }}>
                                    Reset
                                </div>
                                <div className='hover' style={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}
                                    onClick={(e) => {
                                        ReactGA.event({
                                            category: "expedition_pets",
                                            action: 'toggle_hide_locked',
                                            label: hideLocked ? 'show_locked' : 'hide_locked',
                                            value: hideLocked as any
                                        })
                                        setHideLocked(!hideLocked);
                                    }}
                                >
                                    {hideLocked ? `Show Locked` : `Hide Locked`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad placement */}
                    {/* <div style={{ width: '100%', height: '90px', backgroundColor: 'red' }}/> */}

                    <ItemSelection
                        weightMap={weightMap}
                        data={data}
                        selectedItems={selectedItems}
                        onItemSelected={handleItemSelected}
                        defaultRank={defaultRank}
                        showLocked={!hideLocked}
                        manualEnabledPets={manualEnabledPets}
                        originalPets={originalPets}
                    />
                </div>
            </div>

            {/* pillar right  */}
            <div id='right_pillar_160' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} />


        </div >
    );
}