import { Person } from './person'
import { SalesProduct } from './salesProduct'

export interface SalesContextProps {
  client: Person
  setClient(client: Person): void
  loading: boolean
  setLoading(loading: boolean): void
  salesProducts: SalesProduct[]
  setSalesProducts(products: SalesProduct[]): void
  total: number
  setTotal(total: number): void
  received: number
  setReceived(received: number): void
  discount: number
  setDiscount(discount: number): void
  discountValor: number
  setDiscountValor(discountValor: number): void
  discountType: string
  setDiscountType(discountType: string): void
  payType: string
  setPayType(payType: string): void
  payCondition: string
  setPayCondition(payCondition: string): void
  payCard: CardProps
  setPayCard(payCard: CardProps): void
  resetSales(): void
}

export interface SalesProviderProps {
  onClose?(): void
}

export interface CardProps {
  credential: string
  band: string
  transaction: string
}
