import { Text, useToast } from '@chakra-ui/core'
import React, { useState } from 'react'
import Drawer from '../../components/drawer'
import { useSales } from '../../hooks/salesContext'
import salesService from '../../services/salesService'
import SalesFinishForm from './salesFinishForm'
import SalesResultResume from './salesResultResume'

interface SalesFinishModalProps {
  isOpen: boolean
  onClose(): void
}

const SalesFinishModal: React.FC<SalesFinishModalProps> = props => {
  const {
    total,
    client,
    payType,
    payCard,
    payCondition,
    salesProducts,
    discountValor,
    setLoading,
    resetSales
  } = useSales()
  const toast = useToast()
  const { isOpen, onClose } = props

  /**
   * Actions
   */

  async function submit() {
    setLoading(true)

    const payload = {
      clientId: client?.id,
      discount: discountValor,
      products: salesProducts,
      valor: total - discountValor,
      payForm: payType,
      payCondition: payCondition,
      payCardAcc: payType !== 'CASH' ? payCard.credential : null,
      payCardBand: payType !== 'CASH' ? payCard.band : null,
      payCardTransaction: payType !== 'CASH' ? payCard.transaction : null
    }

    const { data } = await salesService.create(payload)

    console.log(data)

    toast({
      status: data.error ? 'error' : 'success',
      title: 'Frente de Caixa',
      description: data.error || 'Venda realizada com sucesso!',
      duration: 9000,
      isClosable: true
    })

    if (!data.error) {
      onClose()
      resetSales()
    }

    setLoading(false)
  }

  /**
   * Component
   */

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      submitForm={submit}
      title="Finalizar Compra"
      buttonText="Finalizar Compra"
    >
      <Text marginTop="10px" fontSize={14} color="gray.600">
        Resumo
      </Text>
      <SalesResultResume startAligned />
      <SalesFinishForm />
    </Drawer>
  )
}

export default SalesFinishModal
