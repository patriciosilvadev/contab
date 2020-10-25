import React from 'react'
import List from '../list'
import { useToast } from '@chakra-ui/core'
import { usePerson } from '../../hooks/personContext'
import { Person } from '../../config/interfaces/person'

const PersonList: React.FC = () => {
  const toast = useToast()
  const {
    type,
    service,
    setEditPerson,
    onEditOpen,
    updateList,
    setNumberOfSelected,
    updateListItem,
    countActive,
    setCountActive
  } = usePerson()

  /**
   * Actions
   */

  const batchToggleActive = async (persons: Person[]) => {
    await persons.forEach(async person => {
      if (person.selected) {
        await service.toggleActive(person)
      }
    })

    updateList()
    setNumberOfSelected(0)
  }

  const edit = (person: Person) => {
    setEditPerson(person)
    onEditOpen()
  }

  const toggleActive = async (person: Person) => {
    const { status } = await service.toggleActive(person)

    if (status === 200) {
      person.active = !person.active
      updateListItem(person)
      setCountActive(countActive + (person.active ? 1 : -1))
    } else {
      toast({
        title: `${person.active ? 'Inativar' : 'Ativar'} ${type}`,
        description:
          'Ocorreu algum erro ao executar esta opção. Por favor, tente novamente.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  /**
   * Properties
   */

  const actions = [{ label: 'Ativar/Inativar', handle: batchToggleActive }]

  const headers = [
    { field: 'name', displayName: 'Nome' },
    { field: 'email', displayName: 'Email' },
    { field: 'cpf', displayName: 'CPF/CNPJ' },
    { field: 'phone', displayName: 'Telefone/Celular' },
    { field: 'active', displayName: 'Ativo' }
  ]

  const options = [
    { value: 'Editar', handle: edit },
    { value: 'active', handle: toggleActive }
  ]

  /**
   * Elements
   */

  return (
    <List
      entityName={type}
      headers={headers}
      actions={actions}
      context={usePerson}
      itemOptions={options}
    />
  )
}

export default PersonList
