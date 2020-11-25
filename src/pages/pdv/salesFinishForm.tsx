import React from 'react'
import constants from '../../config/constants'
import { Flex, Checkbox } from '@chakra-ui/core'
import Input from '../../components/inputs/input'
import InputLabel from '../../components/labelIcon'
import { useSales } from '../../hooks/salesContext'
import Select from '../../components/inputs/select/select'

const SalesFinishForm: React.FC = () => {
  const {
    payType,
    payCard,
    printNf,
    setPrintNf,
    setPayCard,
    setPayType,
    payCondition,
    setPayCondition
  } = useSales()

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
        value={payType}
        marginTop="10px"
        label="Forma de pagamento"
        options={constants.PAY_TYPES}
        setValue={option => setPayType(option.value)}
      />

      <Select
        flex={1}
        marginTop="10px"
        value={payCondition}
        label="Condição de pagamento"
        options={getConditionOptions()}
        setValue={option => setPayCondition(option.value)}
      />

      {['CREDIT_CARD', 'DEBIT_CARD'].includes(payType) && (
        <>
          <Select
            flex={1}
            marginTop="10px"
            label="Credenciadora"
            value={payCard.credential}
            options={constants.CREDENTIALS}
            setValue={option =>
              setPayCard({ ...payCard, credential: option.value })
            }
          />

          <Select
            flex={1}
            marginTop="10px"
            value={payCard.band}
            options={constants.BANDS}
            label="Bandeira do cartão"
            setValue={option => setPayCard({ ...payCard, band: option.value })}
          />

          <InputLabel
            label="Código da transação"
            tooltip="O código da transação (NSU) pode ser encontrado
                no comprovante emitido pela máquina de sua credenciadora"
          >
            <Input
              placeholder="Digite o código da transação (NSU)"
              value={payCard.transaction}
              onChange={e =>
                setPayCard({ ...payCard, transaction: e.target.value })
              }
            />
          </InputLabel>
        </>
      )}

      <Checkbox
        isChecked={printNf}
        variantColor="green"
        onChange={e => setPrintNf(e.target.checked)}
      >
        Emitir Cupom Fiscal (NFC-e)
      </Checkbox>
    </Flex>
  )
}

export default SalesFinishForm
