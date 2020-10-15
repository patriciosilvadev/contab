import '../styles/pagination.css'

import React from 'react'
import App, { AppContext } from 'next/app'
import { AuthProvider } from '../hooks/authContext'
import { parseCookies } from 'nookies'
import { MainAppProps } from '../config/interfaces'

import userService from '../services/userService'

import ThemeContainer from '../config/theme/ThemeContainer'

export default class MainApp extends App {
  /**
   * Initialize app with user details
   *
   * @param props initial props
   */
  static async getInitialProps({ Component, ctx }: AppContext): Promise<any> {
    const cookies = parseCookies(ctx)
    const token = cookies.token
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (token) {
      const { data: user, status } = await userService.me(token)

      if (status === 200) {
        return { pageProps, user }
      }
    }

    return { pageProps }
  }

  render(): JSX.Element {
    const { Component, pageProps, user } = this.props as MainAppProps

    return (
      <AuthProvider userLogged={user}>
        <ThemeContainer>
          <Component {...pageProps} />
        </ThemeContainer>
      </AuthProvider>
    )
  }
}
