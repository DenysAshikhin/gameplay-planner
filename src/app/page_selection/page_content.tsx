"use client"

import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
import PageCard from './page_card';
import BlinkingDot from '../util/BlinkingDot';
import { isMobile } from 'mobile-device-detect';
import useLocalStorage from 'use-local-storage';

import DefaultSave from '../util/tempSave.json';
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
    // gaOptions: {...}, // optional
    // gtagOptions: {
    //     send_page_view: false
    // },
}]);

/**
 * PageSelection provides the core implementation for the PageSelection routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by PageSelection.
 */
export default function PageSelection() {
    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport instanceof HTMLMetaElement) {
                    viewport.content = "initial-scale=0.1";
                    viewport.content = "width=1200";
                }
            }, 500);
        }
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

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            {/* <BlinkingDot data={data} /> */}
            <div style={{
                paddingLeft: '6px',
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.08)',
                // @ts-ignore TODO: duplicate property
                paddingLeft: '60px'
            }}>
                <div
                    style={{ display: 'flex' }}
                >
                    <PageCard page='upload' />
                    <PageCard page='expedition' />
                    <PageCard page='zones' />
                    <PageCard page='pets' />
                    <PageCard page='cards' redBorder={chargesMax} />
                </div>
                <div
                    style={{ display: 'flex', marginTop: '36px' }}
                >
                    <PageCard page='farm' />
                    <PageCard page='contagion' />
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                </div>
                <div
                    style={{ display: 'flex', marginTop: '36px' }}
                >

                    <PageCard page='infinity_corner' />
                    <PageCard page='outposts' />
                    <PageCard page='guides' />
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
            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />
        </div>
    );
}
