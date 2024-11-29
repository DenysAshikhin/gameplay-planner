"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import Link from 'next/link';
import PageCard from './page_card';

export default function Guides() {

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

    return (
        <div
            style={{
                display: 'flex',
                // flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding: '12px'
            }}
        >

            {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}

            <div
                style={{ display: 'flex', flex: '1', flexDirection: 'column' }}
            >
                {/* Guides */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // minWidth: '512px',
                        border: '1px solid white',
                        borderRadius: '12px',
                        marginTop: '12px'
                    }}
                >
                    <div className="importantText"
                        style={{
                            fontSize: '32px',
                            fontWeight: "bold",
                            backgroundColor: 'rgba(255,255,255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid white'
                        }}
                    >
                        Game Guides
                    </div>


                    <div
                        style={{
                            paddingLeft: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'rgba(255,255,255, 0.05)',
                            padding: '6px'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                flex: 'wrap'
                            }}
                        >
                            <PageCard page='expedition' url_force={'guides/expedition_pets_guide'} />
                            <PageCard page='pets' url_force={'guides/pets_guide'} />
                            <PageCard page='farm' url_force={'guides/farming_guide'} />
                            <PageCard page='cards' url_force={'guides/cards_guide'} />
                        </div>
                        {/*<div
                        style={{ display: 'flex', marginTop: '36px' }}
                    >
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                    <PageCard page='infinity_corner' /> 
                    </div>*/}
                    </div>
                </div>


                {/* How to use */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // minWidth: '512px',
                        border: '1px solid white',
                        marginBottom: '12px',
                        marginTop: '72px',
                        borderRadius: '12px',
                    }}
                >
                    <div className="importantText"
                        style={{
                            fontSize: '32px',
                            fontWeight: "bold",
                            backgroundColor: 'rgba(255,255,255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid white'
                        }}
                    >
                        Website How To use
                    </div>


                    <div
                        style={{
                            paddingLeft: '6px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            backgroundColor: 'rgba(255,255,255, 0.05)',
                            padding: '6px'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                flexWrap: 'wrap'
                            }}
                        >
                            <PageCard page='expedition' url_force={'guides/expedition_pets_explanation'} />
                            <PageCard page='pets' url_force={'guides/pets_explanation'} />
                            <PageCard page='farm' url_force={'guides/farming_explanation'} />
                            <PageCard page='cards' url_force={'guides/cards_explanation'} />
                        </div>
                        {/*<div
                        style={{ display: 'flex', marginTop: '36px' }}
                    >
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                    <PageCard page='infinity_corner' /> 
                    </div>*/}
                    </div>
                </div>
            </div>



            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '12px' }} />
            {/* <div id='in_content_flex' style={{ position: 'absolute', bottom: '0', left: '0', marginLeft: 'calc(50% - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', }} /> */}


        </div>
    );
}