'use client';

import { useRef } from 'react';
import BlinkingDot from './Dot';

/**
 * BlinkDot provides the core implementation for the BlinkDot routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by BlinkDot.
 */
export default function BlinkDot({ data }) {
    let ref = useRef(null);

    return (
        <div style={{
            position: 'absolute',
            left: '-15px',
            zIndex:'3'
            // display: 'none'
        }}
            id='blinkingDot'
        >
            <BlinkingDot />
        </div>
    )
}
