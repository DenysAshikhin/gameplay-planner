import Cards from './page_content';

import Ad_Comp from './util/ads_component';

/**
 * Generates metadata for the upload landing page, including title and description
 * used by the Next.js head configuration.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gameplay Planner - Upload',
    description: "Farmer Against Potatoes Idle, FAPI, gameplay planner / wiki / tool / guide, helps plan out and decide on the best team expeditions, team combos, farm and plant optimisations, card charges, protein assembly and more!"
  }
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