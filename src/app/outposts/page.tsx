import Outposts from './page_content';

import Ad_Comp from '../util/ads_component';
import { buildMetadata } from "../util/seo";

/**
 * Builds the metadata for the outposts planner page so search engines and social
 * previews reflect the correct title and description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return buildMetadata({
    title: "Outposts Helper",
    description:
      "Farmer Against Potatoes Idle (FAPI) outposts helper: plan future trades and estimate how long to mine out existing outposts.",
    path: "/outposts",
  });
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
/**
 * Renders the outposts page including the advertisement block and planner
 * content.
 */
export default function Page() {

  return (
    <>

      <Ad_Comp />
      <Outposts />
    </>
  )

}
