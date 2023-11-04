

import Cards from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Gameplay Planner',
      description: "Farmer Against Potatoes Idle, FAPI, gameplay planner / wiki / tool / guide, helps plan out and decide on the best team expeditions, team combos, farm and plant optimisations, card charges, protein assembly and more!"
    }
  }

export default function Page() {

    return <Cards />
}