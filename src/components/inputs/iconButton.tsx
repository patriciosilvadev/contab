import React from 'react'
import {
  IconButtonProps,
  IconButton as ChakraIconButton
} from '@chakra-ui/core'

interface CustomIconButtonProps extends IconButtonProps {
  loading?: boolean
}

const IconButton: React.FC<CustomIconButtonProps> = props => {
  const { loading, isDisabled, icon, ...rest } = props

  return (
    <ChakraIconButton
      icon={icon}
      paddingY="10px"
      borderRadius="sm"
      borderWidth="1px"
      fontWeight="normal"
      isDisabled={loading}
      _focus={{ outline: 'none' }}
      backgroundColor="transparent"
      color={isDisabled ? 'gray.600' : 'green.100'}
      borderColor={isDisabled ? 'gray.600' : 'green.100'}
      _active={isDisabled ? {} : { backgroundColor: 'green.300' }}
      _hover={
        isDisabled ? {} : { backgroundColor: 'green.100', color: 'white' }
      }
      {...rest}
    />
  )
}

export default IconButton
