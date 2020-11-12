import { Flex, Text, useDisclosure } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import { useSales } from '../../hooks/salesContext'
import Button from '../../components/inputs/button'
import { parseCurrency } from '../../config/support'
import Select from '../../components/inputs/select/select'
import NumberInput from '../../components/inputs/numberInput'
import SalesFinishModal from './salesFinishModal'
import SalesResultResume from './salesResultResume'

const SalesResult: React.FC = () => {
  const {
    total,
    received,
    discount,
    setReceived,
    setDiscount,
    discountType,
    salesProducts,
    discountValor,
    setDiscountType
  } = useSales()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const restValue = !discount
    ? received - total
    : received - (total - discountValor)
  const discountTypes = [
    { value: 'R$', label: 'R$' },
    { value: '%', label: '%' }
  ]

  /**
   * Component
   */

  return (
    <Flex height="165px" marginLeft="20px" alignItems="center">
      <Flex flex={1} direction="column">
        <Flex alignItems="center">
          <Text width="100px" color="gray.400">
            Desconto
          </Text>
          <Select
            margin={0}
            width="80px"
            height="35px"
            value={discountType}
            options={discountTypes}
            setValue={option => setDiscountType(option.value)}
          />
          <NumberInput
            hideSteps
            margin={0}
            width="80px"
            height="38px"
            precision={2}
            marginLeft="10px"
            value={discount}
            setValue={value => setDiscount(value)}
          />
        </Flex>
        <Flex alignItems="center" marginTop="20px">
          <Text width="100px" color="gray.400">
            Recebido
          </Text>
          <NumberInput
            hideSteps
            margin={0}
            height="38px"
            width="170px"
            precision={2}
            value={received}
            setValue={value => setReceived(value)}
          />
        </Flex>
        <Flex alignItems="center" marginTop="20px">
          <Text width="100px" color="gray.400">
            Troco
          </Text>
          <Text width="170px" color={restValue >= 0 ? 'blue.500' : 'red.400'}>
            {parseCurrency(restValue)}
          </Text>
        </Flex>
      </Flex>

      <Flex
        flex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <SalesResultResume />
        <Button
          width="240px"
          onClick={onOpen}
          isDisabled={salesProducts.length === 0}
        >
          Receber
        </Button>
      </Flex>

      <SalesFinishModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default SalesResult
