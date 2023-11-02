"use client"


import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import useLocalStorage from "use-local-storage";
import './JSONDisplay.css'; // Add this line to import the CSS file
import { BonusMap, petNameArray, petNames, DefaultWeightMap } from '../util/itemMapping.js';
import PetItem from './PetItem';
import ItemSelection from "../util/ItemSelection";
import MouseOverPopover from "../util/Tooltip";

import helper from '../util/helper.js';
import xIcon from "../../../public/images/icons/x_icon.svg"
import pinIcon from "../../../public/images/icons/pin-line-icon.svg"
import trashIcon from "../../../public/images/icons/trash-can-icon.svg"
import infoIcon from '../../../public/images/icons/info.svg';
import infoIconRed from '../../../public/images/icons/info_red.svg';
import infoIconGreen from '../../../public/images/icons/info_green.svg';
import infoIconAmber from '../../../public/images/icons/info_amber.svg';
// import rankExplain from "../../../public/images/rank_explain.png"

import ReactGA from "react-ga4";
import SearchBox from '../util/search.jsx';
import petHelper from '../util/petHelper.js';
import DefaultSave from '../util/tempSave.json';

let groupCache = {};
function setGroupCache(newCache) {
    groupCache = newCache;
}

const defaultPetSelection = petNameArray.map(petData => petData.petId);

function ScoreSection({ data, group, totalScore, defaultRank }) {
    const { baseGroupScore, groupScoreMax, dmgCount, timeCount, synergyBonus, groupScore } = petHelper.calculateGroupScore(group, defaultRank);
    const score = groupScore;
    const displayedDamage = (score * 5 * data.PetDamageBonuses).toExponential(2);
    return (
        <>
            <ul>
                {/* <li key="totalScore">
                    {`True Damage: ${(5 * groupScoreMax * Number(data?.PetDamageBonuses)).toExponential(2)}`}
                </li> */}
                <li key="totalScore">
                    {`Rank 1 Damage: ${displayedDamage}`}
                </li>
                <li key="baseGroupScore">
                    Group Base: {Number(baseGroupScore).toExponential(2)}
                </li>
                <li key="damageBonus">
                    Dmg Bonus: {Number(1 + dmgCount * petHelper.EXP_DMG_MOD).toFixed(2)}x
                </li>
                <li key="timeBonus">
                    Time Bonus: {Number(1 + timeCount * petHelper.EXP_TIME_MOD).toFixed(2)}x
                </li>
                <li key="synergyBonus">
                    Synergy: {Number(synergyBonus).toFixed(2)}x
                </li>
                <li key="petDamageBonus">
                    PetDmgMod: {Number(data?.PetDamageBonuses).toExponential(2)}
                </li>
            </ul>
        </>
    );
}

export default function Expeditions() {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);








    const [petWhiteList, setPetWhiteListRunTime] = useState([]);
    const [petWhiteListClient, setPetWhiteList] = useLocalStorage("petWhiteList", []);
    useEffect(() => {
        setPetWhiteListRunTime(petWhiteListClient);
    }, [petWhiteListClient]);

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

    const [numTeams, setNumTeamsRunTime] = useState(-1);
    const [numTeamsClient, setNumTeams] = useLocalStorage("numTeams", -1);
    useEffect(() => {
        setNumTeamsRunTime(numTeamsClient);
    }, [numTeamsClient]);

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

    const includeLocked = false;

    const handleGroups = useCallback((data, selectedItems, recalculate) => {
        console.log(`handle groups called`)
        const petData = data?.PetsCollection || [];
        const selectedItemsById = petData.reduce((accum, item) => {
            accum[parseInt(item.ID, 10)] = item;
            return accum;
        }, {})

        const localPets = selectedItems.map(petId => selectedItemsById[petId])
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
                    petWhiteList: petWhiteList
                }
            );
            setGroupCache({ ...groupCache, [keyString]: groups })
            setGroups(groups);
        }
    }, [activeCustomBonuses, defaultRank, groupRankCritera, numTeams, petWhiteList, tokenDamageBias]);


    const dataLoaded = useRef(false);

    useEffect(() => {


        if (dataLoaded.current === false) {

            dataLoaded.current = true;
            let uploadedData = clientData;
            uploadedData.PetDamageBonuses = helper.calcPOW(uploadedData.PetDamageBonusesBD);

            let specialPetCombo = 1;
            for (let i = 0; i < uploadedData.PetsSpecial.length; i++) {
                let t = uploadedData.PetsSpecial[i];
                if (t.BonusID === 5007 && t.Active === 1) {
                    specialPetCombo += t.BonusPower / 100;
                }
            }
            specialPetCombo = helper.roundTwoDecimal(specialPetCombo);

            setComboSelector(specialPetCombo);

            if (numTeams === -1) {
                setNumTeams(uploadedData.ExpeditionLimit);
            }
            setGroupCache({});

            uploadedData.PetsCollection.sort((a, b) => a.ID - b.ID);

            let tempPets = [];
            const positiveRankedPets = uploadedData.PetsCollection.filter(
                (pet) => {
                    // const isValidRank = !!pet.Rank;//Instead of relying on defaultRank always = 0, select valid ranks if they exist (not 0)
                    const isValidLocked = includeLocked ? true : !!pet.Locked;
                    if (isValidLocked) {
                        tempPets.push(pet);
                    }
                    return isValidLocked;
                    // return isValidRank && isValidLocked;
                }
            ).map((pet) => pet.ID);
            setSelectedItems(positiveRankedPets);
            setOriginalPets(tempPets);
            setSelectedPets(tempPets);

            handleGroups(uploadedData, positiveRankedPets);

            setRunTimeData(clientData);
        }
    }, [clientData, handleGroups, includeLocked, numTeams, setComboSelector, setData, setNumTeams]);














    useEffect(() => {
        let timeout = setTimeout(() => {

            ReactGA.send({ hitType: "pageview", page: "/expeditions", title: "Expedition Calculator Page" });
        }, 5000);
        return () => { clearTimeout(timeout) };
    }, [])


    let totalTokensHR = 0;
    let damageTotal = 0;

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


    for (let i = 0; i < petWhiteList.length; i++) {
        let cur = petWhiteList[i];
        if (cur.placement === `rel`) {
            relWhiteListMap[cur.id] = { ...cur };
        }
    }


    // if (groups && groupRankCritera === 2)
    if (groups.length > 0)
        groups.map((group, index) => {
            damageTotal += (petHelper.calculateGroupScore(group, defaultRank).groupScore) * 5 * data.PetDamageBonuses;
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


            const groupBests = petHelper.calculateBestHours(group, null, { clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data }, comboSelector)[tokenSelections[index]];
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
            try {
                if (pet.ID > 0)
                    filterablePets.push({ id: pet.ID, label: petNames[pet.ID].name })
            }
            catch (err) {
                console.log(err);
                let x = 0;
            }
        })
    }

    const leftOverIgnore = {
        17: true,//attack speed
        30: true,//contagion hp damage
        27: true,//fries bonus
        19: true,//Pet LEVEL Exp
        18: true,//Pet Dmg
        20: true,//Pet Rank Exp
        26: true,//Plant Final Prod
        32: true,//Plant Growth
        25: true,//Plant Manual Harvest
        26: true,//Plant Final Prod
        24: true,//Plant Rank Exp
        31: true,//Reinc Point Bonus
        18: true,//Pet Dmg
        18: true,//Pet Dmg
        18: true,//Pet Dmg
        18: true,//Pet Dmg
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
        for (let i = 0; i < items.length; i++) {
            localPets.push(petData[items[i]])
        }

        setSelectedPets(localPets);

        if (items) handleGroups(data, items);
    };

    leftOver1Pets = leftOver1Pets.sort((a, b) => petHelper.calculatePetBaseDamage(b, defaultRank) - petHelper.calculatePetBaseDamage(a, defaultRank))

    let filterableBonuses = Object.values(BonusMap)
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((inner_e) => {
            if (inner_e.id < 5000) {
                if (inner_e.id >= 1000 && !inner_e.label.includes(`Expedition`)) {
                    inner_e.label += ` Expedition`;
                }
                return inner_e;
            }
        })
        .filter((e) => !!e && !leftOverIgnore[e.id])


    return (
        <div
            className="grid-container"
            style={{
                gridTemplateColumns: '4fr 4fr 4fr',
                columnGap: '12px',
                width: 'calc(100% - 0px)'
            }}
        >
            {/* Grid Left */}
            <div
                style={{
                    height: 'calc(100vh - 52px)',
                    border: '2px solid black',
                    margin: '6px',
                    padding: '0px 0 2px 0px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '300px',
                        height: '100%',
                    }}
                >
                    <div>

                        <div
                            style={{ fontSize: '32px', fontWeight: 'bold', width: '100%', borderBottom: '0px solid black' }}>
                            Best Teams
                        </div>
                        <div style={{
                            display: 'flex', fontSize: '20px', fontWeight: 'bold',
                            borderTop: '2px solid black',
                            borderBottom: '2px solid black'
                        }}>
                            <div style={{ width: '50%', borderRight: '2px solid black' }}>
                                {`Total Damage: ${damageTotal.toExponential(3)}`}
                            </div>
                            <div style={{ width: '50%' }}>
                                {`Total tokens/hr: ${helper.roundThreeDecimal(totalTokensHR)}`}
                            </div>
                        </div>
                    </div>

                    <div style={{ overflow: 'auto' }}>

                        {groups.reduce((accum, group, index) => {
                            let groupLabel = ``;

                            const groupTotal = petHelper.calculateGroupScore(group, defaultRank);
                            // let tokenScore = groupTotal.tokenMult * (Math.pow(1 + petHelper.SOUL_CLOVER_STEP, data.SoulGoldenClover)) * (1 + 0.05 * data.SoulGoldenClover) * comboSelector;s
                            // let tokenScore = groupTotal.tokenMult * (Math.pow(1 + petHelper.SOUL_CLOVER_STEP, data.SoulGoldenClover)) * comboSelector * data.ExpeditionTokenBonuses;
                            // tokenScore = tokenScore.toExponential(3);
                            let tempTokenScore = petHelper.calculateBestHours(group, null, { clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data }, comboSelector)[tokenSelections[index]]
                            let tokenScore = (tempTokenScore.tokenHR / tempTokenScore.hours).toExponential(3);
                            const score = groupTotal.groupScore;
                            const displayedDamage = (score * 5 * data.PetDamageBonuses).toExponential(3);
                            const trueDamage = (5 * groupTotal.groupScoreMax * Number(data?.PetDamageBonuses)).toExponential(2);

                            let tokenInfo = ``;

                            let groupLabelDamage = ``;
                            let groupLabelToken = ``;

                            switch (groupRankCritera) {
                                case 1://damage
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupLabelDamage = `Damage: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, { clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data }, comboSelector);

                                    break;
                                case 2://token
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupLabelDamage = `Damage: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, { clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data }, comboSelector);
                                    break;
                                case 3://Advanced
                                    groupLabel = `Group ${index + 1}`;
                                    // groupLabelDamage = `Damage: ${displayedDamage}`
                                    groupLabelDamage = `Damage: ${trueDamage}`
                                    groupLabelToken = `Token/hr: ${tokenScore}`
                                    tokenInfo = petHelper.calculateBestHours(group, null, { clover: data.SoulGoldenClover, residueToken: data.CowShopExpeditionToken, data: data }, comboSelector);
                                    break;
                                default:
                                    break;

                            }

                            const totalScore = Number(Number(data?.PetDamageBonuses) * score * 5).toExponential(3);
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
                                    marginBottom: '6px'
                                }}
                            >

                                <div
                                    style={{ display: 'flex', width: '100%', borderBottom: '1px solid black' }}
                                >
                                    <div
                                        style={{ borderRight: '1px solid black', width: '25%', }}>
                                        <MouseOverPopover tooltip={groupTooltip}>
                                            <div
                                                style={{ display: 'flex', alignItems: 'center', margin: '0 12px', }}
                                            >
                                                <div>
                                                    {groupLabel}
                                                </div>
                                                <div style={{ height: '16px', width: '16px', margin: '0 0 0 6px', position: 'relative' }} >
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
                                        style={{ width: '37.5%', borderRight: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <div style={{ margin: '0 12px' }}>

                                            {groupLabelDamage}
                                        </div>
                                    </div>
                                    <div
                                        style={{ width: '37.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                                        display: 'flex', padding: '0 6px 3px 6px'
                                    }}
                                >
                                    {!!group && group.map((petData, idx) => {
                                        const { ID } = petData;
                                        let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === ID)

                                        if (!staticPetData) {
                                            staticPetData = {
                                                img: '/images/pets/missing.png',
                                                location: '??-??',
                                                name: 'Unknown',
                                                petId: ID
                                            }
                                        }

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
                                                <PetItem
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
                                                    <div style={{ width: '20px', height: '20px', position: 'relative' }} >
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
                                                                temp.push({ label: staticPetData.name, id: staticPetData.petId, placement: 'blacklist', parameters: { team: 0, damageBias: 17 }, pet: petData });
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
                                                    <div style={{ width: '20px', height: '20px', position: 'relative' }} >
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
                                    flexDirection: 'column',
                                    border: groupRankCritera === 2 && groupTotal.tokenRewardCount > 0 ? '1px black solid' : 'none',
                                    marginTop: index === 0 ? '12px' : '24px',
                                    marginLeft: '6px',
                                    marginRight: '6px',
                                    border: '1px solid black'
                                }}>
                                {GroupTitle}
                                {GroupIcons}
                            </div>
                            accum.push(finalRow);

                            return accum;
                        }, [])}
                    </div>
                </div>
            </div>

            <div
                style={{
                    border: '2px black solid',
                    marginRight: '6px',
                    marginTop: '6px',
                    maxHeight: 'calc(100vh - 50px)'
                    // padding: '0 12px 0 12px'
                }}>
                <div style={{ display: 'flex', width: '100%', borderBottom: '2px solid black' }}>

                    <div style={{ fontSize: '32px', fontWeight: 'bold', }}>
                        Configuration
                    </div>
                    <div style={{ height: '30px', alignSelf: 'center', marginLeft: '12px' }} >
                        <MouseOverPopover
                            opacity='1'
                            tooltip={
                                <div>
                                    {/* <img alt='screenshot of game text explaining how pet ranks work' src={rankExplain} style={{ height: '50px' }} /> */}
                                    <img alt='screenshot of game text explaining how pet ranks work' src={'/images/rank_explain.png'} style={{ height: '50px' }} />
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
                <div
                    style={{ padding: '6px 3px 1px 3px', overflow: 'auto', maxHeight: 'calc(100% - 50px)' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    marginRight: '12px',
                                    color: 'blue',
                                    fontWeight: 'bold'
                                }}
                            >Filter</div>
                            <select
                                style={{ maxWidth: '144px' }}
                                disabled={refreshGroups}
                                onChange={async (e) => {


                                    ReactGA.event({
                                        category: "expedition_filter",
                                        action: 'changed_filter',
                                        label: 'expedition'
                                    })

                                    switch (e.target.value) {
                                        case 'damage':

                                            ReactGA.event({
                                                category: "expedition_filter",
                                                action: 'filter_damage',
                                                label: 'expedition'
                                            })
                                            setGroupRankCriteria(1);
                                            break;
                                        case 'token':

                                            ReactGA.event({
                                                category: "expedition_filter",
                                                action: 'filter_token',
                                                label: 'expedition'
                                            })
                                            setGroupRankCriteria(2);
                                            break;
                                        case 'advanced':

                                            ReactGA.event({
                                                category: "expedition_filter",
                                                action: 'filter_advanced',
                                                label: 'expedition'
                                            })
                                            setGroupRankCriteria(3);
                                            break;
                                        default:
                                            throw new Error('invalid dropdown selector');
                                    }
                                }}
                                value={groupRankCritera === 1 ? 'damage' : 'token'}
                            >
                                <option value="damage">Max Damage</option>
                                <option value="token">Max Tokens {`->`} Damage</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex' }}>

                            <div>{`Ignore Pets Rank`}</div>
                            <input
                                disabled={refreshGroups}
                                type="checkbox"
                                onChange={(e) => {
                                    setDefaultRank(e.target.checked ? 1 : 0)
                                }}
                                checked={!!defaultRank}
                                value={!!defaultRank}
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '12px' }}>

                                {`Golden Clover Level: ${data.SoulGoldenClover}`}
                            </div>
                            <div>

                                {`Token Bonuses: ${helper.roundTwoDecimal(data.ExpeditionTokenBonuses)}`}
                            </div>
                        </div>
                        <div style={{ display: 'flex', }}>

                            <MouseOverPopover tooltip={
                                <div>
                                    Expedition reward from active pets special combo (0, 10%, 20%)
                                </div>
                            }>
                                <div style={{ marginRight: '12px' }}>
                                    Expedition Reward Combo
                                </div>
                            </MouseOverPopover>



                            <select
                                style={{ maxWidth: '144px' }}
                                disabled={refreshGroups}
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
                    </div>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <div
                            style={{
                                marginRight: '12px'
                            }}>
                            Number of teams:
                        </div>
                        <input id='prepFormInput'
                            type='number'
                            className='prepNumber'
                            value={numTeams}
                            onChange={
                                (e) => {
                                    try {
                                        let x = Number(e.target.value);
                                        x = Math.floor(x);
                                        if (x < 1 || x > 7) {
                                            return;
                                        }
                                        setNumTeams(e.target.value);
                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                    // console.log(`pressed: ${e.target.value}`)

                                }}
                            placeholder={numTeams + ''}
                            min="1"
                            max="7"
                        />
                    </div>


                    {/* Damage Bias */}
                    {groupRankCritera === 2 && (
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <MouseOverPopover tooltip={
                                <div>
                                    <div>
                                        Importance of token {`teams'`} damage priority
                                    </div>
                                    <div>
                                        Higher value means higher generated damage (by giving higher damage pets to token teams)
                                    </div>
                                    <div>
                                        Recommended range: 5-40
                                    </div>
                                </div>
                            }>
                                <div
                                    style={{
                                        marginRight: '12px',
                                        color: 'red'
                                    }}>
                                    Token Team Damage Bias:
                                </div>
                            </MouseOverPopover>

                            <input id='prepFormInput'
                                type='number'
                                className='prepNumber'
                                value={tokenDamageBias}
                                onChange={
                                    (e) => {
                                        try {
                                            let x = Number(e.target.value);
                                            x = Math.floor(x);
                                            if (x < 1 || x > 100) {
                                                return;
                                            }
                                            setTokenDamageBias(x);
                                        }
                                        catch (err) {
                                            console.log(err);
                                        }

                                    }}
                                placeholder={tokenDamageBias + ''}
                                min="0"
                                max="100"
                                step={5}

                            />
                        </div>
                    )}
                    {groupRankCritera === 1 && (
                        <div style={{ display: 'flex', marginTop: '12px' }}>

                            <div>{`Show all bonus totals`}</div>
                            <input disabled={refreshGroups} type="checkbox" onChange={(e) => {
                                setShowAllBonusTally(e.target.checked ? true : false)
                            }} />
                        </div>
                    )}
                    {/* Advanced filter table */}
                    {groupRankCritera === 1 && (
                        <div
                            style={{
                                margin: '0px 0 12px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1',
                                border: 'black 1px solid',
                                padding: '6px 6px 6px 6px'
                            }}
                        >

                            {/* Total bonuses pet amounts */}
                            <div
                                style={{
                                    margin: '6px 0 6px 0',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                {totalMessages.map((e, index) => {
                                    if (index % 2 !== 0 && index > 0) return;

                                    let firstDmgBias = Number(e.bonus);
                                    let secondDmgBias = (index + 1) < totalMessages.length ? Number(totalMessages[index + 1].bonus) : null;

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
                            <h4 style={{ margin: '0' }}>Pet Whitelist</h4>
                            {/* Pet whitelist stuff */}
                            <div style={{ margin: '0 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
                                <SearchBox data={{
                                    list: filterablePets
                                }}
                                    onSelect={(e) => {
                                        setPetWhiteList((curr) => {
                                            let temp = [...curr];
                                            let petObj = originalPets.find((search_pet) => search_pet.ID === e.id)
                                            temp.push({ ...e, placement: 'blacklist', parameters: { team: 0, damageBias: 17 }, pet: petObj });
                                            return temp;
                                        })
                                        setRefreshGroups(true);
                                    }}
                                />
                                <div
                                    style={{ display: 'flex' }}
                                >
                                    <div
                                        style={{ marginRight: '6px' }}
                                    >
                                        Team Presets
                                    </div>
                                    <select
                                        style={{ maxWidth: '144px', }}
                                        onChange={
                                            (e) => {

                                                let selectedTeam = data.PetsLoadout[Number(e.target.value)]
                                                console.log(selectedTeam);

                                                setPetWhiteList((curr) => {
                                                    let temp = [...curr];
                                                    // temp.push({ ...e, placement: 'blacklist', parameters: { team: 0, damageBias: 17 } });

                                                    for (let x = 0; x < selectedTeam.IDs.length; x++) {
                                                        let selected = selectedTeam.IDs[x];
                                                        if (selected > 0) {
                                                            let base = {
                                                                id: selected,
                                                                label: petNames[selected].name,
                                                                placement: 'rel',
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
                            </div>
                            {/* Pet white/black list */}
                            <div
                                style={{
                                    display: 'flex',
                                    boxShadow: `0 0 0 1px #ecf0f5`,
                                    backgroundColor: '#fbfafc',
                                    margin: '12px 1px 0 1px'
                                }}
                            >
                                <div
                                    style={{
                                        // background: 'red',
                                        width: '40%',
                                        display: 'flex',
                                        // boxShadow: `0 2px 1px -1px #ecf0f5`,
                                        // boxShadow: `0 0 0 1px #ecf0f5`,
                                        backgroundColor: '#fbfafc',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    Pet
                                </div>

                                {/* placement */}
                                <div
                                    style={{
                                        // background: 'yellow',
                                        width: '30%',
                                        display: 'flex',
                                        boxShadow: `0 0 0 1px #ecf0f5`,
                                        backgroundColor: '#fbfafc',
                                        justifyContent: 'center',
                                        alignItems: 'center'
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
                                                Relative: Tries to find optimal placement automatically based on `damage bias`
                                            </div>
                                        </div>
                                    }>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Placement
                                            </div>
                                            <div style={{ height: '16px', width: '16px', position: 'relative', marginLeft: '6px' }} >
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
                                        width: '30%',
                                        display: 'flex',
                                        // boxShadow: `0 0 0 1px #ecf0f5`,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <MouseOverPopover tooltip={
                                        <div style={{ padding: '6px' }}>
                                            <div>
                                                <div>
                                                    In Placement=Group, determines which group the pet is placed in
                                                </div>
                                                <div>
                                                    In Placement=Relative, determines which group the pet is placed in based on the bias number (higher means more damage necessary to placed in)
                                                </div>
                                            </div>
                                        </div>
                                    }>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                Parameters
                                            </div>
                                            <div style={{ height: '16px', width: '16px', position: 'relative', marginLeft: '6px' }} >
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
                            <div style={{ margin: '0 1px 0 1px', boxShadow: `0 0 0 1px #ecf0f5`, }}>
                                {petWhiteList.map((pet, index) => {
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
                                        let bigsad = -1;//

                                        let group_index = groups.findIndex((temp_e) => {
                                            return temp_e.find((temp_e2) => temp_e2.ID === pet.id)
                                        });

                                        if (group_index > -1) {

                                            //Check if this pet got put in too high

                                            let group = groups[group_index];

                                            try {
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
                                                                let bigsad = -1;
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
                                            }
                                            catch (err) {
                                                let temppp = group_index;
                                                console.log(err);
                                            }
                                            try {
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
                                                                let bigsad = -1;
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
                                            catch (err) {
                                                let tempy = group_index;
                                                console.log(err);
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
                                                boxShadow: `0 2px 1px -1px #ecf0f5`,
                                                display: 'flex',
                                                width: '100%'
                                            }}
                                        >
                                            {/* Pet name + delete */}
                                            <div style={{
                                                width: 'calc(40% - 1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                                                boxShadow: `2px 0 2px -1px #ecf0f5`
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
                                                        // alignContent: 'space-between',
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

                                                {/* <img alt='X (cross to remove)'
                                                    style={{
                                                        maxHeight: '12px',
                                                        margin: '0 12px 0 auto',
                                                        zIndex: '2'
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
                                                    src={xIcon}
                                                /> */}
                                            </div>
                                            {/* Pet Placement */}
                                            <div style={{ width: 'calc(30% + 1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `2px 0 2px -1px #ecf0f5`, }}>

                                                <select
                                                    style={{ maxWidth: '144px' }}
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
                                                    <option value={`rel`}>Relative</option>
                                                </select>

                                            </div>
                                            {/* parameters */}
                                            <div
                                                disabled={pet.placement === 'blacklist'}
                                                style={{
                                                    width: '30%',
                                                    position: 'relative',
                                                    opacity: pet.placement === 'blacklist' ? '0.4' : '', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                                }}
                                            >
                                                {pet.placement === 'team' && (
                                                    <div>
                                                        <select
                                                            style={{ maxWidth: '144px' }}
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
                                                            {Array(numTeams).fill(numTeams).map((e, index) => {
                                                                return <option value={index} key={index}>{index + 1}</option>
                                                            })}


                                                        </select>

                                                    </div>
                                                )}
                                                {pet.placement === `rel` && (
                                                    <div

                                                    >
                                                        <input
                                                            style={{ maxWidth: '36px' }}
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
                                                {pet.placement === 'blacklist' && (
                                                    <>Unavailable</>
                                                )}
                                                {(showGreen || showRed) && (
                                                    <div style={{ position: 'absolute', right: '34px' }}>
                                                        <MouseOverPopover muiHeight={'18px'} tooltip={<div>{hoverMsg}</div>} style={{ display: 'flex', alignItems: 'center', height: '18px' }}>

                                                            <div style={{ height: '18px', marginLeft: '6px', marginTop: '2px', position: 'relative' }}>
                                                                <Image
                                                                    alt='on hover I in a cirlce icon, shows more information on hover'
                                                                    src={showGreen ? infoIconGreen : infoIconRed}
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
                                    style={{ display: 'flex', width: '100%', marginTop: '12px', flexDirection: 'column' }}
                                >
                                    {/* Title */}
                                    <div
                                        style={{ display: 'flex', width: '100%' }}
                                    >
                                        <h4 style={{ margin: '0' }}> Leftover Pets</h4>

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

                                        <div
                                            style={{
                                                // margin: '6px 12px 0 12px'
                                                marginRight: '6px'
                                            }}
                                        >
                                            Select Bonus:
                                        </div>
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

                                    {/* Headers */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            boxShadow: `0 0 0 1px #ecf0f5`,
                                            backgroundColor: '#fbfafc',
                                            margin: '6px 1px 0 1px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '70%',
                                                display: 'flex',
                                                backgroundColor: '#fbfafc',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            Pet
                                        </div>

                                        {/* placement */}
                                        <div
                                            style={{
                                                width: '30%',
                                                display: 'flex',
                                                boxShadow: `0 0 0 1px #ecf0f5`,
                                                backgroundColor: '#fbfafc',
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
                                    <div style={{ margin: '0 1px 0 1px', boxShadow: `0 0 0 1px #ecf0f5`, }}>
                                        {leftOver1Pets.map((pet) => {
                                            let staticPetData = petNameArray.find(staticPetDatum => staticPetDatum.petId === pet.ID)

                                            if (!staticPetData) {
                                                staticPetData = {
                                                    img: '/images/pets/missing.png',
                                                    location: '??-??',
                                                    name: 'Unknown',
                                                    petId: pet.ID
                                                }
                                            }
                                            return (
                                                <div
                                                    key={pet.label}
                                                    style={{
                                                        boxShadow: `0 2px 1px -1px #ecf0f5`,
                                                        display: 'flex',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {/* Pet name + pin */}
                                                    <div style={{
                                                        width: 'calc(70% - 1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                                                        boxShadow: `2px 0 2px -1px #ecf0f5`
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
                                                                    marginLeft: '6px',
                                                                    width: '100%'
                                                                }}
                                                            >
                                                                {/* {petNames[pet.ID].name} */}
                                                                <PetItem
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
                                                                    height: '100%',
                                                                    width: '24px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div style={{
                                                                    position: 'relative',
                                                                    width: '14px', height: '14px'
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
                                                    <div style={{ width: 'calc(30% + 1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `2px 0 2px -1px #ecf0f5`, }}>
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
            <div
                style={{ border: '2px solid black', marginTop: '6px', marginRight: '6px', maxHeight: 'calc(100vh - 50px)' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', borderBottom: '2px solid black' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '30px' }}>
                            Pets
                        </div>
                        <div style={{ fontWeight: 'bold', alignSelf: 'end', marginLeft: '6px', marginBottom: '5px', fontSize: '16px' }}>
                            (click to enable/disable)
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>

                        <div className='hover' style={{ width: '100%', borderBottom: '2px solid black', display: 'flex', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                            <div style={{ width: '25%', borderRight: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }} onClick={(e) => {
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
                            <div className='hover' style={{ width: '25%', borderRight: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}
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
                            <div className='hover' style={{ width: '25%', borderRight: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}
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
                                        value: hideLocked
                                    })
                                    setHideLocked(!hideLocked);
                                }}
                            >
                                {hideLocked ? `Show Locked` : `Hide Locked`}
                            </div>
                        </div>

                    </div>
                </div>
                <ItemSelection
                    weightMap={weightMap}
                    data={data}
                    selectedItems={selectedItems}
                    onItemSelected={handleItemSelected}
                    defaultRank={defaultRank}
                    showLocked={!hideLocked}
                />
            </div>
        </div >
    );
}