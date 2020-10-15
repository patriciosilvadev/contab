/**
 * Address
 */
export interface Address {
  address?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  state?: string
  cep?: string
}

/**
 * Client
 */
export interface ClientsContextProps {
  clients: Client[]
  editClient: Client
  setEditClient(client: Client): void
  loading: boolean
  search: string
  setSearch(search: string): void
  filter: string
  setFilter(filter: string): void
  order: string
  setOrder(orderBy: string): void
  page: number
  setPage(page: number): void
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
  updateList(): void
}

export interface ClientsProviderProps {
  onNewClose(): void
  onEditOpen(): void
  onEditClose(): void
}

export interface Client {
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

export interface ClientValidation {
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
 * Client List
 */
export interface ClientListItem {
  selected: boolean
  name: string
  cpf?: string
  cnpj?: string
  email: string
  phone?: string
  celphone?: string
  active: boolean
}

export interface ListHeader {
  order?: string
}

export interface ClientRowProps {
  client: Client
  numberOfSelected: number
  setNumberOfSelected(numberOfSelected: number): void
  filteredClients: Client[]
  setFilteredClients(filteredClients: Client[]): void
}

export interface ClientItemActionProps {
  tooltip: string
  icon: any
  action: () => void
}
