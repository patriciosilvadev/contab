import React from 'react'
import Container from '../container'
import Button from '../../inputs/button'
import ButtonOut from '../../inputs/buttonOut'
import constants from '../../../config/constants'
import HomeImage from '../../../assets/home1.png'
import Typing, { Backspace } from 'react-typing-animation'
import { Flex, PseudoBox, Text, Image, Icon } from '@chakra-ui/core'
import TextCheck from '../textCheck'

const Presentantion: React.FC = () => {
  const redirectContab = () => {
    window.open(constants.URL_WHATSAPP_CONTAB)
  }

  const redirectNewBusiness = () => {
    window.open(constants.URL_WHATSAPP_NEW_BUSINESS)
  }

  return (
    <Container direction={['column', 'column', 'row', 'row']}>
      <Flex direction="column" flex={1}>
        <Text fontSize={28} fontWeight={100}>
          Contabilidade de forma mais
        </Text>
        <PseudoBox
          height={36}
          fontSize={36}
          fontWeight="bold"
          color="green.100"
        >
          <Typing loop>
            <Text as="span">SYMPLES</Text>
            <Backspace count={8} delay={2000} />
            <Text as="span">SEGURA</Text>
            <Backspace count={7} delay={2000} />
            <Text as="span">ECONÔMICA</Text>
            <Backspace count={10} delay={2000} />
          </Typing>
        </PseudoBox>
        <Flex direction="column" marginY="50px">
          <TextCheck marginBottom="20px">
            Tenha sua contabilidade 100% online e acesso a um serviço completo e
            digital.
          </TextCheck>
          <TextCheck>Economia real: planos a partir de R$89/mês.</TextCheck>
        </Flex>
        <Flex>
          <Button
            flex={1}
            height="50px"
            marginRight="10px"
            onClick={redirectContab}
          >
            Trocar de Contador
          </Button>
          <ButtonOut
            flex={1}
            height="50px"
            marginLeft="10px"
            onClick={redirectNewBusiness}
          >
            Abrir Empresa
          </ButtonOut>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        flex={2}
        alignItems="center"
        justifyContent="center"
      >
        <Image src={HomeImage} size={500} />
      </Flex>
    </Container>
  )
}

export default Presentantion
