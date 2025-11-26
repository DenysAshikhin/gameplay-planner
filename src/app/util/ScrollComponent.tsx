'use client';

import { useEffect, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

/**
 * ScrollComponent provides the core implementation for the ScrollComponent routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by ScrollComponent.
 */
export default function ScrollComponent({ setSearchParam }) {
    const searchParams = useSearchParams();
    useEffect(() => {
        setSearchParam((existingVal) => {
            let tempy = searchParams.get('section')?.toLowerCase();
            if (tempy !== existingVal) {
                return tempy;
            }
            return existingVal;
        });
    }, [searchParams, setSearchParam])

    return (
        <>
        </>
    )
}
