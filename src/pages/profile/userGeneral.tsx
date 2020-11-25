import {
  Flex,
  Text,
  Avatar,
  Heading,
  InputGroup,
  InputRightElement,
  Stack
} from '@chakra-ui/core'
import React, { useState } from 'react'
import Link from '../../components/inputs/link'
import Input from '../../components/inputs/input'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FormValidation, User } from '../../config/interfaces'
import InputPassword from '../../components/inputs/inputPassword'

interface GenericInfoProps {
  editUser: User
  loading: boolean
  validation: FormValidation
  setEditUser(editUser: User): void
}

const UserGeneralForm: React.FC<GenericInfoProps> = props => {
  const { editUser, setEditUser, loading, validation } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false)

  function closePasswordForm() {
    setShowPasswordForm(false)
    setEditUser({ ...editUser, password: null })
  }

  /**
   * Component
   */

  return (
    <Flex flex={1} direction="column" marginRight="20px">
      <Heading size="md">Informações Gerais</Heading>
      <Text color="gray.400" marginBottom="15px">
        Dados necessários para a emissão de nostas fiscais.
      </Text>

      <Stack isInline spacing={4} alignItems="center">
        <Avatar name={editUser?.name} />
        <Input
          flex={1}
          isRequired
          isDisabled={loading}
          label="Nome Fantasia"
          value={editUser.name}
          invalidMessage="Campo obrigatório"
          isInvalid={!validation.nameIsValid}
          onChange={e => setEditUser({ ...editUser, name: e.target.value })}
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex={1}
          isRequired
          label="CNPJ"
          isDisabled={loading}
          value={editUser.cnpj}
          invalidMessage="Campo obrigatório"
          isInvalid={!validation.cnpjIsValid}
          onChange={e => setEditUser({ ...editUser, cnpj: e.target.value })}
        />
        <Input
          flex={1}
          isRequired
          label="Razão Social"
          isDisabled={loading}
          value={editUser.razaoSocial}
          invalidMessage="Campo obrigatório"
          isInvalid={!validation.razaoIsValid}
          onChange={e =>
            setEditUser({ ...editUser, razaoSocial: e.target.value })
          }
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex={1}
          isDisabled={loading}
          label="Insc. Municipal"
          value={editUser.inscMunicipal}
          onChange={e =>
            setEditUser({ ...editUser, inscMunicipal: e.target.value })
          }
        />
        <Input
          flex={1}
          isDisabled={loading}
          label="Insc. Estadual"
          value={editUser.inscEstadual}
          onChange={e =>
            setEditUser({ ...editUser, inscEstadual: e.target.value })
          }
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex={1}
          isRequired
          type="email"
          label="Email"
          isDisabled={loading}
          value={editUser.email}
          invalidMessage="Email inválido"
          isInvalid={!validation.emailIsValid}
          onChange={e => setEditUser({ ...editUser, email: e.target.value })}
        />
        <Input
          flex={1}
          type="text"
          label="Celular"
          value={editUser.celphone}
          isDisabled={loading}
          isInvalid={!validation.celphoneIsValid}
          invalidMessage="Número de celular inválido"
          onChange={e => setEditUser({ ...editUser, celphone: e.target.value })}
        />
      </Stack>

      {!showPasswordForm && (
        <Link marginBottom="15px" onClick={() => setShowPasswordForm(true)}>
          Alterar senha
        </Link>
      )}

      {showPasswordForm && (
        <Flex direction="column">
          <Link marginBottom="15px" onClick={closePasswordForm}>
            Não alterar senha
          </Link>
          <InputPassword
            isDisabled={loading}
            placeholder="Nova senha"
            value={editUser.password}
            invalidMessage="Senha inválida"
            isInvalid={!validation.passwordIsValid}
            onChange={e =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          />
        </Flex>
      )}
    </Flex>
  )
}

export default UserGeneralForm
