import Cards from './page_content';

import Ad_Comp from './util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gameplay Planner - Upload',
    description: "Farmer Against Potatoes Idle, FAPI, gameplay planner / wiki / tool / guide, helps plan out and decide on the best team expeditions, team combos, farm and plant optimisations, card charges, protein assembly and more!"
  }
}


export default function Page() {

  return (
    <>
      <Cards />
      <Ad_Comp />
    </>
  )
}