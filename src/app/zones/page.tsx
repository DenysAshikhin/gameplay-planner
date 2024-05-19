import Contagion from './page_content';

import Ad_Comp from '../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'Zones Expeditions - Gameplay Planner',
    description: "Expedition / Zone Planner - Help you plan and optimise expeditions zones to run based on your teams. Helps plan card rewards for most effecient guide."
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return (
    <>
      <Ad_Comp />
      <Contagion />
    </>
  )

}