import Cards from './page_content';

import Ad_Comp from '../util/ads_component';

/**
 * Generates the metadata for the Gratitude page so Next.js can prerender
 * the correct title and description.
 *
 * @param {{ params: Record<string, string>, searchParams: URLSearchParams }} context - Route information supplied by Next.js.
 * @param {import('next').ResolvingMetadata} parent - The parent metadata chain to merge with.
 * @returns {Promise<import('next').Metadata>} Combined metadata containing the page title and description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gratitude - Donation + Outreach - Gameplay Planner',
    description: "Donations for helping keep the Gameplay planner up and running for everyone and a discord social link to reach out to me"
  }
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
