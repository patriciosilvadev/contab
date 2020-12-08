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
        width="100%"
        overflow="hidden"
        direction="column"
        minH="calc(100vh - 224px)"
        mt={{ base: '40px', md: '70px' }}
        {...props.style}
      >
        {props.children}
      </Flex>

      <Footer />
    </>
  )
}

export default Content
