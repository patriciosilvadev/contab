import React from 'react'
import Container from '../container'
import TextCheck from '../textCheck'
import Link from '../../inputs/link'
import Button from '../../inputs/button'
import constants from '../../../config/constants'
import { BiRightArrowAlt } from 'react-icons/bi'
import EconomyImage from '../../../assets/economy.png'
import {
  Flex,
  Text,
  Image,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  PseudoBox,
  Avatar
} from '@chakra-ui/core'
import Steps from '../../steps'
import LinksToAquire from '../linksToAquire'

const StepsToAquire: React.FC = () => {
  const redirectContab = () => {
    window.open(constants.URL_WHATSAPP_CONTAB)
  }

  const redirectNewBusiness = () => {
    window.open(constants.URL_WHATSAPP_NEW_BUSINESS)
  }

  return (
    <Container>
      <Tabs
        isFitted
        variant="soft-rounded"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TabList
          width={[750]}
          borderRadius="20px"
          textTransform="uppercase"
          backgroundColor="gray.100"
        >
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'white', bg: 'green.100' }}
          >
            Trocar de Contador
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'white', bg: 'green.100' }}
          >
            Abrir Empresa
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            display="flex"
            padding="40px"
            alignItems="center"
            flexDirection="column"
          >
            <Heading color="gray.600">
              Trocar de contador é{' '}
              <Text as="b" color="green.100" textTransform="uppercase">
                symples
              </Text>
            </Heading>
            <Text color="gray.400" marginBottom="50px">
              Você pode migrar para nosso escritório de contabilidade online de
              graça em qualquer época do ano.
            </Text>

            <Steps
              steps={[
                'Inicie o cadastro e confira se podemos te atender.',
                'Conclua o cadastro, pague a 1ª mensalidade e deixe tudo com a gente.',
                'Nós solicitamos a sua documentação contábil junto ao seu contador anterior ou você providencia os documentos.',
                'Pronto! Sua empresa sempre em dia e com uma contabilidade completa.'
              ]}
            />
          </TabPanel>

          <TabPanel
            display="flex"
            padding="40px"
            alignItems="center"
            flexDirection="column"
          >
            <Heading color="gray.600">
              Seu CNPJ{' '}
              <Text as="b" color="green.100" textTransform="uppercase">
                garantido
              </Text>
            </Heading>
            <Text color="gray.400" marginBottom="50px">
              Contrate o nosso plano anual de contabilidade e a sua abertura de
              empresa é grátis!
            </Text>

            <Steps
              steps={[
                'Você contrata o plano anual de contabilidade.',
                'Ganha a abertura da sua empresa.',
                'E paga apenas os impostos obrigatórios de abertura!'
              ]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <LinksToAquire />
    </Container>
  )
}

export default StepsToAquire
