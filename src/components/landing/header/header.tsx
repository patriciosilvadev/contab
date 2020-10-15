import { Box, Flex, Image, Link } from '@chakra-ui/core'
import React from 'react'

import logoImg from '../../../assets/logo-name.png'

const SiteHeader = props => (
  <Box
    as="header"
    transition="transform ease .25s"
    width="100%"
    pos="fixed"
    top="0"
    left="0"
    bg="white"
    zIndex="90"
    borderBottomWidth={1}
    borderBottomColor="gray.300"
    {...props}
  />
)

const SiteHeaderInner = props => (
  <Flex
    align="center"
    width={{ base: 'auto', sm: '80%' }}
    mx="auto"
    height={{ sm: '70px' }}
    maxW="1550px"
    {...props}
  />
)

const SiteLogo = ({ ...props }) => {
  return (
    <Box display="block" flexShrink={0} {...props}>
      <Link href="/">
        <Image src={logoImg} width="120px" />
      </Link>
    </Box>
  )
}

const Header = ({ children, ...props }) => (
  <SiteHeader {...props}>
    <SiteHeaderInner>
      <SiteLogo />
      {children}
    </SiteHeaderInner>
  </SiteHeader>
)

export default Header
