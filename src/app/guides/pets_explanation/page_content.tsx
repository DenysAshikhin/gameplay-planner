"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect, useRef, Suspense } from 'react';

import ScrollComponent from '../../util/ScrollComponent';
import ReactGA from "react-ga4";
//import { GoogleAdSense } from "next-google-adsense";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import preset_dropdown_image from '@images/guides/pets/preset_dropdown.png';
import priority_list_image from '@images/guides/pets/priority_list.png';
import stat_list_image from '@images/guides/pets/stat_list.png';
import manual_pet_selection from '@images/guides/pets/manual_pet_selection.png';
import custom_presets_image from '@images/guides/pets/custom_presets.png';
import miscellaneous_settings_image2 from '@images/guides/pets/miscellaneous_settings2.png';
import missing_expedition_pet_image from '@images/guides/pets/missing_expedition_pet.png';
import copyLinkSvg from '@images/icons/copy_link.svg';

import Image from 'next/image';

const baseLink = 'https://www.gameplayplanner.com/guides/pets_explanation?section=';

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
            case 'preset_dropdown':
                prodRef.current.scrollIntoView();
                break;
            case 'priority_list':
                picRef.current.scrollIntoView();
                break;
            case 'stat_list':
                frenchFryRef.current.scrollIntoView();
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
                    Active Pets Page Explanation + Tips
                </div>

                {/* Preset Dropdown*/}
                <div
                    ref={prodRef}
                    style={{
                        display: 'flex',
                        backgroundColor: 'rgba(255,255,255, 0.06)',
                        border: '1px solid white',
                        margin: '0 12px 24px 12px',
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(baseLink + 'preset_dropdown')
                    }}
                >
                    <div
                        style={{ position: 'relative', minWidth: '256px', height: '256px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={preset_dropdown_image}
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
                                Getting Recommended Teams
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
                                This is one of the most important parts of this page so read the following closely:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                <div>
                                    {`The dropdown will let you select which team you want to generate. It will automatically populate the "Priority List" based on your Ascencion.
                                So good rule of thumb is to review each of these teams anytime a new pet is acquired or you ascend.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`The stat team is special, and will generate recommended "Priority List" based on the missing stats from the "Main, Reinc, Gear" teams. However,
                                    feel free to adjust it as you see fit.`}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Priority List */}
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
                        style={{ position: 'relative', minWidth: '220px', height: '368px' }}
                    >
                        <Image
                            alt={`farming production tab`}
                            src={priority_list_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover'
                            style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-220px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'priority_list')
                            }}
                        >
                            <div>
                                Priority List
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
                                {`Each preset, with the exception of the "Stat Team" functions off of a predefined priority list for your ascension. Feel free to change it as you
                                want to suit your needs. The specific of how it works are below:`}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
                                <div style={{ marginTop: '6px' }}>
                                    {`1) The priority list generates a team by looking at every available pet, and assigning a score to it based on the criteria in the list. The scoring is explained
                                    in the next points.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`2) The priority list is made up of blocks that has a value from -1 to 6. A value of -1 means you want as many pets including this bonus, a pet always 
                                 gains an increase in score for possesing this stat. A value of 0 means that no pet will get an increase in score for possesing this stat. Any value above 0 only 
                                 rewards the first x pets for having the stat; if set to 2 for Calcium, only the first two chosen pets that possess Calcium get an increase in score for it.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`3) The "importance" of a stat is determined by how high it is in the list. In a list of 3 items, the first (top) stat is worth 1, 2nd place is 2/3 and last (bottom)
                                    stat is worth 1/3. This means that you can artifically lower or heighten a stat by placing other, non-important stats around and setting them to 0.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`4) When "Stat Team" is selected from the dropdown, the logic becomes much more complex, but the big takeaway is, -1 is only rewarded after all other non 0 stats are
                                    satisfied. Moreover, that pet needs to be in one of your Main, Reinc, Gear teams to be rewarded for having a -1 stat.`}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat List */}
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
                            src={stat_list_image}
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
                                navigator.clipboard.writeText(baseLink + 'stat_list')
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
                            src={miscellaneous_settings_image2}
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
                                    {`Expedition Pet List) This will only use the pets you have enabled (green or green+yellow) border cirles on the expeditions tool page.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`Max Top Stat) Planner will focus on the first stat in the list and will try to fill the team with pets having that stat. Other stats will only be taken into account to fill the rest of the team (if you don't have enough Top Stat pets) or pick best pets if you have too many with Top Stat. Recommended to use this on team  like Gear/Reinc where the team is used for a specific stat.`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`Ignore Promotions) - if selected, planner will not give pets bonus score for having promotion levels. It will still factor in promotions for the amount of stat it gives`}
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    {`Equalise Pets) - if selected, planner will treat each pet as having 1 rank and 1 level. This is useful if you have unranked 10* promotion pets you want considered more `}
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
            </div>


            <div id='right_pillar' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'12px' }} />


        </div >
    );
}