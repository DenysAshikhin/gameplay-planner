"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import Link from 'next/link';


import discord_image from '../../../public/images/icons/discord_gray.svg';
import paypal_image from "../../../public/images/icons/paypal.svg";

export default function Expeditions() {

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
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >

            <GoogleAdSense publisherId="pub-1393057374484862" />
            <div style={{
                display: 'flex',
                flex: '1',
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.05)',
                paddingLeft: '12px'
            }}>
                <div
                    style={{
                        backgroundColor: 'rgba(255,255,255, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'start',
                        width: '550px',
                        // maxHeight: 'calc(100% - 49px)',
                        margin: '12px 36px 12px 0px', padding: '12px', borderRadius: '12px'
                    }}
                >
                    <div
                        className='importantText'
                        style={{ fontSize: '28px', marginTop: '0px', marginBottom: '6px' }}
                    >
                        Feel free to press the icon below to help keep the planner up for everyone
                    </div >

                    <div style={{ display: 'flex' }}>
                        {/* Donations */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://buy.stripe.com/aEU7w16jwa4X1xu4gh`} style={{ textDecoration: 'none' }}
                                onClick={() => {
                                    ReactGA.event({
                                        category: "donation_interaction",
                                        action: `click_donate`,
                                        label: `redirect_donation`
                                    })
                                }}
                                onMouseDown={(event) => {
                                    if (event.button === 1) {
                                        // do something on middle mouse button click
                                        ReactGA.event({
                                            category: "donation_interaction",
                                            action: `click_donate`,
                                            label: `redirect_donation`
                                        })
                                    }
                                }}

                            >
                                <div
                                    className={`hover`}
                                    style={{
                                        height: "148px",
                                        width: "170px",
                                        marginRight: "48px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <div className={``}
                                        style={{
                                            height: "80%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "rgba(255,255,255, 0.05)",
                                            borderTopRightRadius: "12px",
                                            borderTopLeftRadius: "12px",
                                            padding: "6px 6px 6px 6px",
                                            borderTop: "2px solid rgba(255,255,255,0.8)",
                                            borderLeft: "2px solid rgba(255,255,255,0.8)",
                                            borderRight: "2px solid rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                height: "calc(100% - 12px)",
                                                width: "calc(100% - 12px)",
                                            }}
                                        >
                                            <Image
                                                alt={`navigation item, picture of a donation jar`}
                                                src={`/images/icons/donation-cropped.svg`}
                                                fill
                                                priority
                                            />
                                        </div>
                                    </div>

                                    <div className={``}
                                        style={{
                                            height: "20%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "rgba(255,255,255, 0.12)",
                                            borderBottomRightRadius: "12px",
                                            borderBottomLeftRadius: "12px",
                                            borderBottom: "2px solid rgba(255,255,255,0.8)",
                                            borderLeft: "2px solid rgba(255,255,255,0.8)",
                                            borderRight: "2px solid rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        <div
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Donations`}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Paypal */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.paypal.com/paypalme/TheLastSpark`} style={{ textDecoration: 'none' }}
                                onClick={() => {
                                    ReactGA.event({
                                        category: "donation_interaction",
                                        action: `click_paypal`,
                                        label: `redirect_donation`
                                    })
                                }}
                                onMouseDown={(event) => {
                                    if (event.button === 1) {
                                        // do something on middle mouse button click
                                        ReactGA.event({
                                            category: "donation_interaction",
                                            action: `click_paypal`,
                                            label: `redirect_donation`
                                        })
                                    }
                                }}
                            >
                                <div
                                    className={`hover`}
                                    style={{
                                        height: "148px",
                                        width: "170px",
                                        marginRight: "48px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <div className={``}
                                        style={{
                                            height: "80%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "rgba(255,255,255, 0.05)",
                                            borderTopRightRadius: "12px",
                                            borderTopLeftRadius: "12px",
                                            padding: "6px 6px 6px 6px",
                                            borderTop: "2px solid rgba(255,255,255,0.8)",
                                            borderLeft: "2px solid rgba(255,255,255,0.8)",
                                            borderRight: "2px solid rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                height: "calc(100% - 12px)",
                                                width: "calc(100% - 12px)",
                                            }}
                                        >
                                            <Image
                                                alt={`navigation item, picture of a donation jar`}
                                                src={paypal_image}
                                                fill
                                                priority
                                                unoptimized
                                            />
                                        </div>
                                    </div>

                                    <div className={``}
                                        style={{
                                            height: "20%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "rgba(255,255,255, 0.12)",
                                            borderBottomRightRadius: "12px",
                                            borderBottomLeftRadius: "12px",
                                            borderBottom: "2px solid rgba(255,255,255,0.8)",
                                            borderLeft: "2px solid rgba(255,255,255,0.8)",
                                            borderRight: "2px solid rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        <div
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Donations`}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>



                </div>

                <div style={{
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    width: '750px',
                    // maxHeight: 'calc(100% - 49px)',
                    margin: '12px 36px 12px 0px', padding: '12px', borderRadius: '12px'
                }}>
                    <div
                        className='importantText'
                        style={{ fontSize: '28px', marginTop: '0px', marginBottom: '6px' }}
                    >
                        Want to get in touch or have questions? You can find me in the offical Farmer Against Potatoes Idle discord server
                    </div >


                    <div style={{ margin: '24px auto' }}>
                        <Link href={`https://discord.gg/pt8a9Y3mSv`} style={{ textDecoration: 'none' }}
                            onClick={() => {
                                ReactGA.event({
                                    category: "discord_interaction",
                                    action: `click_discord`,
                                    label: `redirect_discord`
                                })
                            }}

                            onMouseDown={(event) => {
                                if (event.button === 1) {
                                    ReactGA.event({
                                        category: "discord_interaction",
                                        action: `click_discord`,
                                        label: `redirect_discord`
                                    })
                                }
                            }}
                        >
                            <div
                                className={`hover`}
                                style={{
                                    height: "148px",
                                    width: "170px",
                                    marginRight: "48px",
                                    borderRadius: "6px",
                                }}
                            >
                                <div className={``}
                                    style={{
                                        height: "80%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(255,255,255, 0.05)",
                                        borderTopRightRadius: "12px",
                                        borderTopLeftRadius: "12px",
                                        padding: "6px 6px 6px 6px",
                                        borderTop: "2px solid rgba(255,255,255,0.8)",
                                        borderLeft: "2px solid rgba(255,255,255,0.8)",
                                        borderRight: "2px solid rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "calc(100% - 12px)",
                                            width: "calc(100% - 12px)",
                                        }}
                                    >
                                        <Image
                                            alt={`navigation item, discord logo`}
                                            src={discord_image}
                                            fill
                                            priority
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                <div className={``}
                                    style={{
                                        height: "20%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(255,255,255, 0.12)",
                                        borderBottomRightRadius: "12px",
                                        borderBottomLeftRadius: "12px",
                                        borderBottom: "2px solid rgba(255,255,255,0.8)",
                                        borderLeft: "2px solid rgba(255,255,255,0.8)",
                                        borderRight: "2px solid rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        className="importantText"
                                        style={{
                                            // marginTop: '6px',
                                            fontSize: "20px",
                                        }}
                                    >
                                        {`@TheLastSpark`}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <Link href={`https://www.gameplayplanner.com/privacy_policy.html`} >
                    <div className='importantText' style={{ fontSize: '24px' }}>
                        Privacy Policy
                    </div>
                </Link>
            </div>
        </div >
    );
}