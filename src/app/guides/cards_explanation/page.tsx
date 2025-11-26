import Farming_Guide from './page_content';

import Ad_Comp from '../../util/ads_component';

/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Cards Explanation - Gameplay Planner',
    description: "Farmer Against Potatoes Idle expedition cards guide + explanation. Best cards to charge, which cards to prioritise, and more!"
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

      <Ad_Comp />
      <Farming_Guide />
    </>
  )

}
