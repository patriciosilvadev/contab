import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  Client,
  ClientsContextProps,
  ClientsProviderProps
} from '../config/interfaces/clients'

import Loading from '../components/loading'
import clientService from '../services/clientService'
import constants from '../config/constants'

/**
 * Create a context to control shared data
 */
const ClientsContext = createContext<ClientsContextProps>(
  {} as ClientsContextProps
)

const ClientsProvider: React.FC<ClientsProviderProps> = ({
  children,
  onNewClose,
  onEditClose,
  onEditOpen
}) => {
  /**
   * Initialize properties model controlled by provider
   */
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])
  const [editClient, setEditClient] = useState<Client>(null)

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [order, setOrder] = useState<string>('name')
  const [filter, setFilter] = useState<string>(constants.FILTER_CLIENTS_ALL)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setLoading(true)
    const { list } = await clientService.findAll()
    setClients(list || [])
    setLoading(false)
  }

  return (
    <ClientsContext.Provider
      value={{
        clients,
        editClient,
        setEditClient,
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
        updateList: loadClients
      }}
    >
      <Loading visible={loading} />
      {children}
    </ClientsContext.Provider>
  )
}

/**
 * Hook to use ClientsContext
 */
function useClients(): ClientsContextProps {
  return useContext(ClientsContext)
}

/**
 * Export modules
 */
export { ClientsProvider, useClients }
