
import './globals.css'
import Header from './util/header.jsx';
import NavBar from './util/navBar.jsx';

export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gameplay Planner - Upload',
    description: "Farmer Against Potatoes Idle, FAPI, gameplay planner / wiki / tool / guide, helps plan out and decide on the best team expeditions, team combos, farm and plant optimisations, card charges, protein assembly and more!"
  }
}

//expeditions
//Expedition Planner - Help you build expeditions teams / groups based on damage, rank. You can also tell the calculator to include specific bonuses such as token gain, time gain, card power, card exp, expedition damage by adding them to a white list. You can also add and remove pets to future planning 

//pets
//Combo / Pet Planner - Help you build your pet teams / groups / loadouts based on stats. You can tell the calculator to include specific bonuses as card power, card exp, item rating, reincarnation exp. You can save, load and share custom presents. View pet combo list. Includes a whitelist

//farming -> missing healthy potatoes, opotimise
//Farming - Helps you plan best plant placements based on time. Hours to calculate best afk or step results. Features include PBC upgrade, auto plots / harvesting, most PIC. Also helps you plan your farming by displays production of fries.




export const viewport = {
  width: 'device-width',
  initialScale: 1
}

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-GGLPK02VH8"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-GGLPK02VH8');
// </script>


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1393057374484862`}
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body className=''>
        <div
          style={{
            marginLeft: '0px', marginRight: '0px', maxWidth: '100000px !important',
            width: '100vw',
            height: `100vh`,
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(243 240 245)',
            position: 'relative',
            overflow: 'hidden'
          }}>
          {/* <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head> */}
          {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-GGLPK02VH8" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-GGLPK02VH8');
        `}
          </Script> */}

          {/* Header */}
          <div
            className={`headerBase hover`}
            style={{
              width: '100vw'
            }}
          >
            <Header />

          </div>

          <div
            style={{ display: 'flex', flex: '1', maxWidth: '100%', maxHeight: 'calc(100% - 36px)' }}
          >
            {/* navigation bar */}
            <NavBar />
            {/* actual page content */}
            <div style={{ overflow: 'auto', width: '100%', display: 'flex', flex: 1 }}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
