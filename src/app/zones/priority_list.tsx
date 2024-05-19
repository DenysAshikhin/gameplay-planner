import { useState, useEffect } from 'react';

import helper from '../util/helper';
import { Reorder } from 'framer-motion'
import Image from 'next/image';
import CrossIcon from '@images/icons/x_icon.svg';
import DragIcon from '@images/icons/drag_icon.svg';
import RefreshIcon from '@images/icons/refresh_lightgray.svg';

export default function Priority_List({
    priorityList,
    setPriorityList,
    zoneRatios,
    setZoneRatios,
    zone_data,
    default_list,
    default_ratios,
    unlocked_bonuses,
    leader
}) {

    const [internal_list, setInternalList] = useState([]);
    useEffect(() => {
        setInternalList(priorityList)
    }, [priorityList])

    return (
        <div style={{ height: '100%' }}>
            <div style={{ width: '100%', maxHeight: '100%', overflow: 'auto' }}>
                <Reorder.Group
                    axis="y"
                    values={internal_list}
                    onReorder={(e) => {
                        setPriorityList(e);
                    }}
                >
                    {internal_list.map((item, index) => {
                        // let showSelectedPets = false;
                        let color = 'gray';
                        // let priority = priorityMap[item];
                        // let current = currentBonuses[item];
                        // if (priority.count === -1) {
                        //     color = 'white';
                        // }
                        // else if (priority.count === 0) {
                        //     color = 'gray';
                        // }
                        // else if (priority.count === current?.count) {
                        //     color = '#4caf50'
                        // }
                        // else if (priority.count < current?.count) {
                        //     color = '#ffeb3b'
                        // }
                        // else {
                        //     color = '#e53935';
                        // }

                        return (
                            < Reorder.Item key={item.id} value={item} style={{ marginLeft: '6px' }}>
                                <div
                                    className='drag'
                                    style={{
                                        margin: '6px 3px',
                                        border: `2px solid ${color}`,
                                        display: unlocked_bonuses[item.id] ? 'flex' : 'none',
                                        alignItems: 'center', flexDirection: 'column',
                                        width: '220px',
                                        backgroundColor: 'rgba(255,255,255, 0.07)',
                                        borderRadius: '6px',
                                    }}>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%', margin: '3px 0 6px 0',
                                        borderBottom: '1px solid black'
                                    }}>

                                        <Image
                                            className='drag noPointerEvents'
                                            src={DragIcon}
                                            style={{ height: '24px', width: 'auto', marginLeft: '3px' }}
                                            alt='hand in a fist with index poting at a vertical line with arrows on both ends'
                                        />


                                        <div style={{ marginLeft: '-12px' }}>
                                            {` ${item.label}`}
                                        </div>
                                        {/* spacer div */}
                                        <div />
                                    </div>

                                    {/* Extra options */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '6px', marginBottom: '3px',  }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ marginRight: '6px' }}>
                                                {`% of Top`}
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <input
                                                    aria-label='Select how the bonus will be rewarded'
                                                    disabled={leader.bonus_id === item.id}
                                                    // className='importantText textMedium2'
                                                    style={{
                                                        //  borderRadius: '4px',
                                                        width: '40px',
                                                        //    height: '65%', 
                                                        //    backgroundColor: index % 2 === 0 ? '#2D2D2D' : '#353535'
                                                        backgroundColor: '#f3f0f5'
                                                    }}
                                                    type='number'
                                                    value={ leader.bonus_id === item.id ? '----' : helper.roundInt(zoneRatios[item.id] * 100)}
                                                    onChange={
                                                        (inner_e) => {
                                                            try {
                                                                let x = Number(inner_e.target.value);
                                                                if (x < 0 || x > 100) {
                                                                    return;
                                                                }
                                                                setZoneRatios((current_ratios) => {
                                                                    let cur_stuff = { ...current_ratios };
                                                                    let temp = helper.roundTwoDecimal(x / 100);
                                                                    cur_stuff[item.id] = temp;
                                                                    return cur_stuff;
                                                                });
                                                                // setPriorityMap((current_map) => {
                                                                //     let newMap = { ...current_map };
                                                                //     newMap[item].count = x;
                                                                //     return newMap;
                                                                // })
                                                            }
                                                            catch (err) {
                                                                console.log(err);
                                                            }
                                                        }}
                                                    min="0"
                                                    max="100"
                                                />
                                                {zoneRatios[item.id] !== default_ratios[item.id] && leader.bonus_id !== item.id && (
                                                    <div className='hover'
                                                        style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '6px' }}
                                                        onClick={() => {
                                                            setZoneRatios((current_ratios) => {
                                                                let cur_stuff = { ...current_ratios };
                                                                let temp = default_ratios[item.id];
                                                                cur_stuff[item.id] = temp;
                                                                return cur_stuff;
                                                            });
                                                        }}
                                                    >
                                                        <Image src={RefreshIcon} fill unoptimized alt='reset, 2 arrows in a circle' />
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Reorder.Item>
                        )
                    })}
                </Reorder.Group>
            </div>
        </div>
    )
}