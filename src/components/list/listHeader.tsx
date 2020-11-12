import React from 'react'

import HeaderCell from './listHeaderCell'
import theme from '../../styles/theme'
import { Checkbox } from '@chakra-ui/core'
import { HeadersProps } from '../../config/interfaces/list'
import THead from './tHead'

interface ListHeaderProps {
  context(): any
  hasCheck: boolean
  hasItemOptions: boolean
  headers: HeadersProps[]
}

const ListHeader: React.FC<ListHeaderProps> = props => {
  const { context, hasCheck, hasItemOptions, headers } = props

  const {
    list,
    setList,
    order,
    setOrder,
    orderAsc,
    setOrderAsc,
    numberOfSelected,
    setNumberOfSelected
  } = context()

  const hasItemToShow = list.length > 0

  /**
   * Actions
   */

  const toggleAllItems = checkBox => {
    const checked = checkBox.checked
    const indeterminate = checkBox.indeterminate
    const status = indeterminate ? true : checked

    let countSelected = 0
    const selectedItem = list.map(item => {
      item.selected = status
      countSelected += status ? 1 : 0
      return item
    })

    setList(selectedItem)
    setNumberOfSelected(countSelected)
  }

  const onChangeOrder = (orderSelected: string) => {
    if (orderSelected) {
      if (order === orderSelected) {
        setOrderAsc(!orderAsc)
      }
      setOrder(orderSelected)
    }
  }

  /**
   * Component
   */

  return (
    <THead>
      <tr>
        {hasCheck && (
          <HeaderCell first>
            {hasItemToShow && (
              <Checkbox
                size="lg"
                variantColor="green"
                backgroundColor="white"
                borderColor={theme.colors.gray[300]}
                borderRadius={5}
                isIndeterminate={
                  numberOfSelected > 0 && !(numberOfSelected === list.length)
                }
                isChecked={numberOfSelected === list.length}
                onChange={e => toggleAllItems(e.target)}
              />
            )}
          </HeaderCell>
        )}
        {headers.map((header, index) => {
          const [objectProp, property] = header.fieldObject || ['', '']
          const key = header.field || objectProp + property

          return (
            <HeaderCell
              key={key}
              orderAsc={orderAsc}
              order={header.field}
              onChangeOrder={onChangeOrder}
              selected={order === header.field}
              first={!hasCheck && index === 0}
              last={!hasItemOptions && index === headers.length - 1}
            >
              {header.displayName || header.field}
            </HeaderCell>
          )
        })}
        {hasItemOptions && <HeaderCell last />}
      </tr>
    </THead>
  )
}

export default ListHeader
