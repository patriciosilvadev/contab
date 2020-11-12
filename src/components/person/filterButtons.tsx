import React from 'react'
import theme from '../../styles/theme'
import { Flex } from '@chakra-ui/core'
import FilterButton from '../filterButton'
import constants from '../../config/constants'
import { useEntity } from '../../hooks/entityContext'

interface FilterButtonProps {
  name: string
}

const FilterButtons: React.FC<FilterButtonProps> = ({ name }) => {
  const { countAll, countActive, filter, setFilter } = useEntity()

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
        title={`Todos ${name.toLowerCase()}`}
        value={countAll}
        color="blue.400"
        active={filter === constants.FILTER_ALL}
        onClick={() => setFilter(constants.FILTER_ALL)}
      />
      <FilterButton
        title="Ativos"
        value={countActive}
        color="green.400"
        active={filter === constants.FILTER_ACTIVE}
        onClick={() => setFilter(constants.FILTER_ACTIVE)}
      />
      <FilterButton
        title="Inativos"
        value={countAll - countActive}
        color="yellow.400"
        active={filter === constants.FILTER_INACTIVE}
        onClick={() => setFilter(constants.FILTER_INACTIVE)}
      />
    </Flex>
  )
}

export default FilterButtons
