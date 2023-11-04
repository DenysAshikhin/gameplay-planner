

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
      description: "Planner selector page, pick what tool you want to use to plan your playthrough!"
    }
  }

export default function Page() {

    return <Cards />
}