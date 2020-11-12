import { Product } from './product'

export interface Category {
  id?: number
  name: string
  products?: Product[]
}

export interface CategoryValidation {
  idIsValid?: boolean
  nameIsValid?: boolean
}
