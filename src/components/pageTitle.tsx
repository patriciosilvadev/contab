import React from 'react'
import { InputProps, Text } from '@chakra-ui/core'

const PageTitle: React.FC<InputProps> = ({ children, ...rest }) => {
  return (
    <Text fontSize="30px" fontWeight="100" {...rest}>
      {children}
    </Text>
  )
}

export default PageTitle
