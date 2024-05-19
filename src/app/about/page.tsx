import Cards from './page_content';

import Ad_Comp from '../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gratitude - Donation + Outreach - Gameplay Planner',
    description: "Donations for helping keep the Gameplay planner up and running for everyone and a discord social link to reach out to me"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return (
    <>
      <Cards />
      <Ad_Comp />
    </>
  )
}