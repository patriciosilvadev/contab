import React from 'react'
import { Text } from '@chakra-ui/core'
import BoxPrice from './boxPrice'
import Section from '../section'

export interface Plan {
  id: string
  title: string
  description: string
  oldPrice: string
  price: string
  priceDecimal: string
  details: {
    users?: number
    countNfs?: number
    employees?: number
    employeeExtraPrice?: number
  }
  obs: string
}

interface PlanMap {
  PLAN_MEI: Plan
  PLAN_SERVICE: Plan
  PLAN_COMMERCE: Plan
}

export const plans: PlanMap = {
  PLAN_MEI: {
    id: 'PLAN_MEI',
    title: 'Plano MEI',
    description:
      'Este valor inclui o atendimento de todas as obrigações acessórias do ' +
      'MEI, como a declaração anual. Você não se preocupa com nada e estará ' +
      'com seu MEI sempre regularizado.',
    oldPrice: '129,90',
    price: '99',
    priceDecimal: '90',
    details: { employees: 1 },
    obs: 'Faturamento de até R$ 81 mil por ano.'
  },
  PLAN_SERVICE: {
    id: 'PLAN_SERVICE',
    title: 'Plano Serviços',
    description:
      'Este valor inclui o atendimento de todas as obrigações acessórias ' +
      'da empresa, como envio de declarações e anexos ao fisco. Você não se ' +
      'preocupa com nada e estará com sua empresa sempre regularizada.',
    oldPrice: '189,90',
    price: '119',
    priceDecimal: '90',
    details: { employees: 3, employeeExtraPrice: 25 },
    obs: 'Faturamento de até R$ 3,6 milhões por ano.'
  },
  PLAN_COMMERCE: {
    id: 'PLAN_COMMERCE',
    title: 'Plano Comércio',
    description:
      'Este valor inclui o atendimento de todas as obrigações acessórias ' +
      'da empresa, como envio de declarações e anexos ao fisco. Você não se ' +
      'preocupa com nada e estará com sua empresa sempre regularizada.',
    oldPrice: '259,90',
    price: '199',
    priceDecimal: '90',
    details: { employees: 3, employeeExtraPrice: 25 },
    obs: 'Faturamento de até R$ 3,6 milhões por ano.'
  }
}

interface PlansProps {
  action(plan: Plan): void
  textColor?: string
  buttonText?: string
}

const SetContabPlan: React.FC<PlansProps> = props => {
  const plansKeysList = Object.keys(plans)
  const { action, textColor, buttonText } = props
  const btnText = buttonText || 'Selecionar plano'

  return (
    <>
      <Section height="150px" justifyContent="center">
        <Text
          fontSize={26}
          fontWeight="bold"
          textAlign="center"
          color={textColor || 'green.600'}
        >
          Adquira já o seu plano e mantenha sua contabilidade em dias de forma
          mais symples!
        </Text>
      </Section>

      <Section
        backgroundColor="transparent"
        alignItems="center"
        justifyContent="center"
      >
        {plansKeysList.map((planKey, index) => {
          return (
            <BoxPrice
              key={planKey}
              first={index === 0}
              last={index === plansKeysList.length - 1}
              buttonText={btnText}
              obs={plans[planKey].obs}
              title={plans[planKey].title}
              price={plans[planKey].price}
              details={plans[planKey].details}
              oldPrice={plans[planKey].oldPrice}
              action={() => action(plans[planKey])}
              description={plans[planKey].description}
              priceDecimal={plans[planKey].priceDecimal}
            />
          )
        })}
      </Section>
    </>
  )
}

export default SetContabPlan
