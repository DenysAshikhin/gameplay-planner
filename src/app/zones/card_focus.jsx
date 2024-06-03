
import { useState, useEffect, useMemo, } from 'react';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip.jsx";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";


import pinIcon from "../../../public/images/icons/pin-line-icon.svg"
import trashIcon from "../../../public/images/icons/trash-can-icon.svg"

import { zone_priority, zone_ratios, zone_data, calc_max_hp, calc_total_hp, card_priority } from './zone_lists.js';

import Image from 'next/image';

import {
    POTATO,
    CLASSEXP,
    SKULL,
    CONFECTIONEXP,
    REINCARNATIONEXP,
    ITEMRATING,
    POOPBONUS,
    MILKBONUS,
    WHACKSCORE,
    BREWINGEXP,
    CALCIUMEXP,
    FERMENTINGEXP,
    RESIDUEBONUS,
    WORMQTY,
    LARVAQTY,
    LARVAEFF,
    ATTACKHP,
    PETDMG,
    PETLEVELEXP,
    PETRANKEXP,
    CARDPOWERB,
    CARDEXPB,
    HEALTHYBONUS,
    FRIESBONUS,
    PROTEINBONUS,
    GHBONUS,
    MININGEXP,
    MININGPWR,
    cardMapImg, cardLabelImg, defaultWeights, CARD_DISPLAY_IDS, permPowerBonusFormula, tempPowerBonusFormula, powerFormula, cardIDMap, maxKey
} from '../util/cardMapping.js';

const CardCard = ({
    data, card, i, bonus_map,
    pinnedZones, setPinnedZones, setHoveredCard
}) => {

    const {
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
    } = card;
    const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

    const [forceOpen, setForceOpen] = useState(false);
    useEffect(() => {
        if (forceOpen) {
            setHoveredCard(ID)
        }
        else {
            setHoveredCard(-1);
        }
    }, [ID, setHoveredCard, forceOpen])

    return (
        <div
            key={i}
            style={{
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: '',
                justifyContent: 'center',
                width: '175px',
                height: '48px',
                // margin: `${num === 1 ? '' : '6px'} 0 0 0`,
                padding: '0 6px 0 6px',
                boxSizing: 'border-box',
                position: ``,
                backgroundColor: 'rgba(255,255,255, 0.1)',
                outline: card.num_drops < 1 ? '2px solid red' : `2px solid green`
            }}>
            <MouseOverPopover
                forceOpen={forceOpen}
                setForceOpen={setForceOpen}
                tooltip={
                    <div style={{ padding: '6px' }}
                        onMouseEnter={(e) => {
                            if (!forceOpen) setForceOpen(true)
                        }}
                        onMouseLeave={(e) => {
                            if (forceOpen) setForceOpen(false)
                        }}
                    >
                        <h3 style={{ margin: 0, textAlign: 'center' }}>
                            {cardIDMap[ID].label}
                        </h3>
                        <div>
                            {bonus_map[ID] && (
                                <>
                                    {bonus_map[ID].map((cur_exp) => {
                                        let exp = zone_data[cur_exp.ID];
                                        return (
                                            <div
                                                key={cur_exp.ID}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '6px'
                                                }}
                                            >

                                                {!pinnedZones[cur_exp.ID] && (
                                                    <div
                                                        className='hover'
                                                        style={{
                                                            position: 'relative',
                                                            width: '26px', height: '26px', borderRadius: '13px',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                            marginRight: '12px'
                                                        }}
                                                        onClick={(e) => {
                                                            setPinnedZones((cur_pins) => {
                                                                let temp = { ...cur_pins };
                                                                temp[cur_exp.ID] = cur_exp;
                                                                return temp;
                                                            })
                                                        }}
                                                    >
                                                        <Image
                                                            style={{ width: '20px', height: '20px', position: 'absolute', top: '2px', left: '2px' }}
                                                            src={pinIcon}
                                                            alt='push pin'
                                                        />
                                                    </div>
                                                )}
                                                {pinnedZones[cur_exp.ID] && (
                                                    <div
                                                        className='hover'
                                                        style={{
                                                            position: 'relative',
                                                            width: '26px', height: '26px', borderRadius: '13px',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                            marginRight: '12px'
                                                        }}
                                                        onClick={(e) => {
                                                            setPinnedZones((cur_pins) => {
                                                                let temp = { ...cur_pins };
                                                                delete temp[cur_exp.ID];
                                                                return temp;
                                                            })
                                                        }}
                                                    >
                                                        <Image
                                                            style={{ width: '20px', height: '20px', position: 'absolute', top: '3px', left: '3px' }}
                                                            src={trashIcon}
                                                            alt='push pin'
                                                        />
                                                    </div>
                                                )}

                                                <div style={{ width: '160px', display: 'flex', alignItems: 'center' }}>
                                                    {`${exp.label}:`}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex', position: 'relative', alignContent: 'center', justifyContent: 'space-evenly', width: '120px'
                                                    }}
                                                >
                                                    {cur_exp.CardFound.map((found_card, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    position: 'relative', width: '33px', height: '33px'
                                                                }}>
                                                                <Image
                                                                    alt={`picture of the in game ${cardIDMap[found_card].label} card`}
                                                                    // fill
                                                                    src={cardLabelImg[found_card].img}
                                                                    unoptimized={true}
                                                                    priority
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )}

                        </div>
                    </div>
                }
            >
                <div
                    onMouseEnter={(e) => { if (!forceOpen) setForceOpen(true) }}
                    onMouseLeave={(e) => { if (forceOpen) setForceOpen(false) }}
                    style={{
                        display: 'flex',
                        flex: '1',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        position: 'relative', width: '33px', height: '33px'
                    }}>
                        <Image
                            alt={`picture of the in game ${cardIDMap[ID].label} card`}
                            // fill
                            src={cardLabelImg[ID].img}
                            unoptimized={true}
                            priority
                        />
                    </div>
                    <div
                        className='importantText'
                        style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            bottom: '4px',
                            marginLeft: '6px',
                            marginRight: '12px',
                            fontSize: '18px'
                        }}
                    >
                        {cardIDMap[ID].label}
                    </div>

                    <div
                        className='importantText'
                        style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            bottom: '4px',
                            // width: '100%',
                            marginLeft: 'auto',
                            fontSize: '18px'
                        }}
                    >
                        <>
                            {`${card.num_drops}`}
                        </>
                    </div>
                </div>
            </MouseOverPopover>
        </div >
    );
}





export default function CardFocus({
    outerCurrentZones,
    outerUnlockedIDs,
    TimeToClear
}) {


    const [hoveredCard, setHoveredCard] = useState(-1);
    const [showLockedZones, setShowLockedZones] = useState(true);
    const [pinnedZones, setPinnedZones] = useState({});

    const [current_zones, setCurrentZones] = useState({});
    const [recommended_zones, setRecommendedZones] = useState({});

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    useEffect(() => {
        setRunTimeData(clientData);
        let temp_zones = {};
        clientData.ExpeditionTeam.forEach((cur_team) => {
            if (cur_team.InExpedition === 1) {
                temp_zones[cur_team.WhichExpedition] = clientData.ExpeditionsCollection.find((a) => a.ID === cur_team.WhichExpedition)
            }
            setCurrentZones(JSON.parse(JSON.stringify(temp_zones)));
            setPinnedZones(temp_zones);
        });

        let recom_temp = {};
        card_priority.forEach((exp_id) => {
            let found = clientData.ExpeditionsCollection.find((cur_exped) => cur_exped.ID === exp_id && cur_exped.Locked === 1);
            if (found && (Object.values(recom_temp).length < clientData.ExpeditionLimit)) {
                recom_temp[exp_id] = found;
            }
        })
        setRecommendedZones(recom_temp);

    }, [clientData]);

    const [clientPresets, setPresets] = useLocalStorage('client_card_presets', {});
    const [presets, setRunTimePresets] = useState({});
    useEffect(() => {
        setRunTimePresets(clientPresets);
    }, [clientPresets]);

    const [currentSaveName, setCurrentSaveName] = useState('');
    const [importPreset, setImportPreset] = useState('');

    const bonus_map = useMemo(() => {
        let map = {};

        data.ExpeditionsCollection.forEach((inner_exp) => {
            if (inner_exp.ID === 0) {
                return;
            }

            inner_exp.CardFound.forEach((inner_bonus) => {
                if (!map[inner_bonus]) {
                    map[inner_bonus] = [];
                }
                map[inner_bonus].push(inner_exp);
            });
        });

        return map;
    }, [data]);


    const current_cards = useMemo(() => {

        let num_drops = {};
        if (pinnedZones) {
            for (const [key, value] of Object.entries(pinnedZones)) {

                value.CardFound.forEach((found_id) => {
                    if (!num_drops[found_id]) {
                        num_drops[found_id] = 0
                    }
                    num_drops[found_id]++;
                })
            }
        }


        let cardMap = {};

        const cards = data.CardsCollection.reduce((accum, card) => {
            card.num_drops = num_drops[card.ID] ? num_drops[card.ID] : 0;
            cardMap[card.ID] = card;
            accum.push(card);
            return accum;
        }, []);


        const row_limit = 5;
        let cardRows = [];

        let i = 0
        while (i < CARD_DISPLAY_IDS.length) {
            let row = [];
            // cardRows.push(row);
            while (row.length < row_limit && i < CARD_DISPLAY_IDS.length) {
                if (!cardMap[CARD_DISPLAY_IDS[i]]) {
                    i++;
                    continue;
                }

                if (data.AscensionCount >= 31 && cardMap[CARD_DISPLAY_IDS[i]].ID === 1) {
                    i++;
                    continue;
                }

                row.push(<CardCard
                    card={cardMap[CARD_DISPLAY_IDS[i]]}
                    data={data} key={cardMap[CARD_DISPLAY_IDS[i]]}
                    bonus_map={bonus_map}
                    pinnedZones={pinnedZones}
                    setPinnedZones={setPinnedZones}
                    setHoveredCard={setHoveredCard}
                />)

                i++;
            }
            cardRows.push(
                <div key={i}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                >
                    {row.map((cur_card) => {
                        return cur_card;
                    })}
                </div>
            )
        }

        return { cards, cardMap, cardRows };
    }, [data, bonus_map, pinnedZones]);



    const zone_list = [];
    outerCurrentZones.forEach((cur_zone, index) => {
        let temp = { ...outerUnlockedIDs };
        if (!showLockedZones && cur_zone.Locked === 0) return;
        if (index > 0 && index % 2 === 1) return;
        if (!outerUnlockedIDs[cur_zone.ID]) {
            let bigsad = -1;
        }
        try {
            let t = pinnedZones[cur_zone.ID]
        }
        catch (err) {
            console.log(err)
            let t = pinnedZones[cur_zone.ID]
        }
        let next_zone = outerCurrentZones[index + 1];
        zone_list.push(
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '400px',
                    padding: '3px'
                }}
            >
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '170px',

                    opacity: hoveredCard === -1 || cur_zone.CardFound.includes(hoveredCard) ? '1' : '0',

                    boxSizing: 'border-box',
                    position: ``,
                    backgroundColor: 'rgba(255,255,255, 0.1)',
                    outline: `2px solid ${outerUnlockedIDs[cur_zone.ID] ?
                        (pinnedZones[cur_zone.ID] ? `green` : `white`)
                        : (pinnedZones[cur_zone.ID] ? `orange` : `red`)
                        }`,
                    borderRadius: '6px',
                    padding: '3px'
                }}>
                    <div style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        {`${cur_zone.label}`}
                    </div>
                    <div
                        style={{
                            display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'space-evenly', width: '146px'
                        }}
                    >
                        {!pinnedZones[cur_zone.ID] && (
                            <div
                                className='hover'
                                style={{
                                    position: 'relative',
                                    width: '26px', height: '26px', borderRadius: '13px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                }}
                                onClick={(e) => {
                                    setPinnedZones((cur_pins) => {
                                        let temp = { ...cur_pins };
                                        temp[cur_zone.ID] = cur_zone;
                                        return temp;
                                    })
                                }}
                            >
                                <Image
                                    style={{ width: '20px', height: '20px', position: 'absolute', top: '2px', left: '2px' }}
                                    src={pinIcon}
                                    alt='push pin'
                                />
                            </div>
                        )}
                        {pinnedZones[cur_zone.ID] && (
                            <div
                                className='hover'
                                style={{
                                    position: 'relative',
                                    width: '26px', height: '26px', borderRadius: '13px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                }}
                                onClick={(e) => {
                                    setPinnedZones((cur_pins) => {
                                        let temp = { ...cur_pins };
                                        delete temp[cur_zone.ID];
                                        return temp;
                                    })
                                }}
                            >
                                <Image
                                    style={{ width: '20px', height: '20px', position: 'absolute', top: '3px', left: '3px' }}
                                    src={trashIcon}
                                    alt='push pin'
                                />
                            </div>
                        )}
                        {cur_zone.CardFound.map((found_card, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: 'relative', width: '33px', height: '33px'
                                    }}>
                                    <Image
                                        alt={`picture of the in game ${cardIDMap[found_card].label} card`}
                                        // fill
                                        src={cardLabelImg[found_card].img}
                                        unoptimized={true}
                                        priority
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {next_zone && (
                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '170px',


                        opacity: hoveredCard === -1 || next_zone.CardFound.includes(hoveredCard) ? '1' : '0',

                        boxSizing: 'border-box',
                        position: ``,
                        backgroundColor: 'rgba(255,255,255, 0.1)',
                        outline: `2px solid ${outerUnlockedIDs[next_zone.ID] ?
                            (pinnedZones[next_zone.ID] ? `green` : `white`)
                            : (pinnedZones[next_zone.ID] ? `orange` : `red`)
                            }`,
                        borderRadius: '6px',
                        padding: '3px'
                    }}>
                        <div style={{ fontWeight: 'bold', fontSize: '17px' }}>
                            {`${next_zone.label}`}
                        </div>
                        <div
                            style={{
                                display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'space-evenly', width: '146px'
                            }}
                        >
                            {!pinnedZones[next_zone.ID] && (
                                <div
                                    className='hover'
                                    style={{
                                        position: 'relative',
                                        width: '26px', height: '26px', borderRadius: '13px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    }}
                                    onClick={(e) => {
                                        setPinnedZones((cur_pins) => {
                                            let temp = { ...cur_pins };
                                            temp[next_zone.ID] = next_zone;
                                            return temp;
                                        })
                                    }}
                                >
                                    <Image
                                        style={{ width: '20px', height: '20px', position: 'absolute', top: '2px', left: '2px' }}
                                        src={pinIcon}
                                        alt='push pin'
                                    />
                                </div>
                            )}
                            {pinnedZones[next_zone.ID] && (
                                <div
                                    className='hover'
                                    style={{
                                        position: 'relative',
                                        width: '26px', height: '26px', borderRadius: '13px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    }}
                                    onClick={(e) => {
                                        setPinnedZones((cur_pins) => {
                                            let temp = { ...cur_pins };
                                            delete temp[next_zone.ID];
                                            return temp;
                                        })
                                    }}
                                >
                                    <Image
                                        style={{ width: '20px', height: '20px', position: 'absolute', top: '3px', left: '3px' }}
                                        src={trashIcon}
                                        alt='push pin'
                                    />
                                </div>
                            )}


                            {next_zone.CardFound.map((found_card, index) => {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            position: 'relative', width: '33px', height: '33px'
                                        }}>
                                        <Image
                                            alt={`picture of the in game ${cardIDMap[found_card].label} card`}
                                            // fill
                                            src={cardLabelImg[found_card].img}
                                            unoptimized={true}
                                            priority
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    })


    if (data.AscensionCount < 14) {
        return <></>
    }

    return (
        <>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {/* Current Card Drops */}
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>
                    <div className='importantText'
                        style={{
                            display: 'flex',
                            // alignSelf: 'flex-start',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '24px',
                            // margin: '6px 12px 0',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '940px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            position: 'relative'
                        }}
                    >
                        <div>
                            {`Current Card Drops`}
                        </div>

                        <MouseOverPopover tooltip={
                            <div style={{ padding: '6px' }}>
                                {`Shows you which cards and how many you will get based on the current selection of expeditions`}
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
                            alignSelf: 'flex-start',
                            margin: '6px 0 12px 0',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '925px',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            padding: '6px 6px 6px 6px',
                            maxHeight: '100%',

                        }}
                    >

                        <div style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    minHeight: '360px'
                                }}
                            >
                                {current_cards.cardRows.map((cur_row) => {

                                    return cur_row;
                                })}
                            </div>
                        </div>
                    </div>
                    {TimeToClear}
                </div>


                {/* List of expeditions */}
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 90px)' }}>
                    <div className='importantText'
                        style={{
                            display: 'flex',
                            // alignSelf: 'flex-start',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // margin: '6px 12px 0',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '420px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            position: 'relative'
                        }}
                    >
                        <div>
                            {`Expedition Selection`}
                        </div>

                        <MouseOverPopover tooltip={
                            <div style={{ padding: '6px' }}>
                                {`Shows you which expeditions are being currently run, available and what bonuses they have. Pin any to update the card rewards on the right`}
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
                            alignSelf: 'flex-start',
                            margin: '6px 0 0 0',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '410px',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            padding: '0px 6px',
                            maxHeight: '100%'
                        }}
                    >

                        <div style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '3px',
                                    width: '100%',
                                    marginBottom: '4px',
                                    marginTop: '4px'
                                }}
                            >
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', width: '100%',
                                    color: Object.entries(pinnedZones).length
                                        <= data.ExpeditionLimit ? 'white' : 'red'
                                }}>
                                    {`Limit: ${Object.entries(pinnedZones).length}/${data.ExpeditionLimit}`}
                                </div>
                                {zone_list.map((cur_row) => {
                                    return cur_row;
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Presets */}
                {/* List of expeditions */}
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 90px)', marginLeft: '12px' }}>
                    <div className='importantText'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '420px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            position: 'relative'
                        }}
                    >
                        <div>
                            {`Preset Selection`}
                        </div>

                        <MouseOverPopover tooltip={
                            <div style={{ padding: '6px' }}>
                                {`You can choose to either load the current expedition preset (based on what you have active in your save), recommended, or a custom one you made`}
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
                            margin: '6px 0 0 0',
                            border: '1px solid white',
                            borderRadius: '12px',
                            width: '410px',
                            backgroundColor: 'rgba(255,255,255, 0.07)',
                            padding: '0px 6px',
                            maxHeight: '100%'
                        }}
                    >

                        <div style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '3px',
                                    width: '100%',
                                    marginBottom: '4px',
                                    marginTop: '4px'
                                }}
                            >
                                {/* Custom Preset Area */}
                                <div style={{
                                    backgroundColor: 'rgba(255,255,255, 0.07)',
                                    padding: '6px',
                                    marginTop: '12px',
                                    borderRadius: '6px'
                                }}>

                                    {/* Select a preset */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                                        <div style={{ marginRight: '12px', marginLeft: '5px', width: '141px' }}>
                                            Select preset
                                        </div>
                                        <select
                                            className='importantText'
                                            aria-label='Specify which custom preset to load in'
                                            style={{ width: '90px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                                            onChange={
                                                (selected_mode) => {
                                                    let val = selected_mode.target.value;
                                                    console.log(`setting`)
                                                    console.log(current_zones)
                                                    switch (val) {
                                                        case 'current':
                                                            setPinnedZones(JSON.parse(JSON.stringify(current_zones)));
                                                            return;
                                                        case 'recommended':
                                                            setPinnedZones(JSON.parse(JSON.stringify(recommended_zones)));
                                                            return;
                                                        default:
                                                            setPinnedZones(JSON.parse(JSON.stringify(presets[val])));
                                                            return;
                                                    }
                                                }
                                            }
                                            defaultValue={'current'}
                                        >
                                            <option value={'current'}>Current</option>
                                            <option value={'recommended'}>Recommended</option>
                                            {/* {!customeSelected && (<option value="None">None</option>)} */}
                                            {Object.keys(presets).map((e) => <option key={e} value={e}>{e}</option>)}
                                        </select>
                                    </div>
                                    {/* Save current preset */}
                                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                                        <input type='text'
                                            aria-label='Specify name of the current preset to save it under'
                                            onChange={(e) => { setCurrentSaveName(e.target.value); }}
                                            style={{
                                                width: '141px', marginRight: '12px'
                                            }}
                                        />
                                        <button disabled={currentSaveName.trim().length === 0
                                            || currentSaveName.trim().toLowerCase().localeCompare("recommended") === 0
                                            || currentSaveName.trim().toLowerCase().localeCompare("current") === 0
                                        }
                                            onClick={(e) => {
                                                setPresets((curr_presets) => {
                                                    let temp = { ...curr_presets };
                                                    temp[currentSaveName.trim()] = pinnedZones;
                                                    return temp;
                                                });
                                            }}
                                        >Save Current</button>
                                    </div>

                                    {/* Delete saved preset */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                        <div style={{ marginRight: '12px', marginLeft: '5px', width: '141px' }}>
                                            Delete preset
                                        </div>
                                        <select
                                            className='importantText'
                                            style={{ width: '90px', marginLeft: '12px', backgroundColor: '#171717', borderRadius: '4px' }}
                                            aria-label='Specify which custom preset to delete'
                                            onChange={
                                                (selected_mode) => {

                                                    setPresets((cur_presets) => {
                                                        let temp = { ...cur_presets };
                                                        delete temp[selected_mode.target.value];
                                                        return temp;
                                                    })

                                                }
                                            }
                                            value={'None'}
                                        >
                                            <option value="None">None</option>
                                            {Object.keys(presets).map((e) => <option key={e} value={e}>{e}</option>)}
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
                                                setImportPreset(e.target.value);
                                            }}
                                            style={{
                                                width: '141px', marginRight: '12px'
                                            }}
                                        />
                                        <button disabled={
                                            // loadPreset.trim().length === 0
                                            false
                                        }
                                            onClick={(e) => {
                                                try {
                                                    setPinnedZones(importPreset);
                                                }
                                                catch (err) {
                                                    console.log(err);
                                                }

                                            }}
                                        >Import Preset</button>
                                    </div>
                                    {/* export preset */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }} >

                                        <button
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(JSON.stringify(pinnedZones));
                                            }}
                                        >Copy Current Preset to Clipboard</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}