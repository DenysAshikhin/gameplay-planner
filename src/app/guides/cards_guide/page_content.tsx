"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);
import ScrollComponent from '../../util/ScrollComponent';
import cards_charge_image from '@images/guides/cards/cards_charge.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/cards_guide?section=';

export default function Guides() {

    const containerRef = useRef(null);
    const prodRef = useRef(null);
    const picRef = useRef(null);
    const frenchFryRef = useRef(null);
    const uniqueFryRef = useRef(null);
    const contagionRef = useRef(null);
    const proteinRef = useRef(null);
    const generalRef = useRef(null);


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


    const [searchParams, setSearchParam] = useState("");
    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        switch (searchParams) {
            case 'cards_charge':
                prodRef.current.scrollIntoView();
                break;
            case 'expeditions_overview':
                picRef.current.scrollIntoView();
                break;
            case 'frenchfry':
                frenchFryRef.current.scrollIntoView();
                break;
            case 'frenchfryunique':
                uniqueFryRef.current.scrollIntoView();
                break;
            case 'contagion':
                contagionRef.current.scrollIntoView();
                break;
            case 'protein':
                proteinRef.current.scrollIntoView();
                break;
            case 'general':
                generalRef.current.scrollIntoView();
                break;
            default:
                break;
        }
    }, [searchParams]);




    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div style={{ display: 'flex', flex: '1' }}>
                {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
                {/* Header */}
                <div ref={containerRef}
                    style={{
                        display: 'flex', flex: '1', flexDirection: 'column', overflow: 'auto',
                        scrollBehavior: 'smooth'
                    }}
                >
                    <Suspense fallback={<div></div>}>
                        <ScrollComponent setSearchParam={setSearchParam} />
                    </Suspense>
                    <div className="importantText"
                        style={{
                            fontSize: '32px',
                            fontWeight: "bold",
                            backgroundColor: 'rgba(255,255,255, 0.08)',
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '24px',
                            borderBottom: '1px solid white'
                        }}
                    >
                        Cards Guide
                    </div>

                    {/* General Guide */}
                    <div
                        ref={prodRef}
                        style={{
                            display: 'flex',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                            border: '1px solid white',
                            margin: '0 12px 24px 12px',
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(baseLink + 'cards_charge')
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '368px', minHeight: '256px' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={cards_charge_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-368px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                            >
                                <div>
                                    General Guide + Tips
                                </div>
                                <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                                    <Image
                                        alt={`clipboard with a dash to copy link reference`}
                                        src={copyLinkSvg}
                                        fill
                                        priority
                                        unoptimized
                                    />
                                </div>

                            </div>
                            <div style={{ padding: '12px' }}>
                                <div>
                                    {`In general, the priority for which card to charge is: Pet Damage, Item Rating, Pet Rank, Residue, Milk. The notable exception being Reincarnation which you
                                want to charge once at the end of your ascencion to get over the reincarnation requirements. You can easily tell this by visiting the /cards page.`}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    {/* A */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'blue' }}>
                                            A
                                        </div>
                                        <div style={{ marginLeft: '6px' }}>
                                            {`This is the current bonus given by the card. It is calculated based on your card level, the card's temporary power and the card's permanent power.`}
                                        </div>
                                    </div>
                                    {/* B */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'blue', }}>
                                            B
                                        </div>
                                        <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <div>
                                                {`This is the card's temporary power and upon ascending it is reset to 0. It is gained whenever an expedition finishes and this card is selected from the pool of possible 3
                                            for the card reward. This can be increased from 1 to 2 and 2 to 3 with later upgrades. Meaning later on, you can get all 3 cards from an 
                                            expedition upon completion.`}
                                            </div>
                                        </div>
                                    </div>
                                    {/* C */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'blue' }}>
                                            C
                                        </div>
                                        <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <div>
                                                {`This is the card's permanent power and it is kept across ascensions. You gain this by using up a charge to convert some of the card's temporary
                                            power into the permanent power. When you have low amount of temporary power this can lead to having a decrease in overall benefit until temporary
                                            power recovers from the charge - it is recommended you avoid charging if it is negative.`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Empty spacer */}
                    <div style={{ minHeight: '100%' }} />
                </div>
            </div>
            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '12px' }} />

        </div >
    );
}