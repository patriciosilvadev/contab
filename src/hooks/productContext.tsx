import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  Product,
  ProductContextProps,
  ProductProviderProps
} from '../config/interfaces/product'

import Loading from '../components/loading'

/**
 * Create a context to control shared data
 */
const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps
)

const ProductProvider: React.FC<ProductProviderProps> = props => {
  const { children, onNewClose, onEditClose, onEditOpen } = props

  /**
   * Initialize properties model controlled by provider
   */
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [editProduct, setEditProduct] = useState<Product>(null)

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [order, setOrder] = useState<string>('name')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    // const { list } = await service.findAll()
    // setProducts(list)
    setLoading(false)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        editProduct,
        setEditProduct,
        loading,
        search,
        setSearch,
        order,
        setOrder,
        page,
        setPage,
        onNewClose,
        onEditClose,
        onEditOpen,
        updateList: loadProducts
      }}
    >
      <Loading visible={loading} />
      {children}
    </ProductContext.Provider>
  )
}

/**
 * Hook to use ProductsContext
 */
function useProduct(): ProductContextProps {
  return useContext(ProductContext)
}

/**
 * Export modules
 */
export { ProductProvider, useProduct }
