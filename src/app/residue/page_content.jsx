"use client"

import pagecss from './page.css';
import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { BonusMap } from '../util/itemMapping.js';
import farmingHelper from '../util/farmingHelper.js';
import mathHelper from '../util/math.js';
import helper from "../util/helper.js";


import { residueMap } from './residueMapping.js';
import MouseOverPopover from "../util/Tooltip.jsx";

import infoIcon from '../../../public/images/icons/info_white_thick.svg';
import greenBorder from '../../../public/images/residue/ShopUpgradeSelected.png';
// import infoIcon from '../../../public/images/icons/info_lightgray_thick.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';



ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8"
}]);


const ResidueCard = ({ data, params }) => {

    const [hovering, setHovering] = useState(false);
    const level = data[params.key];
    const asc_level = data.AscensionCount;
    const locked = (!hovering) && asc_level < params.unlock;
    const weight = params.weight(asc_level);
    const cost = params.cost(level);

    const reinc = residueMap['reinc'];
    const reincLevel = data[reinc.key];
    const reincWeight = reinc.weight(asc_level);
    const reincCost = reinc.cost(reincLevel);

    const ratio = weight / reincWeight;
    const weightedCost = mathHelper.multiplyDecimal(reincCost, ratio);

    let needPurchase = cost.lessThan(weightedCost);
    if (level === 168) {
        let bigsad = -1;
    }
    if (needPurchase) {
        console.log(-1);
    }

    return (
        <div className='importantText residueCard'
            onMouseEnter={() => { setHovering(true); }}
            onMouseLeave={() => { setHovering(false); }}
        >
            <div className='residueCardHeader'>
                <div>
                    {locked ? `?????` : `${params.key_inner}: ${level}`}
                </div>
                {/* <div>
                    {`Level: ${data[params.key]}`}
                </div> */}
            </div>
            <div className='residueCardBody'>

                <div style={{ position: 'absolute', right: '8px', top: '8px', zIndex: '2' }}>

                    <MouseOverPopover tooltip={
                        <div>
                            <div>
                                {`Cost: ${params.cost(level).toExponential(2)}`}
                            </div>
                            <div>
                                {`Bonus: ${helper.numberWithCommas(params.bonus(level).ceil().toString())}%`}
                            </div>
                        </div>
                    }>
                        <div style={{ position: 'relative', width: '30px', height: '30px' }}>
                            <Image src={infoIcon} fill unoptimized alt="letter i in a circle" />
                        </div>
                    </MouseOverPopover>
                </div>
                {!locked && (
                    <div style={{ position: 'absolute', left: '8px', bottom: '8px', zIndex: '2', display: 'flex', alignItems: 'center' }}>
                        <div>
                            Weight:
                        </div>
                        <div
                            style={{ marginLeft: '6px' }}
                        >
                            <input
                                aria-label='Specify how important this bonus is'
                                className='importantText textMedium2'
                                style={{ borderRadius: '4px', width: '48px', height: '12px', backgroundColor: '#1D1D1D' }}
                                type='number'
                                value={params.weight(asc_level)}
                                onChange={
                                    (inner_e) => {
                                        return -1;
                                        try {
                                            let x = Number(inner_e.target.value);
                                            // x = Math.floor(x);
                                            if (x < 1 || x > 99) {
                                                return;
                                            }
                                            setNumAl(x);

                                            ReactGA.event({
                                                category: "protein_interaction",
                                                action: `changed_num_AL`,
                                                label: `${x}`,
                                                value: x
                                            })

                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                    }}
                                min="0"
                                max="9999"
                            />
                        </div>
                    </div>
                )}

                {!!locked && (

                    <Image src={residueMap['locked'].img} fill unoptimized alt={`locked bonus image from in game`} />
                )}
                {!locked && (
                    <Image src={params.img} fill unoptimized alt={`${params.key} bonus from in game`} />
                )}
                {!!needPurchase && (
                    <Image src={greenBorder} fill unoptimized alt={`Green border to indicate an upgrade should be purchased`} />

                )}
            </div>
            <div className='residueCardFooter'></div>
        </div>
    )
}


export default function Residue() {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    console.log(data);

    let currentResidue = mathHelper.createDecimal(data.CurrentResidueBD);

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'rgba(255,255,255, 0.05)',
                paddingLeft: '12px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    width: '900px',
                    border: "2px solid rgba(255,255,255,0.8)",
                    margin: '12px 36px 12px 0px',
                    borderRadius: '12px',
                    height: 'calc(100vh - 68px)',
                    paddingBottom: '12px'
                }}>
                    {/* header */}
                    <div
                        style={{ backgroundColor: 'rgba(255,255,255, 0.05)', }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}
                        >
                            Current Residue - WORK IN PROGRESS
                        </div >
                    </div >

                    {/* Card List */}
                    <div style={{
                        height: 'calc(100% - 53px)', padding: '0 6px 0 0'
                    }}>

                        <div style={{
                            display: 'flex', flexWrap: 'wrap', maxHeight: '100%',
                            overflowY: 'auto',
                        }}>
                            {Object.entries(residueMap).filter((value) => value[0] !== 'locked').sort((a, b) => a[1].order - b[1].order).map((value, index) => {
                                let key = value[0];
                                let params = value[1];

                                return <ResidueCard data={data} params={{ ...params, key_inner: key, currentResidue: currentResidue }} key={index} />
                            })}
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
};