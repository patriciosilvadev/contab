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

interface CustomMenuOption {
  value: string
  color?: string
  handle: (item?: any) => void
}

interface CustomMenuButton extends MenuButtonProps {
  item?: any
  label?: string
  isRequired?: boolean
  borderColor?: string
  bgColor?: string
  color?: string
  options: CustomMenuOption[]
}

const CustomMenuButton: React.FC<CustomMenuButton> = props => {
  const {
    item,
    label,
    color,
    bgColor,
    options,
    children,
    isRequired,
    borderColor,
    ...rest
  } = props

  const getValue = (value: string) => {
    switch (value) {
      case 'active':
        return item.active ? 'Inativar' : 'Ativar'
      default:
        return value
    }
  }

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
              <MenuItem
                key={key}
                onClick={() => option.handle(item)}
                color={option.color}
              >
                {getValue(option.value)}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CustomMenuButton
