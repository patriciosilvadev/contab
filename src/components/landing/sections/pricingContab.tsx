import React from 'react'
import StripesBg from '../../stripesBg'
import { Box, PseudoBox } from '@chakra-ui/core'
import constants from '../../../config/constants'
import SetContabPlan, { Plan } from '../../subscription/setContabPlan'

const PricingContab: React.FC = () => {
  const subscriptionPlan = (plan: Plan) => {
    switch (plan.id) {
      case constants.PLAN_CONTAB_MEI:
        window.open(
          constants.URL_WHATSAPP_CONTAB + constants.URL_WHATSAPP_CONTAB_MEI
        )
        break
      case constants.PLAN_CONTAB_SERVICE:
        window.open(
          constants.URL_WHATSAPP_CONTAB + constants.URL_WHATSAPP_CONTAB_SERVICE
        )
        break
      case constants.PLAN_CONTAB_COMMERCE:
        window.open(
          constants.URL_WHATSAPP_CONTAB + constants.URL_WHATSAPP_CONTAB_COMMERCE
        )
        break
      default:
        window.open(constants.URL_WHATSAPP_CONTAB)
    }
  }

  return (
    <>
      <Box as="section" pos="relative">
        <StripesBg />
      </Box>
      <PseudoBox paddingX="10%">
        <SetContabPlan
          action={planSelected => subscriptionPlan(planSelected)}
          textColor="white"
          buttonText="Assinar"
        />
      </PseudoBox>
    </>
  )
}

export default PricingContab
