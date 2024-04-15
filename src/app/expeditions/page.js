

import Cards from './page_content.jsx';
import Ad_Comp from '../util/ads_component.jsx';



export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Expedition / Team Guide - Gameplay Planner',
    description: "Expedition / Team Planner - Help you build, plan and optimise expeditions teams / groups based on damage, rank or stats. You can also tell the calculator to include specific bonuses such as token gain, time gain, card power, expedition damage by adding them to a white list. You can also add and remove pets to future planning"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return (
    <>
      <Cards />

      <Ad_Comp />
    </>
  )

}