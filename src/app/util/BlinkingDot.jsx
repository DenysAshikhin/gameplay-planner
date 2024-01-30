'use client';

import { useRef } from 'react';
import BlinkingDot from '../util/Dot.jsx';

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