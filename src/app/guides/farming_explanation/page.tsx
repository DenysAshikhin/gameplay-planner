import Farming_Guide from './page_content';
import Ad_Comp from '../../util/ads_component';

/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Farming Explanation - Gameplay Planner',
    description: "Farmer Against Potatoes Idle farming and plant guide + explanation. Best method for farming, what to buy, what to plant, best order, permanent improvment corner and more!"
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

  return(
    <>
    
    <Ad_Comp />
    <Farming_Guide />
    </>
  )
  
}
