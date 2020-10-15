import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/authContext'
import { Flex, Text, useToast } from '@chakra-ui/core'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import SubscriptionService from '../../services/subscriptionService'

import CardForm from './subscriptionCardForm'
import Button from '../inputs/button'
import { Plan } from './setPlan'

export interface SubscriptionFormProps {
  plan: Plan
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = props => {
  const { plan } = props
  const { user, setUser } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>()

  SubscriptionService.setStripe(stripe)

  const subscriptionSuccess = result => {
    user.plan = result
    setUser(user)

    toast({
      title: 'Assinatura realizada com sucesso',
      description: `Você possui acesso a todos os recursos do plano ${plan.title}.`,
      status: 'success',
      duration: 9000,
      isClosable: true
    })
    router.replace('/dashboard')
  }

  const showError = message => {
    toast({
      title: 'Ocorreu um erro',
      description: message,
      status: 'error',
      duration: 9000,
      isClosable: true
    })
  }

  const handleSubmit = async event => {
    setLoading(true)
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus'
    )

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log('[createPaymentMethod error]', error)
      showError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      let result = null
      const paymentMethodId = paymentMethod.id

      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem('latestInvoiceId')
        result = await SubscriptionService.retryInvoiceWithNewPaymentMethod({
          plan: plan,
          customerId: user.customerId,
          paymentMethodId,
          invoiceId,
          priceId: plan.keys.priceId
        })
      } else {
        // Create the subscription
        result = await SubscriptionService.createSubscription({
          plan: plan,
          type: plan.id,
          customerId: user.customerId,
          paymentMethodId,
          priceId: plan.keys.priceId
        })
      }

      if (result) {
        subscriptionSuccess(result)
      }
    }

    setLoading(false)
  }

  return (
    <Flex
      direction="column"
      width="33.33%"
      marginX="16.66%"
      justifyContent="center"
    >
      <Text fontSize={24} textTransform="uppercase" color="green.600">
        Formulário de Assinatura
      </Text>
      <Text fontSize={14} color="gray.600" marginBottom="20px">
        Nosso modelo de contrato é de <b>assinatura</b>, portanto preenchendo
        este formulário você estará concordando em cobrarmos automáticamente do
        seu cartão o valor do seu plano até o mesmo ser cancelado.
      </Text>
      <CardForm />
      <Button
        marginY="20px"
        isDisabled={!stripe || loading}
        onClick={handleSubmit}
        loading={loading}
      >
        Assinar
      </Button>
      <Text fontSize={14} color="red.600">
        A sua assinatura poderá ser cancelada a qualquer momento pelo perfil do
        usuário.
      </Text>
    </Flex>
  )
}

export default SubscriptionForm
