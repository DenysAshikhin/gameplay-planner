"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import useLocalStorage from "use-local-storage";
import MouseOverPopover from "../util/Tooltip.jsx";
import { ic_mapping, calc_bonus } from './ic_mapping.js';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import RefreshIcon from '../../../public/images/icons/refresh_lightgray.svg';


export default function Item({
    map_key,
    data,
    setUpgradeWeights,
    futureBuyMode,
    buyMap,
    futureBuy
}) {


    const [clientUpgradeWeight, setUpgradeWeight] = useLocalStorage(`${map_key}_rep3`, -1);
    const [upgradeWeight, setRunTimeUpgradeWeight] = useState(-1);


    const [forceShow, setForceShow] = useState(false);

    const star_level = data[ic_mapping['star'].key];

    let itemObj = ic_mapping[map_key];
    const level = data[itemObj.key];
    const label = itemObj.label;

    const isStar = map_key === 'star';
    const isLocked = data.AscensionCount < itemObj.unlock;
    const defaultWeight = itemObj.weight(data.AscensionCount);
    const itemWeight = upgradeWeight === -1 ? itemObj.weight(data.AscensionCount) : upgradeWeight;

    const cost = itemObj.cost(level);
    const bonus = calc_bonus(star_level, level, isStar);

    useEffect(() => {
        setRunTimeUpgradeWeight(clientUpgradeWeight);
        if (map_key !== 'star') {
            setUpgradeWeights((current_global_weights) => {

                if (defaultWeight === clientUpgradeWeight) {
                    let temp = { ...current_global_weights };
                    temp[map_key] = -1;
                    return temp;
                }
                else {
                    let temp = { ...current_global_weights };
                    temp[map_key] = clientUpgradeWeight;
                    return temp;
                }

                return current_global_weights;
            });
        }
    }, [setUpgradeWeights, clientUpgradeWeight, defaultWeight, map_key]);

    const desiredLevel =
        futureBuyMode ? futureBuy?.item?.label === label ? level + 1 : 0
            : buyMap[label] ? level + buyMap[label].numPurchases : 0;


    const tooltip = <div style={{ padding: '6px' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>
            {label}
        </h3>

        <div>
            {`Current Bonus: ${bonus.toExponential(2)}%`}
        </div>
        <div>
            {`Current Cost: ${cost.toExponential(2)}`}
        </div>
    </div>


    return (
        <div
            onMouseEnter={() => { if (map_key === 'star') return; setForceShow(true); }}
            onMouseLeave={() => { if (map_key === 'star') return; setForceShow(false); }}
            style={{
                position: 'absolute',
                left: itemObj.left,
                top: itemObj.top,
                width: map_key === 'star' ? '100%' : '154px',
                height: map_key === 'star' ? '100%' : '161px',
                zIndex: map_key === 'star' ? '2' : '3',
            }}
        >

            {!isStar && (desiredLevel > 0) && (
                <div
                    // className='elementToFadeInAndOut'
                    style={{
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'red',
                        border: !futureBuyMode ? '3px solid green' : '3px solid yellow',
                        borderRadius: '6px',
                        zIndex: '5',
                        marginLeft: '-3px',
                        marginTop: '-3px'
                    }}
                >
                </div>
            )}


            {isStar && (
                <>
                    <Image
                        alt={`upgrade all star image`}
                        src={itemObj.img}
                        fill
                        priority
                        unoptimized
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '78%',
                            left: 'calc(50% - 77px)',
                            zIndex: '5',
                            // backgroundColor: 'red',
                            width: '154px',
                            height: '161px',
                            marginTop: '-4px'
                        }}
                    >
                        <MouseOverPopover
                            tooltip={tooltip}
                        >
                            <div
                                style={{
                                    width: '164px',
                                    height: '121px',
                                    // backgroundColor: 'blue'

                                }}
                                onMouseEnter={() => { setForceShow(true) }}
                                onMouseLeave={() => { setForceShow(false) }}
                            >
                                {!(!isLocked || forceShow) && (
                                    <div

                                    >

                                        <Image
                                            alt={`locked symbol`}
                                            src={ic_mapping['locked'].img}
                                            fill
                                            priority
                                            unoptimized
                                        />
                                    </div>
                                )}
                            </div>

                        </MouseOverPopover>
                    </div>
                    {(desiredLevel > 0) && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '78%',
                                left: 'calc(50% - 77px)',
                                width: '154px',
                                height: '161px',
                                border: !futureBuyMode ? '3px solid green' : '3px solid yellow',
                                borderRadius: '6px',
                                zIndex: '4',
                                marginLeft: '-3px',
                                marginTop: '-7px'
                            }}
                        >
                        </div>
                    )
                    }

                </>
            )}
            {!isStar && (
                <MouseOverPopover
                    tooltip={tooltip}
                    forceYPlacement={'top'}
                    forceClose={!forceShow}

                >
                    <div
                        onMouseEnter={() => { setForceShow(true); }}
                        onMouseLeave={() => { setForceShow(false); }}
                    >
                        <Image
                            alt={`${label} upgrade image`}
                            // src={!isLocked || forceShow ? itemObj.img : ic_mapping['locked'].img}
                            src={itemObj.img}
                            fill
                            priority
                            unoptimized
                        />
                        {!(!isLocked || forceShow) && (
                            <div
                                style={{
                                    position: 'relative',
                                    width: '154px',
                                    height: '161px',
                                    marginTop: '-4px'
                                }}
                            >
                                <Image
                                    alt={`locked symbol`}
                                    src={ic_mapping['locked'].img}
                                    fill
                                    priority
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>


                </MouseOverPopover>
            )}


            {/* Weights/levels */}
            {(!isLocked || forceShow) && (
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
                            {`Level: ${level}`}
                        </div>
                        {desiredLevel > 0 && (
                            <div
                                className='elementToFadeInAndOut'
                                style={{
                                    marginLeft: '6px', color: futureBuyMode ? 'yellow' : 'green',
                                    fontWeight: 'bold'
                                }}
                            >
                                {`-> ${desiredLevel}`}
                            </div>
                        )}

                    </div>

                    {/* Input / custom weight */}
                    {!isStar && (
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
                                            let x = Number(e.target.value);
                                            // x = Math.floor(x);
                                            if (x < 0 || x > 999999) {
                                                return;
                                            }
                                            setUpgradeWeight(x);
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


                            {(itemWeight !== defaultWeight && itemWeight !== -1) && (
                                <div className='hover'
                                    style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '6px' }}
                                    onClick={() => {
                                        setUpgradeWeight(-1);
                                    }}
                                >
                                    <Image src={RefreshIcon} fill unoptimized alt='reset, 2 arrows in a circle' />
                                </div>
                            )}

                        </div>
                    )}

                </div>
            )}

        </div>
    )
}