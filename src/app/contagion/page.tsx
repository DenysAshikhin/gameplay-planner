import Ad_Comp from '../util/ads_component';
import Contagion from './page_content';

/**
 * Generates static metadata for the current page route so Next.js can
 * pre-render SEO friendly head tags.
 *
 * @param {{ params: Record<string, string>, searchParams: URLSearchParams }} context - Route parameters and search params provided by Next.js.
 * @param {import('next').ResolvingMetadata} parent - Parent metadata chain to merge with.
 * @returns {Promise<import('next').Metadata>} Fully resolved metadata for the page.
 */
export async function generateMetadata() {
    return {
        title: 'Contagion - Gameplay Planner',
        description: 'Contagion - Helps you plan your contagion ( grasshopper) placements in contagion feature of farming!',
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

/**
 * Renders the page content for this route, wiring together the main
 * React components used in the layout.
 *
 * @returns {JSX.Element} Fully composed page markup for the route.
 */
export default function Page() {
    return (
        <>
            <Ad_Comp/>
            <Contagion/>
        </>
    );
}
