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
import pet_bonus_finder_image from '../../../../public/images/guides/pets/pet_bonus_finder.png';
import pets_selection_image from '../../../../public/images/guides/pets/pets_selection.png';
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
            case 'pet_bonus_finder':
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
                                    <div style={{ minWidth: '160px', marginTop: '6px' }}>
                                        {`Ignore Pets Rank)`}
                                    </div>
                                    <div>
                                        {`It is recommended to keep this always on. It will generate teams based on a pets damage gain per rank (meaning newer, stronger pets are considered). Otherwise,
                                        it will tend to keep selecting old pets since they had a bit of a headstart on ranks. After a day or so a new pet would catch up in ranks and be by far the 
                                        better choice.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '160px' }}>
                                        {`Token bonuses)`}
                                    </div>
                                    <div>
                                        {`This shows your total multiplier for token gain.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '160px', maxWidth: '160px' }}>
                                        {`Expedition Reward Combo)`}
                                    </div>
                                    <div>
                                        {`This lets your set if you have or will swap to the special pet combo (Expedition Reward) which increases all rewards by 10%/20% if active at the time of an 
                                        expedition finishing.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '160px' }}>
                                        {`Number of teams)`}
                                    </div>
                                    <div>
                                        {`How many teams you want to generate. This is limited to minimum of 1 and a max corresponding to your maximum in game.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ minWidth: '160px' }}>
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
                        style={{ position: 'relative', minWidth: '368px', height: '256px' }}
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
                            fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-368px', marginTop: '6px',
                            textDecoration: 'underline'
                        }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'pet_whitelist')
                            }}
                        >
                            <div>
                                Pet Whitelist
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
                                {`This section can be intimidating at first glance, but is the most powerful part of this page:`}
                            </div>
                            <div style={{ marginTop: '6px', fontWeight: 'bold', fontSize: '24px' }}>
                                {`It is highly recommended to add all COMMONLY USED pets into your whitelist 100% of the time.`}
                            </div>
                            <div style={{ padding: '6px' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Team Presets: `}
                                    </div>
                                    <div>
                                        {`This will show you a list of all your in-game active pet teams. Selecting one will load in all the pets from that team to be 
                                        included in expeditions teams to the right.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px', maxWidth: '128px', }}>
                                        {`Recommended Presets: `}
                                    </div>
                                    <div>
                                        {`This will show you the recommended teams from the /pets page. Selecting one will load in all the pets from that team to be 
                                        included in expeditions teams to the right.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Placement: `}
                                    </div>
                                    <div>
                                        {`This determines how a pet is slotted into your expeditions. "Auto" will find the best spot automatically and is the recommended approach. "Group" 
                                        will force a pet to go into the specified group. "Blacklist" will remove the pet from going in any team.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Parameters: `}
                                    </div>
                                    <div>
                                        {`Currently only used for "Group" placement. Specifies which team the pet should be placed into.`}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Pet Bonus Finder */}
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
                        style={{ position: 'relative', minWidth: '450px', height: '450px' }}
                    >
                        <Image
                            alt={`Unique French Fry Corner Tab Marked Up`}
                            src={pet_bonus_finder_image}
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
                                navigator.clipboard.writeText(baseLink + 'pet_bonus_finder')
                            }}
                        >
                            <div>
                                Pet Bonus Finder
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
                                    {`This section allows you to quickly find which pets you have with specific bonuses sorted by damage. Any bonus that is expedition only will have the word
                                "expedition" on the end.`}
                                </div>
                                <div style={{ marginTop: '6px', fontWeight: 'bold', fontSize: '24px' }}>
                                    {`It is highly recommended to add all EXPEDITION TOKEN GAIN pets into your whitelist 100% of the time.`}
                                </div>
                            </div>
                            <div style={{ padding: '6px' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px', maxWidth: '128px', textDecoration: "line-through" }}>
                                        {`Strike-through: `}
                                    </div>
                                    <div>
                                        {`If a pets' name is struck-through, it means this pet is already in one of the expedition teams to the right.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px', maxWidth: '128px', }}>
                                        {`Pin Icon: `}
                                    </div>
                                    <div>
                                        {`This will quickly add the pet to the whitelist above. If the pin is missing, that means it's already whitelisted.`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Pets */}
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
                        style={{ position: 'relative', minWidth: '400px', height: '160px' }}
                    >
                        <Image
                            alt={`Contagion Sample Image from in game`}
                            src={pets_selection_image}
                            fill
                            priority
                            unoptimized
                        />
                    </div>

                    <div className='importantText' style={{ display: 'flex', flexDirection: 'column', flex: "1" }}>
                        <div
                            className='hover' style={{
                                fontSize: "26px", display: 'flex', justifyContent: 'center', marginLeft: '-400px', marginTop: '6px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(baseLink + 'pets_selection')
                            }}
                        >
                            <div>
                                Available Pets
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
                                {`You can use this to quickly view/hide/preview all pets. This will also let you control which pets are used for the expeditions and optionally 
                                active pet teams on /pets page.`}
                            </div>
                            <div style={{ padding: '6px' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Enable All: `}
                                    </div>
                                    <div>
                                        {`Will force enable all pets. Any enabled pets have a green border. A green-yellow border indicates that in your save the pet is not captured
                                        but is being treated as captured for expeditions (and /pets page if enabled there).`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px', maxWidth: '128px', }}>
                                        {`Disable All: `}
                                    </div>
                                    <div>
                                        {`Will force disable all pets. Any disabled pets have a red border. A red-yellow border indicates that in your save the pet is captured
                                        but is being treated as not-captured for expeditions (and /pets page if enabled there).`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Reset: `}
                                    </div>
                                    <div>
                                        {`Will reset enable/disable states of each pet to match your save.`}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                    <div style={{ fontWeight: 'bold', marginRight: '6px', minWidth: '128px' }}>
                                        {`Hide locked: `}
                                    </div>
                                    <div>
                                        {`Will only show pets that are considered "Enabled".`}
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