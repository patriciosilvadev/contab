import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import constants from '../../config/constants'

import SubscriptionForm, { SubscriptionFormProps } from './subscriptionForm'

const stripePromise = loadStripe(constants.API_STRIPE_TEST, { locale: 'pt-BR' })

const Subscription: React.FC<SubscriptionFormProps> = props => {
  const { plan } = props
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionForm plan={plan} />
    </Elements>
  )
}

export default Subscription
