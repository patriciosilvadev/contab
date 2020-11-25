import {
  Flex,
  Text,
  Stack,
  Heading,
  InputGroup,
  InputRightAddon
} from '@chakra-ui/core'
import cep from 'cep-promise'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Input from '../../components/inputs/input'
import { Address, FormValidation, User } from '../../config/interfaces'

interface UserAddressFormProps {
  editUser: User
  loading: boolean
  validation: FormValidation
  setEditUser(editUser: User): void
  setValidation(validation: FormValidation): void
}

const UserAddressForm: React.FC<UserAddressFormProps> = props => {
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false)
  const { editUser, setEditUser, validation, setValidation, loading } = props

  /**
   * Actions
   */

  const loadAddressByCep = async () => {
    setLoadingAddress(true)

    if (editUser.address) {
      const address: Address = { ...editUser.address }

      if (address.cep && address.cep.length >= 8) {
        const data = await cep(address.cep).catch(() => {
          setValidation({ ...validation, addressCepIsValid: false })
        })

        if (data) {
          address.city = data.city
          address.state = data.state
          address.address = data.street
          address.district = data.neighborhood
          setEditUser({ ...editUser, address: address })
          setValidation({ ...validation, addressCepIsValid: true })
        }
      }
    }

    setLoadingAddress(false)
  }

  /**
   * Component
   */

  return (
    <Flex flex={1} direction="column" paddingLeft="20px">
      <Heading size="md">Endereço</Heading>
      <Text color="gray.400" marginBottom="15px">
        Informe o endereço da sua empresa.
      </Text>

      <Stack isInline spacing={4}>
        <InputGroup size="sm" flex="2">
          <Input
            flex={1}
            label="CEP"
            type="string"
            borderTopRightRadius={0}
            onBlur={loadAddressByCep}
            borderBottomRightRadius={0}
            invalidMessage="CEP inválido"
            value={editUser.address?.cep}
            isDisabled={loading || loadingAddress}
            isInvalid={!validation.addressCepIsValid}
            onChange={e =>
              setEditUser({
                ...editUser,
                address: { ...editUser.address, cep: e.target.value }
              })
            }
          />
          <InputRightAddon
            height="50px"
            marginTop="25px"
            cursor="pointer"
            onClick={loadAddressByCep}
          >
            <BsSearch />
          </InputRightAddon>
        </InputGroup>
        <Input
          flex="4"
          type="string"
          label="Endereço"
          value={editUser.address?.address}
          isDisabled={loading || loadingAddress}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, address: e.target.value }
            })
          }
        />
      </Stack>
      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="number"
          label="Número"
          value={editUser.address?.number}
          isDisabled={loading || loadingAddress}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, number: e.target.value }
            })
          }
        />
        <Input
          flex="1"
          isRequired
          type="string"
          label="Estado"
          value={editUser.address?.state}
          invalidMessage="Campo obrigatório"
          isDisabled={loading || loadingAddress}
          isInvalid={!validation.addressStateIsValid}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, state: e.target.value }
            })
          }
        />
        <Input
          flex="2"
          isRequired
          type="string"
          label="Cidade"
          value={editUser.address?.city}
          invalidMessage="Campo obrigatório"
          isDisabled={loading || loadingAddress}
          isInvalid={!validation.addressCityIsValid}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, city: e.target.value }
            })
          }
        />
      </Stack>
      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="string"
          label="Bairro"
          value={editUser.address?.district}
          isDisabled={loading || loadingAddress}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, district: e.target.value }
            })
          }
        />
        <Input
          flex="1"
          type="string"
          label="Complemento"
          value={editUser.address?.complement}
          isDisabled={loading || loadingAddress}
          onChange={e =>
            setEditUser({
              ...editUser,
              address: { ...editUser.address, complement: e.target.value }
            })
          }
        />
      </Stack>
    </Flex>
  )
}

export default UserAddressForm
