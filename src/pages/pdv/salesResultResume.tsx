import React from 'react'
import { useSales } from '../../hooks/salesContext'
import { parseCurrency } from '../../config/support'
import { Flex, PseudoBoxProps, Text } from '@chakra-ui/core'

interface SalesResultResumeProps {
  startAligned?: boolean
}

const SalesResultResume: React.FC<SalesResultResumeProps> = props => {
  const { startAligned } = props
  const { total, discount, discountValor, discountType } = useSales()

  const flexText = startAligned ? null : 1

  /**
   * Elements
   */

  const TextLabel: React.FC<PseudoBoxProps> = ({ fontSize, children }) => (
    <Text
      fontSize={fontSize || 12}
      display="flex"
      flex={flexText}
      color="gray.400"
      marginRight="20px"
      width={startAligned ? '50px' : null}
      justifyContent={startAligned ? 'flex-start' : 'flex-end'}
    >
      {children}
    </Text>
  )

  /**
   * Component
   */

  return (
    <>
      {discount > 0 && (
        <>
          <Flex alignItems="center" marginBottom="10px">
            <TextLabel>Subtotal</TextLabel>
            <Text width="165px" display="flex" fontSize={16} color="blue.400">
              {parseCurrency(total)}
            </Text>
          </Flex>
          <Flex alignItems="center" marginBottom="10px">
            <TextLabel>Desconto</TextLabel>
            <Text width="165px" display="flex" fontSize={16} color="red.400">
              {discountType === 'R$'
                ? parseCurrency(discount)
                : parseCurrency(total * (discount / 100))}
            </Text>
          </Flex>
        </>
      )}
      <Flex alignItems="center" marginBottom="10px">
        <TextLabel fontSize={16}>Total</TextLabel>
        <Text
          width="165px"
          display="flex"
          fontSize={24}
          color={total >= 0 ? 'green.300' : 'red.400'}
        >
          {parseCurrency(discount ? total - discountValor : total)}
        </Text>
      </Flex>
    </>
  )
}

export default SalesResultResume
