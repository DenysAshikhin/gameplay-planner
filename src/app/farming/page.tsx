

import Cards from './page_content';
import Ad_Comp from '../util/ads_component';
/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Farming Guide - Gameplay Planner',
    description: "Farming - Helps you build, plan and optimise best plant placements. Based on time, hours to calculate best afk or step results. Features include PBC upgrade, auto plots / harvesting, most PIC. Also helps you plan farming by displays production of fries, healthy potatoes, ranks."
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
/**
 * Page function description.
 */
export default function Page() {

  return(
    <>
    <Cards />
    <Ad_Comp />
    </>
  ) 
}
