import React from 'react'

import cep from 'cep-promise'
import Radio from '../inputs/radio'
import Input from '../inputs/input'
import SectionForm from '../sectionForm'
import TextArea from '../inputs/textArea'
import constants from '../../config/constants'
import CustomMenuButton from '../inputs/menuButton'

import { BsSearch } from 'react-icons/bs'
import { Address } from '../../config/interfaces'
import { usePerson } from '../../hooks/personContext'
import { PersonValidation } from '../../config/interfaces/person'
import { Box, InputGroup, InputRightAddon, Stack } from '@chakra-ui/core'

interface CreateAccountForm {
  loading: boolean
  validation: PersonValidation
}

const CreateAccountForm: React.FC<CreateAccountForm> = props => {
  const { loading, validation } = props
  const { editPerson, setEditPerson } = usePerson()

  const typeActions = [
    {
      value: 'Física',
      handle: () =>
        setEditPerson({ ...editPerson, type: 'PF', cpf: '', cnpj: '' })
    },
    {
      value: 'Jurídica',
      handle: () =>
        setEditPerson({ ...editPerson, type: 'PJ', cpf: '', cnpj: '' })
    }
  ]

  const indInscrSocial = [
    {
      value: constants.IND_INSCR_SOCIAL_Y_LABEL,
      handle: () =>
        setEditPerson({
          ...editPerson,
          indInscEstadual: constants.IND_INSCR_SOCIAL_Y
        })
    },
    {
      value: constants.IND_INSCR_SOCIAL_N_LABEL,
      handle: () =>
        setEditPerson({
          ...editPerson,
          indInscEstadual: constants.IND_INSCR_SOCIAL_N
        })
    },
    {
      value: constants.IND_INSCR_SOCIAL_I_LABEL,
      handle: () =>
        setEditPerson({
          ...editPerson,
          indInscEstadual: constants.IND_INSCR_SOCIAL_I
        })
    }
  ]

  const loadAddressByCep = async () => {
    if (editPerson.addresses) {
      const addressList = []
      let address: Address = {}

      if (editPerson.addresses) {
        address = { ...editPerson.addresses[0] }
      }

      if (address.cep && address.cep.length >= 8) {
        const data = await cep(address.cep)

        address.city = data.city
        address.state = data.state
        address.address = data.street
        address.district = data.neighborhood

        addressList.push(address)
        setEditPerson({ ...editPerson, addresses: addressList })
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

    if (editPerson.addresses) {
      addresses = { ...editPerson.addresses[0] }
    }

    addresses[prop] = value
    addressList.push(addresses)
    setEditPerson({ ...editPerson, addresses: addressList })
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
          {editPerson.type ? constants[editPerson.type] : 'Tipo de pessoa'}
        </CustomMenuButton>

        {editPerson.type === 'PJ' && (
          <Input
            flex="2"
            type="text"
            label="CNPJ"
            isDisabled={loading}
            value={editPerson.cnpj || ''}
            onChange={e =>
              setEditPerson({ ...editPerson, cnpj: e.target.value })
            }
          />
        )}

        {editPerson.type === 'PF' && (
          <Input
            flex="2"
            label="CPF"
            type="text"
            isDisabled={loading}
            value={editPerson.cpf || ''}
            onChange={e =>
              setEditPerson({ ...editPerson, cpf: e.target.value })
            }
          />
        )}

        <Input
          flex="3"
          type="text"
          label="Nome"
          isRequired={true}
          isDisabled={loading}
          value={editPerson.name || ''}
          isInvalid={!validation.nameIsValid}
          invalidMessage="Campo obrigatório"
          onChange={e => setEditPerson({ ...editPerson, name: e.target.value })}
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
          value={editPerson.email || ''}
          onChange={e =>
            setEditPerson({ ...editPerson, email: e.target.value })
          }
        />

        <Input
          flex="1"
          type="text"
          label="Telefone"
          isDisabled={loading}
          value={editPerson.phone || ''}
          onChange={e =>
            setEditPerson({ ...editPerson, phone: e.target.value })
          }
        />
        <Input
          flex="1"
          type="text"
          label="Celular"
          isDisabled={loading}
          value={editPerson.celphone || ''}
          onChange={e =>
            setEditPerson({ ...editPerson, celphone: e.target.value })
          }
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="date"
          isDisabled={loading}
          label={
            editPerson.type === constants.PF_TYPE
              ? 'Data de Nascimento'
              : 'Abertura da Empresa'
          }
          value={editPerson.birthday || new Date()}
          onChange={e =>
            setEditPerson({ ...editPerson, birthday: e.target.value })
          }
        />
        {editPerson.type === constants.PF_TYPE && (
          <>
            <Input
              flex="1"
              label="RG"
              type="text"
              isDisabled={loading}
              value={editPerson.rg || ''}
              onChange={e =>
                setEditPerson({ ...editPerson, rg: e.target.value })
              }
            />
            <Box flex="1" />
          </>
        )}
        {editPerson.type === constants.PJ_TYPE && (
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
      {editPerson.type === constants.PJ_TYPE && (
        <>
          <Stack isInline spacing={4} marginBottom={4}>
            <Input
              flex="2"
              type="string"
              label="Razão Social"
              isDisabled={loading}
              value={editPerson.razaoSocial || ''}
              onChange={e =>
                setEditPerson({ ...editPerson, razaoSocial: e.target.value })
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
                setEditPerson({
                  ...editPerson,
                  simples: e.target.value === 'Y'
                })
              }
              value={editPerson.simples ? 'Y' : 'N'}
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
              {editPerson.indInscEstadual
                ? constants[
                    `IND_INSCR_SOCIAL_${editPerson.indInscEstadual}_LABEL`
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
              value={editPerson.inscEstadual || ''}
              isInvalid={!validation.inscEstadualIsValid}
              invalidMessage="Campo obrigatório para contribuintes"
              isRequired={
                editPerson.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
              }
              isDisabled={
                loading ||
                editPerson.indInscEstadual === constants.IND_INSCR_SOCIAL_I
              }
              onChange={e =>
                setEditPerson({ ...editPerson, inscEstadual: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Municipal"
              value={editPerson.inscMunicipal || ''}
              onChange={e =>
                setEditPerson({ ...editPerson, inscMunicipal: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Suframa"
              value={editPerson.inscSuframa || ''}
              onChange={e =>
                setEditPerson({ ...editPerson, inscSuframa: e.target.value })
              }
            />
          </Stack>
        </>
      )}
      {editPerson.type === constants.PF_TYPE && (
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
            {editPerson.indInscEstadual
              ? constants[
                  `IND_INSCR_SOCIAL_${editPerson.indInscEstadual}_LABEL`
                  // eslint-disable-next-line prettier/prettier
              ]
              : 'Selecionar'}
          </CustomMenuButton>
          <Input
            flex="1"
            type="string"
            label="Inscrição Estadual"
            value={editPerson.inscEstadual || ''}
            isInvalid={!validation.inscEstadualIsValid}
            invalidMessage="Campo obrigatório para contribuintes"
            isRequired={
              editPerson.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
            }
            isDisabled={
              loading ||
              editPerson.indInscEstadual === constants.IND_INSCR_SOCIAL_I
            }
            onChange={e =>
              setEditPerson({ ...editPerson, inscEstadual: e.target.value })
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
              editPerson.addresses.length > 0 ? editPerson.addresses[0].cep : ''
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
            editPerson.addresses.length > 0
              ? editPerson.addresses[0].address
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
            editPerson.addresses.length > 0
              ? editPerson.addresses[0].number
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
            editPerson.addresses.length > 0 ? editPerson.addresses[0].state : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Cidade"
          isDisabled={loading}
          onChange={e => setAddressProp('city', e.target.value)}
          value={
            editPerson.addresses.length > 0 ? editPerson.addresses[0].city : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Bairro"
          isDisabled={loading}
          onChange={e => setAddressProp('district', e.target.value)}
          value={
            editPerson.addresses.length > 0
              ? editPerson.addresses[0].district
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
            editPerson.addresses.length > 0
              ? editPerson.addresses[0].complement
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
        value={editPerson.obs || ''}
        placeholder="Forneça mais detalhes"
        onChange={e => setEditPerson({ ...editPerson, obs: e.target.value })}
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
