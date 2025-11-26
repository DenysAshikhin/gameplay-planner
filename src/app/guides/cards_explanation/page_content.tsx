"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';


import ScrollComponent from '../../util/ScrollComponent';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import cards_list_image from '@images/guides/cards/cards_list.png';
import current_future_charges_image from '@images/guides/cards/current_future_charges.png';
import card_suggestions_image from '@images/guides/cards/card_suggestions.png';
import future_reinc_image from '@images/guides/cards/future_reinc.png';
import pets_selection_image from '@images/guides/pets/pets_selection.png';
import miscellaneous_settings_image from '@images/guides/pets/miscellaneous_settings.png';
import missing_expedition_pet_image from '@images/guides/pets/missing_expedition_pet.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/cards_explanation?section=';

/**
 * Guides provides the core implementation for the Guides routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by Guides.
 */
export default function Guides({ noSearchParams }: { noSearchParams? }) {

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
        switch (searchParams) {
            case 'cards_list':
                prodRef.current.scrollIntoView();
                break;
            case 'current_future_charges':
                picRef.current.scrollIntoView();
                break;
            case 'card_suggestions':
                frenchFryRef.current.scrollIntoView();
                break;
            case 'future_reinc':
                uniqueFryRef.current.scrollIntoView();
                break;
            case 'pets_selection':
                contagionRef.current.scrollIntoView();
                break;
            case 'miscellaneous_settings':
                proteinRef.current.scrollIntoView();
                break;
            case 'missing_expedition_pet':
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
                        Cards Page Explanation + Tips
                    </div>

                    {/* Cards List Overview */}
                    <div
                        ref={prodRef}
                        style={{
                            display: 'flex',
                            backgroundColor: 'rgba(255,255,255, 0.06)',
                            border: '1px solid white',
                            margin: '0 12px 24px 12px',
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(baseLink + 'cards_list')
                        }}
                    >
                        <div
                            style={{ position: 'relative', minWidth: '480px', height: '200px' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={cards_list_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-480px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                            >
                                <div>
                                    Current Cards
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
                            <div style={{ padding: '12px', }}>
                                <div>
                                    This section lets you see all your current cards at a glance to help understand your current situtation and better determine next charges.
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', minWidth: '80px' }}>
                                        <div style={{ minWidth: '124px', marginTop: '6px' }}>
                                            {`Reset Weights)`}
                                        </div>
                                        <div>
                                            {`This will reset the weights of all cards to the default suggested amounts.`}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                        <div style={{ minWidth: '124px' }}>
                                            {`X gain)`}
                                        </div>
                                        <div>
                                            {`This dropdown lets you select how you want the cards bonus displayed. As either the current (before charge) bonus, future (after charge) bonus, 
                                        % gain bonus or X gain (how many times more is the future bonus versus current bonus).`}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                        <div style={{ minWidth: '124px' }}>
                                            {`Weight)`}
                                        </div>
                                        <div>
                                            {`The number below each cards when in gray, indicates it is using the default weight (importance). You can adjust this higher or lower to make the card
                                        be more or less important and affect its placement on the card suggestion lists to the right.`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Current Future Charges */}
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
                            style={{ position: 'relative', minWidth: '600px', height: '29px', margin: 'auto 0' }}
                        >
                            <Image
                                alt={`farming production tab`}
                                src={current_future_charges_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                            <div
                                className='hover'
                                style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-600px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'current_future_charges')
                                }}
                            >
                                <div>
                                    {`Current/Future Charges`}
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
                            <div style={{ padding: '12px', }}>
                                <div>
                                    Your current charges are the same as in game. The Remaining charges are calculated as follows:
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                    <div style={{ alignItems: 'center', minWidth: '80px' }}>
                                        <div style={{ margin: '12px 0' }}>
                                            {`Remaining charges are calculated based on your remaining reincarnation levels left to ascend multiplied by your current reincarnation levels / hr. 
                                        \nThis is calculated based on how many reincarnation levels you would gain if you reincarnate now divided by the current reincarnation duration.`}
                                        </div>
                                        <div>
                                            {`Remaining reincarnation levels are determined by your (reincarnation levels required to ascend) - (stored reincarnation levels + reincarnation levels you would gain if you reincarnate)`}
                                        </div>
                                        <div style={{ marginTop: '12px' }}>
                                            {`Current reincarnation levels / hr is determined by the amount of reincarnation levels you would get if you reincarnate, divided by how long your current reincarnation is going on for.`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Suggestions */}
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
                            style={{ position: 'relative', minWidth: '480px', height: '480px' }}
                        >
                            <Image
                                alt={`French Fry Corner Tab Marked Up`}
                                src={card_suggestions_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                            <div className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-480px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'card_suggestions')
                                }}
                            >
                                <div>
                                    Card Suggestions
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
                                    {`This section offers you some card suggestions you should consider. However, at the moment the one to always consider is EXPERIMENTAL. It is 
                                currently in progress but still tends to show the best suggestions. The second best is "Best Weight", which can be useful in lower ascensions. 
                                "Best Percentage" just shows the most raw gain without factoring in a cards weight (importance) and should only be used if you know what you're doing.`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Future Reincarnation Charge */}
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
                                src={future_reinc_image}
                                fill
                                priority
                                unoptimized
                            />
                        </div>

                        <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                            <div
                                className='hover' style={{
                                    fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-450px', marginTop: '6px',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(baseLink + 'future_reinc')
                                }}
                            >
                                <div>
                                    Future Reincarnation Levels
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
                                    <div>
                                        {`This section allows you to quickly see how many reincarnation levels you need to ascend. How many reincranations levels you will have if you reincarnate 
                                    right now. AND MOST IMPORTANT: how many extra reincarnation levels you will gain from charging your Reincarnation Card.`}
                                    </div>
                                    <div style={{ marginTop: '6px', fontWeight: 'bold', fontSize: '24px' }}>
                                        {`It is highly recommended you only charge your reincarnation card right before ascending to gain the necessary reincarnation levels to clear the requirement.`}
                                    </div>
                                </div>
                                <div style={{ padding: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                        <div>
                                            {`The green number shows how many extra levels you will gain from charging the card.`}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                        <div>
                                            {`The number field lets you enter how many times you will charge the reincarnation card. I.E. if 1 charge isn't enough and you are considering if a second or third
                                        would let you get enough.`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Empty spacer */}
                    <div style={{ minHeight: '100%' }}></div>
                </div>
            </div>

            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'12px' }} />

        </div >
    );
}
