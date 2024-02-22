

import Guides from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Guides - Gameplay Planner',
    description: "Guides, tutorials, and explanations for various parts of FAPI (Farmer Against Potatoes Idle) systems: farming, pets, expeditions, cards, residue, infinity corner, protein and more!"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Guides />
}