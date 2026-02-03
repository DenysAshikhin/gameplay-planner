import Cards from './page_content';

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
    title: "Tool Selection",
    description:
      "Choose a tool in the Farmer Against Potatoes Idle (FAPI) community planner: expeditions, zones, pets, cards/charges, farming, protein assembly, residue, guides, and more.",
    path: "/page_selection",
  });
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
      <Ad_Comp />
      <Cards />
    </>
  )

}
