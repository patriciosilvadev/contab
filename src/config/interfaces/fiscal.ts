import { EntityContextProps } from './entity'
import { FindAllProps } from './list'

export interface FiscalContextProps extends EntityContextProps {
  counter: FiscalCounter
  setCounter(counter: FiscalCounter): void
}

export interface FiscalProviderProps {
  type: string
}

export interface FiscalCounter {
  canceled: { count: number; valor: number }
  pending: { count: number; valor: number }
  sent: { count: number; valor: number }
}

export interface FiscalFindAllProps extends FindAllProps {
  type?: string
  filter?: string
}
