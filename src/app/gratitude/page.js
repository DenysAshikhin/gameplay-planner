

import Cards from './page_content.jsx';


export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Donations - Gameplay Planner',
    description: "Donations for helping keep the Gameplay planner up and running for everyone"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return <Cards />
}