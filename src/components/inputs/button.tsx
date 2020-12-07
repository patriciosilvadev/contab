import React from 'react'
import { Button as ChakraButton, ButtonProps, Spinner } from '@chakra-ui/core'

interface CustomButtonProps extends ButtonProps {
  variation?: string
  loading?: boolean
}

const Button: React.FC<CustomButtonProps> = props => {
  const { loading, variation, children, isDisabled, ...rest } = props
  const disabled = isDisabled || loading || false

  return (
    <ChakraButton
      color="white"
      height="50px"
      borderRadius="sm"
      isDisabled={disabled}
      _hover={{ backgroundColor: disabled ? null : 'green.100' }}
      backgroundColor={variation === 'secondary' ? 'gray.600' : 'green.300'}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </ChakraButton>
  )
}

export default Button
