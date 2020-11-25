import React from 'react'
import List from '../../components/list'
import { useToast } from '@chakra-ui/core'
import { useEntity } from '../../hooks/entityContext'
import salesService from '../../services/salesService'

const FiscalList: React.FC = () => {
  const toast = useToast()
  const {
    type,
    list,
    updateList,
    setNumberOfSelected,
    setEditEntity,
    onEditOpen
  } = useEntity()

  /**
   * Actions
   */

  const batchDeleteSale = async () => {
    const selectedItems = list
      .filter(item => item.selected)
      .map(item => item.id)

    const { data } = await salesService.batchDelete(selectedItems)

    if (data.deleted) {
      toast({
        title: 'Excluir Vendas',
        description: 'Vendas excluídas com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      updateList()
      setNumberOfSelected(0)
    } else if (data.error) {
      toast({
        title: 'Excluir Vendas',
        description: data.error,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const deleteSale = async sale => {
    const { data } = await salesService.delete(sale.id)

    if (data.deleted) {
      toast({
        title: 'Excluir Venda',
        description: 'Venda excluída com sucesso!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })

      updateList()
    } else if (data.error) {
      toast({
        title: 'Excluir Venda',
        description: data.error,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const setSaleDetails = sale => {
    setEditEntity(sale)
    onEditOpen()
  }

  /**
   * Parameters
   */

  const actions = [{ label: 'Excluir', handle: batchDeleteSale }]

  const options = [
    { value: 'Detalhes', handle: setSaleDetails },
    { value: 'Excluir', handle: deleteSale, color: 'red.400' }
  ]

  const headers = [
    { field: 'id', displayName: 'Venda' },
    { field: 'createdAt', type: 'date', displayName: 'Data de Venda' },
    { fieldObject: ['client', 'name'], displayName: 'Cliente' },
    { fieldObject: ['nf', 'serie'], displayName: 'Nota Fiscal' },
    { field: 'valor', type: 'currency', displayName: 'Valor (R$)' }
  ]

  /**
   * Elements
   */

  return (
    <List
      entityName={type}
      headers={headers}
      context={useEntity}
      actions={actions}
      itemOptions={options}
    />
  )
}

export default FiscalList
