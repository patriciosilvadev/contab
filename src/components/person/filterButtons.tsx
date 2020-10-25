import React from 'react'
import theme from '../../styles/theme'
import constants from '../../config/constants'
import { usePerson } from '../../hooks/personContext'
import { Flex, PseudoBox, Text } from '@chakra-ui/core'

interface ButtonBoxProps {
  title: string
  value: number
  color: string
  active: boolean
  onClick(): void
}

interface FilterButtonProps {
  name: string
}

const FilterButton: React.FC<FilterButtonProps> = ({ name }) => {
  const { countAll, countActive, filter, setFilter } = usePerson()

  /**
   * Elements
   */

  const ButtonBox: React.FC<ButtonBoxProps> = props => {
    const { title, value, color, active, onClick } = props

    return (
      <PseudoBox
        display="flex"
        flex={1}
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
        <Text>{title}</Text>
        <Text fontSize={28} fontWeight="bold" color={color}>
          {value}
        </Text>
      </PseudoBox>
    )
  }

  /**
   * Component
   */

  return (
    <Flex
      height="100px"
      marginY="15px"
      border={`1px solid ${theme.colors.gray[300]}`}
      borderRadius={10}
      overflow="hidden"
    >
      <ButtonBox
        title={`Todos ${name.toLowerCase()}`}
        value={countAll}
        color="blue.300"
        active={filter === constants.FILTER_ALL}
        onClick={() => setFilter(constants.FILTER_ALL)}
      />
      <ButtonBox
        title="Ativos"
        value={countActive}
        color="green.300"
        active={filter === constants.FILTER_ACTIVE}
        onClick={() => setFilter(constants.FILTER_ACTIVE)}
      />
      <ButtonBox
        title="Inativos"
        value={countAll - countActive}
        color="yellow.300"
        active={filter === constants.FILTER_INACTIVE}
        onClick={() => setFilter(constants.FILTER_INACTIVE)}
      />
    </Flex>
  )
}

export default FilterButton
