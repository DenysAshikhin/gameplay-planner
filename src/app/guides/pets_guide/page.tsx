import Pets_Guide from './page_content';

import Ad_Comp from '../../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Pets Tutorial - Gameplay Planner',
    description: "Farmer Against Potatoes Idle pets guide + explanation. Best pets to use, what teams to make, when to use them and more!"
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
    <Pets_Guide />
    </>
  )
  
}