"use client"

import { useState, useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';
// Start seeing data on the Clarity dashboard with your id



export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        clarity.init('l9ob1f8705');
    }, [])

    return (
        <>
            {mounted && (
                <></>
                //                 <script
                //                     dangerouslySetInnerHTML={{
                //                         __html: `<script type="text/javascript">
                //       (function(c,l,a,r,i,t,y){
                //           c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                //           t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                //           y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                //       })(window, document, "clarity", "script", "l9ob1f8705");
                //   </script>`,
                //                     }}
                //                 ></script>
            )}
            {!mounted && (
                <></>
            )
            }
        </>
    )
}