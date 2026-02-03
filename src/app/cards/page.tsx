import Cards from './page_content'

import Ad_Comp from '../util/ads_component';
import { buildMetadata } from "../util/seo";

/**
 * Generates static metadata for the current page route so Next.js can
 * pre-render SEO friendly head tags.
 *
 * @param {{ params: Record<string, string>, searchParams: URLSearchParams }} context - Route parameters and search params provided by Next.js.
 * @param {import('next').ResolvingMetadata} parent - Parent metadata chain to merge with.
 * @returns {Promise<import('next').Metadata>} Fully resolved metadata for the page.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return buildMetadata({
    title: "Cards / Charges Planner",
    description:
      "Farmer Against Potatoes Idle (FAPI) cards planner: pick the best cards to charge based on priorities/weights and view card bonuses (temporary power, permanent power, levels).",
    path: "/cards",
  });
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
/**
 * Renders the page content for this route, wiring together the main
 * React components used in the layout.
 *
 * @returns {JSX.Element} Fully composed page markup for the route.
 */
export default function Page() {

  return (
    <>
      <Cards />
      <Ad_Comp />
    </>
  )
}
