import { Person } from './person'
import { FindAllProps } from './list'

export interface FindAllProductsProps extends FindAllProps {
  categoryId?: number
}

export interface ProductFormProps {
  product: Product
  loading: boolean
  setProduct(person: Product): void
  validation?: ProductValidation
}

export interface Product {
  id?: number
  name: string
  barCode: string
  categoryId: number
  price: number
  cost: number
  stokAvailable: number
  stokMin: number
  stokMax: number
  origin?: number
  unitType?: string
  ncm?: string
  csosn?: string
  cfop?: string
  cest?: string
  netWeight?: string
  grossWeight?: string
  obs?: string
  selected?: boolean
  suppliers?: Person[]
}

export interface ProductValidation {
  idIsValid?: boolean
  nameIsValid?: boolean
  barCodeIsValid?: boolean
  categoryIsValid?: boolean
  priceIsValid?: boolean
  costIsValid?: boolean
  stokAvailableIsValid?: boolean
  stokMinIsValid?: boolean
  stokMaxIsValid?: boolean
  originIsValid?: boolean
  unitTypeIsValid?: boolean
  ncmIsValid?: boolean
  cestIsValid?: boolean
  netWeightIsValid?: boolean
  grossWeightIsValid?: boolean
  obsIsValid?: boolean
  selectedIsValid?: boolean
  suppliersIsValid?: boolean
}
