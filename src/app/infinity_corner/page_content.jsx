"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import useLocalStorage from "use-local-storage";

import { ic_mapping } from './ic_mapping.js';
import Item from './Item.jsx';

import DefaultSave from '../util/tempSave.json';

import panel_background from '../../../public/images/infinity_corner/panel_background.png';
import star_normal from '../../../public/images/infinity_corner/LastEraTopBackground.png';



export default function Infinity_Corner() {

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);


    const [upgradeWeightsClient, setUpgradeWeights] = useLocalStorage('ic_upgrade_weights', {});
    const [upgradeWeights, setRunTimeUpgradeWeights] = useState(DefaultSave);

    useEffect(() => {

        let tempVal = JSON.parse(JSON.stringify(upgradeWeightsClient));
        let found = false;

        //Check that we aren't missing any upgrade weights:
        for (const [key, value] of Object.entries(ic_mapping)) {
            if (key === 'star' || key === 'locked') {
                continue;
            }
            if (!tempVal[key]) {
                found = true;
                tempVal[key] = -1;
            }
        }

        if (found) {
            setUpgradeWeights(JSON.parse(JSON.stringify(tempVal)));
        }

        setRunTimeUpgradeWeights(JSON.parse(JSON.stringify(tempVal)));
    }, [data, upgradeWeightsClient]);



    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >

            {/* Upgrade Master List */}
            <div
                style={{
                    width: '1221px',
                    height: '734px',
                    position: 'relative',
                    border: '1px solid white',
                    borderRadius: '12px',
                    overflow: 'auto',
                    margin: '12px 12px 0 12px'
                }}
            >
                <Image
                    alt={`panelbackground for the infinity corner`}
                    src={panel_background}
                    fill
                    priority
                />

                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%'
                }}>
                    <Image
                        alt={`panelbackground for the infinity corner`}
                        src={star_normal}
                        fill
                        priority
                    />
                    {Object.keys(ic_mapping).map((inner_val) => {

                        if (inner_val !== 'locked') {
                            return <Item key={`${inner_val}-item`} map_key={inner_val} data={data} />
                        }
                        else {
                            return <div key={`${inner_val}-item`} />
                        }
                    })}
                </div>
            </div>
        </div >
    );
}