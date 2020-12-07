import React from 'react'
import App from 'next/app'
import ThemeContainer from '../config/theme/ThemeContainer'

export default class MainApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <ThemeContainer>
        <Component {...pageProps} />
      </ThemeContainer>
    )
  }
}
