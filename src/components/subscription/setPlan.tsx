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
  details: { users: number; nfproduct: number; nfservice: number; nfce: number }
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
    description: 'Tenha o controle e emissões necessárias para o seu negócio.',
    oldPrice: '119,90',
    price: '79',
    priceDecimal: '90',
    details: { users: 1, nfproduct: 10, nfservice: 10, nfce: 10 },
    obs: 'Plano extremamente eficiente para pequenos negócios.'
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
    details: { users: 1, nfproduct: 30, nfservice: 30, nfce: 30 },
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
    details: { users: 2, nfproduct: 100, nfservice: 100, nfce: 100 },
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
          Escolha o plano perfeito para sua necessidade!
        </Text>
      </Section>

      <Section backgroundColor="transparent">
        <BoxPrice
          first={true}
          title="Básico"
          description="Tenha o controle e emissões necessárias para o seu negócio."
          oldPrice="119,90"
          price="79"
          priceDecimal="90"
          details={{ users: 1, nfproduct: 10, nfservice: 10, nfce: 10 }}
          obs="Plano extremamente eficiente para pequenos negócios."
          buttonText={btnText}
          action={() => action(plans.PLAN_BASIC)}
        />
        <BoxPrice
          title="Controle"
          description="Aumente o número de emissões de notas fiscais do seu negócio."
          oldPrice="159,90"
          price="99"
          priceDecimal="90"
          details={{ users: 1, nfproduct: 30, nfservice: 30, nfce: 30 }}
          obs="Sua empresa começa a pegar voo, de o suporte necessário a ela."
          buttonText={btnText}
          action={() => action(plans.PLAN_CONTROL)}
        />
        <BoxPrice
          last={true}
          title="Avançado"
          description="O céu é o limite, a quantidade de emissões aumenta de acordo com sua necessidade, para mais notas procure nosso plano Personalizado."
          oldPrice="199,90"
          price="135"
          priceDecimal="90"
          details={{ users: 2, nfproduct: 100, nfservice: 100, nfce: 100 }}
          obs="Maior responsabilidade demanda de um controle maior ainda."
          buttonText={btnText}
          action={() => action(plans.PLAN_ADVANCED)}
        />
      </Section>
    </>
  )
}

export default SetPlan
