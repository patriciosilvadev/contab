import React from 'react'
import { Text, Icon, InputProps } from '@chakra-ui/core'

const TextCheck: React.FC<InputProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest}>
      <Icon name="check" color="green.400" marginRight="10px" />
      {children}
    </Text>
  )
}

export default TextCheck
