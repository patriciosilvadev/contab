import {
  Menu,
  Button,
  MenuList,
  MenuItem,
  MenuButton,
  MenuButtonProps,
  Box,
  Text
} from '@chakra-ui/core'
import React from 'react'
import theme from '../../styles/theme'

interface CustomMenuButton extends MenuButtonProps {
  label?: string
  isRequired?: boolean
  borderColor?: string
  bgColor?: string
  color?: string
  options: { value: string; handle: () => void }[]
}

const CustomMenuButton: React.FC<CustomMenuButton> = props => {
  const {
    label,
    children,
    borderColor,
    bgColor,
    color,
    options,
    isRequired,
    ...rest
  } = props

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
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
          height="50px"
          borderRadius="sm"
          {...rest}
          color={color || 'white'}
          backgroundColor={bgColor ? `${bgColor}.300` : 'white'}
          borderWidth={1}
          borderColor={borderColor || theme.colors.gray[300]}
          _hover={{ backgroundColor: `${bgColor}.100` }}
        >
          {children}
        </MenuButton>
        <MenuList>
          {options &&
            options.map((option, key) => (
              <MenuItem key={key} onClick={option.handle}>
                {option.value}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CustomMenuButton
