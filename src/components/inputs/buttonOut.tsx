import React from 'react'
import { Button as ChakraButton, ButtonProps, Spinner } from '@chakra-ui/core'

interface CustomButtonProps extends ButtonProps {
  loading?: boolean
}

const ButtonOut: React.FC<CustomButtonProps> = props => {
  const { loading, children, isDisabled } = props
  const finalProps = { ...props }
  finalProps.loading = undefined

  return (
    <ChakraButton
      backgroundColor="transparent"
      color={isDisabled ? 'gray.600' : 'green.100'}
      paddingY="10px"
      borderRadius="sm"
      borderColor={isDisabled ? 'gray.600' : 'green.100'}
      borderWidth="1px"
      fontWeight="normal"
      _hover={
        isDisabled ? {} : { backgroundColor: 'green.100', color: 'white' }
      }
      {...finalProps}
    >
      {loading ? <Spinner /> : children}
    </ChakraButton>
  )
}

export default ButtonOut
