import React, { useState } from 'react'

import Input from '../inputs/input'
import Button from '../inputs/button'
import { Flex, FormLabel, Switch, useToast } from '@chakra-ui/core'
import { Client, ClientValidation } from '../../config/interfaces/clients'

import clientService from '../../services/clientService'
import { useClients } from '../../hooks/clientContext'

const CreateAccountForm: React.FC = () => {
  const { onNewClose, updateList } = useClients()
  const toast = useToast()

  const [loading, setLoading] = useState<boolean>(false)
  const [client, setClient] = useState<Client>({
    type: 'PF',
    name: ''
  } as Client)

  const [validation, setValidation] = useState<ClientValidation>({
    nameIsValid: true
  })

  async function submit() {
    setLoading(true)

    const { isValid, newValidation } = clientService.isValidatedForm(client)
    setValidation(newValidation)

    if (isValid) {
      const { data, status } = await clientService.create(client)
      const isError = status !== 200

      console.log(status, data)

      toast({
        title: 'Criar cliente',
        description: isError
          ? 'Ocorreu um erro ao criar o cliente.'
          : 'Cliente criado com sucesso.',
        status: isError ? 'error' : 'success',
        duration: 9000,
        isClosable: true
      })

      updateList()
      onNewClose()
    }

    setLoading(false)
  }

  return (
    <>
      <Input
        label="Nome"
        value={client.name}
        type="text"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.nameIsValid}
        onChange={e => setClient({ ...client, name: e.target.value })}
        invalidMessage="Você não informou o nome do cliente"
      />
      <Input
        marginBottom="15px"
        label="Email"
        value={client.email}
        type="email"
        isDisabled={loading}
        onChange={e => setClient({ ...client, email: e.target.value })}
      />

      <Flex justify="start" align="center" marginBottom="10px">
        <FormLabel htmlFor="clientType">Pessoa jurídica?</FormLabel>
        <Switch
          id="clientType"
          color="green"
          isChecked={client.type === 'PJ'}
          onChange={e =>
            setClient({
              ...client,
              type: e.target.checked ? 'PJ' : 'PF',
              cpf: '',
              cnpj: ''
            })
          }
        />
      </Flex>

      {client.type === 'PJ' && (
        <Input
          marginBottom="15px"
          label="CNPJ"
          value={client.cnpj}
          type="text"
          isDisabled={loading}
          onChange={e => setClient({ ...client, cnpj: e.target.value })}
        />
      )}

      {client.type === 'PF' && (
        <Input
          marginBottom="15px"
          label="CPF"
          value={client.cpf}
          type="text"
          isDisabled={loading}
          onChange={e => setClient({ ...client, cpf: e.target.value })}
        />
      )}

      <Input
        marginBottom="15px"
        label="Telefone"
        value={client.phone}
        type="text"
        isDisabled={loading}
        onChange={e => setClient({ ...client, phone: e.target.value })}
      />
      <Input
        marginBottom="15px"
        label="Celular"
        value={client.celphone}
        type="text"
        isDisabled={loading}
        onChange={e => setClient({ ...client, celphone: e.target.value })}
      />

      <Button width="100%" loading={loading} onClick={submit}>
        Criar Cliente
      </Button>
    </>
  )
}

export default CreateAccountForm
