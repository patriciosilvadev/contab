import React, { useEffect, useState } from 'react'

import Drawer from '../drawer'
import EditClientForm from './editClientForm'
import { useClients } from '../../hooks/clientContext'
import { useToast } from '@chakra-ui/core'
import { Client, ClientValidation } from '../../config/interfaces/clients'
import clientService from '../../services/clientService'

interface EditClientModalProps {
  isOpen: boolean
}

const EditClientModal: React.FC<EditClientModalProps> = props => {
  const { isOpen } = props
  const toast = useToast()
  const { editClient, updateList, onEditClose } = useClients()

  const [loading, setLoading] = useState<boolean>(false)
  const [validation, setValidation] = useState<ClientValidation>({
    nameIsValid: true
  })

  useEffect(() => {
    setValidation({ ...validation, inscEstadualIsValid: true })
  }, [editClient?.indInscEstadual])

  async function submit() {
    setLoading(true)

    const { isValid, newValidation } = clientService.isValidatedForm(editClient)
    setValidation(newValidation)

    if (isValid) {
      const { data, status } = await clientService.update(editClient)
      const isError = status !== 200

      console.log(status, data)

      toast({
        title: 'Editar cliente',
        description: isError
          ? 'Ocorreu um erro ao salvar os dados do cliente.'
          : 'Cliente salvo com sucesso.',
        status: isError ? 'error' : 'success',
        duration: 9000,
        isClosable: true
      })

      updateList()
      onEditClose()
    }

    setLoading(false)
  }

  return (
    <Drawer
      size="xl"
      title="Editar Cliente"
      isOpen={isOpen}
      buttonText="Salvar"
      onClose={onEditClose}
      submitForm={submit}
    >
      <EditClientForm loading={loading} validation={validation} />
    </Drawer>
  )
}

export default EditClientModal
