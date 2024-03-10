

import Cards from './page_content.jsx'

export async function generateMetadata({ params, searchParams }, parent) {

    return {
      title: 'Cards Guide - Gameplay Planner',
      description: "Helps you pick the best card to charge based on priority or weights. Displays card bonus such as temporary power, permanent power, levels."
    }
  }
  export const viewport = {
    width: 'device-width',
    initialScale: 1
  }
export default function Page() {

    return <Cards />
}