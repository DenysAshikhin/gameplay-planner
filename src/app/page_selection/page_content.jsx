"use client"

import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import PageCard from './page_card.jsx';
import BlinkingDot from '../util/BlinkingDot.jsx';
import useLocalStorage from 'use-local-storage';

import DefaultSave from '../util/tempSave.json';
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);
export default function PageSelection() {

    useEffect(() => {


        // setTimeout(() => {
        //     ReactGA.send({ hitType: "pageview", page: "/page_selection_", title: "_Page Selection" });
        // }, 500);

    }, []);

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    const chargesMax = (data.CurrentCardCharge === data.MaxCardCharge) && (data.MaxCardCharge !== 0) && (data.AscensionCount >= 6);


    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            {/* <BlinkingDot data={data} /> */}
            <div style={{
                paddingLeft: '6px',
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.08)',
                paddingLeft: '60px'
            }}>
                <div
                    style={{ display: 'flex' }}
                >
                    <PageCard page='upload' />
                    <PageCard page='expedition' />
                    <PageCard page='pets' />
                    <PageCard page='farm' />
                </div>
                <div
                    style={{ display: 'flex', marginTop: '36px' }}
                >
                    <PageCard page='cards' redBorder={chargesMax} />
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                    <PageCard page='gratitude' />
                </div>

                {/* <button onClick={(e) => {
                    ReactGA.event({
                        category: "tester_events",
                        action: 'tested_event',
                        label: 'tested_event_label'
                    })

                }}>Something</button> */}
            </div>
        </div>
    );
}