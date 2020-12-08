import React from 'react'
import Container from '../container'
import TextCheck from '../textCheck'
import LinksToAquire from '../linksToAquire'
import EconomyImage from '../../../assets/economy.png'
import LogoGreenSb from '../../../assets/logo-green-sb.png'
import { Flex, Text, Image, Heading } from '@chakra-ui/core'

const HowWorks: React.FC = () => {
  return (
    <Container
      id="howworks"
      overflow="hidden"
      position="relative"
      backgroundColor="gray.100"
    >
      <Image
        size={300}
        bottom="50px"
        right="-150px"
        src={LogoGreenSb}
        position="absolute"
        display={{ base: 'none', md: 'block' }}
      />
      <Image
        size={150}
        top="50px"
        left="-75px"
        src={LogoGreenSb}
        position="absolute"
        display={{ base: 'none', md: 'block' }}
      />

      <Heading color="gray.600" textAlign="center">
        Como funciona sua contabilidade{' '}
        <Text as="b" color="green.100">
          SYMPLES
        </Text>
        ?
      </Heading>
      <Text maxWidth={750} textAlign="center" color="gray.400">
        Contabilidade de forma prática e acessível para todo empreendedor, tudo
        isso de forma digital. Mantenha o foco e seus recursos voltados a sua
        operação.
      </Text>

      <Flex
        marginTop="50px"
        borderRadius="20px"
        backgroundColor="white"
        width={{ base: '95%', md: 850 }}
        padding={{ base: '20px', md: '40px' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          flex={1}
          direction="column"
          alignItems="center"
          borderColor="gray.100"
          borderRightWidth={{ base: 0, md: 1 }}
          borderBottomWidth={{ base: 1, md: 0 }}
          marginBottom={{ base: '20px', md: '0' }}
          paddingBottom={{ base: '20px', md: '0' }}
        >
          <Text fontSize={20} textTransform="uppercase">
            O que{' '}
            <Text as="b" color="green.300">
              você
            </Text>{' '}
            vai fazer
          </Text>

          <Flex
            marginY="20px"
            direction="column"
            alignItems="flex-start"
            paddingX={{ base: 0, md: '30px' }}
          >
            <TextCheck marginBottom="20px">
              Emitir as notas fiscais e importar seu extrato mensal na nossa
              plataforma.
            </TextCheck>
            <TextCheck>
              Resolver as suas dúvidas com nosso atendimento.
            </TextCheck>
          </Flex>

          <Image src={EconomyImage} size={150} />

          <Text
            width="200px"
            fontSize={20}
            marginTop="20px"
            textAlign="center"
            textTransform="uppercase"
          >
            Economize mais de{' '}
            <Text
              as="b"
              color="white"
              paddingX="5px"
              borderRadius="2px"
              backgroundColor="green.100"
            >
              80%
            </Text>{' '}
            por mês
          </Text>
        </Flex>

        <Flex flex={1} direction="column" alignItems="center">
          <Text fontSize={20} textTransform="uppercase">
            O que{' '}
            <Text as="b" color="green.300">
              nós
            </Text>{' '}
            vamos fazer
          </Text>

          <Flex
            marginY="20px"
            direction="column"
            alignItems="flex-start"
            paddingX={{ base: 0, md: '30px' }}
          >
            <TextCheck marginBottom="20px">
              Calculamos as guias de impostos, folha de pagamento e pró-labore.
            </TextCheck>
            <TextCheck marginBottom="20px">
              Mantemos a sua empresa em dia com todas as obrigações do governo -
              IRPJ incluso.
            </TextCheck>
            <TextCheck marginBottom="20px">
              Fazemos e assinamos relatórios contábeis como balanço, DRE e
              outros para você ficar sempre tranquilo.
            </TextCheck>
            <TextCheck marginBottom="20px">
              Atendimento rápido por diversos canais (telefone, whatsapp, chat e
              email).
            </TextCheck>
            <TextCheck>E a sua contabilidade, completa.</TextCheck>
          </Flex>
        </Flex>
      </Flex>

      <Text
        fontSize={12}
        marginTop="10px"
        color="green.300"
        marginBottom="50px"
      >
        * Comparação com o preço médio cobrado pela contabilidade segundo
        calculadora de comparação de preço da SympleCont.
      </Text>

      <LinksToAquire />
    </Container>
  )
}

export default HowWorks
