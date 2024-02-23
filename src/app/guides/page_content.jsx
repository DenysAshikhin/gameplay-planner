"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import Link from 'next/link';
import PageCard from './page_card.jsx';

export default function Guides() {

    const [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        setMobileMode(isMobile);
        if (isMobile) {
            setTimeout(() => {
                var viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
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
                flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding:'12px'
            }}
        >


{/* How to use */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '512px',
                    border: '1px solid white',
                    marginBottom: '12px',
                    borderRadius:'12px'
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


                <div style={{
                    paddingLeft: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    padding: '6px'
                }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {/* <PageCard page='expedition' />
                    <PageCard page='pets' /> */}
                        <PageCard page='farm' url_force={'guides/farming_explanation'} />
                    </div>
                    {/*<div
                        style={{ display: 'flex', marginTop: '36px' }}
                    >
                        <PageCard page='cards' />
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                    <PageCard page='infinity_corner' /> 
                    </div>*/}
                </div>
            </div>


{/* Guides */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '512px',
                    border: '1px solid white',
                    borderRadius:'12px'
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


                <div style={{
                    paddingLeft: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    padding: '6px'
                }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {/* <PageCard page='expedition' />
                    <PageCard page='pets' /> */}
                        <PageCard page='farm' url_force={'guides/farming_guide'} />
                    </div>
                    {/*<div
                        style={{ display: 'flex', marginTop: '36px' }}
                    >
                        <PageCard page='cards' />
                    <PageCard page='protein' />
                    <PageCard page='residue' />
                    <PageCard page='infinity_corner' /> 
                    </div>*/}
                </div>
            </div>


        </div>
    );
}