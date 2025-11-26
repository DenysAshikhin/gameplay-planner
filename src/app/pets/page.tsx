import Cards from './page_content';

import Ad_Comp from '../util/ads_component';
/**
 * generateMetadata function description.
 */
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Pets Guide - Gameplay Planner',
    description: "Combo / Pet Planner - Help you build, plan and optimise your pet teams / groups / loadouts based on stats. You can tell the calculator to include specific bonuses as card power, card exp, item rating, reincarnation exp. You can save, load and share custom presents. View pet combo list. Includes a whitelist"
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
    
    <Cards />
      <Ad_Comp />
    </>
  )
}
