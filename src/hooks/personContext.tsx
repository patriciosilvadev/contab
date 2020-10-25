import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  Person,
  PersonContextProps,
  PersonProviderProps
} from '../config/interfaces/person'

import Loading from '../components/loading'
import constants from '../config/constants'
import { FindAllProps } from '../config/interfaces/list'

/**
 * Create a context to control shared data
 */
const PersonContext = createContext<PersonContextProps>(
  {} as PersonContextProps
)

const PersonProvider: React.FC<PersonProviderProps> = props => {
  const { type, service, children, onNewClose, onEditClose, onEditOpen } = props

  /**
   * Initialize properties model controlled by provider
   */
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<Person[]>([])
  const [editPerson, setEditPerson] = useState<Person>(null)

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

  const updateListItem = (person: Person) => {
    const listCopy = [...list]
    const itemIndex = list.findIndex(personFound => {
      return personFound.id === person.id
    })

    if (itemIndex > -1) {
      listCopy[itemIndex] = { ...person }
      setList(listCopy)
    }
  }

  return (
    <PersonContext.Provider
      value={{
        type,
        service,
        list,
        setList,
        editPerson,
        setEditPerson,
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
        updateListItem: updateListItem
      }}
    >
      <Loading visible={loading} />
      {children}
    </PersonContext.Provider>
  )
}

/**
 * Hook to use PersonsContext
 */
function usePerson(): PersonContextProps {
  return useContext(PersonContext)
}

/**
 * Export modules
 */
export { PersonProvider, usePerson }
