"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);
import ScrollComponent from '../../util/ScrollComponent';
import pets_general_image from '@images/guides/pets/pets_general.png';
import pet_team_list_image from '@images/guides/pets/pet_team_list.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/pets_guide?section=';

/**
 * Guides function description.
 */
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
            case 'general':
                prodRef.current.scrollIntoView();
                break;
            case 'pet_list':
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
                        Active Pets Guide
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
                            navigator.clipboard.writeText(baseLink + 'general')
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '368px', minHeight: '368px' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={pets_general_image}
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
                                    General Pets Guide + Tips
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
                                    {`1) Pet levels reset on each Ascension but pet ranks (from expeditions) are preserved.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`2) Each rank level increases the bonuses and exp earned (towards pet levels, not ranks) by 2%. This adds up fast! So you should have any core pets in your
                                active teams inside your expeditions as well!`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`3) When creating pet teams you want to re-use the same pets as much as possible. This lets you avoid wasting time re-leveling pets if not absolutely necessary.`}
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Pet Lists */}
                    <div
                        ref={picRef}
                        style={{
                            display: 'flex',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                            border: '1px solid white',
                            margin: '0 12px 24px 12px',
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '256px', height: '460px' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={pet_team_list_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'pet_list')
                                }}
                            >
                                <div>
                                    Recommended Teams and When/How To Run Them
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
                                    {`It is recommended to split your pets into 4 core teams, make sure the pets in these teams are IN YOUR EXPEDITIONS!
                                 Create them in the following order as you unlock preset slots (Before A5 you only need the first three):`}
                                </div>
                                <div style={{ padding: '12px' }}>
                                    <div style={{ marginTop: '6px' }}>
                                        {`1) Main Team: This is the team you will be running 24/7. It will prioritise Reincarnation, Item Rating, Residue, Milk. As you ascend,
                                    the relative priority of each stat will shift and other will be added (like Card Power after A13). Recommend to check the related page for suggestions.`}
                                    </div>
                                    <div style={{ marginTop: '6px' }}>
                                        {`2) Gear Team: Any time you want to acquire/upgrade gear make sure to have this team on. Boosting item rating is more powerful than it might seem early on.`}
                                    </div>
                                    <div style={{ marginTop: '6px' }}>
                                        {`3) Reinc Team: It is important to run this 5-15 minutes before reincarnating to squeeze out as many Reincarnation levels as possible. This is the main
                                    metric by which progress is measured.`}
                                    </div>
                                    <div style={{ marginTop: '6px' }}>
                                        {`4) Stat Team: This team is run to capture any stats your other 3 teams might be missing, recommended to run to 5-15 minutes at the start and end of each 
                                    reincarnation.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Empty spacer */}
                    <div
                        style={{ minHeight: '100%' }}
                    >

                    </div>
                </div>
            </div>
            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'12px' }} />

        </div >
    );
}
