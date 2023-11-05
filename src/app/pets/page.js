

import Cards from './page_content.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Pets Guide - Gameplay Planner',
      description: "Combo / Pet Planner - Help you build, plan and optimise your pet teams / groups / loadouts based on stats. You can tell the calculator to include specific bonuses as card power, card exp, item rating, reincarnation exp. You can save, load and share custom presents. View pet combo list. Includes a whitelist"
    }
  }

export default function Page() {

    return <Cards />
}