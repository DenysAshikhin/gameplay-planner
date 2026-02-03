import Cards from './page_content';

import Ad_Comp from './util/ads_component';
import { buildMetadata } from "./util/seo";

/**
 * Generates metadata for the upload landing page, including title and description
 * used by the Next.js head configuration.
 */
export async function generateMetadata({ params, searchParams }, parent) {
  return buildMetadata({
    title: "Upload Save",
    description:
      "Import your Farmer Against Potatoes Idle (FAPI) save and use the community gameplay planner for expeditions, pets/team building, zones, farming, cards/charges, protein assembly, residue, and more.",
    path: "/",
  });
}


/**
 * Renders the gameplay planner landing page with the primary content cards and
 * advertisement component.
 */
export default function Page() {

  return (
    <>
      <Cards />
      <Ad_Comp />
    </>
  )
}
