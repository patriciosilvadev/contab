import React from 'react'
import Section from './section'
import { BsGraphUp, BsLayers, BsWallet, BsPuzzle } from 'react-icons/bs'
import { Text, Flex } from '@chakra-ui/core'
import theme from '../styles/theme'

interface DetailsProps {
  title: string
  description: string
  icon: any
}

const PlanDetails: React.FC = () => {
  const Detail: React.FC<DetailsProps> = props => {
    const { icon, title, description } = props
    return (
      <Flex
        align="center"
        width="50%"
        margin="20px"
        padding="30px"
        backgroundColor="white"
        borderRadius="20px"
        border={`1px solid ${theme.colors.gray[300]}`}
        boxShadow="-8px 9px 18px -2px rgba(0,72,20,.15)"
      >
        {icon}
        <Flex direction="column" marginLeft="30px">
          <Text fontSize={20} color="green.300" textTransform="uppercase">
            {title}
          </Text>
          <Text color="gray.600">{description}</Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Section direction="column" align="center" position="relative">
      <Text fontSize={24} color="green.300" textTransform="uppercase">
        Detalhes do plano
      </Text>
      <Text marginBottom="20px" color="gray.600">
        Além das cotas de emissão de notas você poderá contar com todo nosso
        suporte para seu negócio que conta com:
      </Text>

      <Flex>
        <Detail
          icon={
            <BsPuzzle size={250} style={{ fill: '#019c2b', height: '85px' }} />
          }
          title="Módulo PDV"
          description="Controle suas vendas com facilidade e agilidade através do nosso PDV
        integrado com o cadastro dos seus produtos e clientes. Agilizando desde
        a sua cotação até a finalização da compra."
        />
        <Detail
          icon={
            <BsLayers size={250} style={{ fill: '#019c2b', height: '85px' }} />
          }
          title="Módulo Estoque"
          description="Integrado com o PDV ou seu controle manual de vendas o nosso modulo de
        estoque conta com cadastro de Fornecedores, controle de fichas técnicas,
        dedução automática na venda e alertas de estoque crítico."
        />
      </Flex>
      <Flex>
        <Detail
          icon={
            <BsWallet size={250} style={{ fill: '#019c2b', height: '85px' }} />
          }
          title="Módulo Financeiro"
          description="Para manter um negócio no controle você precisa ter acesso fácil ao que
        entra e sai no aspecto financeiro da sua empresa. Com isso a SympleCont
        conta com o modelo mais simples de se controlar suas entradas e
        despesas."
        />
        <Detail
          icon={
            <BsGraphUp size={250} style={{ fill: '#019c2b', height: '65px' }} />
          }
          title="Relatórios"
          description="Com base em todos os dados fornecidos nos módulos anteriores a
        SympleCont gera dados analíticos que vão te axuliar em tomadas de
        decisões estratégicas para sua empresa."
        />
      </Flex>
    </Section>
  )
}

export default PlanDetails
