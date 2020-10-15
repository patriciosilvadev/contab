import React from 'react'
import { Button as ChakraButton, ButtonProps, Spinner } from '@chakra-ui/core'

interface CustomButtonProps extends ButtonProps {
  variation?: string
  loading?: boolean
}

const Button: React.FC<CustomButtonProps> = props => {
  const { loading, variation, children } = props
  const finalProps = { ...props }
  finalProps.loading = undefined

  return (
    <ChakraButton
      backgroundColor={variation === 'secondary' ? 'gray.600' : 'green.300'}
      color="white"
      height="50px"
      borderRadius="sm"
      _hover={{ backgroundColor: 'green.100' }}
      isDisabled={loading || false}
      {...finalProps}
    >
      {loading ? <Spinner /> : children}
    </ChakraButton>
  )
}

export default Button
