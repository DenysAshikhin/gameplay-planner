
import './globals.css'
import Header from './util/header.jsx';
import NavBar from './util/navBar.jsx';


export const metadata = {
  title: 'Gameplay Planner',
  description: 'Same description here',
}


// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-GGLPK02VH8"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-GGLPK02VH8');
// </script>

import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
