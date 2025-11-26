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

import discord_image from '@images/icons/discord_gray.svg';
import paypal_image from "@images/icons/paypal.svg";
import scroll_image from '@images/icons/paper_scroll.svg';

/**
 * Expeditions provides the core implementation for the Expeditions routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by Expeditions.
 */
export default function Expeditions() {

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
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
             {/* <GoogleAdSense publisherId="pub-1393057374484862" /> */}
            <div style={{
                display: 'flex',
                flex: '1',
                flexWrap: 'wrap',
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.05)',
                paddingLeft: '12px'
            }}>
                {/* contact */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    width: '750px',
                    // maxHeight: 'calc(100% - 49px)',
                    margin: '12px 36px 12px 0px', padding: '12px', borderRadius: '12px'
                }}>
                    <h1 className='importantText' style={{ margin: '0 auto' }}>
                        About Us
                    </h1>
                    <div
                        className='importantText'
                        style={{ fontSize: '20px', marginTop: '0px', marginBottom: '6px' }}
                    >
                        <div>
                            {`Hi,`}
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            {`This is a passion project tool created to help everyone at any point in their Farmer Against Potatoes Idle journey. It contains a large set
                            of tools, calculators, guides, and suggestions for various parts of what you may or may not be currently doing in the game.`}
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            {`I have received explicit permission and approval from the game creator to maintain and host this tool, please reach out to me on discord, email
                            (denysashikhin@gmail.com), or "https://github.com/DenysAshikhin/gameplay-planner/issues" if you have further questions or concerns regarding this.`}
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            {`I myself am a single developer who works with other players in the community to further enhance/fix the tool and any feedback or questions can be freely
                            directed to me.`}
                        </div>
                    </div >
                </div>
            </div>
            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />
        </div >
    );
}
