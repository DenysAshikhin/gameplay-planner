import Cards from './page_content';

import Ad_Comp from '../util/ads_component';
import { buildMetadata } from "../util/seo";

/**
 * Generates the metadata for the Gratitude page so Next.js can prerender
 * the correct title and description.
 *
 * @param {{ params: Record<string, string>, searchParams: URLSearchParams }} context - Route information supplied by Next.js.
 * @param {import('next').ResolvingMetadata} parent - The parent metadata chain to merge with.
 * @returns {Promise<import('next').Metadata>} Combined metadata containing the page title and description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return buildMetadata({
    title: "About",
    description:
      "About the Farmer Against Potatoes Idle (FAPI) community planner (Gameplay Planner): one of the main community utilities, maintained for the community and approved by the game's creator.",
    path: "/about",
  });
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
/**
 * Renders the Gratitude page, including the donation information and
 * accompanying advertisement.
 *
 * @returns {JSX.Element} The page layout for the Gratitude route.
 */
export default function Page() {

  return (
    <>
      <Cards />
      <Ad_Comp />
    </>
  )
}
