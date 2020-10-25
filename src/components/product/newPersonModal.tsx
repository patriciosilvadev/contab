import React, { useState } from 'react'

import { useToast } from '@chakra-ui/core'
import NewPersonForm from './newPersonForm'
import { usePerson } from '../../hooks/personContext'
import Drawer from '../drawer'
import { Person, PersonValidation } from '../../config/interfaces/person'

interface NewPersonModalProps {
  isOpen: boolean
}

const NewPersonModal: React.FC<NewPersonModalProps> = props => {
  const { isOpen } = props
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { type, onNewClose, updateList, service } = usePerson()

  const [person, setPerson] = useState<Person>({
    type: 'PF',
    name: ''
  } as Person)

  const [validation, setValidation] = useState<PersonValidation>({
    nameIsValid: true
  })

  async function submit() {
    setLoading(true)

    const { isValid, newValidation } = service.isValidatedForm(person)
    setValidation(newValidation)

    if (isValid) {
      const { status } = await service.create(person)
      const isError = status !== 200

      toast({
        title: `Criar ${type}`,
        description: isError
          ? `Ocorreu um erro ao criar o ${type.toLowerCase()}.`
          : `${type} criado com sucesso.`,
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
    <Drawer
      size="sm"
      title={`Novo ${type}`}
      isOpen={isOpen}
      buttonText="Salvar"
      onClose={onNewClose}
      submitForm={submit}
    >
      <NewPersonForm
        person={person}
        loading={loading}
        setPerson={setPerson}
        validation={validation}
      />
    </Drawer>
  )
}

export default NewPersonModal
