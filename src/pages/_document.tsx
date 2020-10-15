import React from 'react'
import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

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
          ></link>

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
