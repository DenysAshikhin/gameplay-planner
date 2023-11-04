

import Cards from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Gameplay Planner',
      description: "Expedition Planner - Help you build expeditions teams / groups based on damage, rank. You can also tell the calculator to include specific bonuses such as token gain, time gain, card power, card exp, expedition damage by adding them to a white list. You can also add and remove pets to future planning"
    }
  }

export default function Page() {

    return <Cards />
}