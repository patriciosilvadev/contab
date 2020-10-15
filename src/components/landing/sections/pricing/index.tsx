import React from 'react'
import { useAuth } from '../../../../hooks/authContext'
import { useRouter } from 'next/router'
import { Box, PseudoBox, useDisclosure } from '@chakra-ui/core'

import StripesBg from '../../../stripesBg'
import SetPlan, { Plan } from '../../../subscription/setPlan'
import CreateAccountModal from '../../../createAccountModal'

const Section = props => <Box as="section" pos="relative" {...props} />

const Pricing: React.FC = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isAuthenticated } = useAuth()

  async function subscriptionPlan(plan: Plan) {
    localStorage.setItem('planSelected', plan.id)
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      onOpen()
    }
  }

  return (
    <>
      <Section>
        <StripesBg />
      </Section>
      <PseudoBox paddingX="10%">
        <SetPlan
          action={planSelected => subscriptionPlan(planSelected)}
          textColor="white"
          buttonText="Assinar"
        />
      </PseudoBox>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Pricing
