import Content from '../components/content'
import Section from '../components/section'
import Link from '../components/inputs/link'
import { Flex, Text, Box } from '@chakra-ui/core'
import { BsQuestionCircle } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { ProtectRoute } from '../hooks/authContext'
import SubscriptionForm from '../components/subscription'
import BoxPrice from '../components/subscription/boxPrice'
import { Plan, plans } from '../components/subscription/setPlan'

const Subscription: React.FC = () => {
  const [plan, setPlan] = useState<Plan>(plans.PLAN_BASIC)

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

  const InnerSubscription: React.FC = () => (
    <Section direction="column" width="100%" minHeight="200px">
      <Flex>
        <BoxPrice
          last={true}
          first={true}
          obs={plan.obs}
          title={plan.title}
          price={plan.price}
          details={plan.details}
          oldPrice={plan.oldPrice}
          description={plan.description}
          priceDecimal={plan.priceDecimal}
        />
        <SubscriptionForm plan={plan} />
      </Flex>
    </Section>
  )

  return (
    <Content title="SympleCont">
      <TopSubscriptionInfo />
      <InnerSubscription />
    </Content>
  )
}

export default ProtectRoute(Subscription)
