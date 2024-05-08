"use client"

import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import useLocalStorage from 'use-local-storage';

import { BonusMap } from '../util/itemMapping.js';


import DefaultSave from '../util/tempSave.json';
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);

const convertAreaToText = function (area_num) {
    area_num -= 19;
    const world = Math.floor(area_num / 9) + 2;
    const zone = (area_num % 9) + 1;
    return `${world}-${zone}`;
}

export default function PageSelection() {


    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    const current_pets = JSON.parse(JSON.stringify(data.PetsCollection));
    current_pets.sort((a, b) => {
        if (a.areaToCapture > 0 && b.areaToCapture === 0) {
            return -1;
        }
        else if (b.areaToCapture > 0 && a.areaToCapture === 0) {
            return 1;
        }
        else if (a.areaToCapture === b.areaToCapture) {
            return a.CaptureDungeon - b.CaptureDungeon;
        }
        return a.areaToCapture - b.areaToCapture;
    })

    current_pets.forEach((temp_pet) => {
        if (temp_pet.NGLocked) {
            let bigsad = -1;
        }
        if (temp_pet.CaptureDungeon) return;
        if (convertAreaToText(temp_pet.areaToCapture) === '0-1') {
            let bigsad = -1;
        }
    })


    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div
                style={{
                    paddingLeft: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255, 0.08)',
                    paddingLeft: '60px',
                    overflow: 'auto',
                    maxWidth: '90%',
                    maxHeight: 'calc(100% - 20px)'
                }}>
                <div style={{ maxHeight: '100%' }}>
                    {current_pets.map((curr_pet, index) => {
                        if (curr_pet.ID === 0) return <></>
                        return (
                            <div key={index} className='importantText' style={{ display: 'flex', marginTop: '12px' }}>
                                <div style={{ marginRight: '24px', minWidth:'150px' }}>
                                    {(curr_pet.CaptureDungeon ? `dungeon: ${curr_pet.CaptureDungeon}` : `area: ${convertAreaToText(curr_pet.areaToCapture)}`)
                                        + `  (${curr_pet.Type === 1 ? 'Ground' : 'Air'})`}
                                </div>
                                <div style={{ marginRight: '24px', minWidth: '140px' }}>
                                    {curr_pet.BonusList.map((temp_bonus, index_bonus) => {
                                        if (temp_bonus.ID >= 1000) return <></>;
                                        let tempy = BonusMap[temp_bonus.ID];
                                        return (
                                            <div key={index_bonus}>
                                                {tempy.label}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {curr_pet.BonusList.map((temp_bonus, index_bonus) => {
                                        if (temp_bonus.ID < 1000) return <></>;
                                        let tempy = BonusMap[temp_bonus.ID];
                                        return (
                                            <div key={index_bonus}>
                                                {tempy.label}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }} />
        </div>
    );
}