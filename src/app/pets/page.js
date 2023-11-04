

import Cards from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Gameplay Planner',
      description: "Help you build your pet teams / groups / loadouts based on stats. You can tell the calculator to include specific bonuses as card power, card exp, item rating, reincarnation exp. You can save, load and share custom presents. View pet combo list. Includes a whitelist"
    }
  }

export default function Page() {

    return <Cards />
}