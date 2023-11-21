

import Cards from './page_content.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Residue / Milk Guide - Gameplay Planner',
    description: "Residue + Milk - Help you build, plan and optimise your milk / residue purchases. Includes a weight list to prioritise stats bonuses. Displays cost, time to purchase, level, hidden and future bonuses"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Cards />
}