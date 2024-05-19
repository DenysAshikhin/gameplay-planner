import React, { useCallback, useMemo } from 'react';
import './PetItem.css';
import helper from '../util/helper'

import MouseOverPopover from "../util/Tooltip";
import { BonusMap } from "../util/itemMapping";
import petHelper from '../util/petHelper';

import Image from 'next/image';
import infoIconAmber from '@images/icons/info_amber.svg';
import infoIconBlue from '@images/icons/info_blue.svg';

const filterBonuses = (bonuses, filterFn) => {
    return bonuses
        .filter(filterFn);
};

type PetItemOptions = {
    petData,
    isSelected?: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    data,
    weightMap,
    petScoreFn?: (pet: any) => number,
    defaultRank,
    borderActive?: boolean,
    enabledBonusHighlight?,
    fullPetData,
    showNameOnly?: boolean,
    grayBackground?: boolean,
    circleBorder?: boolean,
}

export function PetItem({ petData, isSelected, onClick, data, weightMap, petScoreFn, defaultRank, borderActive, enabledBonusHighlight, fullPetData, showNameOnly, grayBackground, circleBorder }: PetItemOptions) {
    if (!!data === false) return <div></div>;
    const { petId, location, img, name } = petData;

    // Find the pet from the data.PetsCollection
    const pet = data.PetsCollection.find(p => p.ID === petId);

    if (!pet) return null; // In case the pet is not found in the collection

    const rank = defaultRank ? defaultRank : pet.Rank;
    const level = pet.Level;
    const totalScore = Number(
        Number(data?.PetDamageBonuses) * pet.BaseDungeonDamage * (1.0 + rank * 0.05) * 5
    ).toExponential(2);

    // const weightedBonuses = filterBonuses(pet.BonusList, (bonus) => {
    //     return bonus.ID < 1000;
    // }).reduce((accum, activePetBonus) => {
    //     const {ID, } = activePetBonus;
    //     const result = weightMap[ID]?.weight;
    //     if (result) accum += result;
    //     return accum;
    // }, 0);

    const weightedActiveScore = petScoreFn ? petScoreFn(pet) : 0;

    const section1Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => {
                return bonus.ID < 1000;
            }).map((activePetBonus, i) => {
                const result = petHelper.calcEquipBonus(pet, activePetBonus);

                return (
                    <li key={i}>
                        {BonusMap[activePetBonus.ID]?.label}: {result.toExponential(2)}
                    </li>
                );
            })}
        </ul>
    );

    const section2Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => bonus.ID >= 1000 && bonus.ID < 5000)
                .map((activePetBonus, i) => {
                    return (
                        <li key={i}>
                            {BonusMap[activePetBonus.ID]?.label}: {Number(activePetBonus.Power).toExponential(2)}
                        </li>
                    );
                })}
        </ul>
    );


    let numHighlights = [];
    if (enabledBonusHighlight) {
        for (const [key, value] of Object.entries(enabledBonusHighlight)) {
            if (value) {
                let found = fullPetData.BonusList.find((a) => a.ID === Number(key));
                if (found) {
                    numHighlights.push(key)
                }
            }
        }
    }

    const scalingOverrides = {
        'Niord': '65px',
        'Cocorico': '63px',
        'Apollo': '60px',
        'Abby': '60px'
    }

    let maxDimension = '';
    if (circleBorder) {
        if (scalingOverrides[name]) {
            maxDimension = scalingOverrides[name];
        }
        else {
            maxDimension = '75px';
        }
    }
    const promotion = pet.promotion ? pet.promotion : 0;
    return (

        <MouseOverPopover
            tooltip={
                <div
                    className="tooltip-custom "
                >
                    <h3
                        style={{ marginTop: '0' }}
                    >
                        <div>

                        {`${name} (${promotion}*)  (${totalScore})`}
                        </div>
                        <div>
                            (Level: {level}) (Rank: {rank})  ({location})

                        </div>
                    </h3>
                    <div>
                        <h4
                            style={{ margin: '6px 0 6px 0' }}
                        >Active Bonuses</h4>
                        {section1Bonuses}
                    </div>
                    <div>
                        <h4
                            style={{ margin: '6px 0 6px 0' }}
                        >Expedition Bonuses:</h4>
                        {section2Bonuses}
                    </div>
                </div>
            }>
            {!showNameOnly && (
                <div style={
                    circleBorder ? {
                        borderRadius: '45px',
                        border: '2px solid black',
                        overflow: 'hidden',
                        // position: 'relative',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                        : {}}>
                    <div
                        key={petId}
                        onClick={onClick}
                        style={{
                            display: 'flex',
                            // position: circleBorder ? 'absolute' : '',
                            // top: circleBorder ? '-10px' : ''
                        }}
                        className={`item-tile${pet.Type === 1 ? '-ground ' : '-air '} ${isSelected ? '' : 'unselected'}`}
                    // className={`item-tile ${isSelected ? '' : 'unselected'}`}
                    >
                        <div
                            className="item-image-container"
                            style={{
                                border: borderActive ? 'black 1px solid' : '',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                maxHeight: maxDimension,
                                maxWidth: maxDimension
                            }}>
                            {numHighlights.map((item, index) => {
                                return (<div
                                    key={index}
                                    style={{
                                        background: helper.bonusColorMap[item].color,
                                        position: 'absolute',
                                        top: '0%',
                                        left: `${(100 / numHighlights.length) * index}%`,
                                        height: '100%',
                                        width: `${100 / numHighlights.length}%`,
                                        zIndex: 1
                                    }}
                                >

                                </div>)
                            })}
                            {/* <div className="item-image"> */}
                            <Image
                                alt={`in game image of ${name}`}
                                src={img}
                                className={circleBorder ? '' : 'item-image'}
                                style={{
                                    zIndex: '2',
                                    objectFit: 'contain',
                                    maxHeight: circleBorder ? maxDimension : '',
                                    maxWidth: circleBorder ? maxDimension : '',
                                    height: '60px',
                                    width: 'auto'
                                }}
                            />
                            {/* <img alt={`in game image of ${name}`} src={img}
                                className={circleBorder ? '' : 'item-image'}
                                style={{
                                    zIndex: '2',
                                    objectFit: 'contain',
                                    maxHeight: circleBorder ? maxDimension : '',
                                    maxWidth: circleBorder ? maxDimension : '',
                                }}
                            /> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}

            {showNameOnly && (
                <div
                    style={{
                        width: '100%',
                        backgroundColor: grayBackground ? 'lightgray' : ''
                    }}>
                    {`(${pet.Type === 1 ? 'Ground' : 'Air'}) ${name}`}
                </div>
            )}

        </MouseOverPopover>
    );
};

export function PetItemExpeditions({ petData, isSelected, onClick, data, weightMap, petScoreFn, defaultRank, borderActive, enabledBonusHighlight, fullPetData, showNameOnly, grayBackground, circleBorder }) {
    if (!!data === false) return <div></div>;
    const { petId, location, img, name } = petData;

    // Find the pet from the data.PetsCollection
    const pet = data.PetsCollection.find(p => p.ID === petId);

    if (!pet) return null; // In case the pet is not found in the collection

    const rank = defaultRank ? defaultRank : pet.Rank;
    const level = pet.Level;
    const totalScore = Number(
        Number(data?.PetDamageBonuses) * pet.BaseDungeonDamage * (1.0 + rank * 0.05) * 5
    ).toExponential(2);

    // const weightedBonuses = filterBonuses(pet.BonusList, (bonus) => {
    //     return bonus.ID < 1000;
    // }).reduce((accum, activePetBonus) => {
    //     const {ID, } = activePetBonus;
    //     const result = weightMap[ID]?.weight;
    //     if (result) accum += result;
    //     return accum;
    // }, 0);

    const weightedActiveScore = petScoreFn ? petScoreFn(pet) : 0;

    const section1Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => {
                return bonus.ID < 1000;
            }).map((activePetBonus, i) => {
                const result = petHelper.calcEquipBonus(pet, activePetBonus);

                return (
                    <li key={i}>
                        {BonusMap[activePetBonus.ID]?.label}: {result.toExponential(2)}
                    </li>
                );
            })}
        </ul>
    );

    const section2Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => bonus.ID >= 1000 && bonus.ID < 5000)
                .map((activePetBonus, i) => {
                    return (
                        <li key={i}>
                            {BonusMap[activePetBonus.ID]?.label}: {Number(activePetBonus.Power).toExponential(2)}
                        </li>
                    );
                })}
        </ul>
    );


    let numHighlights = [];
    if (enabledBonusHighlight) {
        for (const [key, value] of Object.entries(enabledBonusHighlight)) {
            if (value) {
                let found = fullPetData.BonusList.find((a) => a.ID === Number(key));
                if (found) {
                    numHighlights.push(key)
                }
            }
        }
    }

    const scalingOverrides = {
        'Niord': '65px',
        'Cocorico': '63px',
        'Apollo': '60px',
        'Abby': '60px'
    }

    let maxDimension = '';
    if (circleBorder) {
        if (scalingOverrides[name]) {
            maxDimension = scalingOverrides[name];
        }
        else {
            maxDimension = '75px';
        }
    }
    const promotion = pet.promotion ? pet.promotion : 0;
    return (

        <MouseOverPopover
            tooltip={
                <div
                    className="tooltip-custom "
                >
                    <h3
                        style={{ marginTop: '0' }}
                    >
                        <div>

                        {`${name} (${promotion}*)  (${totalScore})`}
                        </div>
                        <div>
                            (Level: {level}) (Rank: {rank})  ({location})

                        </div>
                    </h3>
                    <div>
                        <h4
                            style={{ margin: '6px 0 6px 0' }}
                        >Active Bonuses</h4>
                        {section1Bonuses}
                    </div>
                    <div>
                        <h4
                            style={{ margin: '6px 0 6px 0' }}
                        >Expedition Bonuses:</h4>
                        {section2Bonuses}
                    </div>
                </div>
            }>
            {!showNameOnly && (
                <div style={
                    circleBorder ? {
                        borderRadius: '45px',
                        border: '2px solid black',
                        overflow: 'hidden',
                        // position: 'relative',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                        : {}}>
                    <div
                        key={petId}
                        onClick={onClick}
                        style={{
                            display: 'flex',
                            // position: circleBorder ? 'absolute' : '',
                            // top: circleBorder ? '-10px' : ''
                        }}
                        className={`item-tile${pet.Type === 1 ? '-ground ' : '-air '} ${isSelected ? '' : 'unselected'}`}
                    // className={`item-tile ${isSelected ? '' : 'unselected'}`}
                    >
                        <div
                            className="item-image-container"
                            style={{
                                border: borderActive ? 'black 1px solid' : '',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                maxHeight: maxDimension,
                                maxWidth: maxDimension
                            }}>
                            {numHighlights.map((item, index) => {
                                return (<div
                                    key={index}
                                    style={{
                                        background: helper.bonusColorMap[item].color,
                                        position: 'absolute',
                                        top: '0%',
                                        left: `${(100 / numHighlights.length) * index}%`,
                                        height: '100%',
                                        width: `${100 / numHighlights.length}%`,
                                        zIndex: 1
                                    }}
                                >

                                </div>)
                            })}
                            {/* <div className="item-image"> */}
                            <Image
                                alt={`in game image of ${name}`}
                                src={img}
                                className={circleBorder ? '' : 'item-image'}
                                style={{
                                    zIndex: '2',
                                    // objectFit: 'contain',
                                    maxHeight: circleBorder ? maxDimension : '',
                                    maxWidth: circleBorder ? maxDimension : '',
                                    height: '60px',
                                    width: '60px'
                                }}
                            />
                            {/* <img alt={`in game image of ${name}`} src={img}
                                className={circleBorder ? '' : 'item-image'}
                                style={{
                                    zIndex: '2',
                                    objectFit: 'contain',
                                    maxHeight: circleBorder ? maxDimension : '',
                                    maxWidth: circleBorder ? maxDimension : '',
                                }}
                            /> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}

            {showNameOnly && (
                <div
                    style={{
                        width: '100%',
                        backgroundColor: grayBackground ? 'lightgray' : ''
                    }}>
                    {`(${pet.Type === 1 ? 'Ground' : 'Air'}) ${name}`}
                </div>
            )}

        </MouseOverPopover>
    );
};

type StaticPetItemOptions = {
    petData,
    highlight?,
    showNameOnly?: boolean,
    statMode?: boolean,
    groupsCacheRunTime?: any,
    suggestedPet?: boolean,
    groupsSaveFile?: {},
}

export function StaticPetItem({ petData, highlight, showNameOnly, statMode, groupsCacheRunTime = {}, suggestedPet, groupsSaveFile = {} }: StaticPetItemOptions) {
    const { petId, location, img, name, pet } = petData;

    const section1Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => {
                return bonus.ID < 1000;
            }).map((activePetBonus, i) => {
                const result = petHelper.calcEquipBonus(pet, activePetBonus);

                return (
                    <li key={i}>
                        {BonusMap[activePetBonus.ID]?.label}: {result.toExponential(2)}
                    </li>
                );
            })}
        </ul>
    );

    const section2Bonuses = (
        <ul
            style={{ margin: '0 0 0 0' }}
        >
            {filterBonuses(pet.BonusList, (bonus) => bonus.ID >= 1000 && bonus.ID < 5000)
                .map((activePetBonus, i) => {
                    return (
                        <li key={i}>
                            {BonusMap[activePetBonus.ID]?.label}: {Number(activePetBonus.Power).toExponential(2)}
                        </li>
                    );
                })}
        </ul>
    );

    const getWarnIcon = () => {
        if (showNameOnly || !suggestedPet) return <></>;
        const showNotInSaveWarning = !groupsSaveFile[petId];
        const showNotInCacheWarning = groupsCacheRunTime.length != 0 && (!groupsCacheRunTime[pet.ID])
        let warning = "";
        let showBlue = false;
        if (showNotInCacheWarning && showNotInSaveWarning) {
            warning = "This pet is neither in an suggested expedition team nor in one active team in your save file, you should probably put it in";
        } else if (showNotInCacheWarning) {
            warning = "This pet is not in an suggested expedition team, you should probably put it in";
        } else {
            showBlue = true;
            warning = "This pet is not in an active expedition team from your save file, you should probably put it in";
        }

        if (!showNotInCacheWarning && !showNotInSaveWarning) {
            return <></>;
        }

        return (
            <div
                className='elementToFadeInAndOut'
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '32px',
                    height: '32px',
                    zIndex: '4'
                }}>

                <MouseOverPopover
                    tooltip={<span className='toltip-custom'>{warning}</span>}

                    forceYPlacement={'top'}
                    forceXPlacement={'left'}>

                    <Image
                        alt='Letter "I" inside a circle, shows more information on hover'
                        src={showBlue ? infoIconBlue : infoIconAmber}
                        fill
                    />
                </MouseOverPopover >
            </div >
        )
    }


    let baseDmg: number | string = petHelper.calculatePetBaseDamage(pet, pet.Rank);
    if (baseDmg < 100) {
        baseDmg = helper.roundInt(baseDmg);
    }
    else {
        baseDmg = baseDmg.toExponential(2);
    }

    let promotion = pet.promotion ? pet.promotion : 0;

    return (
        <>

            <MouseOverPopover
                tooltip={
                    <div
                        className="tooltip-custom "
                    >
                        <h3
                            style={{ marginTop: '0', marginBottom: '3px', textAlign: 'center' }}
                        >
                            {`${name} (${promotion}*) -> ${location}`}
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                {`Rank: ${pet.Rank}`}
                            </div>
                            <div style={{margin: '0 6px'}}>
                                {`Level: ${pet.Level}`}
                            </div>
                            <div>
                                {`Damage: ${baseDmg}`}
                            </div>
                        </div>
                        <div>
                            <h4
                                style={{ margin: '6px 0 6px 0' }}
                            >Active Bonuses</h4>
                            {section1Bonuses}
                        </div>
                        <div>
                            <h4
                                style={{ margin: '6px 0 6px 0' }}
                            >Expedition Bonuses:</h4>
                            {section2Bonuses}
                        </div>
                    </div>
                }>
                {!showNameOnly && (
                    <>
                        <Image
                            alt={`in game image of ${name}`}
                            src={img}
                            className='item-image'
                            style={{
                                objectFit: 'scale-down',
                                width: 'auto', height: 'auto'
                            }}
                            unoptimized
                            priority
                        />
                    </>

                    // <img alt={`in game image of ${name}`} src={img} className='item-image' />
                )}

                {showNameOnly && (
                    <>
                        {name}
                    </>
                )}

            </MouseOverPopover>
            {getWarnIcon()}

        </>);
};
