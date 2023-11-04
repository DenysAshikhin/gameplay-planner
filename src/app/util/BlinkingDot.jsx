'use client';

import { useRef } from 'react';
import BlinkingDot from '../util/Dot.jsx';

export default function BlinkDot({ data }) {

    let ref = useRef(null);

    if (ref.current) {
        let bigsad = -1;
        console.log(ref.current)
        console.log(ref.current.parents)
    }

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