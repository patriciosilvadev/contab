import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/core'

const Container: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      minHeight="90vh"
      paddingY="50px"
      paddingX="15%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Container
