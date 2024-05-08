
import './globals.css'
import Header from './util/header.jsx';
import NavBar from './util/navBar.jsx';
import Clarity from './Clarity.jsx';
export async function generateMetadata({ params, searchParams }, parent) {

  return {
    title: 'Gameplay Planner - Upload',
    description: "Farmer Against Potatoes Idle, FAPI, gameplay planner / wiki / tool / guide, helps plan out and decide on the best team expeditions, team combos, farm and plant optimisations, card charges, protein assembly and more!"
  }
}


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
      <head
      //  dangerouslySetInnerHTML={{
      //   __html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1393057374484862" crossorigin="anonymous"></script>`
      // }}
      >

        <meta name="google-adsense-account" content="ca-pub-1393057374484862" />
        <meta name="yandex-verification" content="347889c423938e18" />
        <meta name="robots" content="all" />
        {/* <Clarity /> */}
        <script async type="text/javascript" src="//monu.delivery/site/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.js" data-cfasync="false"></script>

        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1393057374484862" crossOrigin="anonymous"></script> */}
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
            <div style={{ overflowX: 'auto', width: '100%', display: 'flex', flex: 1 }}>
              {children}
            </div>
          </div>
        </div>
        <div id='top_leaderboard' style={{
          position: 'absolute',
          top: '0',
          left: '35%',
          // width: '100vw',
          height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }} />
        <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }} />
        <div id='footer_in_screen' style={{
          position: 'absolute', bottom: '0',
          left: '35%',
          // width: '100vw',
          height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }} />
      </body>
    </html>
  )
}
