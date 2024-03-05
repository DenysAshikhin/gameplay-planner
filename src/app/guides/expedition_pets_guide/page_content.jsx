"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);
import ScrollComponent from '../../util/ScrollComponent.jsx';
import exp_team_loadout_image from '../../../../public/images/guides/pets/exp_team_loadout.png';
import expedition_overview_image from '../../../../public/images/guides/pets/expeditions_overview.png';
import FrenchFryCornerImage from '../../../../public/images/guides/farm/french_Fry_corner.png';
import UniqueFrenchFryCornerImage from '../../../../public/images/guides/farm/unique_french_fries_corner.png';
import contagionImage from '../../../../public/images/guides/farm/contagion.png';
import farm_landingImage from '../../../../public/images/guides/farm/farm_landing.png';
import copyLinkSvg from '../../../../public/images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/expedition_pets_guide?section=';

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
                var viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
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
            case 'exp_team_loadout':
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
                    Expedition Pets Guide
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
                        navigator.clipboard.writeText(baseLink + 'exp_team_loadout')
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '368px', minHeight: '368px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={exp_team_loadout_image}
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
                            <div style={{ marginTop: '6px' }}>
                                {`1) Always try to have a 1.50x Synery Bonus. This is achieved by having 2 Ground and 2 Air pets. This ensure maximum token gain.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`2) Each rank level increases the bonuses and exp earned (towards pet levels, not ranks) by 2%. This adds up fast! So you should have any core pets in your
                                active teams inside your expeditions as well!`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`3) Try to utilise every single Token Gain pet.`}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Expeditions To Run */}
                <div
                    ref={picRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(baseLink + 'expeditions_overview')
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '720px', minHeight: '500px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={expedition_overview_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                        <div
                            className='hover'
                            style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-720px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                        >
                            <div>
                                Expeditions Guide + Tips
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
                            <div style={{ marginTop: '6px' }}>
                                {`1) Always try to be running the expeditions based on the cards they drop. Priority are Pet Damage, Item Rating, Reincarnation, Pet Level, Pet Rank, Milk, Residue.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`2) Any expedition that has Pet Damage card should be run 24/7.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`3) If you can't run all Item Rating card expeditions and 1 reincarnation reinc card, rotate 1 team between the two.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`4) The amount of card power gained is determined at every second by your Card Power bonus, so make sure to have Card Power pets equipped as much as possible.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`5) You can almost fully ignore all other cards not listed in 1) except for an hour here and there once per Ascencion.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`6) Pet Rank card expedition can be run towards the end of an Ascencion.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`7) Until you get splash damage and are above A12, it is recommended to constantly run Butternut Forest, it will be a major driver of progress.`}
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                {`8) Zucchini Field expedition should be run almost all the time, or as frequently as possible despite not having Pet Damage or Item Rating cards solely due to it
                                directly boosting Item Rating itself.`}
                            </div>
                        </div>

                    </div>
                </div>


                {/* Empty spacer */}
                <div style={{ minHeight: '100%' }} />
            </div>
        </div >
    );
}