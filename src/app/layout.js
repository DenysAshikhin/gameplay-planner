
import './globals.css'
import Header from './util/header.jsx';
import NavBar from './util/navBar.jsx';


export const metadata = {
  title: 'Gameplay Planner',
  description: 'Same description here',
}



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
