import { useState, useEffect } from 'react';

import useLocalStorage from "use-local-storage";
import ReactGA from "react-ga4";
import Image from 'next/image';

const AssemblyItem = ({ e, currentWeights, setCurrentWeights }) => {

    const [customWeight, setCustomWeight] = useLocalStorage(`assemblyBonusWeight-${e.id}`, -1);

    useEffect(() => {
        setCurrentWeights((curWeight) => {
            if (!curWeight[e.id]) {
                let temp = { ...curWeight };
                temp[e.id] = customWeight === -1 ? e.defaultWeight : customWeight;
                return temp;
            }
            else if (curWeight[e.id] !== (customWeight === -1 ? e.defaultWeight : customWeight)) {
                let temp = { ...curWeight };
                temp[e.id] = customWeight === -1 ? e.defaultWeight : customWeight;
                return temp;
            }
            return curWeight;
        })
    }, [e, customWeight, setCurrentWeights]);

    return (
        <>
            <div style={{ width: '352px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                {!!e.img && (
                    <div style={{ height: '95%', width: '95%', position: 'absolute' }}>
                        <Image
                            alt={`in game ${e.label} bonus icon`}
                            src={e.img}
                            fill
                            unoptimized
                            priority
                        />
                    </div>
                )}

                <div className='textMedium blackTextStroke1' style={{
                    marginTop: '0', marginRight: '-32px', position: 'absolute', color: `rgba(255,255,255,0.9)`,
                    fontWeight: 'bold',
                    fontSize: '24px'
                }}>
                    {e.label}
                </div>
            </div>


            <div style={{
                width: '83px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                borderRight: '1px solid rgba(255,255,255,0.8)', borderLeft: '1px solid rgba(255,255,255,0.8)'
            }}>
                <div className='importantText textMedium2'>
                    {e.defaultWeight}
                </div>
            </div>


            <div style={{ display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center', padding: '2px 0' }}>

                <input
                    aria-label='Specify custom weight for this bonus'
                    className='importantText textMedium2'
                    style={{ borderRadius: '4px', width: '55%', height: '65%', backgroundColor: e.index % 2 === 0 ? '#2D2D2D' : '#353535' }}
                    type='number' value={customWeight === -1 ? e.defaultWeight : customWeight}
                    onChange={
                        (inner_e) => {
                            try {
                                let x = Number(inner_e.target.value);
                                // x = Math.floor(x);
                                if (x < 0.00 || x > 99999) {
                                    return;
                                }
                                setCustomWeight(x);

                                ReactGA.event({
                                    category: "protein_interaction",
                                    action: `changed_assembly_bonus_weight`,
                                    label: `${e.label}`,
                                    value: x
                                })

                            }
                            catch (err) {
                                console.log(err);
                            }
                        }}
                    min="0"
                    max="99999"
                />

            </div>
        </>
    )
}


export default AssemblyItem;
