import React from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/core'

const Link: React.FC<ChakraLinkProps> = props => {
  return (
    <ChakraLink
      alignSelf="flex-start"
      fontSize="sm"
      color="green.300"
      fontWeight="bold"
      _hover={{ color: 'green.100' }}
      {...props}
    >
      {props.children}
    </ChakraLink>
  )
}

export default Link
