import React, { ReactElement } from 'react'
import {
  Text,
  Box,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/core'

interface InputCustomProps extends ChakraInputProps {
  label?: string | ReactElement
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
        height="50px"
        borderRadius="sm"
        focusBorderColor="green.100"
        _placeholder={{ color: 'gray.300' }}
        marginBottom={!invalidMessage ? '25px' : ''}
        borderColor={isInvalid ? 'red.400' : 'gray.300'}
        _hover={{ borderColor: isInvalid ? 'red.400' : 'gray.300' }}
        {...rest}
      />
      {invalidMessage && (
        <Text height="20px" marginTop="5px" fontSize={12} color="red.400">
          {isInvalid ? invalidMessage : ''}
        </Text>
      )}
    </Box>
  )
}

export default Input
