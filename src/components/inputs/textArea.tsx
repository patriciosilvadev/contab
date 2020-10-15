import { Textarea, InputProps } from '@chakra-ui/core'
import React from 'react'

const TextArea: React.FC<InputProps> = props => {
  return (
    <Textarea
      size="sm"
      resize="none"
      _focus={{ borderColor: 'green.100' }}
      {...props}
    />
  )
}

export default TextArea
