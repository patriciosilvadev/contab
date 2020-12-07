import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps
} from 'next/document'
import React from 'react'
import appIco from '../assets/icon.ico'

class AppDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/matheuscuba/icones-bancos-brasileiros@1.1/dist/all.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href={appIco} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
