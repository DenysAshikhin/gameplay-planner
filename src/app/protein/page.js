

import Cards from './page_content.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Protien / Assembly Guide - Gameplay Planner',
    description: "Protein - Help you build, plan and optimise your protein and assembly line purchases. Includes a weight list to prioritise stats. Displays cost, time to purchase, level, hidden and future bonuses"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Cards />
}