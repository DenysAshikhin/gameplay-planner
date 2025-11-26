import { useEffect } from 'react';
import { isMobile } from 'mobile-device-detect';

/**
 * Adjusts the viewport meta tag for mobile devices to ensure consistent scaling.
 */
const useMobileViewport = () => {
    useEffect(() => {
        if (isMobile) {
            setTimeout(() => {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport instanceof HTMLMetaElement) {
                    viewport.content = 'initial-scale=0.1';
                    viewport.content = 'width=1200';
                }
            }, 500);
        }
    });
}

export default useMobileViewport;