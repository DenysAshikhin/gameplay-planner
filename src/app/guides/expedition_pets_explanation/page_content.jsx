"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';


import ScrollComponent from '../../util/ScrollComponent.jsx';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import exp_teams_overview_image from '../../../../public/images/guides/pets/exp_teams_overview.png';
import top_configuration_image from '../../../../public/images/guides/pets/top_configuration.png';
import pet_whitelist_image from '../../../../public/images/guides/pets/pet_whitelist.png';
import manual_pet_selection from '../../../../public/images/guides/pets/manual_pet_selection.png';
import custom_presets_image from '../../../../public/images/guides/pets/custom_presets.png';
import miscellaneous_settings_image from '../../../../public/images/guides/pets/miscellaneous_settings.png';
import missing_expedition_pet_image from '../../../../public/images/guides/pets/missing_expedition_pet.png';
import copyLinkSvg from '../../../../public/images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/expedition_pets_explanation?section=';

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
            case 'exp_teams_overview':
                prodRef.current.scrollIntoView();
                break;
            case 'top_configuration':
                picRef.current.scrollIntoView();
                break;
            case 'pet_whitelist':
                stat_list.current.scrollIntoView();
                break;
            case 'manual_pet_selection':
                uniqueFryRef.current.scrollIntoView();
                break;
            case 'custom_presets':
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
                    Expedition Pets Page Explanation + Tips
                </div>

                {/* Best Teams Overview*/}
                <div
                    ref={prodRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(baseLink + 'exp_teams_overview')
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '480px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={exp_teams_overview_image}
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
                                Getting Recommended Expedition Teams
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
                                This is the part of the tool that shows your best expedition teams sorted in order by Damage in descending order. Each part is explained below:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', minWidth: '80px' }}>
                                    <div style={{ minWidth: '124px', marginTop: '6px' }}>
                                        {`Total Damage)`}
                                    </div>
                                    <div>
                                        {`This shows the total damage across all teams and should match the in game values.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Total token/hr)`}
                                    </div>
                                    <div>
                                        {`This shows how many tokens you will earn per hour if all your teams are actively running. This factors in every token bonus.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Rank Damage)`}
                                    </div>
                                    <div>
                                        {`This shows how much damage the team gains for every rank level the pets in it earn. This allows for a more absolute comparison of pets and teams and should
                                        be the primary way that teams are compared. The reason being that newer pets may get much more damage/rank but if they are freshly unocked, seem significantly worse.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Game Damage)`}
                                    </div>
                                    <div>
                                        {`This shows how much damage the team actually has, factoring everytihng in. This should match the in game value.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Token/hr)`}
                                    </div>
                                    <div>
                                        {`This shows how many tokens the team generates every hour.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Top Configuration */}
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
                        style={{ position: 'relative', minWidth: '368px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={top_configuration_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover'
                            style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-368px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'top_configuration')
                            }}
                        >
                            <div>
                                Top Configuration
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
                                This is the part of the tool that shows your best expedition teams sorted in order by Damage in descending order. Each part is explained below:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', minWidth: '80px' }}>
                                    <div style={{ minWidth: '124px', marginTop: '6px' }}>
                                        {`Ignore Pets Rank)`}
                                    </div>
                                    <div>
                                        {`It is recommended to keep this always on. It will generate teams based on a pets damage gain per rank (meaning newer, stronger pets are considered). Otherwise,
                                        it will tend to keep selecting old pets since they had a bit of a headstart on ranks. After a day or so a new pet would catch up in ranks and be by far the 
                                        better choice.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Token bonuses)`}
                                    </div>
                                    <div>
                                        {`This shows your total multiplier for token gain.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Expedition Reward Combo)`}
                                    </div>
                                    <div>
                                        {`This lets your set if you have or will swap to the special pet combo (Expedition Reward) which increases all rewards by 10%/20% if active at the time of an 
                                        expedition finishing.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Number of teams)`}
                                    </div>
                                    <div>
                                        {`How many teams you want to generate. This is limited to minimum of 1 and a max corresponding to your maximum in game.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '124px' }}>
                                        {`Show all bonus total)`}
                                    </div>
                                    <div>
                                        {`This shows/hides a section below which will list how many pets you currently have posseing the better bonuses (stats) out of the total 
                                        number of pets that posses this stat. I recommend toggling this on and enable the Expedition Token Gain (green) to be on.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pet Whitelist */}
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
                        style={{ position: 'relative', minWidth: '220px', height: '368px' }}
                    >
                        <Image
                            alt={`French Fry Corner Tab Marked Up`}
                            src={pet_whitelist_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div className='hover' style={{
                            fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-220px', marginTop: '6px',
                            textDecoration: 'underline'
                        }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'pet_whitelist')
                            }}
                        >
                            <div>
                                Stat List Explained
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
                                {`This summarises the stats the suggested team posses, as well as how many pets contribute to a sta, and any missing stats.`}
                            </div>
                            <div style={{ padding: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ color: 'gray', fontSize: '24px', fontWeight: 'bold', marginRight: '6px', marginTop: '-2px', minWidth: '76px' }}>
                                        {`Gray: `}
                                    </div>
                                    <div>
                                        This stat is gained by accident, it was not specified in the priority list, but is a happy bonus.
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginRight: '6px', marginTop: '-2px', minWidth: '76px' }}>
                                        {`White: `}
                                    </div>
                                    <div>
                                        {`This stat is specified in the list as -1.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ color: 'red', fontSize: '24px', fontWeight: 'bold', marginRight: '6px', marginTop: '-2px', minWidth: '76px' }}>
                                        {`Red: `}
                                    </div>
                                    <div>
                                        {`This stat is as a number above 0, but the it was impossible to reach that criteria. Either there aren't enough pets, or other stats took precedence.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ color: 'green', fontSize: '24px', fontWeight: 'bold', marginRight: '6px', marginTop: '-2px', minWidth: '76px' }}>
                                        {`Green: `}
                                    </div>
                                    <div>
                                        {`This stat is as a number above 0, and the exact number of pets was selected.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <div style={{ color: 'yellow', fontSize: '24px', fontWeight: 'bold', marginRight: '6px', marginTop: '-2px', minWidth: '76px' }}>
                                        {`Yellow: `}
                                    </div>
                                    <div>
                                        {`This stat is as a number above 0, but there are more pets contributing to this stat than requested. Most likely another pet was selected later that posses this
                                        stat but it was not chosen due to this stat, merely a coincidence.`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Manual Pet Selection*/}
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
                        style={{ position: 'relative', minWidth: '450px', height: '256px' }}
                    >
                        <Image
                            alt={`Unique French Fry Corner Tab Marked Up`}
                            src={manual_pet_selection}
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
                                navigator.clipboard.writeText(baseLink + 'manual_pet_selection')
                            }}
                        >
                            <div>
                                Manual Pet Selection
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
                                {`This allows you to either forcefully include a pet, or exclude from the selection process.`}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Custom Presets */}
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
                        style={{ position: 'relative', minWidth: '368px', height: '256px' }}
                    >
                        <Image
                            alt={`Contagion Sample Image from in game`}
                            src={custom_presets_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-368px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'custom_presets')
                            }}
                        >
                            <div>
                                Custom Presets
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
                                {`Custom presets can be made to save your preferred configurations and quickly load or share them with others.`}
                            </div>
                            <div style={{ padding: '6px' }}>
                                <div style={{ marginTop: '6px' }}>
                                    {`1) To your current preset, enter a name for it in the box next to "Save Current". Be careful, this will overrite any other preset named this way!`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`2) To load a previously saved preset, select it from the dropdown next to "Select saved preset".`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`3) To delete a previously saved preset, select it from the dropdown next to "Delete preset".`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`4) To load someone elses prest, paste it into the box next to "Import Preset" and press "Import Preset"`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`6) To be able to share your preset, press "Copy Current Preset to Clipboard", this will copy a string into your clipboard that you can freely share.`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Miscellaneous Settings */}
                <div
                    ref={proteinRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '256px', height: '128px' }}
                    >
                        <Image
                            alt={`Contagion Sample Image from in game`}
                            src={miscellaneous_settings_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'miscellaneous_settings')
                            }}
                        >
                            <div>
                                Miscellaneous Settings
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
                                {`Extra options to configure how this tool behaves.`}
                            </div>
                            <div style={{ padding: '6px' }}>
                                <div style={{ marginTop: '6px' }}>
                                    {`Use expedition pets) This will only use the pets you have enabled (green or green+yellow) border cirles on the expeditions tool page.`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Missing Expedition Pet */}
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
                        style={{ position: 'relative', minWidth: '256px', height: '168px' }}
                    >
                        <Image
                            alt={`Contagion Sample Image from in game`}
                            src={missing_expedition_pet_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-256px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'missing_expedition_pet')
                            }}
                        >
                            <div>
                                Missing Expedition Pet
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

                            <div style={{ padding: '12px' }}>
                                <div>
                                    {`If any of your pets has an amber flashing icon as seen to the left, it means this pet is not in any of your expedition teams, (those on from the 
                                    Expedition page of this tool). This can be remdied in one of two ways:`}
                                </div>
                                <div style={{ padding: '6px' }}>
                                    <div style={{ marginTop: '6px' }}>
                                        {`1) Go to the expedition page and make sure this pet is included (recommended if not on Stat team).`}
                                    </div>
                                    <div style={{ marginTop: '6px' }}>
                                        {`2) If you do not want this pet, or think it is a poor choice, exclude this pet using the whitelist. Usually a good approach for "Stat Team", and
                                    see if doing so a few times find a better team combination.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty spacer */}
                <div style={{ minHeight: '100%' }}></div>
            </div>
        </div >
    );
}