import Pets_Guide from './page_content';

import Ad_Comp from '../../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Expedition Pets Guide - Gameplay Planner',
    description: "Farmer Against Potatoes Idle expedition pets guide + explanation. Best pets to use, what teams to make, when to use them and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return (
    <>
    <Pets_Guide />
    
    <Ad_Comp />
    </>
  )
  
}