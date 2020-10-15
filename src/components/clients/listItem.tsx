import React from 'react'

import { useClients } from '../../hooks/clientContext'
import { Badge, Checkbox, useToast } from '@chakra-ui/core'
import { Client, ClientRowProps } from '../../config/interfaces/clients'

import CustomMenuButton from '../inputs/menuButton'
import clientService from '../../services/clientService'

const ClientListItem: React.FC<ClientRowProps> = props => {
  const padding = 10
  const toast = useToast()
  const {
    client,
    numberOfSelected,
    setNumberOfSelected,
    filteredClients,
    setFilteredClients
  } = props
  const { setEditClient, onEditOpen, updateList } = useClients()

  /**
   * Actions
   */

  const setSelected = (client: Client, selected: boolean) => {
    let countSelected = numberOfSelected
    const updatedClients = filteredClients.map(clientFound => {
      if (clientFound.name === client.name) {
        clientFound.selected = selected
        countSelected += selected ? 1 : -1
      }

      return clientFound
    })

    setFilteredClients(updatedClients)
    setNumberOfSelected(countSelected)
  }

  const edit = () => {
    setEditClient(client)
    onEditOpen()
  }

  const toggleActive = async () => {
    const { status } = await clientService.toggleActive(client)

    if (status === 200) {
      updateList()
    } else {
      toast({
        title: `${client.active ? 'Inativar' : 'Ativar'} cliente`,
        description:
          'Ocorreu algum erro ao executar esta opção. Por favor, tente novamente.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const getOptions = () => {
    return [
      {
        value: 'Editar',
        handle: () => edit()
      },
      {
        value: client.active ? 'Inativar' : 'Ativar',
        handle: () => toggleActive()
      }
    ]
  }

  /**
   * Elements
   */

  const TD: React.FC<any> = props => (
    <td style={{ padding: padding, fontSize: 14 }} {...props}>
      {props.children}
    </td>
  )

  return (
    <tr style={{ borderBottomWidth: 1 }}>
      <TD>
        <Checkbox
          size="lg"
          isChecked={client.selected}
          onChange={e => setSelected(client, e.target.checked)}
        />
      </TD>
      <TD>{client.name}</TD>
      <TD>{client.cpf || client.cnpj || '-'}</TD>
      <TD>{client.email || '-'}</TD>
      <TD>{client.phone || client.celphone || '-'}</TD>
      <TD>
        <Badge variantColor={client.active ? 'green' : 'yellow'}>
          {client.active ? 'Ativo' : 'Inativo'}
        </Badge>
      </TD>
      <TD width="100px">
        <CustomMenuButton
          options={getOptions()}
          borderColor="gray.300"
          color="gray.600"
          height="35px"
          fontSize={14}
        >
          Ações
        </CustomMenuButton>
      </TD>
    </tr>
  )
}

export default ClientListItem
