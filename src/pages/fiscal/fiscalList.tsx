import React from 'react'
import List from '../../components/list'
import { useToast } from '@chakra-ui/core'
import { useFiscal } from '../../hooks/fiscalContext'

const FiscalList: React.FC = () => {
  const toast = useToast()

  /**
   * Actions
   */

  /**
   * Properties
   */

  const options = [
    { value: 'Baixar DANFE (PDF)', handle: () => console.log('pdf') },
    { value: 'Baixar XML', handle: () => console.log('xml') },
    { value: 'Cancelar nota', handle: () => console.log('cancelar') }
  ]

  const headers = [
    { field: 'serie', displayName: 'Série - NF' },
    { field: 'createdAt', type: 'date', displayName: 'Emissão' },
    { fieldObject: ['sales', 'client', 'name'], displayName: 'Cliente' },
    { field: 'status', displayName: 'Status' },
    {
      fieldObject: ['sales', 'valor'],
      type: 'currency',
      displayName: 'Valor (R$)'
    }
  ]

  /**
   * Elements
   */

  return (
    <List
      entityName="NF"
      headers={headers}
      context={useFiscal}
      itemOptions={options}
    />
  )
}

export default FiscalList
