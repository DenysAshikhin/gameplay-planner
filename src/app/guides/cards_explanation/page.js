

import Farming_Guide from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Cards Explanation - Gameplay Planner',
    description: "Farmer Against Potatoe Idle expedition cards guide + explanation. Best cards to charge, which cards to prioritise, and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Farming_Guide />
}