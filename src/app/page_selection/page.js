"use client"

import { useEffect } from 'react';
import ReactGA from "react-ga4";
import PageCard from './page_card.jsx';


export default function PageSelection() {

    useEffect(() => {
        let timeout = setTimeout(() => {

            ReactGA.send({ hitType: "pageview", page: "/page_selection", title: "Page Selection" });
        }, 5000);
        return () => { clearTimeout(timeout) };


    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div style={{
                paddingLeft: '6px',
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.08)',
                paddingLeft: '60px'
            }}>
                <div
                    style={{ display: 'flex' }}
                >

                    <PageCard page='upload' />
                    <PageCard page='expedition' />
                    <PageCard page='pets' />
                </div>
                <div
                    style={{ display: 'flex', marginTop: '36px' }}
                >
                    <PageCard page='farm' />
                    <PageCard page='cards' />
                    <PageCard page='protein' />
                </div>
            </div>
        </div>
    );
}