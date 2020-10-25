import React from 'react'

import { Flex, Text } from '@chakra-ui/core'
import ButtonOut from '../inputs/buttonOut'
import { ActionListProps } from '../../config/interfaces/list'
import Select from '../inputs/select'

interface ListLegendProps {
  context(): any
  actions: ActionListProps[]
  entityName: string
  filteredList: any[]
}

const ListLegend: React.FC<ListLegendProps> = props => {
  const { entityName, actions, filteredList, context } = props
  const { numberOfSelected, itemsPerPage, setItemsPerPage, setPage } = context()

  /**
   * Elements
   */

  const ActionList: React.FC<ActionListProps> = ({
    label,
    handle,
    disabled
  }) => {
    return (
      <ButtonOut
        fontSize={12}
        height="20px"
        marginLeft="10px"
        isDisabled={disabled}
        onClick={() => handle(filteredList)}
      >
        {label}
      </ButtonOut>
    )
  }

  /**
   * Component
   */

  return (
    <Flex alignItems="center" height="30px" marginBottom="15px">
      <Text flex={1} fontSize={12} color="gray.600">
        <b>{numberOfSelected}</b> {entityName.toLowerCase()}(s) selecionado(s)
        {actions.map(action => (
          <ActionList
            key={action.label}
            label={action.label}
            handle={action.handle}
            disabled={numberOfSelected === 0}
          />
        ))}
      </Text>
      <Flex flex={1} alignItems="center" justifyContent="flex-end">
        <Text marginRight="10px" fontSize={12}>
          Registros por página:
        </Text>
        <Select
          height="30px"
          width="80px"
          fontSize={12}
          value={itemsPerPage}
          placeholder="Itens por página"
          onChange={e => {
            setPage(0)
            setItemsPerPage(e.target.value)
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </Flex>
    </Flex>
  )
}

export default ListLegend
