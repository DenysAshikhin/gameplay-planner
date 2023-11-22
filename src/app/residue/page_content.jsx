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
// import infoIcon from '../../../public/images/icons/info_lightgray_thick.svg';
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";

import Image from 'next/image';



ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8"
}]);


const ResidueCard = ({ data, params }) => {
    const level = data[params.key];
    const locked = data.AscensionCount < params.unlock;


    return (
        <div className='importantText residueCard'>
            <div className='residueCardHeader'>
                <div>
                    {`${params.key_inner}: ${level}`}
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
                            value={params.weight(level)}
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
                <Image src={params.img} fill unoptimized alt={`${params.key} bonus from in game`}/>
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
                    width: '50%',
                    border: "2px solid rgba(255,255,255,0.8)",
                    margin: '12px 36px 12px 0px',
                    borderRadius: '12px',
                    maxHeight: 'calc(100vh - 50px)',
                    paddingBottom: '12px'
                }}>
                    {/* header */}
                    <div
                        style={{
                            backgroundColor: 'rgba(255,255,255, 0.05)',

                        }}
                    >
                        <div
                            className='importantText'
                            style={{ fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}
                        >
                            Current Residue - WORK IN PROGRESS
                        </div >
                    </div >

                    {/* Card List */}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.entries(residueMap).filter((value) => value[0] !== 'locked').map((value, index) => {
                            let key = value[0];
                            let params = value[1];

                            return <ResidueCard data={data} params={{ ...params, key_inner: key }} key={index}/>
                        })}
                    </div>
                </div >
            </div>
        </div>
    )
};