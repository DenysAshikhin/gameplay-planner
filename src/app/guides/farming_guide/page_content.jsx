"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import PIC_ExplanationImage from '../../../../public/images/guides/farm/pic_explanation.png';
import ProductionTabLetteredImage from '../../../../public/images/guides/farm/production_tab_lettered.png';

import Image from 'next/image';

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
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >

            {/* Header */}
            <div style={{ display: 'flex', flex: '1', flexDirection: 'column', overflow: 'auto' }}>
                <div className="importantText"
                    style={{
                        fontSize: '32px',
                        fontWeight: "bold",
                        backgroundColor: 'rgba(255,255,255, 0.08)',
                        width: '100%',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    Farming Guide
                </div>

                {/* Production Tab */}
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white'
                    }}
                >
                    <div
                        style={{ position: 'relative', width: '256px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={ProductionTabLetteredImage}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px' }}>
                            Production Tab Explanation
                        </div>
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
                                        {`This value is used for Plant Improvement Corner (PIC). `}
                                    </div>
                                    <div>
                                        {` This is increased by either harvesting the plant (clicking on it when it is ready or an auto harvest).`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* PIC Explanation */}
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        marginTop: '24px'
                    }}
                >
                    <div
                        style={{ position: 'relative', width: '256px', height: '460px' }}
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
                        <div style={{ fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px' }}>
                            Plant Improvement Corner (PIC)
                        </div>
                        <div>
                            The Plant Improvement Corner (PIC) tab allows you to gain permanent upgrades for your plants. In general, it is best to purchase them right before 
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
                                        {`This value is used for Plant Improvement Corner (PIC). `}
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
        </div>
    );
}