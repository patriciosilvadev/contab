import React, { useEffect, useState } from 'react'

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
  const { persons, filter, setFilter } = usePerson()
  const [countOfActive, setCountOfActive] = useState<number>(0)

  useEffect(() => {
    const count = persons.filter(person => {
      return person.active
    }).length

    setCountOfActive(count)
  }, [persons])

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

  return (
    <Flex
      height="100px"
      marginY="20px"
      border={`1px solid ${theme.colors.gray[300]}`}
      borderRadius={10}
      overflow="hidden"
    >
      <ButtonBox
        title={`Todos ${name.toLowerCase()}`}
        value={persons.length}
        color="blue.300"
        active={filter === constants.FILTER_PERSON_ALL}
        onClick={() => setFilter(constants.FILTER_PERSON_ALL)}
      />
      <ButtonBox
        title="Ativos"
        value={countOfActive}
        color="green.300"
        active={filter === constants.FILTER_PERSON_ACTIVE}
        onClick={() => setFilter(constants.FILTER_PERSON_ACTIVE)}
      />
      <ButtonBox
        title="Inativos"
        value={persons.length - countOfActive}
        color="yellow.300"
        active={filter === constants.FILTER_PERSON_INACTIVE}
        onClick={() => setFilter(constants.FILTER_PERSON_INACTIVE)}
      />
    </Flex>
  )
}

export default FilterButton
