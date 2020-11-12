import {
  FiscalContextProps,
  FiscalCounter,
  FiscalFindAllProps,
  FiscalProviderProps
} from '../config/interfaces/fiscal'
import constants from '../config/constants'
import Loading from '../components/loading'
import React, { useState, createContext, useContext, useEffect } from 'react'
import fiscalService from '../services/fiscalService'

/**
 * Create a context to control shared data
 */
const FiscalContext = createContext<FiscalContextProps>(
  {} as FiscalContextProps
)

const FiscalProvider: React.FC<FiscalProviderProps> = ({ type, children }) => {
  /**
   * Initialize properties model controlled by provider
   */
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [countAll, setCountAll] = useState<number>(0)
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0)

  const [page, setPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [order, setOrder] = useState<string>(constants.DEFAULT_ORDER)
  const [orderAsc, setOrderAsc] = useState<boolean>(true)
  const [filter, setFilter] = useState<string>(constants.FILTER_ALL)

  const [counter, setCounter] = useState<FiscalCounter>({
    sent: { count: 0, valor: 0 },
    pending: { count: 0, valor: 0 },
    canceled: { count: 0, valor: 0 }
  })

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

    const params: FiscalFindAllProps = {
      type: type,
      skip: page * itemsPerPage,
      limit: itemsPerPage,
      order: order,
      orderAsc: orderAsc,
      search: search,
      filter: filter
    }

    const { data } = await fiscalService.findAll(params)

    setList(data.list)
    setCountAll(data.countAll)
    setLoading(false)
  }

  const updateList = () => {
    console.log('update list')
  }

  const updateListItem = () => {
    console.log('update list')
  }

  const removeListItem = () => {
    console.log('update list')
  }

  /**
   * Context Component
   */

  return (
    <FiscalContext.Provider
      value={{
        type,
        search,
        setSearch,
        loading,
        setLoading,
        filter,
        setFilter,
        counter,
        setCounter,
        list,
        setList,
        countAll,
        numberOfSelected,
        setNumberOfSelected,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        order,
        setOrder,
        orderAsc,
        setOrderAsc,
        updateList,
        updateListItem,
        removeListItem,
        service: fiscalService
      }}
    >
      <Loading visible={loading} />
      {children}
    </FiscalContext.Provider>
  )
}

/**
 * Hook to use FiscalContext
 */
function useFiscal(): FiscalContextProps {
  return useContext(FiscalContext)
}

/**
 * Export modules
 */
export { FiscalProvider, useFiscal }
