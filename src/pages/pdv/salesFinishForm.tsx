import { Flex } from '@chakra-ui/core'
import React from 'react'
import Input from '../../components/inputs/input'
import Select from '../../components/inputs/select/select'
import { useSales } from '../../hooks/salesContext'

const SalesFinishForm: React.FC = () => {
  const {
    payType,
    payCard,
    setPayCard,
    setPayType,
    payCondition,
    setPayCondition
  } = useSales()

  const discountTypes = [
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'CHECK', label: 'Cheque' },
    { value: 'CREDIT_CARD', label: 'Cartão crédito' },
    { value: 'DEBIT_CARD', label: 'Cartão débito' },
    { value: 'STORE_CREDIT', label: 'Crédito da loja' },
    { value: 'FOOD_VOUCHER', label: 'Vale alimentação' },
    { value: 'MEAL_VOUCHER', label: 'Vale refeição' },
    { value: 'GIFT_VOUCHER', label: 'Vale presente' },
    { value: 'FUEL_VOUCHER', label: 'Vale combustível' },
    { value: 'OTHER', label: 'Outros' }
  ]

  const credentials = [
    { value: 'INTER', label: 'Banco Inter' },
    { value: 'CIELO', label: 'Cielo' },
    { value: 'GETNET', label: 'GetNet' },
    { value: 'LISTO', label: 'Listo' },
    { value: 'PGSEGURO', label: 'PagSeguro' },
    { value: 'REDECARD', label: 'Redecard' },
    { value: 'STONE', label: 'Stone' }
  ]

  const bands = [
    { value: 'MASTER', label: 'Mastercard' },
    { value: 'VISA', label: 'Visa' },
    { value: 'SOROCRED', label: 'Sorocred' },
    { value: 'AMERICAN', label: 'American Express' },
    { value: 'OTHER', label: 'Outros' }
  ]

  const getConditionOptions = () => {
    const condistions = [{ value: 'IN_CASH', label: 'À vista' }]

    for (let index = 0; index < 48; index++) {
      const installment = index + 1
      condistions.push({
        value: `IN_${installment}x`,
        label: `${installment}x`
      })
    }

    return condistions
  }

  return (
    <Flex direction="column">
      <Select
        flex={1}
        marginTop="10px"
        value={payType}
        options={discountTypes}
        label="Forma de pagamento"
        setValue={option => setPayType(option.value)}
      />

      <Select
        flex={1}
        marginTop="10px"
        value={payCondition}
        options={getConditionOptions()}
        label="Condição de pagamento"
        setValue={option => setPayCondition(option.value)}
      />

      {['CREDIT_CARD', 'DEBIT_CARD'].includes(payType) && (
        <>
          <Select
            flex={1}
            marginTop="10px"
            value={payCard.credential}
            options={credentials}
            label="Credenciadora"
            setValue={option =>
              setPayCard({ ...payCard, credential: option.value })
            }
          />

          <Select
            flex={1}
            marginTop="10px"
            value={payCard.band}
            options={bands}
            label="Bandeira do cartão"
            setValue={option => setPayCard({ ...payCard, band: option.value })}
          />

          <Input
            label="Código da transação"
            placeholder="Digite o código da transação (NSU)"
            value={payCard.transaction}
            onChange={e =>
              setPayCard({ ...payCard, transaction: e.target.value })
            }
          />
        </>
      )}
    </Flex>
  )
}

export default SalesFinishForm
