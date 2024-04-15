

import Pets_Guide from './page_content.jsx';

import Ad_Comp from '../../util/ads_component.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Expedition Pets Guide - Gameplay Planner',
    description: "Farmer Against Potatoe Idle expedition pets guide + explanation. Best pets to use, what teams to make, when to use them and more!"
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