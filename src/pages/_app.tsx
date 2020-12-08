import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import ThemeContainer from '../config/theme/ThemeContainer'

export default class MainApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <ThemeContainer>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=0.8"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeContainer>
    )
  }
}
