
import { useState, useEffect, useMemo, } from 'react';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip.jsx";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

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
    data, card, i, cardMap, setCardMap, resetWeights,
    cardWeight, setCardWeightNew }) => {

    const {
        // CurrentExp,
        // ExpNeeded,
        // Found,s
        ID,
        Level,
        PowerPermaBD,
        PowerTempBD,
    } = card;
    const { ChargeTransfertPowerPerma, ChargeTransfertPowerTemp } = data;

    return (
        <div
            key={i}
            style={{
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: '',
                justifyContent: 'center',
                width: '200px',
                height: '48px',
                // margin: `${num === 1 ? '' : '6px'} 0 0 0`,
                padding: '0 6px 0 6px',
                boxSizing: 'border-box',
                position: ``,
                backgroundColor: 'rgba(255,255,255, 0.1)',
                outline: card.num_drops < 1 ? '2px solid red' : `2px solid green`
            }}>
            <>
                <MouseOverPopover
                    tooltip={
                        <div style={{ padding: '6px' }}>
                            <h3 style={{ margin: 0, textAlign: 'center' }}>
                                {cardIDMap[ID].label}
                            </h3>
                        </div>
                    }
                >
                    <div style={{
                        display: 'flex',
                        flex: '1',
                        alignItems: 'center'
                    }}>
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
                                fontSize: '20px'
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
                                fontSize: '20px'
                            }}
                        >
                            <>
                                {`${card.num_drops}`}
                            </>
                        </div>
                    </div>
                </MouseOverPopover>
            </>
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
                row.push(<CardCard card={cardMap[CARD_DISPLAY_IDS[i]]} data={data} key={cardMap[CARD_DISPLAY_IDS[i]]} />)

                i++;
            }
            cardRows.push(
                <div key={i}
                    style={{
                        display: 'flex',
                        justifyContent:'space-evenly'
                    }}
                >
                    {row.map((cur_card) => {
                        return cur_card;
                    })}
                </div>
            )
        }

        return { cards, cardMap, cardRows };
    }, [data]);


    if (data.AscensionCount < 14) {
        return <></>
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    width: '1100px',
                }}
            >
                {current_cards.cardRows.map((cur_row) => {

                    return cur_row;
                })}
            </div>


        </>
    )
}