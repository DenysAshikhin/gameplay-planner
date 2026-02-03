
import './globals.css'
import Header from './util/header';
import NavBar from './util/navBar';
import Clarity from './Clarity';
import type { Metadata } from "next";
import {
  CONTACT_DISCORD_URL,
  CONTACT_GITHUB_ISSUES_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  STATUS_STATEMENT,
  TWITTER_IMAGE_PATH,
} from "./util/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: new URL(OG_IMAGE_PATH, SITE_URL),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [new URL(TWITTER_IMAGE_PATH, SITE_URL)],
  },
};


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


/**
 * Builds the root HTML structure, wrapping global metadata, header, navigation,
 * and the active page content for the Next.js application.
 *
 * @param {{ children: React.ReactNode }} props - Nested route content to render inside the layout.
 * @returns {JSX.Element} The composed document shell for all pages.
 */
export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        url: SITE_URL,
        description: `${DEFAULT_DESCRIPTION} ${STATUS_STATEMENT}`,
        sameAs: [CONTACT_DISCORD_URL, CONTACT_GITHUB_ISSUES_URL],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1393057374484862" />
        <meta name="yandex-verification" content="347889c423938e18" />
        <meta name="robots" content="all" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* <Clarity /> */}

        {/* <script async type="text/javascript" src="//monu.delivery/site/a/5/892ed4-6227-41b8-95d2-9c7cb4ffe471.js" data-cfasync="false"></script> */}

        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1393057374484862" crossOrigin="anonymous"></script> */}
        {/* Preload the header-font */}
        <link rel="preload" href="/fonts/dobra_black/Dobra-Black.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <div
          style={{
            marginLeft: '0px',
            marginRight: '0px',
            maxWidth: '100000px !important',
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
          <div className={`headerBase hover`} style={{ width: '100vw' }}>
            <Header />
          </div>

          <div style={{ display: 'flex', flex: '1', maxWidth: '100%', maxHeight: 'calc(100% - 36px)' }}>
            {/* navigation bar */}
            <NavBar />
            {/* actual page content */}
            <div style={{ overflowX: 'auto', width: '100%', display: 'flex', flex: 1 }}>
              {children}
            </div>
          </div>
        </div>
        {/* <div id='top_leaderboard' style={{
          position: 'absolute',
          top: '0',
          left: '35%',
          // width: '100vw',
          height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }} />
        <div id='right_pillar' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', height: 'calc(100vh - 36px)', justifyContent: 'center', alignItems: 'center', }} />
        <div id='footer_in_screen' style={{
          position: 'absolute', bottom: '0',
          left: '35%',
          // width: '100vw',
          height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }} /> */}
      </body>
    </html>
  );
}
