

import Cards from './page_content.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Page Selection - Gameplay Planner',
      description: "Planner selector page, pick what tool you want to use to plan your playthrough!"
    }
  }

export default function Page() {

    return <Cards />
}