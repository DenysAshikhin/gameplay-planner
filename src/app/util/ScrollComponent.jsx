'use client';

import { useEffect, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

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
    }, [searchParams])

    return (
        <>
        </>
    )
}