import React, { useEffect, useState } from 'react'
import logoImg from '../../../assets/logo-name.png'
import { Box, Flex, Image, Link } from '@chakra-ui/core'

const Header: React.FC = ({ children, ...rest }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 0)
    })
  }, [])

  return (
    <Box
      top="0"
      left="0"
      bg="white"
      pos="fixed"
      as="header"
      zIndex={90}
      width="100%"
      borderBottomWidth={1}
      transition="all ease .25s"
      borderBottomColor={scrolled ? 'gray.300' : 'white'}
      {...rest}
    >
      <Flex
        maxW="1550px"
        paddingX="15%"
        alignItems="center"
        justifyContent="center"
        paddingY={{ base: '20px', lg: '0px' }}
        height={{ base: 'auto', lg: '70px' }}
      >
        <Link width="120px" href="/">
          <Image src={logoImg} width="120px" />
        </Link>
        {children}
      </Flex>
    </Box>
  )
}

export default Header
