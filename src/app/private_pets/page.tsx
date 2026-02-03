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
    title: "Private Pets (Preview)",
    description:
      "Farmer Against Potatoes Idle (FAPI) private pets preview: explore and plan around hidden/non-visible pets, including stats, bonuses, and pet combinations.",
    path: "/private_pets",
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
