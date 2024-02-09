"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import useLocalStorage from "use-local-storage";
import MouseOverPopover from "../util/Tooltip.jsx";
import { ic_mapping } from './ic_mapping.js';

import DefaultSave from '../util/tempSave.json';

import panel_background from '../../../public/images/infinity_corner/panel_background.png';
import star_normal from '../../../public/images/infinity_corner/LastEraTopBackground.png';
import infoIcon from '../../../public/images/icons/info_thick.svg';



export default function Item({
    map_key,
    data
}) {

    let itemObj = ic_mapping[map_key];
    const defaultWeight = itemObj.weight(data.AscenscionCount);
    const itemWeight = itemObj.weight(data.AscenscionCount);

    return (
        <div
            style={{
                position: 'absolute',
                left: itemObj.left,
                top: itemObj.top,
                width: map_key === 'star' ? '100%' : '154px',
                height: map_key === 'star' ? '100%' : '161px',
                zIndex: map_key === 'star' ? '2' : '3',
            }}
        >


            {map_key === 'star' && (
                <Image
                    alt={`panelbackground for the infinity corner`}
                    src={itemObj.img}
                    fill
                    priority

                />
            )}
            {map_key !== 'star' && (
                <MouseOverPopover
                    tooltip={
                        <div style={{ padding: '6px' }}>
                            <h3 style={{ margin: 0, textAlign: 'center' }}>
                                {itemObj.label}
                            </h3>
                            <div>
                                Current Bonus:
                            </div>
                            <div>
                                Charged Bonus:
                            </div>
                            <div>
                                Absolute Increase:
                            </div>
                            <div>
                                Percentage Increase:
                            </div>
                            <div>
                                Weighted Increase:
                            </div>
                            <div>
                                Current Weight:
                            </div>
                        </div>
                    }

                >
                    <div>
                        <Image
                            alt={`panelbackground for the infinity corner`}
                            src={itemObj.img}
                            fill
                            priority

                        />
                    </div>
                </MouseOverPopover>
            )}

            <MouseOverPopover
                tooltip={
                    <div style={{ padding: '6px' }}>
                        <h3 style={{ margin: 0, textAlign: 'center' }}>
                            {itemObj.label}
                        </h3>
                        <div>
                            Current Bonus:
                        </div>
                        <div>
                            Charged Bonus:
                        </div>
                        <div>
                            Absolute Increase:
                        </div>
                        <div>
                            Percentage Increase:
                        </div>
                        <div>
                            Weighted Increase:
                        </div>
                        <div>
                            Current Weight:
                        </div>
                    </div>
                }
                forceXPlacement={'center'}
                forceYPlacement={'bottom'}

            >
                <div>
                    <Image
                        alt={`panelbackground for the infinity corner`}
                        src={itemObj.img}
                        fill
                        priority

                    />
                </div>
            </MouseOverPopover>








            <div
                className='importantText'
                style={{
                    position: 'absolute',
                    top: map_key === 'star' ? '95%' : '77%',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div>
                        {`Level: ${data[itemObj.key]}`}
                    </div>
                    <div style={{ marginLeft: '6px' }}>
                        {`-> xxx`}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <input
                        aria-label='Specify the weight/importance for this stat'
                        style={{
                            width: '55px',
                            color: itemWeight !== defaultWeight && itemWeight !== -1 ? 'black' : 'gray',
                            fontWeight: itemWeight !== defaultWeight && itemWeight !== -1 ? 'bold' : '',
                            borderRadius: '6px',
                            fontSize: '12px',
                            padding: '0 0 0 0',
                            margin: '0',
                            textAlign: 'center'
                        }}
                        type='number'
                        value={itemWeight}
                        onChange={
                            (e) => {
                                try {
                                    return
                                    // let x = Number(e.target.value);
                                    // // x = Math.floor(x);
                                    // if (x < 0 || x > 999999) {
                                    //     return;
                                    // }
                                    // setCardWeightNew(x);
                                    // setRefreshMath(true);                        
                                }
                                catch (err) {
                                    console.log(err);
                                }
                            }}
                        min="0"
                        max="999999"
                    />

                    <MouseOverPopover tooltip={

                        <div>
                            {`The weight (importance) of this stat. Feel free to change this`}
                        </div>
                    }
                        opacity={1}
                    >
                        <div style={{ position: 'relative', height: '16px', width: '16px', marginLeft: '2px' }}>
                            <Image
                                alt='on hover I in a cirlce icon, shows more information on hover'
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                        {/* <img alt='on hover I in a cirlce icon, shows more information on hover' style={{ height: '16px', marginLeft: '6px' }} src={infoIcon} /> */}
                    </MouseOverPopover>
                </div>
            </div>
        </div>
    )
}