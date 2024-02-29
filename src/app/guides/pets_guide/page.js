

import Pets_Guide from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Pets Tutorial - Gameplay Planner',
    description: "Farmer Against Potatoe Idle pets guide + explanation. Best pets to use, what teams to make, when to use them and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Pets_Guide />
}