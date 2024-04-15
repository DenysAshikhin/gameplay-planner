"use client"

import {useRef, useEffect} from 'react';
export default function Ad_Comp() {
    const scriptRoot = useRef() // gets assigned to a root node
    const script = `<script async type="text/javascript" src="//monu.delivery/site/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.js" data-cfasync="false"></script>`;

    useEffect(() => {
        // creates a document range (grouping of nodes in the document is my understanding)
        // in this case we instantiate it as empty, on purpose
        const range = document.createRange()
        // creates a mini-document (light weight version), in our range with our script in it
        const documentFragment = range.createContextualFragment(script)
        // appends it to our script root - so it renders in the correct location
        scriptRoot.current.append(documentFragment)
    }, [])

    return <div ref={scriptRoot} />
}