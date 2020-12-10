import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import ThemeContainer from '../config/theme/ThemeContainer'
import { NextSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo'

export default class MainApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props
    const description = `Economize até 80% em sua contabilidade de forma prática
    e acessível, tudo isso de forma digital. Mantenha o foco e seus
    recursos voltados a sua operação.`

    return (
      <ThemeContainer>
        <NextSeo
          description={description}
          canonical="https://www.symplecont.com/"
          openGraph={{
            url: 'https://www.symplecont.com/',
            title: 'SympleCont - Contabilidade Digital',
            description: description,
            images: [
              {
                url: 'https://imghub.io/i/N231d',
                width: 500,
                height: 500,
                alt: 'SympleCont Logo'
              }
            ],
            site_name: 'SympelCont'
          }}
        />
        <LogoJsonLd
          logo="https://imghub.io/i/N231d"
          url="http://www.symplecont.com"
        />
        <SocialProfileJsonLd
          type="Person"
          name="SympleCont"
          url="http://www.symplecont.com"
          sameAs={[
            'http://www.facebook.com/symplecont',
            'http://instagram.com/symplecont'
          ]}
        />
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
