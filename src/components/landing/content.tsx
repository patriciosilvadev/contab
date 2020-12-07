import React from 'react'
import { Flex } from '@chakra-ui/core'
import Head from 'next/head'
import Header from '../landing/header'
import Footer from './footer'

interface ContentProps {
  title?: string
  style?: any
}

const Content: React.FC<ContentProps> = props => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <Header />

      <Flex
        as="main"
        direction="column"
        mt={{ base: '40px', md: '70px' }}
        minH="calc(100vh - 224px)"
        {...props.style}
      >
        {props.children}
      </Flex>

      <Footer />
    </>
  )
}

export default Content
