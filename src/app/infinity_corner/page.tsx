import Cards from './page_content';

import Ad_Comp from '../util/ads_component';

/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Infinity Corner - Gameplay Planner',
    description: "Infinity Corner - Help you build, plan and optimise your infinity corner purchases. Includes a weight list to prioritise stats bonuses. Displays cost, level, hidden and future bonuses"
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
      <Cards />
    </>
  )

}
