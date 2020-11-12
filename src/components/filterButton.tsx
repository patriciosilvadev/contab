import React, { ReactElement } from 'react'
import theme from '../styles/theme'
import { Text, PseudoBox } from '@chakra-ui/core'

interface ButtonBoxProps {
  title: string
  value: number | string | ReactElement
  color: string
  active: boolean
  onClick(): void
}

const FilterButton: React.FC<ButtonBoxProps> = props => {
  const { title, value, color, active, onClick } = props

  return (
    <PseudoBox
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      borderTopWidth={4}
      borderTopColor={active ? color : theme.colors.gray[300]}
      _hover={{ borderTopColor: color }}
      transition="all 0.3s"
      onClick={onClick}
    >
      <Text fontSize={14} color="gray.600">
        {title}
      </Text>
      <Text fontSize={28} color={color}>
        {value}
      </Text>
    </PseudoBox>
  )
}

export default FilterButton
