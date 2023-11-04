

import Cards from './page_content.jsx';
import ReactGA from "react-ga4";
ReactGA.initialize([{
  trackingId: "G-GGLPK02VH8",
  // gaOptions: {...}, // optional
  gtagOptions: {
    send_page_view: false
  },
}]);


export default function Page() {

  return <Cards />
}