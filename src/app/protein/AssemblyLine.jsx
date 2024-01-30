import { useState, useEffect } from 'react';

import { BonusMap } from '../util/itemMapping.js';
import farmingHelper from '../util/farmingHelper.js';
import mathHelper from '../util/math.js';
import helper from '../util/helper.js';
import useLocalStorage from "use-local-storage";

import rightArrow from '../../../public/images/icons/right_arrow_white.svg';
import lockedAssembly from '../../../public/images/farming/assembly/Not_Unlocked.png';

import Image from 'next/image';

//AssemblyCostReductionBonus
//AssemblerCollection

//Need to manually check if unlocked or not later

const AssemblyInnerBonus = ({ line, al_level, key_inner, futureLevel }) => {

    const [showLocked, setShowLocked] = useState(false);

    let data = BonusMap[line.ID];
    let bonusAmount = farmingHelper.calcAssemblyLine(line, al_level);
    // let futureBonusAmount = farmingHelper.calcAssemblyLine(line, al_level + 1);
    let futureBonusAmount = farmingHelper.calcAssemblyLine(line, futureLevel);
    let locked = false;
    if (futureLevel < line.StartingLevel) {
        locked = true;
    }
    return (
        <div
            onMouseEnter={(e) => { setShowLocked(true) }}
            onMouseLeave={(e) => { setShowLocked(false) }}
            key={key_inner}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', height: '100%' }}>
            {/* <div style={{ height: '95%', width: '90%', position: 'relative' }}> */}
            <Image
                alt={`in game ${data.label} assembly line image`}
                src={!locked || showLocked ? data.img : lockedAssembly}
                style={{ height: 'auto', width: '95%' }}
                // fill
                unoptimized
                priority
            />
            {/* </div> */}


            {/* <img alt={`in game ${data.label} assembly line image`} src={!locked || showLocked ? data.img : lockedAssembly} style={{ width: '95%' }} /> */}


            {(!locked || showLocked) && (
                <div
                    className='textMedium blackTextStroke1'
                    // className='textMedium' 
                    style={{
                        left: '14.5%',
                        width: '82%',
                        position: 'absolute', color: `rgba(255,255,255,0.9)`,
                        fontWeight: 'bold',
                        fontSize: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        marginRight: '12px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                    >
                        {data.label}
                    </div>
                    <div style={{ fontSize: '24px', marginLeft: 'auto', marginRight: '6px', marginTop: '0px' }}>
                        {`x` + bonusAmount.toExponential(2)}
                    </div>

                    <div style={{ height: '32px', width: '32px', position: 'relative', margin: '0 -3px' }}>
                        <Image
                            alt='arrow point to the left'
                            src={rightArrow}
                            fill
                            unoptimized
                        />
                    </div>


                    {/* <img alt='arrow point to the left' src={rightArrow} style={{ width: '32px', margin: '0 -3px' }} /> */}


                    <div style={{ fontSize: '24px', marginLeft: '6px', marginTop: '0px' }}>
                        {`x` + futureBonusAmount.toExponential(2)}
                    </div>
                </div>
            )}

        </div>
    )
}





const AssemblyLine = ({
    data,
    assemblyID,
    index,
    purchaseTime,
    cost,
    key_inner,
    futureLevel,
    simplifiedView
}) => {


    let assembly = data.AssemblerCollection[assemblyID];
    if (!assembly)
        return null;

    let stringTimeToPurchase = helper.secondsToString(purchaseTime);

    return (
        <div
            key={key_inner}
            style={{
                backgroundColor: 'rgba(255,255,255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: index > 1 ? '24px' : '3px',
                marginRight: '3px',
                borderRadius: '6px'
            }}
        >

            <div className='importantText'
                style={{
                    backgroundColor: 'rgba(255,255,255, 0.12)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '24px',
                    borderRadius: '6px'
                }}
            >
                <div style={{ marginLeft: '6px' }}>
                    Purchase #{index}: Assembly {assemblyID + 1}
                </div>
                <div style={{
                    marginRight: '6px',
                    display: 'flex',
                    alignContent: 'center'
                }}>
                    <div>
                        {`Level:`}
                    </div>
                    <div
                        className={(futureLevel - assembly.Level) > 1 ? 'elementToFadeInAndOut' : ''}
                        style={{
                            marginLeft: '3px',
                            color: (futureLevel - assembly.Level) > 1 ? 'rgb(66, 174, 41)' : '',
                            fontWeight: (futureLevel - assembly.Level) > 1 ? 'bold' : ''
                        }}>
                        {`${assembly.Level} -> ${futureLevel}`}
                    </div>

                </div>
            </div>


            <div
                style={{
                    marginTop: '12px'
                }}
            >
                {!simplifiedView && (
                    <>
                        {assembly.BonusList.map((e, inner_index) => {
                            return <AssemblyInnerBonus
                                key={inner_index}
                                key_inner={inner_index}
                                line={e}
                                al_level={assembly.Level}
                                futureLevel={futureLevel}
                            />
                        })}
                    </>

                )}
                <div style={{ marginBottom: '6px' }}></div>
            </div>


            <div className='importantText'
                style={{
                    backgroundColor: 'rgba(255,255,255, 0.12)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '24px',
                    borderRadius: '6px'
                }}
            >
                <div style={{ marginLeft: '6px' }}>
                    Cost: {cost.toExponential(2).toString()}
                </div>
                <div style={{ marginRight: '6px' }}>
                    Time to Purchase: {stringTimeToPurchase}
                </div>
            </div>
        </div>
    )
}


export default AssemblyLine;
