import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/core'
import IconButton from '../../components/inputs/iconButton'
import { useEntity } from '../../hooks/entityContext'

const SalesFilter: React.FC = () => {
  const { setFilters } = useEntity()
  const [date, setDate] = useState<Date>(new Date())

  /**
   * Actions
   */

  const setMonth = (countMonth: number) => {
    const newDate = new Date(date)
    newDate.setMonth(date.getMonth() + countMonth, 1)
    setDate(newDate)
    setFilters([{ field: 'createdDate', value: newDate.toString() }])
  }

  /**
   * Component
   */

  return (
    <Flex flex={1} alignItems="center">
      <IconButton
        aria-label="Anterior"
        icon="chevron-left"
        onClick={() => setMonth(-1)}
      />
      <Text
        width="160px"
        textAlign="center"
        color="gray.600"
        textTransform="capitalize"
      >
        {date.toLocaleString('pt-BR', { month: 'long' })} - {date.getFullYear()}
      </Text>
      <IconButton
        aria-label="Posterior"
        icon="chevron-right"
        onClick={() => setMonth(1)}
      />
    </Flex>
  )
}

export default SalesFilter
