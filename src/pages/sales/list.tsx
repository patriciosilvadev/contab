import React from 'react'
import List from '../../components/list'
import { useEntity } from '../../hooks/entityContext'

const FiscalList: React.FC = () => {
  const { type } = useEntity()

  /**
   * Actions
   */

  const batchDeleteSale = () => {
    console.log('bachDelete')
  }

  const deleteSale = () => {
    console.log('delete')
  }

  /**
   * Parameters
   */

  const actions = [{ label: 'Excluir', handle: batchDeleteSale }]

  const options = [{ value: 'Excluir', handle: deleteSale }]

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
