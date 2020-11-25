import React from 'react'
import Select from '../inputs/select/select'
import ButtonOut from '../inputs/buttonOut'
import { Flex, Text } from '@chakra-ui/core'
import { ActionListProps } from '../../config/interfaces/list'

interface ListLegendProps {
  context(): any
  actions: ActionListProps[]
  entityName: string
  filteredList: any[]
  hasCheck?: boolean
}

const ListLegend: React.FC<ListLegendProps> = props => {
  const { entityName, actions, filteredList, context, hasCheck } = props
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
      {hasCheck && (
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
      )}
      <Flex flex={1} alignItems="center" justifyContent="flex-end">
        <Text marginRight="10px" fontSize={12}>
          Registros por página:
        </Text>
        <Select
          margin={0}
          width="80px"
          height="30px"
          fontSize={12}
          alignItems="center"
          value={itemsPerPage}
          setValue={quantity => {
            setPage(0)
            setItemsPerPage(quantity.value)
          }}
          options={[
            { label: '10', value: 10 },
            { label: '25', value: 25 },
            { label: '50', value: 50 },
            { label: '100', value: 100 }
          ]}
        />
      </Flex>
    </Flex>
  )
}

export default ListLegend
