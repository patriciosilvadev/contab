import React from 'react'
import {
  Text,
  Box,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/core'

interface InputCustomProps extends ChakraInputProps {
  label?: string
  invalidMessage?: string
}

const Input: React.FC<InputCustomProps> = props => {
  const { label, isRequired, invalidMessage, isInvalid, ...rest } = props

  return (
    <Box flex={rest.flex} marginRight={rest.mr}>
      {label && (
        <Text marginBottom="5px" fontSize={14} color="gray.600">
          {label}{' '}
          {isRequired && (
            <Text as="span" color="red.600">
              *
            </Text>
          )}
        </Text>
      )}
      <ChakraInput
        _placeholder={{ color: 'gray.300' }}
        height="50px"
        marginBottom={!invalidMessage ? '25px' : ''}
        borderColor="gray.300"
        focusBorderColor="green.100"
        borderRadius="sm"
        {...rest}
      />
      {invalidMessage && (
        <Text height="20px" marginTop="5px" fontSize={12} color="red.600">
          {isInvalid ? invalidMessage : ''}
        </Text>
      )}
    </Box>
  )
}

export default Input
