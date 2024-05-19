import Outposts from './page_content';

import Ad_Comp from '../util/ads_component';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Outposts - Gameplay Planner',
    description: "Outposts - Helps you plan your future trades and determine how long to mine out your existing outposts"
  }
}
export const viewport = {
  width: 'device-width',
  initialScale: 1
}
export default function Page() {

  return (
    <>

      <Ad_Comp />
      <Outposts />
    </>
  )

}