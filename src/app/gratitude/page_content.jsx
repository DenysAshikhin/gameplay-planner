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


import discord_image from '../../../public/images/icons/discord_gray.svg';
import paypal_image from "../../../public/images/icons/paypal.svg";
import scroll_image from '../../../public/images/icons/paper_scroll.svg';

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
                {/* donations */}
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
                    <h1 className='importantText' style={{ margin: '0 auto' }}>
                        Donation
                    </h1>
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
                                            {`Stripe/Card`}
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
                                            {`Paypal`}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
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
                        Contact
                    </h1>
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
                {/* legal */}
                <div
                    style={{
                        backgroundColor: 'rgba(255,255,255, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'start',
                        width: '1040px',
                        // maxHeight: 'calc(100% - 49px)',
                        margin: '12px 36px 12px 0px',
                        padding: '12px',
                        borderRadius: '12px'
                    }}
                >
                    <h1 className='importantText' style={{ margin: '0 auto' }}>
                        Legal
                    </h1>
                    <div
                        className='importantText'
                        style={{ fontSize: '28px', marginTop: '0px', marginBottom: '6px' }}
                    >
                        Feel free to read below to get the legal side of things
                    </div >

                    <div style={{ display: 'flex' }}>
                        {/* Privacy Policy */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.gameplayplanner.com/privacy_policy.html`} style={{ textDecoration: 'none' }} >
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
                                                src={scroll_image}
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
                                        <h2
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Privacy Policy`}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Terms of Use */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.gameplayplanner.com/terms_of_use.html`} style={{ textDecoration: 'none' }} >
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
                                                src={scroll_image}
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
                                        <h2
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Terms of Use`}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Cookie Policy */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.gameplayplanner.com/cookie_policy.html`} style={{ textDecoration: 'none' }} >
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
                                                src={scroll_image}
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
                                        <h2
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Cookie Policy`}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Disclaimer */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.gameplayplanner.com/disclaimer.html`} style={{ textDecoration: 'none' }} >
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
                                                src={scroll_image}
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
                                        <h2
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`Disclaimer`}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* About */}
                        <div style={{ margin: '24px auto' }}>
                            <Link href={`https://www.gameplayplanner.com/about`} style={{ textDecoration: 'none' }}
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
                                                src={scroll_image}
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
                                        <h2
                                            className="importantText"
                                            style={{
                                                // marginTop: '6px',
                                                fontSize: "20px",
                                            }}
                                        >
                                            {`About`}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <div id='in_content_flex' style={{ position: 'absolute', bottom: '0', left: '0', marginLeft: 'calc(50% - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', }} />

            <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />
        </div >
    );
}