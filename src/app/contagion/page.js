

import Zones from './page_content.jsx';

import Ad_Comp from '../util/ads_component.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Contagion - Gameplay Planner',
    description: "Contagion - Helps you plan your contagion ( grasshopper) placements in contagion feature of farming!"
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
      <Zones />
    </>
  )

}