import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  EntityContextProps,
  EntityProviderProps
} from '../config/interfaces/entity'

import Loading from '../components/loading'
import constants from '../config/constants'
import { FindAllProps } from '../config/interfaces/list'

/**
 * Create a context to control shared data
 */
const EntityContext = createContext<EntityContextProps>(
  {} as EntityContextProps
)

const EntityProvider: React.FC<EntityProviderProps> = props => {
  const { type, service, children, onNewClose, onEditClose, onEditOpen } = props

  /**
   * Initialize properties model controlled by provider
   */
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [editEntity, setEditEntity] = useState<any>(null)

  const [countAll, setCountAll] = useState<number>(0)
  const [countActive, setCountActive] = useState<number>(0)
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0)

  const [page, setPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [order, setOrder] = useState<string>(constants.DEFAULT_ORDER)
  const [orderAsc, setOrderAsc] = useState<boolean>(true)
  const [filter, setFilter] = useState<string>(constants.FILTER_ALL)

  /**
   * Whatch params to load filter list
   */

  useEffect(() => {
    loadList()
  }, [filter, order, search, orderAsc, page, itemsPerPage])

  /**
   * Actions
   */

  const loadList = async () => {
    setLoading(true)

    const params: FindAllProps = {
      skip: page * itemsPerPage,
      limit: itemsPerPage,
      order: order,
      orderAsc: orderAsc,
      search: search,
      filters: [{ field: 'active', value: filter }]
    }
    const { data } = await service.findAll(params)

    setList(data.list)
    setCountAll(data.countAll)
    setCountActive(data.countActive)
    setLoading(false)
  }

  const updateListItem = (entity: any) => {
    const listCopy = [...list]
    const entityIndex = list.findIndex(entityFound => {
      return entityFound.id === entity.id
    })

    if (entityIndex > -1) {
      listCopy[entityIndex] = { ...entity }
      setList(listCopy)
    }
  }

  const removeListItem = (entity: any) => {
    const listCopy = [...list]
    const filteredList = listCopy.filter(entityFound => {
      return entityFound.id !== entity.id
    })

    setList(filteredList)
  }

  return (
    <EntityContext.Provider
      value={{
        type,
        service,
        list,
        setList,
        editEntity,
        setEditEntity,
        loading,
        setLoading,
        search,
        setSearch,
        filter,
        setFilter,
        order,
        setOrder,
        orderAsc,
        setOrderAsc,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        countAll,
        countActive,
        setCountActive,
        numberOfSelected,
        setNumberOfSelected,
        onNewClose,
        onEditClose,
        onEditOpen,
        updateList: loadList,
        updateListItem: updateListItem,
        removeListItem: removeListItem
      }}
    >
      <Loading visible={loading} />
      {children}
    </EntityContext.Provider>
  )
}

/**
 * Hook to use EntityContext
 */
function useEntity(): EntityContextProps {
  return useContext(EntityContext)
}

/**
 * Export modules
 */
export { EntityProvider, useEntity }
