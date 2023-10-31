"use client"

import { useState, useEffect } from 'react';

export default function Page() {

    const [tempState, setTempState] = useState('state val');

    useEffect(() => {
        setTempState('state updated');
    }, [])

    return (
        <>
            <h1>
                New Page
            </h1>
            <div>{tempState}</div>
        </>
    )
}