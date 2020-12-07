import React from 'react'
import { Select as ChakraSelect, Text, SelectProps } from '@chakra-ui/core'

const Select: React.FC<any | SelectProps> = props => {
  return (
    <>
      {props.label && (
        <Text marginBottom="5px" fontSize={14} color="gray.600">
          {props.label}{' '}
          {props.isRequired && (
            <Text as="span" color="red.600">
              *
            </Text>
          )}
        </Text>
      )}
      <ChakraSelect
        height="50px"
        focusBorderColor="green.100"
        borderRadius="sm"
        {...props}
      >
        {props.children}
      </ChakraSelect>
      {props.invalidMessage && (
        <Text height="20px" marginTop="5px" fontSize={12} color="red.600">
          {props.isInvalid ? props.invalidMessage : ''}
        </Text>
      )}
    </>
  )
}

export default Select
