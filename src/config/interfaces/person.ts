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

export interface FiscalPerson {
  type?: string
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
  addresses?: Address[]
}
