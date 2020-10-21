import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  Person,
  PersonContextProps,
  PersonProviderProps
} from '../config/interfaces/person'

import Loading from '../components/loading'
import constants from '../config/constants'
import clientService from '../services/clientService'
import supplierService from '../services/supplierService'

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
  const [persons, setPersons] = useState<Person[]>([])
  const [editPerson, setEditPerson] = useState<Person>(null)

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [order, setOrder] = useState<string>('name')
  const [filter, setFilter] = useState<string>(constants.FILTER_PERSON_ALL)

  useEffect(() => {
    loadPersons()
  }, [])

  const loadPersons = async () => {
    setLoading(true)
    const { list } = await service.findAll()
    setPersons(list)
    setLoading(false)
  }

  return (
    <PersonContext.Provider
      value={{
        type,
        service,
        persons,
        editPerson,
        setEditPerson,
        loading,
        search,
        setSearch,
        filter,
        setFilter,
        order,
        setOrder,
        page,
        setPage,
        onNewClose,
        onEditClose,
        onEditOpen,
        updateList: loadPersons
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
