import React from 'react'

import cep from 'cep-promise'
import Radio from '../inputs/radio'
import Input from '../inputs/input'
import SectionForm from '../sectionForm'
import TextArea from '../inputs/textArea'
import constants from '../../config/constants'
import CustomMenuButton from '../inputs/menuButton'

import { BsSearch } from 'react-icons/bs'
import { useClients } from '../../hooks/clientContext'
import { Box, InputGroup, InputRightAddon, Stack } from '@chakra-ui/core'
import { Address, ClientValidation } from '../../config/interfaces/clients'

interface CreateAccountForm {
  loading: boolean
  validation: ClientValidation
}

const CreateAccountForm: React.FC<CreateAccountForm> = props => {
  const { loading, validation } = props
  const { editClient, setEditClient } = useClients()

  const typeActions = [
    {
      value: 'Física',
      handle: () => setEditClient({ ...editClient, type: 'PF' })
    },
    {
      value: 'Jurídica',
      handle: () => setEditClient({ ...editClient, type: 'PJ' })
    }
  ]

  const indInscrSocial = [
    {
      value: constants.IND_INSCR_SOCIAL_Y_LABEL,
      handle: () =>
        setEditClient({
          ...editClient,
          indInscEstadual: constants.IND_INSCR_SOCIAL_Y
        })
    },
    {
      value: constants.IND_INSCR_SOCIAL_N_LABEL,
      handle: () =>
        setEditClient({
          ...editClient,
          indInscEstadual: constants.IND_INSCR_SOCIAL_N
        })
    },
    {
      value: constants.IND_INSCR_SOCIAL_I_LABEL,
      handle: () =>
        setEditClient({
          ...editClient,
          indInscEstadual: constants.IND_INSCR_SOCIAL_I
        })
    }
  ]

  const loadAddressByCep = async () => {
    if (editClient.addresses) {
      const addressList = []
      let address: Address = {}

      if (editClient.addresses) {
        address = { ...editClient.addresses[0] }
      }

      if (address.cep && address.cep.length >= 8) {
        const data = await cep(address.cep)

        address.city = data.city
        address.state = data.state
        address.address = data.street
        address.district = data.neighborhood

        addressList.push(address)
        setEditClient({ ...editClient, addresses: addressList })
      }
    }
  }

  const setAddressProp = (prop: string, value: any) => {
    const addressList = []
    let addresses: Address = {
      cep: '',
      city: '',
      state: '',
      number: '',
      address: '',
      district: '',
      complement: ''
    }

    if (editClient.addresses) {
      addresses = { ...editClient.addresses[0] }
    }

    addresses[prop] = value
    addressList.push(addresses)
    setEditClient({ ...editClient, addresses: addressList })
  }

  const BasicForm = (
    <SectionForm title="Dados gerais" forceOpen>
      <Stack isInline spacing={4}>
        <CustomMenuButton
          flex="1"
          height="50px"
          fontSize={14}
          color="gray.600"
          marginTop="25px"
          options={typeActions}
          borderColor="gray.300"
        >
          {editClient.type ? constants[editClient.type] : 'Tipo de pessoa'}
        </CustomMenuButton>

        {editClient.type === 'PJ' && (
          <Input
            flex="2"
            type="text"
            label="CNPJ"
            isDisabled={loading}
            value={editClient.cnpj || ''}
            onChange={e =>
              setEditClient({ ...editClient, cnpj: e.target.value })
            }
          />
        )}

        {editClient.type === 'PF' && (
          <Input
            flex="2"
            label="CPF"
            type="text"
            isDisabled={loading}
            value={editClient.cpf || ''}
            onChange={e =>
              setEditClient({ ...editClient, cpf: e.target.value })
            }
          />
        )}

        <Input
          flex="3"
          type="text"
          label="Nome"
          isRequired={true}
          isDisabled={loading}
          value={editClient.name || ''}
          isInvalid={!validation.nameIsValid}
          invalidMessage="Você não informou o nome do cliente"
          onChange={e => setEditClient({ ...editClient, name: e.target.value })}
        />
      </Stack>
    </SectionForm>
  )

  const AdicionalPFForm = (
    <SectionForm title="Informações adicionais">
      <Stack isInline spacing={4} marginBottom={4}>
        <Input
          flex="1"
          type="email"
          label="Email"
          isDisabled={loading}
          value={editClient.email || ''}
          onChange={e =>
            setEditClient({ ...editClient, email: e.target.value })
          }
        />

        <Input
          flex="1"
          type="text"
          label="Telefone"
          isDisabled={loading}
          value={editClient.phone || ''}
          onChange={e =>
            setEditClient({ ...editClient, phone: e.target.value })
          }
        />
        <Input
          flex="1"
          type="text"
          label="Celular"
          isDisabled={loading}
          value={editClient.celphone || ''}
          onChange={e =>
            setEditClient({ ...editClient, celphone: e.target.value })
          }
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="date"
          isDisabled={loading}
          label={
            editClient.type === constants.PF_TYPE
              ? 'Data de Nascimento'
              : 'Abertura da Empresa'
          }
          value={editClient.birthday || new Date()}
          onChange={e =>
            setEditClient({ ...editClient, birthday: e.target.value })
          }
        />
        {editClient.type === constants.PF_TYPE && (
          <>
            <Input
              flex="1"
              label="RG"
              type="text"
              isDisabled={loading}
              value={editClient.rg || ''}
              onChange={e =>
                setEditClient({ ...editClient, rg: e.target.value })
              }
            />
            <Box flex="1" />
          </>
        )}
        {editClient.type === constants.PJ_TYPE && (
          <>
            <Box flex="1" />
            <Box flex="1" />
            <Box flex="1" />
          </>
        )}
      </Stack>
    </SectionForm>
  )

  const FiscalForm = (
    <SectionForm title="Informações fiscais">
      {editClient.type === constants.PJ_TYPE && (
        <>
          <Stack isInline spacing={4} marginBottom={4}>
            <Input
              flex="2"
              type="string"
              label="Razão Social"
              isDisabled={loading}
              value={editClient.razaoSocial || ''}
              onChange={e =>
                setEditClient({ ...editClient, razaoSocial: e.target.value })
              }
            />
            <Radio
              flex="1"
              label="Optante pelo simples?"
              options={[
                { key: 'Y', value: 'Sim' },
                { key: 'N', value: 'Não' }
              ]}
              onChange={e =>
                setEditClient({
                  ...editClient,
                  simples: e.target.value === 'Y'
                })
              }
              value={editClient.simples ? 'Y' : 'N'}
            />
            <CustomMenuButton
              flex="1"
              width="100%"
              fontSize={14}
              height="50px"
              color="gray.600"
              borderColor="gray.300"
              options={indInscrSocial}
              label="Indicação de Inscrição Social"
            >
              {editClient.indInscEstadual
                ? constants[
                    `IND_INSCR_SOCIAL_${editClient.indInscEstadual}_LABEL`
                    // eslint-disable-next-line prettier/prettier
                ]
                : 'Selecionar'}
            </CustomMenuButton>
          </Stack>
          <Stack isInline spacing={4}>
            <Input
              flex="1"
              type="string"
              label="Inscrição Estadual"
              value={editClient.inscEstadual || ''}
              isInvalid={!validation.inscEstadualIsValid}
              invalidMessage="Campo obrigatório para contribuintes"
              isRequired={
                editClient.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
              }
              isDisabled={
                loading ||
                editClient.indInscEstadual === constants.IND_INSCR_SOCIAL_I
              }
              onChange={e =>
                setEditClient({ ...editClient, inscEstadual: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Municipal"
              value={editClient.inscMunicipal || ''}
              onChange={e =>
                setEditClient({ ...editClient, inscMunicipal: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Suframa"
              value={editClient.inscSuframa || ''}
              onChange={e =>
                setEditClient({ ...editClient, inscSuframa: e.target.value })
              }
            />
          </Stack>
        </>
      )}
      {editClient.type === constants.PF_TYPE && (
        <Stack isInline spacing={4}>
          <CustomMenuButton
            flex="1"
            width="100%"
            fontSize={14}
            height="50px"
            color="gray.600"
            borderColor="gray.300"
            options={indInscrSocial}
            label="Indicação de Inscrição Social"
          >
            {editClient.indInscEstadual
              ? constants[
                  `IND_INSCR_SOCIAL_${editClient.indInscEstadual}_LABEL`
                  // eslint-disable-next-line prettier/prettier
              ]
              : 'Selecionar'}
          </CustomMenuButton>
          <Input
            flex="1"
            type="string"
            label="Inscrição Estadual"
            value={editClient.inscEstadual || ''}
            isInvalid={!validation.inscEstadualIsValid}
            invalidMessage="Campo obrigatório para contribuintes"
            isRequired={
              editClient.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
            }
            isDisabled={
              loading ||
              editClient.indInscEstadual === constants.IND_INSCR_SOCIAL_I
            }
            onChange={e =>
              setEditClient({ ...editClient, inscEstadual: e.target.value })
            }
          />
          <Box flex="1" />
        </Stack>
      )}
    </SectionForm>
  )

  const AddressForm = (
    <SectionForm title="Endereço">
      <Stack isInline spacing={4} marginBottom={4}>
        <InputGroup size="sm" flex="2">
          <Input
            flex={1}
            label="CEP"
            type="string"
            isDisabled={loading}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            onChange={e => setAddressProp('cep', e.target.value)}
            value={
              editClient.addresses.length > 0 ? editClient.addresses[0].cep : ''
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
          flex="3"
          type="string"
          label="Endereço"
          isDisabled={loading}
          onChange={e => setAddressProp('address', e.target.value)}
          value={
            editClient.addresses.length > 0
              ? editClient.addresses[0].address
              : ''
          }
        />
        <Input
          flex="1"
          type="number"
          label="Número"
          isDisabled={loading}
          onChange={e => setAddressProp('number', e.target.value)}
          value={
            editClient.addresses.length > 0
              ? editClient.addresses[0].number
              : ''
          }
        />
      </Stack>
      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="string"
          label="Estado"
          isDisabled={loading}
          onChange={e => setAddressProp('state', e.target.value)}
          value={
            editClient.addresses.length > 0 ? editClient.addresses[0].state : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Cidade"
          isDisabled={loading}
          onChange={e => setAddressProp('city', e.target.value)}
          value={
            editClient.addresses.length > 0 ? editClient.addresses[0].city : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Bairro"
          isDisabled={loading}
          onChange={e => setAddressProp('district', e.target.value)}
          value={
            editClient.addresses.length > 0
              ? editClient.addresses[0].district
              : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Complemento"
          isDisabled={loading}
          onChange={e => setAddressProp('complement', e.target.value)}
          value={
            editClient.addresses.length > 0
              ? editClient.addresses[0].complement
              : ''
          }
        />
      </Stack>
    </SectionForm>
  )

  const ObsForm = (
    <SectionForm title="Observações gerais">
      <TextArea
        flex="1"
        value={editClient.obs || ''}
        placeholder="Para mais informações sobre seu cliente..."
        onChange={e => setEditClient({ ...editClient, obs: e.target.value })}
      />
    </SectionForm>
  )

  return (
    <Stack spacing="30px">
      {BasicForm}
      {AdicionalPFForm}
      {FiscalForm}
      {AddressForm}
      {ObsForm}
    </Stack>
  )
}

export default CreateAccountForm
