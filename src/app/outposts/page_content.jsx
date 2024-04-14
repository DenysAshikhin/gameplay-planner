"use client"

import { isMobile } from 'mobile-device-detect';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);


import OutpostLine from './OutpostLine.jsx';
import TradeLine from './TradeLine.jsx';
import TradeSingle from './TradeSingle.jsx';
import infoIcon from '../../../public/images/icons/info_thick.svg';
import MouseOverPopover from "../util/Tooltip.jsx";
import DefaultSave from '../util/tempSave.json';
import useLocalStorage from "use-local-storage";
import { resource_type } from './outpost_mapping.js';
import mathHelper from '../util/math.js';
import Image from 'next/image';
import Link from 'next/link';


export default function Outposts() {

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

    const [forceRefresh, setForceRefresh] = useState(1);

    const [clientData, setData] = useLocalStorage('userData', DefaultSave);
    const [data, setRunTimeData] = useState(DefaultSave);

    useEffect(() => {
        setRunTimeData(clientData);
    }, [clientData]);

    //OutpostsCollection -> array
    //Deal -> current deals
    //DealQueue -> future deals


    //deal object:
    const deal_object = {
        BoughtResourceID: 2,//what type the reward is (protein, ore, etc)
        BoughtResourceIDSub: 0, //sub type i.e material number
        BoughtValue: mathHelper.createDecimal(1.0),//How much you gain from the deal

        CostResourceID: 3,//What it costs to buy the deal
        CostResourceIDSub: 0, //sub type for cost  
        CostValue: mathHelper.createDecimal(1.0),//cost to buy the deal

        Locked: 1, //if this trade row is unlocked, 1 other 0
        Sealed: 0, //if this trade has been completed (1 yes)
    }

    let purchase_cost_map = {};
    data.DealQueue.forEach((inner_deal) => {
        const big_id = inner_deal.CostResourceIDSub ? `tier-` + inner_deal.CostResourceIDSub : inner_deal.CostResourceID;

        if (!purchase_cost_map[big_id]) {
            purchase_cost_map[big_id] = { id: inner_deal.CostResourceID, cost: mathHelper.createDecimal(0), counter: 0 };
            if (inner_deal.CostResourceIDSub) {
                purchase_cost_map[big_id].subtype = inner_deal.CostResourceIDSub;
            }
        }
        purchase_cost_map[big_id].counter++;
        purchase_cost_map[big_id].cost = mathHelper.addDecimal(purchase_cost_map[big_id].cost, mathHelper.createDecimal(inner_deal.CostValue));
    });

    let average_cost_map = [];
    for (const [key, value] of Object.entries(purchase_cost_map)) {
        let temp = { ...value };
        temp.cost = mathHelper.divideDecimal(temp.cost, temp.counter);
        average_cost_map.push(temp);
    }


    return (
        <div
            style={{
                display: 'flex',
                // flexDirection: 'column',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
                padding: '12px 12px 3px 12px',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 110px)' }}>

                {/* trades */}
                <div className='importantText'
                    style={{
                        display: 'flex',
                        // alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '665px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                    }}
                >
                    {`Potential Trades`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            Shows all of your potential upcoming trades
                        </div>
                    }>
                        <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>

                            <Image
                                alt='on hover I in a cirlce icon, shows more information on hover'
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                    </MouseOverPopover>
                </div>
                <div className='importantText'
                    style={{
                        display: 'flex',
                        // flexDirection: 'column',
                        gap: '12px',
                        alignSelf: 'flex-start',
                        // alignItems: 'center',
                        justifyContent: 'center',
                        margin: '6px 0 0 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '640px',
                        // fontSize: '24px',
                        // fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '0px 12px 0px 12px',
                        maxHeight: 'calc(100vh - 90px)'
                    }}
                >
                    <div style={{ width: '100%', height: "100%", display: 'flex', gap: '12px', justifyContent: 'center', overflow: 'auto' }}>

                        {/* Future Trades */}
                        <div style={{ width: '276px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>
                                {`Potential Future Trades`}
                                <MouseOverPopover tooltip={
                                    <div style={{ padding: '6px' }}>
                                        These are the potential trades you may see next time you reroll your trades
                                    </div>
                                }>
                                    <div style={{ position: 'relative', marginLeft: '12px', width: '22px', height: '22px' }}>

                                        <Image
                                            alt='on hover I in a cirlce icon, shows more information on hover'
                                            fill
                                            src={infoIcon}
                                            unoptimized={true}
                                        />
                                    </div>
                                </MouseOverPopover>
                            </div>
                            {data.DealQueue.sort((a, b) => a.CostResourceID - b.CostResourceID).map((curr_deal, index) => {
                                return (
                                    <TradeLine key={index}  deal={curr_deal} borderBottom={index === data.DealQueue.length - 1} />
                                )
                            })}
                        </div>

                        {/* Average Costs */}
                        <div style={{ width: '276px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>
                                {`Average Trade Cost`}
                            </div>
                            {average_cost_map.sort((a, b) => a.id - b.id).map((curr_deal, index) => {
                                return (
                                    <TradeSingle key={index}  deal={curr_deal} borderBottom={index === average_cost_map.length - 1} />
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>



      {/* outposts */}
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxHeight: 'calc(100vh - 102px)' }}>

          
                <div className='importantText'
                    style={{
                        display: 'flex',
                        // alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '780px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                    }}
                >
                    {`Time to mine out`}
                    <MouseOverPopover tooltip={
                        <div style={{ padding: '6px' }}>
                            Shows how long it will take to mine out any outpost with any miner
                        </div>
                    }>
                        <div style={{ position: 'relative', marginLeft: '12px', width: '24px', height: '24px' }}>

                            <Image
                                alt='on hover I in a cirlce icon, shows more information on hover'
                                fill
                                src={infoIcon}
                                unoptimized={true}
                            />
                        </div>
                    </MouseOverPopover>
                </div>
                <div className='importantText'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // gap: '12px',
                        alignSelf: 'flex-start',
                        // alignItems: 'center',
                        justifyContent: 'center',
                        margin: '6px 12px 0',
                        border: '1px solid white',
                        borderRadius: '12px',
                        width: '768px',
                        // fontSize: '24px',
                        // fontWeight: 'bold',
                        backgroundColor: 'rgba(255,255,255, 0.07)',
                        padding: '6px 6px 6px 6px',
                        maxHeight: '100%'
                    }}
                >
                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}>
                        {data.OutpostsCollection.map((curr_outpost, index) => {
                            return (
                                <OutpostLine key={index} data={data} outpost={curr_outpost} borderBottom={true} />
                            )
                        })}
                    </div>


                </div>
            </div>

        </div>
    );
}