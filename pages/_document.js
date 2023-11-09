import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="it">
            <Head >
                <meta name="keywords" description="something,meta-desc" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

