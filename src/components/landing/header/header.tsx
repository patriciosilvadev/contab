import { Box, Flex, Image, Link } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'

import logoImg from '../../../assets/logo-name.png'

const SiteHeader = ({ scrolled, ...rest }) => (
  <Box
    as="header"
    transition="all ease .25s"
    width="100%"
    pos="fixed"
    top="0"
    left="0"
    bg="white"
    zIndex={90}
    borderBottomWidth={1}
    borderBottomColor={scrolled ? 'gray.300' : 'white'}
    {...rest}
  />
)

const SiteHeaderInner = props => (
  <Flex
    align="center"
    width={{ base: 'auto', sm: '70%' }}
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

const Header: React.FC = ({ children, ...props }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 0)
    })
  }, [])

  return (
    <SiteHeader scrolled={scrolled} {...props}>
      <SiteHeaderInner>
        <SiteLogo />
        {children}
      </SiteHeaderInner>
    </SiteHeader>
  )
}

export default Header
