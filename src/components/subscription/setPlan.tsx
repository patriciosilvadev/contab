import React from 'react'
import { Text } from '@chakra-ui/core'
import BoxPrice from './boxPrice'
import Section from '../section'
import constants from '../../config/constants'

export interface Plan {
  id: string
  keys: { productId: string; priceId: string }
  title: string
  description: string
  oldPrice: string
  price: string
  priceDecimal: string
  details: { users: number; countNfs: number }
  obs: string
}

const testMode = true
const usePrefix = testMode ? '_TEST' : ''

export const plans = {
  PLAN_BASIC: {
    id: 'PLAN_BASIC',
    keys: {
      productId: constants[`PLAN${usePrefix}_BASIC_PRODUCT_ID`],
      priceId: constants[`PLAN${usePrefix}_BASIC_PRICE_ID`]
    },
    title: 'Básico',
    description:
      'Emitir notas fiscais nunca foi tão simples. ' +
      'Aproveite e comece hoje mesmo!',
    oldPrice: '129,90',
    price: '99',
    priceDecimal: '90',
    details: { users: 1, countNfs: 40 },
    obs: 'Plano extremamente eficiente para o seu negócios.'
  },
  PLAN_CONTROL: {
    id: 'PLAN_CONTROL',
    keys: {
      productId: constants[`PLAN${usePrefix}_CONTROL_PRODUCT_ID`],
      priceId: constants[`PLAN${usePrefix}_CONTROL_PRICE_ID`]
    },
    title: 'Controle',
    description:
      'Aumente o número de emissões de notas fiscais do seu negócio.',
    oldPrice: '159,90',
    price: '99',
    priceDecimal: '90',
    details: { users: 1, countNfs: 100 },
    obs: 'Sua empresa começa a pegar voo, de o suporte necessário a ela.'
  },
  PLAN_ADVANCED: {
    id: 'PLAN_ADVANCED',
    keys: {
      productId: constants[`PLAN${usePrefix}_ADVANCED_PRODUCT_ID`],
      priceId: constants[`PLAN${usePrefix}_ADVANCED_PRICE_ID`]
    },
    title: 'Avançado',
    description:
      'O céu é o limite, a quantidade de emissões aumenta de acordo com sua necessidade, para mais notas procure nosso plano Personalizado.',
    oldPrice: '199,90',
    price: '135',
    priceDecimal: '90',
    details: { users: 2, countNfs: 300 },
    obs: 'Maior responsabilidade demanda de um controle maior ainda.'
  }
}

interface PlansProps {
  action(plan: Plan): void
  textColor?: string
  buttonText?: string
}

const SetPlan: React.FC<PlansProps> = props => {
  const { action, textColor, buttonText } = props
  const btnText = buttonText || 'Selecionar plano'

  return (
    <>
      <Section height="150px" justifyContent="center">
        <Text
          textAlign="center"
          fontSize={26}
          fontWeight="normal"
          color={textColor || 'green.600'}
        >
          Adquira já o seu plano e controle o seu negócio de forma simples!
        </Text>
      </Section>

      <Section
        backgroundColor="transparent"
        alignItems="center"
        justifyContent="center"
      >
        <BoxPrice
          last={true}
          first={true}
          buttonText={btnText}
          obs={plans.PLAN_BASIC.obs}
          title={plans.PLAN_BASIC.title}
          price={plans.PLAN_BASIC.price}
          details={plans.PLAN_BASIC.details}
          oldPrice={plans.PLAN_BASIC.oldPrice}
          action={() => action(plans.PLAN_BASIC)}
          description={plans.PLAN_BASIC.description}
          priceDecimal={plans.PLAN_BASIC.priceDecimal}
        />
      </Section>
    </>
  )
}

export default SetPlan
