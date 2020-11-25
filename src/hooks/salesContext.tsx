import {
  CardProps,
  SalesContextProps,
  SalesProviderProps
} from '../config/interfaces/sales'
import Loading from '../components/loading'
import { Person } from '../config/interfaces/person'
import { SalesProduct } from '../config/interfaces/salesProduct'
import React, { useState, createContext, useContext, useEffect } from 'react'

/**
 * Create a context to control shared data
 */
const SalesContext = createContext<SalesContextProps>({} as SalesContextProps)

const SalesProvider: React.FC<SalesProviderProps> = props => {
  const { children } = props

  /**
   * Initialize properties model controlled by provider
   */
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState<Person>()
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([])

  const [total, setTotal] = useState<number>(0)
  const [received, setReceived] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [discountValor, setDiscountValor] = useState<number>(0)
  const [discountType, setDiscountType] = useState<string>('R$')

  const [payType, setPayType] = useState<string>('CASH')
  const [payCondition, setPayCondition] = useState<string>('IN_CASH')
  const [payCard, setPayCard] = useState<CardProps>({
    credential: 'INTER',
    band: 'MASTER',
    transaction: ''
  })

  const [printNf, setPrintNf] = useState<boolean>(true)

  /**
   * Watchers
   */

  useEffect(() => {
    let totalFound = 0
    salesProducts.forEach(sales => {
      totalFound +=
        (sales.product.price ? parseFloat(sales.product.price.toString()) : 0) *
        sales.quantity
    })
    setTotal(totalFound)
  }, [salesProducts])

  useEffect(() => {
    if (discountType === 'R$') {
      setDiscountValor(discount)
    } else {
      setDiscountValor(total * (discount / 100))
    }
  }, [discount, discountType])

  /**
   * Actions
   */

  const resetSales = () => {
    setLoading(false)
    setClient(null)
    setSalesProducts([])
    setTotal(0)
    setReceived(0)
    setDiscount(0)
    setDiscountValor(0)
    setDiscountType('R$')
  }

  /**
   * Context Component
   */

  return (
    <SalesContext.Provider
      value={{
        loading,
        setLoading,
        client,
        setClient,
        salesProducts,
        setSalesProducts,
        total,
        setTotal,
        received,
        setReceived,
        discount,
        setDiscount,
        discountValor,
        setDiscountValor,
        discountType,
        setDiscountType,
        payType,
        setPayType,
        payCondition,
        setPayCondition,
        payCard,
        setPayCard,
        printNf,
        setPrintNf,
        resetSales
      }}
    >
      <Loading visible={loading} />
      {children}
    </SalesContext.Provider>
  )
}

/**
 * Hook to use SalesContext
 */
function useSales(): SalesContextProps {
  return useContext(SalesContext)
}

/**
 * Export modules
 */
export { SalesProvider, useSales }
