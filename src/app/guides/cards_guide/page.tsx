import Pets_Guide from './page_content';
import Ad_Comp from '../../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Cards Tutorial - Gameplay Planner',
    description: "Farmer Against Potatoes Idle cards guide + explanation. Best cards to charge, which cards to prioritise, and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return(
    <>
    
    <Pets_Guide />
    <Ad_Comp />
    </>
  )
  
}