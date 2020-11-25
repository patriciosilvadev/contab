import React from 'react'
import { Button as ChakraButton, ButtonProps, Spinner } from '@chakra-ui/core'

interface CustomButtonProps extends ButtonProps {
  loading?: boolean
  variantColor?: string
}

const ButtonOut: React.FC<CustomButtonProps> = props => {
  const { loading, children, isDisabled, variantColor } = props
  const finalProps = { ...props }
  finalProps.loading = undefined

  const color = variantColor === 'red' ? 'red.400' : 'green.100'

  return (
    <ChakraButton
      backgroundColor="transparent"
      color={isDisabled ? 'gray.600' : color}
      paddingY="10px"
      borderRadius="sm"
      borderColor={isDisabled ? 'gray.600' : color}
      borderWidth="1px"
      fontWeight="normal"
      _focus={{ outline: 'none' }}
      _hover={isDisabled ? {} : { backgroundColor: color, color: 'white' }}
      _active={isDisabled ? {} : { backgroundColor: color }}
      {...finalProps}
    >
      {loading ? <Spinner /> : children}
    </ChakraButton>
  )
}

export default ButtonOut
