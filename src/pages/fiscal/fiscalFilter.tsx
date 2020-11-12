import React from 'react'
import theme from '../../styles/theme'
import { Flex, Text } from '@chakra-ui/core'
import constants from '../../config/constants'
import { useFiscal } from '../../hooks/fiscalContext'
import FilterButton from '../../components/filterButton'

const FiscalFilter: React.FC = () => {
  const { counter, filter, setFilter } = useFiscal()

  /**
   * Actions
   */

  const setAsSelected = (filterSelected: string) => {
    setFilter(filterSelected === filter ? constants.FILTER_ALL : filterSelected)
  }

  /**
   * Elements
   */

  const getValor = valor => (
    <Flex alignItems="baseline">
      <Text color="gray.400" fontSize={14} marginRight="5px">
        R$
      </Text>
      <Text>
        {parseFloat(valor).toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        })}
      </Text>
    </Flex>
  )

  /**
   * Component
   */

  return (
    <Flex
      height="100px"
      marginY="15px"
      borderRadius={5}
      overflow="hidden"
      border={`1px solid ${theme.colors.gray[300]}`}
      boxShadow="0 0 10px 0 rgba(225,225,225,0.4)"
    >
      <FilterButton
        color="green.400"
        active={filter === constants.FILTER_SENT}
        value={getValor(counter.sent.valor)}
        onClick={() => setAsSelected(constants.FILTER_SENT)}
        title={`Notas emitidas (${counter.sent.count})`}
      />
      <FilterButton
        color="yellow.400"
        active={filter === constants.FILTER_PENDING}
        value={getValor(counter.pending.valor)}
        onClick={() => setAsSelected(constants.FILTER_PENDING)}
        title={`Notas pendentes (${counter.pending.count})`}
      />
      <FilterButton
        color="red.400"
        active={filter === constants.FILTER_CANCELED}
        value={getValor(counter.canceled.valor)}
        onClick={() => setAsSelected(constants.FILTER_CANCELED)}
        title={`Notas canceladas (${counter.canceled.count})`}
      />
    </Flex>
  )
}

export default FiscalFilter
