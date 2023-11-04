

import Cards from './page_content.jsx';
import ReactGA from "react-ga4";
ReactGA.initialize([{
  trackingId: "G-GGLPK02VH8",
  // gaOptions: {...}, // optional
  gtagOptions: {
      send_page_view: false
  },
}]);

export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Gameplay Planner',
      description: "Farming - Helps you build, plan and optimise best plant placements. Based on time, hours to calculate best afk or step results. Features include PBC upgrade, auto plots / harvesting, most PIC. Also helps you plan farming by displays production of fries, healthy potatoes, ranks."
    }
  }

export default function Page() {

    return <Cards />
}