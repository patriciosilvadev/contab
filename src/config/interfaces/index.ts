import { Stripe } from '@stripe/stripe-js'
import { AppProps } from 'next/app'
import { Dispatch } from 'react'
import { Plan } from '../../components/subscription/setPlan'

export interface User {
  name: string
  email: string
  password?: string
  customerId?: string
  plan?: string
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
  phone?: string
  celphone?: string
  birthday?: Date
  address?: Address
  role?: string
  certificateName?: string
  certificatePass?: string
  certificateExpirate?: Date
  certificate?: string | ArrayBuffer
}

export interface MainAppProps extends AppProps {
  user?: User
}

export interface AuthContextData {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  signIn(payload: any): Promise<number>
  signUp(payload: any): Promise<number>
  signOut(): void
  setUser: Dispatch<any>
}

export interface AuthProviderProps {
  userLogged?: User
}

/**
 * User forms
 */

export interface FormValidation {
  nameIsValid?: boolean
  emailIsValid?: boolean
  celphoneIsValid?: boolean
  passwordIsValid?: boolean
  roleIsValid?: boolean
  cnpjIsValid?: boolean
  razaoIsValid?: boolean
  addressCepIsValid?: boolean
  addressStateIsValid?: boolean
  addressCityIsValid?: boolean
  certificatePassIsValid?: boolean
}

/**
 * Subscription Intefaces
 */
export interface RequestInvoice {
  plan: Plan
  customerId: string
  paymentMethodId: string
  invoiceId: string
  priceId: string
}

export interface RequestSubscription {
  plan: Plan
  type: string
  customerId: string
  paymentMethodId: string
  priceId: string
}

export interface RequestAction {
  plan: Plan
  stripe?: Stripe
  subscription?: any
  priceId: string
  paymentMethodId: string
  isRetry?: boolean
}

/**
 * Plan INterfaces
 */
export interface PlanPayload {
  type: string
  subscriptionId: string
  priceId: string
  paymentMethodId: string
}

/**
 * Bank Account
 */
export interface BankAccountElement {
  bankAccount: {
    icon: string
    iconColor: string
    name: string
    description: string
    valor: string
  }
}

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
