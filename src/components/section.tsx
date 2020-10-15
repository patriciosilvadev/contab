import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/core'

const Section: React.FC<FlexProps> = props => {
  return (
    <Flex py="70px" {...props}>
      {props.children}
    </Flex>
  )
}

export default Section
