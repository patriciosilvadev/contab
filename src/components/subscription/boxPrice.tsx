import React from 'react'
import { Box, Flex, Text, Tooltip, Icon, FlexProps } from '@chakra-ui/core'

import Divider from '../divider'
import ButtonOut from '../inputs/buttonOut'
import Button from '../inputs/button'
import { parseCurrency } from '../../config/support'

interface DetailsPlan {
  users?: number
  countNfs?: number
  employees?: number
  employeeExtraPrice?: number
}

interface BoxPriceProps {
  first?: boolean
  last?: boolean
  title: string
  description: string
  oldPrice: string
  price: string
  priceDecimal: string
  details: DetailsPlan
  obs?: string
  buttonText?: string
  action?: () => void
  style?: FlexProps
}

const PriceDetails = props => (
  <Text fontSize={18}>
    <Text as="span" fontWeight="bold" color="green.300">
      {props.value}
    </Text>{' '}
    {props.text}
    {props.tooltip && (
      <Tooltip label="Somente para simples nacional." aria-label="">
        <Icon name="info" marginLeft="10px" verticalAlign="middle" />
      </Tooltip>
    )}
  </Text>
)

const BoxPrice: React.FC<BoxPriceProps> = props => {
  const { first, last, action, buttonText, style } = props
  const middle = !first && !last
  const ButtonForm = middle ? Button : ButtonOut
  let boxShadow = middle ? '0 0 7px 3px rgba(0,72,20,.15)' : ''

  if (first && last) {
    boxShadow = '-8px 9px 18px -2px rgba(0,72,20,.15)'
  }

  const borderWith = middle ? '1px' : '0'
  const borderColor = middle ? 'green.600' : ''
  const transform = middle ? 'scale(1.03)' : ''
  const marginTop = { base: middle ? '80px' : '40px', md: 0 }
  const borderFirst = { base: '20px', md: first ? '20px' : 0 }
  const borderLast = { base: '20px', md: last ? '20px' : 0 }

  return (
    <Flex
      align="center"
      direction="column"
      marginTop={marginTop}
      transform={transform}
      borderWidth={borderWith}
      borderColor={borderColor}
      backgroundColor="gray.100"
      boxShadow={{ md: boxShadow }}
      borderBottomLeftRadius={borderFirst}
      borderBottomRightRadius={borderLast}
      padding={{ base: '20px', lg: '30px' }}
      width={{ base: '100%', md: '33.33%' }}
      borderTopLeftRadius={!middle ? borderFirst : ''}
      borderTopRightRadius={!middle ? borderLast : ''}
      minHeight={{ base: 'auto', md: '700px', xl: '600px' }}
      {...style}
    >
      {middle && (
        <Text
          left="0"
          top="-39px"
          width="100%"
          padding="7px"
          color="white"
          textAlign="center"
          position="absolute"
          textTransform="uppercase"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          backgroundColor="green.600"
        >
          Mais popular
        </Text>
      )}

      <Text
        fontSize={24}
        color="green.100"
        textAlign="center"
        fontWeight="medium"
        textTransform="uppercase"
      >
        {props.title}
      </Text>
      <Text fontSize={14} textAlign="center">
        {props.description}
      </Text>

      <Divider />

      <Flex direction="column" align="center">
        <Text color="red.600" textDecoration="line-through">
          De: R${props.oldPrice}
        </Text>

        <Flex alignItems="baseline">
          <Text width="32px" color="gray.600" alignSelf="center">
            POR R$
          </Text>
          <Text fontSize={80} fontWeight="bold" color="green.300">
            {props.price}
          </Text>
          <Text fontWeight="bold" color="green.300">
            ,{props.priceDecimal}
          </Text>
          <Text fontSize={20} color="gray.600">
            /mês
          </Text>
        </Flex>

        <Text fontSize={14} color="gray.600">
          Cobrado mensalmente no cartão de crédito
        </Text>
      </Flex>

      {action && (
        <ButtonForm marginY="30px" width="100%" onClick={() => action()}>
          {buttonText || 'Assinar agora'}
        </ButtonForm>
      )}

      <Box alignSelf="start" marginTop={!action ? '20px' : ''}>
        {props.details.users && (
          <PriceDetails value={props.details.users} text="usuário" />
        )}
        {props.details.countNfs && (
          <PriceDetails
            value={props.details.countNfs}
            text="Notas entre NF-e, NFC-e"
          />
        )}

        {props.details.employees && (
          <PriceDetails
            value={props.details.employees}
            text={props.details.employees > 1 ? 'funcionários' : 'funcionário'}
          />
        )}
        {props.details.employeeExtraPrice && (
          <PriceDetails
            value={parseCurrency(props.details.employeeExtraPrice)}
            text="por funcionário adicional"
          />
        )}

        {props.obs && (
          <Text
            fontSize={14}
            marginTop="20px"
            color="gray.600"
            alignSelf="start"
          >
            {props.obs}
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default BoxPrice
