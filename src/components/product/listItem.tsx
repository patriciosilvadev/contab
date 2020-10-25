import React from 'react'

import { usePerson } from '../../hooks/personContext'
import { Badge, Checkbox, useToast } from '@chakra-ui/core'
import { Person, PersonRowProps } from '../../config/interfaces/person'

import CustomMenuButton from '../inputs/menuButton'

const PersonListItem: React.FC<PersonRowProps> = props => {
  const padding = 10
  const toast = useToast()
  const {
    person,
    numberOfSelected,
    setNumberOfSelected,
    filteredPerson,
    setFilteredPerson
  } = props
  const { type, service, setEditPerson, onEditOpen, updateList } = usePerson()

  /**
   * Actions
   */

  const setSelected = (person: Person, selected: boolean) => {
    let countSelected = numberOfSelected
    const updatedPerson = filteredPerson.map(personFound => {
      if (personFound.name === person.name) {
        personFound.selected = selected
        countSelected += selected ? 1 : -1
      }

      return personFound
    })

    setFilteredPerson(updatedPerson)
    setNumberOfSelected(countSelected)
  }

  const edit = () => {
    setEditPerson(person)
    onEditOpen()
  }

  const toggleActive = async () => {
    const { status } = await service.toggleActive(person)

    if (status === 200) {
      updateList()
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

  const getOptions = () => {
    return [
      {
        value: 'Editar',
        handle: () => edit()
      },
      {
        value: person.active ? 'Inativar' : 'Ativar',
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
          isChecked={person.selected}
          onChange={e => setSelected(person, e.target.checked)}
        />
      </TD>
      <TD>{person.name}</TD>
      <TD>{person.cpf || person.cnpj || '-'}</TD>
      <TD>{person.email || '-'}</TD>
      <TD>{person.phone || person.celphone || '-'}</TD>
      <TD>
        <Badge variantColor={person.active ? 'green' : 'yellow'}>
          {person.active ? 'Ativo' : 'Inativo'}
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

export default PersonListItem
