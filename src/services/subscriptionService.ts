import { Stripe } from '@stripe/stripe-js'
import { AxiosInstance } from 'axios'
import {
  RequestAction,
  RequestInvoice,
  RequestSubscription
} from '../config/interfaces'
import planService from './planService'

import Server from './_server'

class SubscriptionService {
  api: AxiosInstance
  stripe: Stripe

  constructor() {
    this.api = Server.api
  }

  public setStripe(stripe) {
    this.stripe = stripe
  }

  private async handlePaymentThatRequiresCustomerAction({
    plan,
    stripe,
    subscription,
    priceId,
    paymentMethodId,
    isRetry
  }: RequestAction) {
    if (subscription && subscription.status === 'active') {
      // Subscription is active, no customer actions required.
      return { plan, subscription, priceId, paymentMethodId }
    }

    const paymentIntentReq = subscription.latest_invoice.payment_intent

    if (
      paymentIntentReq.status === 'requires_action' ||
      (isRetry === true &&
        paymentIntentReq.status === 'requires_payment_method')
    ) {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        paymentIntentReq.client_secret,
        {
          payment_method: paymentMethodId
        }
      )

      if (error) {
        throw new Error(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        // There's a risk of the customer closing the window before the callback.
        return { plan, priceId, subscription, paymentMethodId }
      }
    } else {
      // No customer action needed.
      return { plan, subscription, priceId, paymentMethodId }
    }
  }

  private async onSubscriptionComplete(result) {
    const { plan, priceId, subscription, paymentMethodId } = result
    const payload = {
      type: plan.id,
      priceId,
      paymentMethodId,
      subscriptionId: subscription.id
    }

    const { planCreated, status } = await planService.createPlan(payload)

    if (status !== 200) {
      throw new Error(
        'Erro ao associar um plano a sua conta. ' +
          'Por favor, entre em contato com nosso suporte técnico.'
      )
    }

    // Payment was successful.
    return planCreated
  }

  private handleRequiresPaymentMethod({
    plan,
    subscription,
    paymentMethodId,
    priceId
  }) {
    if (subscription.status === 'active') {
      // subscription is active, no customer actions required.
      return { plan, subscription, priceId, paymentMethodId }
    } else if (
      subscription.latest_invoice.payment_intent.status ===
      'requires_payment_method'
    ) {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id)
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status
      )
      throw new Error('Seu cartão foi recusado.')
    } else {
      return { plan, subscription, priceId, paymentMethodId }
    }
  }

  public async retryInvoiceWithNewPaymentMethod({
    plan,
    customerId,
    paymentMethodId,
    invoiceId,
    priceId
  }: RequestInvoice) {
    return await this.api
      .post(
        '/subscription/retry',
        {
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId
        },
        {
          headers: Server.authHeader()
        }
      )
      .then(result => {
        return {
          plan,
          subscription: result.data,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          isRetry: true
        }
      })
      .then(this.handlePaymentThatRequiresCustomerAction)
      .then(this.onSubscriptionComplete)
      .catch(error => {
        return error
      })
  }

  public async createSubscription({
    plan,
    type,
    customerId,
    paymentMethodId,
    priceId
  }: RequestSubscription) {
    const stripeObject = this.stripe

    return await this.api
      .post(
        '/subscription',
        { type, customerId, paymentMethodId, priceId },
        { headers: Server.authHeader() }
      )
      .then(result => {
        return {
          plan: plan,
          stripe: stripeObject,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
          subscription: result.data
        }
      })
      .then(this.handlePaymentThatRequiresCustomerAction)
      .then(this.handleRequiresPaymentMethod)
      .then(this.onSubscriptionComplete)
      .catch(error => {
        return { error: error.message }
      })
  }
}

export default new SubscriptionService()
