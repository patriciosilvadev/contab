import React, { useState } from 'react'
import { useAuth } from '../../hooks/authContext'
import {
  Avatar,
  Heading,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Button as ButtonChakra
} from '@chakra-ui/core'

import userService from '../../services/userService'

import ButtonOut from '../inputs/buttonOut'
import Input from '../inputs/input'
import Link from '../inputs/link'
import { FormValidation, User } from '../../config/interfaces'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Button from '../inputs/button'

const EditUser: React.FC = () => {
  const toast = useToast()
  const { user, setUser } = useAuth()
  const [editUser, setEditUser] = useState<User>(user)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false)

  const [validation, setValidation] = useState<FormValidation>({
    nameIsValid: true,
    emailIsValid: true,
    cellphoneIsValid: true,
    passwordIsValid: true
  })

  async function submitEdit() {
    setLoading(true)
    const { isValid, newValidation } = userService.isValidatedForm(editUser)

    setValidation(newValidation)

    if (isValid) {
      const { data, status } = await userService.edit(editUser)

      if (status === 200 && data.updated) {
        setUser(editUser)
        setIsEditingProfile(false)
        toast({
          title: 'Perfil do usuário',
          description: 'Seus dados foram atualizados com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Perfil do usuário',
          description:
            data.error ||
            'Ocorreu um pequeno problema ao tentar atualizar suas informações.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }

    setLoading(false)
  }

  function closePasswordForm() {
    setShowPasswordForm(false)
    setEditUser({ ...editUser, password: null })
  }

  return (
    <>
      <Avatar name={editUser?.name} marginBottom="15px" />
      {!isEditingProfile && (
        <>
          <Heading>{editUser?.name}</Heading>
          <Text>{editUser?.email}</Text>
          <Text>{editUser?.cellphone}</Text>
          <ButtonOut
            width="200px"
            marginTop="15px"
            onClick={() => setIsEditingProfile(true)}
          >
            Editar perfil
          </ButtonOut>
        </>
      )}
      {isEditingProfile && (
        <>
          <Input
            type="text"
            label="Nome"
            value={editUser.name}
            isDisabled={loading}
            isInvalid={!validation.nameIsValid}
            invalidMessage="Nome inválido"
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
          />
          <Input
            type="email"
            label="Email"
            value={editUser.email}
            isDisabled={loading}
            isInvalid={!validation.emailIsValid}
            invalidMessage="Email inválido"
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
          />
          <Input
            type="text"
            label="Celular"
            value={editUser.cellphone}
            isDisabled={loading}
            isInvalid={!validation.cellphoneIsValid}
            invalidMessage="Número de celular inválido"
            onChange={e =>
              setEditUser({ ...editUser, cellphone: e.target.value })
            }
          />

          {!showPasswordForm && (
            <Link marginBottom="15px" onClick={() => setShowPasswordForm(true)}>
              Alterar senha
            </Link>
          )}

          {showPasswordForm && (
            <>
              <Link marginBottom="15px" onClick={closePasswordForm}>
                Não alterar senha
              </Link>
              <InputGroup size="md" marginBottom="15px">
                <Input
                  pr="4.5rem"
                  placeholder="Nova senha"
                  type={showPassword ? 'text' : 'password'}
                  value={editUser.password}
                  isDisabled={loading}
                  isInvalid={!validation.passwordIsValid}
                  invalidMessage="Senha inválida"
                  onChange={e =>
                    setEditUser({ ...editUser, password: e.target.value })
                  }
                />
                <InputRightElement top="12px" right="5px">
                  <Link
                    fontSize={24}
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </Link>
                </InputRightElement>
              </InputGroup>
            </>
          )}

          <Button
            width="200px"
            marginBottom="10px"
            isDisabled={loading}
            loading={loading}
            onClick={submitEdit}
          >
            Salvar perfil
          </Button>
          <ButtonChakra
            width="200px"
            isDisabled={loading}
            onClick={() => setIsEditingProfile(false)}
          >
            Cancelar
          </ButtonChakra>
        </>
      )}
    </>
  )
}

export default EditUser
