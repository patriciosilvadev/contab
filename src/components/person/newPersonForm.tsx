import React from 'react'
import Input from '../inputs/input'
import { Flex, FormLabel, Switch } from '@chakra-ui/core'
import { Person, PersonValidation } from '../../config/interfaces/person'

interface NewPersonProps {
  person: Person
  loading: boolean
  setPerson(person: Person): void
  validation: PersonValidation
}

const NewPersonForm: React.FC<NewPersonProps> = props => {
  const { person, setPerson, loading, validation } = props

  return (
    <>
      <Input
        label="Nome"
        value={person.name}
        type="text"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.nameIsValid}
        onChange={e => setPerson({ ...person, name: e.target.value })}
        invalidMessage="Campo obrigatório"
      />
      <Input
        label="Email"
        value={person.email}
        type="email"
        isDisabled={loading}
        onChange={e => setPerson({ ...person, email: e.target.value })}
      />

      <Flex justify="start" align="center" marginBottom="10px">
        <FormLabel htmlFor="personType">Pessoa jurídica?</FormLabel>
        <Switch
          id="personType"
          color="green"
          isChecked={person.type === 'PJ'}
          onChange={e =>
            setPerson({
              ...person,
              type: e.target.checked ? 'PJ' : 'PF',
              cpf: '',
              cnpj: ''
            })
          }
        />
      </Flex>

      {person.type === 'PJ' && (
        <Input
          label="CNPJ"
          value={person.cnpj}
          type="text"
          isDisabled={loading}
          onChange={e => setPerson({ ...person, cnpj: e.target.value })}
        />
      )}

      {person.type === 'PF' && (
        <Input
          label="CPF"
          value={person.cpf}
          type="text"
          isDisabled={loading}
          onChange={e => setPerson({ ...person, cpf: e.target.value })}
        />
      )}

      <Input
        label="Telefone"
        value={person.phone}
        type="text"
        isDisabled={loading}
        onChange={e => setPerson({ ...person, phone: e.target.value })}
      />
      <Input
        label="Celular"
        value={person.celphone}
        type="text"
        isDisabled={loading}
        onChange={e => setPerson({ ...person, celphone: e.target.value })}
      />
    </>
  )
}

export default NewPersonForm
