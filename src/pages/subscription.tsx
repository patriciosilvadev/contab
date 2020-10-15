import React, { useEffect, useState } from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import { ProtectRoute } from '../hooks/authContext'
import { BsQuestionCircle } from 'react-icons/bs'

import Content from '../components/content'
import BoxPrice from '../components/subscription/boxPrice'
import SubscriptionForm from '../components/subscription'
import PlanDetails from '../components/planDetails'
import Section from '../components/section'
import SetPlan, { Plan, plans } from '../components/subscription/setPlan'
import Link from '../components/inputs/link'

const Subscription: React.FC = () => {
  const [plan, setPlan] = useState<Plan>()

  useEffect(() => {
    const { planSelected } = localStorage
    setPlan(plans[planSelected])
  }, [])

  const TopSubscriptionInfo: React.FC = () => {
    return (
      <Section>
        <Box width={{ sm: '100%', md: '70%' }} marginRight="40px">
          <Text
            fontSize={20}
            fontWeight="md"
            marginBottom="10px"
            color="green.600"
            textTransform="uppercase"
          >
            Planos que atendem a sua necessidade!
          </Text>
          <Text fontSize={14} color="gray.600">
            Todos os planos foram pensados na real rotina de um negócio,
            pensando em sua gestão financeira de forma simples e eficaz. Todos
            os planos contam com controle financeiro, vendas, estoque,
            relatórios e todos os indicadores de forma fácil de entender que vão
            ajudar nas tomadas de decisões no seu dia a dia.
          </Text>
        </Box>
        <Flex align="center" marginLeft="40px">
          <BsQuestionCircle size={85} style={{ fill: '#019c2b' }} />
          <Flex direction="column" marginLeft="30px">
            <Text
              fontSize={20}
              fontWeight="md"
              marginBottom="10px"
              color="green.600"
              textTransform="uppercase"
            >
              Precisa de uma ajuda?
            </Text>
            <Text fontSize={14} color="gray.600">
              Entre em contato conosco e agende sua experiência SympleCont!
            </Text>
            <Link>Entrar em contato</Link>
          </Flex>
        </Flex>
      </Section>
    )
  }

  const InnerSubscription: React.FC = () => {
    if (!plan) {
      return <SetPlan action={planSelected => setPlan(planSelected)} />
    } else {
      return (
        <Section direction="column" width="100%" minHeight="200px">
          <Flex>
            <BoxPrice
              first={true}
              last={true}
              title={plan.title}
              description={plan.description}
              oldPrice={plan.oldPrice}
              price={plan.price}
              priceDecimal={plan.priceDecimal}
              details={plan.details}
              buttonText="Trocar Plano"
              action={() => setPlan(null)}
              obs={plan.obs}
            />
            <SubscriptionForm plan={plan} />
          </Flex>
        </Section>
      )
    }
  }

  return (
    <Content title="SympleCont">
      <TopSubscriptionInfo />
      <InnerSubscription />
      <PlanDetails />
    </Content>
  )
}

export default ProtectRoute(Subscription)
