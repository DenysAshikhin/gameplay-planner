"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';


import ScrollComponent from '../../util/ScrollComponent.jsx';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import best_auto_placements_image from '@images/guides/farm/best_auto_placements.png';
import afk_marked_up_image from '@images/guides/farm/afk_marked_up.png';
import step_marked_up_image from '@images/guides/farm/step_marked_up.png';
import top_plant_settings_markedup_image from '@images/guides/farm/top_plant_settings_markedup.png';
import graph_base_image from '@images/guides/farm/graph_base.png';
import farm_landingImage from '@images/guides/farm/farm_landing.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/farming_explanation?section=';

export default function Guides({ noSearchParams }) {

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
        switch (searchParams) {
            case 'auto_placement':
                prodRef.current.scrollIntoView();
                break;
            case 'afk_table':
                picRef.current.scrollIntoView();
                break;
            case 'step_table':
                frenchFryRef.current.scrollIntoView();
                break;
            case 'plant_settings':
                uniqueFryRef.current.scrollIntoView();
                break;
            case 'graph':
                contagionRef.current.scrollIntoView();
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
            
          

            <div style={{display:'flex', flex:'1'}}>
             {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            <Suspense fallback={<div></div>}>
                <ScrollComponent setSearchParam={setSearchParam} />
            </Suspense>
            {/* Header */}
            <div ref={containerRef}
                style={{
                    display: 'flex', flex: '1', flexDirection: 'column', overflow: 'auto',
                    scrollBehavior: 'smooth'
                }}
            >
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
                    Farming Page Explanation
                </div>

                {/* Best Auto Placements */}
                <div
                    ref={prodRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(baseLink + 'auto_placement')
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '256px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={best_auto_placements_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover'
                            style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                        >
                            <div>
                                Best Auto Placement
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
                                This is one of the most important parts of this page so read the following closely:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                {/* A */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                        A
                                    </div>
                                    <div style={{ marginLeft: '6px' }}>
                                        {`How many hours to simulate to find the optimal plant placements. You should set this to however long you think your current run will go on for. I.E.
                                        you are looking to do a 3 day run and you are 1 day into your current one, then set this to 48 hours (72 - 24).`}
                                    </div>
                                </div>
                                {/* B */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        B
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`How many autos you want the simulation to use. Recommended to set this to the same number as auto plots in your game.`}
                                        </div>
                                    </div>
                                </div>
                                {/* C */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                        C
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`Press this to get the best distribution of plants for an AFK approach. Meaning you can set-up your plants exactly
                                            how it tells you and leave it for however long you set the "Hours to calculate" (`}
                                        </div>
                                        <div style={{ fontWeight: 'bold', color: 'yellow', }}>
                                            {`A`}
                                        </div>
                                        <div>
                                            {`).`}
                                        </div>
                                    </div>
                                </div>
                                {/* D */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                        D
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`Press this to get the most optimal plant rotation, but it is more active. It will suggest the duration you should run each plant in
                                            all of your plots starting from your highest plant, then going down (I.E. Plant 3->Plant 2->Plant 1). This is much more active but
                                            can net you 10%-50% more Fries per run which will add up across many runs.`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {/* AFK Table */}
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
                        style={{ position: 'relative', minWidth: '512px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={afk_marked_up_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover'
                            style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-512px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'afk_table')
                            }}
                        >
                            <div>
                                AFK Table Results
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

                            <div >
                                {`This table summarizes the results for running "Calculate AFK".`}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                {/* A */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                        A
                                    </div>
                                    <div style={{ marginLeft: '6px' }}>
                                        {`This row shows you the most optimal placement (how many auto plots to use per plant) to generate the maximum amount of Health Potatoes.`}
                                    </div>
                                </div>
                                {/* B */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        B
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`This row shows you the most optimal placement (how many auto plots to use per plant) to generate the maximum amount of PIC levels
                                            while preserving as much HP as possible. It is recommended to consider following this distribution if the amount of Fries doign this is
                                            >90% (currently it is 93.35% so is a valid idea to approach to get 4x the PIC levels compare to just "Best Potatoe Generation")`}
                                        </div>
                                    </div>
                                </div>
                                {/* C */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        C
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`This row shows you how long it would take to get the next PIC level for each plant if you ran ALL autos for that 1 plant AFTER the
                                         "Hours to calculate". I.E. To get the next P7 PIC, I need to run all 10 autos of it for 4 hours and 31 minutes`}
                                        </div>
                                    </div>
                                </div>
                                {/* D */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        D
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`This shows how many auto plots need to run this plant and how many PIC levels you will get after "Hours to calculate". I.E. after 4 autos
                                            running P2, I will get 1 PIC level. If after I'm done "Hours to calculate" I can get 1 more PIC level by running all 10 autos for 4 hours if
                                            I wanted to.`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step Table */}
                <div
                    ref={frenchFryRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '512px', height: '256px' }}
                    >
                        <Image
                            alt={`French Fry Corner Tab Marked Up`}
                            src={step_marked_up_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div className='hover' style={{
                            fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-512px', marginTop: '6px',
                            textDecoration: 'underline'
                        }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'step_table')
                            }}
                        >
                            <div>
                                Step Table Results
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
                            {`This table is identical to the one explained above ("AFK Table Results") with the exception of highlighted area. Instead of placing the correct
                            number of auto plots per plant, you will start from the highest plant (left side of the table) and work your way down. For each 'step'
                            you will place all autos to be running the specified plant for the specified duration. I.E. in my case it recommends 0hours for plants P7-4 so I will
                            skip those. Instead, I start with P3 for 3 hours. Then put all P2 for 6 hours, etc.`}
                        </div>

                    </div>
                </div>

                {/* Top Plant Settings */}
                <div
                    ref={uniqueFryRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '450px', height: '128px' }}
                    >
                        <Image
                            alt={`Unique French Fry Corner Tab Marked Up`}
                            src={top_plant_settings_markedup_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-456px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'plant_settings')
                            }}
                        >
                            <div>
                                Top Plant Settings
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
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                {/* A */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                        A
                                    </div>
                                    <div style={{ marginLeft: '6px' }}>
                                        {`Makes each plant have "Unlocked Autos" number of autos set (the plants at the top of the screen). This affects "Current Production".`}
                                    </div>
                                </div>
                                {/* B */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        B
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`Makes each plant have 0 autos (the plants at the top of the screen).`}
                                        </div>
                                    </div>
                                </div>
                                {/* C */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                        C
                                    </div>
                                    <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            {`Switches between AFK mode (being able to set number of autos for the duration of "Hours to calculate") and Step mode
                                            (number of hours of max autos per plant). This affects the "Currently Selected Production".`}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Graph */}
                <div
                    ref={contagionRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '720px', height: '256px' }}
                    >
                        <Image
                            alt={`Contagion Sample Image from in game`}
                            src={graph_base_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-720px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'graph')
                            }}
                        >
                            <div>
                                Graph Results
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
                            {`The graph will display up to 6 lines: 1 representing the HP the other Fries. "Currently selected production" refers to the plant distribution selected at the top.
                        "Best Production" and "Most PIC" will be based on "Calculate AFK" or "Calculate Steps". If the scaling or axis looks off, just toggle 'axis-scale' to the left.`}
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