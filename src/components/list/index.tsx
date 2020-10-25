import React from 'react'

import ListItem from './listItem'
import ListTable from './listTable'
import ListLegend from './listLegend'
import ListHeader from './listHeader'
import Pagination from '../pagination'
import constants from '../../config/constants'
import { ListProps } from '../../config/interfaces/list'

const List: React.FC<ListProps> = props => {
  const {
    context,
    entityName,
    actions = [],
    hasCheck = true,
    itemOptions = [],
    headers = constants.DEFAULT_HEADERS
  } = props

  const { list, countAll, setPage, itemsPerPage } = context()

  const hasItemToShow = list.length > 0
  const pageCount = Math.ceil(countAll / itemsPerPage)

  /**
   * Component
   */

  return (
    <>
      <ListLegend
        context={context}
        actions={actions}
        entityName={entityName}
        filteredList={list}
      />

      <ListTable>
        <ListHeader
          context={context}
          headers={headers}
          hasCheck={hasCheck}
          hasItemOptions={itemOptions.length > 0}
        />
        <tbody>
          {hasItemToShow &&
            list.map((item, key) => (
              <ListItem
                key={key}
                item={item}
                headers={headers}
                context={context}
                hasCheck={hasCheck}
                options={itemOptions}
              />
            ))}
          {!hasItemToShow && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum {entityName} foi encontrado
              </td>
            </tr>
          )}
        </tbody>
      </ListTable>

      {hasItemToShow && pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          setPage={(page: any) => setPage(page.selected)}
        />
      )}
    </>
  )
}

export default List
