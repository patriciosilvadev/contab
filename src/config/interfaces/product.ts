/**
 * Product
 */

export interface ProductContextProps {
  products: Product[]
  editProduct: Product
  setEditProduct(product: Product): void
  loading: boolean
  search: string
  setSearch(search: string): void
  order: string
  setOrder(orderBy: string): void
  page: number
  setPage(page: number): void
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
  updateList(): void
}

export interface ProductProviderProps {
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
}

export interface Product {
  id?: number
  name: string
}

export interface ProductValidation {
  nameIsValid: boolean
}

/**
 * Product List
 */
export interface ProductListItem {
  selected: boolean
  name: string
}

export interface ListHeader {
  order?: string
}

export interface ProductRowProps {
  product: Product
  numberOfSelected: number
  setNumberOfSelected(numberOfSelected: number): void
  filteredProduct: Product[]
  setFilteredProduct(filteredProduct: Product[]): void
}
