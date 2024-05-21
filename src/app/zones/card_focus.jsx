
import { useState, useEffect, useMemo, } from 'react';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip.jsx";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import pinIcon from "../../../public/images/icons/pin-line-icon.svg"
import trashIcon from "../../../public/images/icons/trash-can-icon.svg"

import { zone_priority, zone_ratios, zone_data, calc_max_hp, calc_total_hp } from './zone_lists.js';

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
    data, card, i, bonus_map }) => {

    const {
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
    } = card;
    const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

    const [forceOpen, setForceOpen] = useState(false);


    return (
        <div
            key={i}
            style={{
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: '',
                justifyContent: 'center',
                width: '180px',
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
                                        <div
                                            className='hover'
                                            style={{
                                                position: 'relative',
                                                width: '26px', height: '26px', borderRadius: '13px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                marginRight: '12px'
                                            }}
                                            onClick={(e) => {
                                                let bigsad = -1;
                                            }}
                                        >
                                            <Image
                                                style={{ width: '20px', height: '20px', position: 'absolute', top: '2px', left: '2px' }}
                                                src={pinIcon}
                                                alt='push pin'
                                            />
                                        </div>
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
}) {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);
    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


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

        let cardMap = {};

        const cards = data.CardsCollection.reduce((accum, card) => {
            card.num_drops = 1;
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
                row.push(<CardCard
                    card={cardMap[CARD_DISPLAY_IDS[i]]}
                    data={data} key={cardMap[CARD_DISPLAY_IDS[i]]}
                    bonus_map={bonus_map}
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
    }, [data, bonus_map]);




    if (data.AscensionCount < 14) {
        return <></>
    }

    return (
        <>

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
                        width: '915px',
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
                        margin: '6px 0 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '905px',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '6px 6px 6px 6px',
                        maxHeight: '100%'
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

            </div>






        </>
    )
}