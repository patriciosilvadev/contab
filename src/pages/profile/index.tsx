import React, { useState } from 'react'
import UserGeneralForm from './userGeneral'
import UserAddressForm from './userAddress'
import Loading from '../../components/loading'
import Content from '../../components/content'
import { Flex, useToast } from '@chakra-ui/core'
import PageTitle from '../../components/pageTitle'
import Button from '../../components/inputs/button'
import Breadcrumb from '../../components/breadcrumb'
import userService from '../../services/userService'
import { FormValidation, User } from '../../config/interfaces'
import { ProtectRoute, useAuth } from '../../hooks/authContext'
import DigitalCertificateForm from './digitalCertificate'

const Profile: React.FC = () => {
  const toast = useToast()
  const { user, setUser } = useAuth()
  const [editUser, setEditUser] = useState<User>(user)
  const [loading, setLoading] = useState<boolean>(false)

  const [validation, setValidation] = useState<FormValidation>({
    nameIsValid: true,
    cnpjIsValid: true,
    emailIsValid: true,
    razaoIsValid: true,
    passwordIsValid: true,
    celphoneIsValid: true,
    addressCepIsValid: true,
    addressCityIsValid: true,
    addressStateIsValid: true,
    certificatePassIsValid: true
  })

  const breadcrumb = [
    { label: 'Visão Geral', link: '/dashboard' },
    { label: 'Minha Conta', link: '/profile' }
  ]

  /**
   * Actions
   */

  async function submitEdit() {
    setLoading(true)
    const { isValid, newValidation } = userService.isValidatedForm(
      editUser,
      true
    )

    setValidation(newValidation)

    if (isValid) {
      const { data, status } = await userService.edit(editUser)

      if (status === 200 && data.updated) {
        const userUpdated = {
          ...editUser,
          managerUserId: data.managerUserId,
          certificateExpirate: data.certificateExp
        }

        setEditUser(userUpdated)
        setUser(userUpdated)

        toast({
          duration: 9000,
          isClosable: true,
          status: 'success',
          title: 'Minha Conta',
          description: 'Seus dados foram atualizados com sucesso.'
        })
      } else {
        toast({
          duration: 9000,
          status: 'error',
          isClosable: true,
          title: 'Minha Conta',
          description:
            data.error ||
            'Ocorreu um pequeno problema ao tentar atualizar suas informações.'
        })
      }
    } else {
      toast({
        duration: 9000,
        status: 'error',
        isClosable: true,
        title: 'Minha Conta',
        description: 'Verifique os dados informados.'
      })
    }

    setLoading(false)
  }

  /**
   * Component
   */

  if (!user) {
    return <Loading visible={true} />
  }

  return (
    <Content title="SympleCont - Perfil do usuário">
      <Breadcrumb pages={breadcrumb} />
      <PageTitle>Minha Conta</PageTitle>

      <Flex flex={1} marginTop="20px">
        <Flex flex={1} direction="column">
          <Flex>
            <UserGeneralForm
              loading={loading}
              editUser={editUser}
              validation={validation}
              setEditUser={setEditUser}
            />

            <UserAddressForm
              loading={loading}
              editUser={editUser}
              validation={validation}
              setEditUser={setEditUser}
              setValidation={setValidation}
            />
          </Flex>

          <DigitalCertificateForm
            loading={loading}
            editUser={editUser}
            validation={validation}
            setEditUser={setEditUser}
          />

          <Flex
            paddingTop="20px"
            borderTopWidth={1}
            borderColor="gray.300"
            justifyContent="flex-end"
          >
            <Button
              width="200px"
              display="flex"
              loading={loading}
              marginBottom="10px"
              isDisabled={loading}
              onClick={submitEdit}
            >
              Salvar perfil
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Content>
  )
}

export default ProtectRoute(Profile)
