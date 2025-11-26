import Farming_Guide from './page_content';
import Ad_Comp from '../../util/ads_component';

/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Expedition Pets Explanation - Gameplay Planner',
    description: "Farmer Against Potatoes Idle expedition pets guide + explanation. Best pets to use, what teams to make, when to use them and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
/**
 * Page function description.
 */
export default function Page() {

  return (
    <>
    
    <Farming_Guide />
    <Ad_Comp />
    </>
  )
  
}
