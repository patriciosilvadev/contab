import React, { useEffect, useState } from 'react'

import Drawer from '../drawer'
import EditPersonForm from './editPersonForm'
import { usePerson } from '../../hooks/personContext'
import { useToast } from '@chakra-ui/core'
import { PersonValidation } from '../../config/interfaces/person'

interface EditPersonModalProps {
  isOpen: boolean
}

const EditPersonModal: React.FC<EditPersonModalProps> = props => {
  const { isOpen } = props
  const toast = useToast()
  const { type, service, editPerson, updateList, onEditClose } = usePerson()

  const [loading, setLoading] = useState<boolean>(false)
  const [validation, setValidation] = useState<PersonValidation>({
    nameIsValid: true
  })

  useEffect(() => {
    setValidation({ ...validation, inscEstadualIsValid: true })
  }, [editPerson?.indInscEstadual])

  async function submit() {
    setLoading(true)

    const { isValid, newValidation } = service.isValidatedForm(editPerson)
    setValidation(newValidation)

    if (isValid) {
      const { status } = await service.update(editPerson)
      const isError = status !== 200

      toast({
        title: `Editar ${type}`,
        description: isError
          ? `Ocorreu um erro ao salvar os dados do ${type.toLowerCase()}.`
          : `${type} salvo com sucesso.`,
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
      title={`Editar ${type}`}
      isOpen={isOpen}
      buttonText="Salvar"
      onClose={onEditClose}
      submitForm={submit}
    >
      <EditPersonForm loading={loading} validation={validation} />
    </Drawer>
  )
}

export default EditPersonModal
