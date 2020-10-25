import { Address } from '.'
import ClientService from '../../services/clientService'
import SupplierService from '../../services/supplierService'

/**
 * Person
 */

export interface PersonIndexProps {
  type: string
  service: typeof ClientService | typeof SupplierService
}

export interface PersonContextProps {
  type: string
  service: typeof ClientService | typeof SupplierService
  list: Person[]
  setList(persons: Person[]): void
  editPerson: Person
  setEditPerson(person: Person): void
  loading: boolean
  setLoading(loading: boolean): void
  search: string
  setSearch(search: string): void
  filter: string
  setFilter(filter: string): void
  order: string
  setOrder(orderBy: string): void
  orderAsc: boolean
  setOrderAsc(orderAsc: boolean): void
  page: number
  setPage(page: number): void
  itemsPerPage: number
  setItemsPerPage(itemsPerPage: number): void
  countAll: number
  countActive: number
  setCountActive(countActive: number): void
  numberOfSelected: number
  setNumberOfSelected(numberOfSelected: number): void
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
  updateList(): void
  updateListItem(person: Person): void
}

export interface PersonProviderProps {
  type: string
  service: typeof ClientService | typeof SupplierService
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
}

export interface Person {
  id?: number
  name: string
  type: string
  active: boolean
  cnpj?: string
  cpf?: string
  rg?: string
  razaoSocial?: string
  indInscEstadual?: string
  inscEstadual?: string
  inscMunicipal?: string
  inscSuframa?: string
  simples?: boolean
  email?: string
  phone?: string
  celphone?: string
  birthday?: Date
  obs?: string
  addresses?: Address[]
  selected?: boolean
}

export interface PersonValidation {
  nameIsValid: boolean
  typeIsValid?: boolean
  activeIsValid?: boolean
  cpnjIsValid?: boolean
  cpfIsValid?: boolean
  rgIsValid?: boolean
  razaoSocialIsValid?: boolean
  indInscEstadualIsValid?: boolean
  inscEstadualIsValid?: boolean
  inscMunicipalIsValid?: boolean
  inscSuframaIsValid?: boolean
  simplesIsValid?: boolean
  emailIsValid?: boolean
  phoneIsValid?: boolean
  celphoneIsValid?: boolean
  birthdayIsValid?: boolean
  obsIsValid?: boolean
  addressesIsValid?: boolean
}

/**
 * Person List
 */
export interface PersonListItem {
  selected: boolean
  name: string
  cpf?: string
  cnpj?: string
  email: string
  phone?: string
  celphone?: string
  active: boolean
}

export interface PersonRowProps {
  person: Person
  numberOfSelected: number
  setNumberOfSelected(numberOfSelected: number): void
  filteredPerson: Person[]
  setFilteredPerson(filteredPerson: Person[]): void
}

export interface PersonItemActionProps {
  tooltip: string
  icon: any
  action: () => void
}
