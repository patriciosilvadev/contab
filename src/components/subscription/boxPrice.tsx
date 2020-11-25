import React from 'react'
import { Box, Flex, Text, Tooltip, Icon, FlexProps } from '@chakra-ui/core'

import Divider from '../divider'
import ButtonOut from '../inputs/buttonOut'
import Button from '../inputs/button'

interface BoxPriceProps {
  first?: boolean
  last?: boolean
  title: string
  description: string
  oldPrice: string
  price: string
  priceDecimal: string
  details: {
    users: number
    countNfs: number
  }
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

  return (
    <Flex
      borderTopLeftRadius={first ? '20px' : ''}
      borderBottomLeftRadius={first ? '20px' : ''}
      borderTopRightRadius={last ? '20px' : ''}
      borderBottomRightRadius={last ? '20px' : ''}
      borderWidth={middle ? '1px' : '0'}
      borderColor={middle ? 'green.600' : ''}
      transform={middle ? 'scale(1.03)' : ''}
      boxShadow={boxShadow}
      direction="column"
      align="center"
      width="33.33%"
      padding="30px"
      backgroundColor="gray.100"
      {...style}
    >
      {middle && (
        <Text
          width="100%"
          position="absolute"
          top="-39px"
          left="0"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          padding="7px"
          backgroundColor="green.600"
          color="white"
          textAlign="center"
          textTransform="uppercase"
        >
          Mais popular
        </Text>
      )}

      <Text
        fontSize={24}
        fontWeight="medium"
        color="green.100"
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
        <PriceDetails value={props.details.users} text="usuário" />
        <PriceDetails
          value={props.details.countNfs}
          text="Notas entre NF-e, NFC-e"
        />

        {props.obs && (
          <Text
            alignSelf="start"
            marginTop="20px"
            fontSize={14}
            color="gray.600"
          >
            {props.obs}
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default BoxPrice
