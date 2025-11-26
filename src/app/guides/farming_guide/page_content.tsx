"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);
import ScrollComponent from '../../util/ScrollComponent';

import PIC_ExplanationImage from '@images/guides/farm/pic_explanation.png';
import ProductionTabLetteredImage from '@images/guides/farm/production_tab_lettered.png';
import FrenchFryCornerImage from '@images/guides/farm/french_Fry_corner.png';
import UniqueFrenchFryCornerImage from '@images/guides/farm/unique_french_fries_corner.png';
import contagionImage from '@images/guides/farm/contagion.png';
import farm_landingImage from '@images/guides/farm/farm_landing.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/farming_guide?section=';

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
            case 'production':
                prodRef.current.scrollIntoView();
                break;
            case 'pic':
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
                        Farming Guide
                    </div>

                    {/* Production Tab */}
                    <div
                        ref={prodRef}
                        style={{
                            display: 'flex',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                            border: '1px solid white',
                            margin: '0 12px 24px 12px',
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(baseLink + 'production')
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '256px', height: '256px' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={ProductionTabLetteredImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                            >
                                <div>
                                    Production Tab Explanation
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
                                    The production tab consists of the production summary of each plant, this summary is composed of 4 numbers:
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    {/* A */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                            A
                                        </div>
                                        <div style={{ marginLeft: '6px' }}>
                                            {`The total output per second. The first plant produces Healthy Potatoes (HP), while every other plant produces the plant before it. This means
                                that plant 4 produces plant 3, plant 3 produces plant 2, and so on.`}
                                        </div>
                                    </div>
                                    {/* B */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                            B
                                        </div>
                                        <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <div>
                                                {`The production multipler. This number is included in (`}
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: 'yellow', }}>
                                                {`A`}
                                            </div>
                                            <div>
                                                {`) and is calculated by the plant harvest (`}
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: 'yellow', }}>
                                                {`D`}
                                            </div>
                                            <div>
                                                {`) and "Improve Harvest Formula" (`}
                                            </div>
                                            <div>
                                                {`referred to as the shovel upgrade)`}
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
                                                {`How much you have of this plant. This is increased by either harvesting the plant (clicking on it when it is ready or an auto harvest)`}
                                            </div>
                                            <div style={{ margin: '0 6px', fontWeight: 'bold' }}>
                                                {`OR`}
                                            </div>
                                            <div>
                                                {`produced by the plant after it. This number together with (`}
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: 'yellow', }}>
                                                {`B`}
                                            </div>
                                            <div>
                                                {`) determines `}
                                            </div>
                                            <div>
                                                {`your total production (`}
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: 'yellow', }}>
                                                {`A`}
                                            </div>
                                            <div>
                                                {`)`}
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
                                                {`HARVESTED amount of this plant. `}
                                            </div>
                                            <div style={{ margin: '0 6px' }}>
                                                {`This value is used for Permanent Improvement Corner (PIC). `}
                                            </div>
                                            <div>
                                                {` This is increased by either harvesting the plant (clicking on it when it is ready or an auto harvest).`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* PIC Explanation */}
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
                                src={PIC_ExplanationImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'pic')
                                }}
                            >
                                <div>
                                    Permanent Improvement Corner (PIC)
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
                                    {`The Permanent Improvement Corner (PIC) tab allows you to gain permanent upgrades for your plants. In general, it is best to purchase them right before 
                            resetting your farm run, and after the first few harvests of unlocking a new plant for the first time.`}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    {/* A */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow' }}>
                                            A
                                        </div>
                                        <div style={{ marginLeft: '6px' }}>
                                            {`How much harvest this upgrade costs. Harvests are only acquired when a plant fully grows and collected (manually clicked on or by an auto plot).`}
                                        </div>
                                    </div>
                                    {/* B */}
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '12px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'yellow', }}>
                                            B
                                        </div>
                                        <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <div>
                                                {`How much harvest you have of this plant. `}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* French Fry Corner */}
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
                                src={FrenchFryCornerImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-512px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'frenchfry')
                                }}
                            >
                                <div>
                                    French Fry Corner
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
                                {`The French Fry Corner upgrades should be bought in the following order (#1 being the most important and first, #8 being the last). The auto plot takes
                            precedence over all others on this page. The extra starting plot should be bought only when it is less than 10% of the fries earned from resetting.`}
                            </div>

                        </div>
                    </div>

                    {/* Unique French Fry Corner */}
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
                            style={{ position: 'relative', minWidth: '450px', height: '64px' }}
                        >
                            <Image
                                alt={`Unique French Fry Corner Tab Marked Up`}
                                src={UniqueFrenchFryCornerImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                                className='hover' style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-456px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'frenchfryunique')
                                }}
                            >
                                <div>
                                    Unique French Fry Corner
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
                                {`The Unique French Fry Corner upgrades should be bought when they cost less than 10% of your fry amount after a reset. This can be ignored for major unlocks (extra Ascension point for example).`}
                            </div>

                        </div>
                    </div>

                    {/* Contagion */}
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
                            style={{ position: 'relative', minWidth: '450px', height: '256px' }}
                        >
                            <Image
                                alt={`Contagion Sample Image from in game`}
                                src={contagionImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                                className='hover' style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-456px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'contagion')
                                }}
                            >
                                <div>
                                    Contagion
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
                                {`Contagion is a bit of a slow burn early on so don't stress over it too hard. You can either distribute your grasshoppers equally, or pump them all into a relevant bonus as needed.
                            For example, if you are close to resetting, pump more FRY bonus. Not strictly necessary, but if min-maxing can give you a nice boost.`}
                            </div>
                        </div>
                    </div>

                    {/* General Approach Guide */}
                    <div
                        ref={generalRef}
                        style={{
                            display: 'flex',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                            border: '1px solid white',
                            margin: '0 12px 24px 12px',
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '450px', height: '256px' }}
                        >
                            <Image
                                alt={`Contagion Sample Image from in game`}
                                src={farm_landingImage}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                            <div
                                className='hover' style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-456px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'general')
                                }}
                            >
                                <div>
                                    General Guide/Tips
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
                                    {`There are several guidelines/tips to simplify farming:`}
                                </div>
                                <div style={{ display: 'flex', marginTop: '6px' }}>
                                    <div style={{ marginRight: '6px' }}>
                                        {`1)`}
                                    </div>
                                    <div>
                                        {`Farm resets (fryscencions) shouldn't be longer that 5 days until later on. As for how to know when to reset, you if you have 10x fry earned or meaningful page 4 upgrades you
                                    can consider resetting. If you are approaching 5 days and don't have one of the previous two points, consider pushing as many PIC levels as possible and then resetting`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', marginTop: '6px' }}>
                                    <div style={{ marginRight: '6px' }}>
                                        {`2)`}
                                    </div>
                                    <div>
                                        {`If you want a more AFK approach to farming, planting 1 plant of each is perfectly valid, just make sure to get some PICs before resetting.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', marginTop: '6px' }}>
                                    <div style={{ marginRight: '6px' }}>
                                        {`3)`}
                                    </div>
                                    <div>
                                        {`If you want a more optimal (active) approach, consider a step process. Here you will plant your highest plant in every plot. Then later switch to your 2nd highest, 3rd, etc.
                                    I recommend using the "calc step" option on the farming page of the planner for this one to get optimal timings.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', marginTop: '6px' }}>
                                    <div style={{ marginRight: '6px' }}>
                                        {`4)`}
                                    </div>
                                    <div>
                                        {`Only buy PIC levels right before you reset your farm, unless it's the first couple harvests EVER of a plant (i.e. after you unlocked it for the first time) at the start of a run. If it is brand new, then do it as this will
                                     let you squeeze out a few extra PIC levels without hurting your farm run too much.`}
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
            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '12px' }} />

        </div >
    );
}
