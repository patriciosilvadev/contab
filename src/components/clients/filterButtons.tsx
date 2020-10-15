import React, { useEffect, useState } from 'react'
import { Flex, PseudoBox, Text } from '@chakra-ui/core'
import theme from '../../styles/theme'
import { useClients } from '../../hooks/clientContext'
import constants from '../../config/constants'

interface ButtonBoxProps {
  title: string
  value: number
  color: string
  active: boolean
  onClick(): void
}

const FilterButton: React.FC = () => {
  const { clients, filter, setFilter } = useClients()
  const [countOfActive, setCountOfActive] = useState<number>(0)

  useEffect(() => {
    const count = clients.filter(client => {
      return client.active
    }).length

    setCountOfActive(count)
  }, [clients])

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
        title="Todos clientes"
        value={clients.length}
        color="blue.300"
        active={filter === constants.FILTER_CLIENTS_ALL}
        onClick={() => setFilter(constants.FILTER_CLIENTS_ALL)}
      />
      <ButtonBox
        title="Ativos"
        value={countOfActive}
        color="green.300"
        active={filter === constants.FILTER_CLIENTS_ACTIVE}
        onClick={() => setFilter(constants.FILTER_CLIENTS_ACTIVE)}
      />
      <ButtonBox
        title="Inativos"
        value={clients.length - countOfActive}
        color="yellow.300"
        active={filter === constants.FILTER_CLIENTS_INACTIVE}
        onClick={() => setFilter(constants.FILTER_CLIENTS_INACTIVE)}
      />
    </Flex>
  )
}

export default FilterButton
