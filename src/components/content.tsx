import React from 'react'
import { Flex } from '@chakra-ui/core'
import Head from 'next/head'
import Header from './header'

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
        width="70%"
        marginX="auto"
        mt={{ base: '40px', md: '70px' }}
        marginBottom="150px"
        minH="calc(100vh - 224px)"
        {...props.style}
      >
        {props.children}
      </Flex>
    </>
  )
}

export default Content
