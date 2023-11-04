

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
      description: "Protein - Help you build, plan and optimise your protein and assembly line purchases. Includes a weight list to prioritise stats. Displays cost, time to purchase, level, hidden and future bonuses"
    }
  }

export default function Page() {

    return <Cards />
}