import React from 'react'

import cep from 'cep-promise'
import Radio from '../inputs/radio'
import Input from '../inputs/input'
import SectionForm from '../sectionForm'
import TextArea from '../inputs/textArea'
import Select from '../inputs/select/select'
import constants from '../../config/constants'

import { BsSearch } from 'react-icons/bs'
import { Address } from '../../config/interfaces'
import { useEntity } from '../../hooks/entityContext'
import { PersonValidation } from '../../config/interfaces/person'
import { Box, InputGroup, InputRightAddon, Stack } from '@chakra-ui/core'

interface CreateAccountForm {
  loading: boolean
  validation: PersonValidation
}

const CreateAccountForm: React.FC<CreateAccountForm> = props => {
  const { loading, validation } = props
  const { editEntity, setEditEntity } = useEntity()

  const typeActions = [
    { value: 'PF', label: 'Física' },
    { value: 'PJ', label: 'Jurídica' }
  ]

  const indInscrSocial = [
    {
      value: constants.IND_INSCR_SOCIAL_Y,
      label: constants.IND_INSCR_SOCIAL_Y_LABEL
    },
    {
      value: constants.IND_INSCR_SOCIAL_N,
      label: constants.IND_INSCR_SOCIAL_N_LABEL
    },
    {
      value: constants.IND_INSCR_SOCIAL_I,
      label: constants.IND_INSCR_SOCIAL_I_LABEL
    }
  ]

  const loadAddressByCep = async () => {
    if (editEntity.addresses) {
      const addressList = []
      let address: Address = {}

      if (editEntity.addresses) {
        address = { ...editEntity.addresses[0] }
      }

      if (address.cep && address.cep.length >= 8) {
        const data = await cep(address.cep)

        address.city = data.city
        address.state = data.state
        address.address = data.street
        address.district = data.neighborhood

        addressList.push(address)
        setEditEntity({ ...editEntity, addresses: addressList })
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

    if (editEntity.addresses) {
      addresses = { ...editEntity.addresses[0] }
    }

    addresses[prop] = value
    addressList.push(addresses)
    setEditEntity({ ...editEntity, addresses: addressList })
  }

  const BasicForm = (
    <SectionForm title="Dados gerais" forceOpen>
      <Stack isInline spacing={4}>
        <Select
          flex={1}
          label="Tipo de pessoa"
          value={editEntity.type}
          options={typeActions}
          setValue={type =>
            setEditEntity({
              ...editEntity,
              type: type.value,
              cpf: '',
              cnpj: ''
            })
          }
        />

        {editEntity.type === 'PJ' && (
          <Input
            flex="2"
            type="text"
            label="CNPJ"
            isDisabled={loading}
            value={editEntity.cnpj || ''}
            onChange={e =>
              setEditEntity({ ...editEntity, cnpj: e.target.value })
            }
          />
        )}

        {editEntity.type === 'PF' && (
          <Input
            flex="2"
            label="CPF"
            type="text"
            isDisabled={loading}
            value={editEntity.cpf || ''}
            onChange={e =>
              setEditEntity({ ...editEntity, cpf: e.target.value })
            }
          />
        )}

        <Input
          flex="3"
          type="text"
          label="Nome"
          isRequired={true}
          isDisabled={loading}
          value={editEntity.name || ''}
          isInvalid={!validation.nameIsValid}
          invalidMessage="Campo obrigatório"
          onChange={e => setEditEntity({ ...editEntity, name: e.target.value })}
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
          value={editEntity.email || ''}
          onChange={e =>
            setEditEntity({ ...editEntity, email: e.target.value })
          }
        />

        <Input
          flex="1"
          type="text"
          label="Telefone"
          isDisabled={loading}
          value={editEntity.phone || ''}
          onChange={e =>
            setEditEntity({ ...editEntity, phone: e.target.value })
          }
        />
        <Input
          flex="1"
          type="text"
          label="Celular"
          isDisabled={loading}
          value={editEntity.celphone || ''}
          onChange={e =>
            setEditEntity({ ...editEntity, celphone: e.target.value })
          }
        />
      </Stack>

      <Stack isInline spacing={4}>
        <Input
          flex="1"
          type="date"
          isDisabled={loading}
          label={
            editEntity.type === constants.PF_TYPE
              ? 'Data de Nascimento'
              : 'Abertura da Empresa'
          }
          value={editEntity.birthday || new Date()}
          onChange={e =>
            setEditEntity({ ...editEntity, birthday: e.target.value })
          }
        />
        {editEntity.type === constants.PF_TYPE && (
          <>
            <Input
              flex="1"
              label="RG"
              type="text"
              isDisabled={loading}
              value={editEntity.rg || ''}
              onChange={e =>
                setEditEntity({ ...editEntity, rg: e.target.value })
              }
            />
            <Box flex="1" />
          </>
        )}
        {editEntity.type === constants.PJ_TYPE && (
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
      {editEntity.type === constants.PJ_TYPE && (
        <>
          <Stack isInline spacing={4} marginBottom={4}>
            <Input
              flex="2"
              type="string"
              label="Razão Social"
              isDisabled={loading}
              value={editEntity.razaoSocial || ''}
              onChange={e =>
                setEditEntity({ ...editEntity, razaoSocial: e.target.value })
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
                setEditEntity({
                  ...editEntity,
                  simples: e.target.value === 'Y'
                })
              }
              value={editEntity.simples ? 'Y' : 'N'}
            />
            <Select
              flex={1}
              label="Indicação de Inscrição Social"
              value={editEntity.indInscEstadual}
              options={indInscrSocial}
              setValue={indInscEstadual =>
                setEditEntity({
                  ...editEntity,
                  indInscEstadual: indInscEstadual.value
                })
              }
            />
          </Stack>
          <Stack isInline spacing={4}>
            <Input
              flex="1"
              type="string"
              label="Inscrição Estadual"
              value={editEntity.inscEstadual || ''}
              isInvalid={!validation.inscEstadualIsValid}
              invalidMessage="Campo obrigatório para contribuintes"
              isRequired={
                editEntity.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
              }
              isDisabled={
                loading ||
                editEntity.indInscEstadual === constants.IND_INSCR_SOCIAL_I
              }
              onChange={e =>
                setEditEntity({ ...editEntity, inscEstadual: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Municipal"
              value={editEntity.inscMunicipal || ''}
              onChange={e =>
                setEditEntity({ ...editEntity, inscMunicipal: e.target.value })
              }
            />
            <Input
              flex="1"
              type="string"
              isDisabled={loading}
              label="Inscrição Suframa"
              value={editEntity.inscSuframa || ''}
              onChange={e =>
                setEditEntity({ ...editEntity, inscSuframa: e.target.value })
              }
            />
          </Stack>
        </>
      )}
      {editEntity.type === constants.PF_TYPE && (
        <Stack isInline spacing={4}>
          <Select
            flex={1}
            label="Indicação de Inscrição Social"
            value={editEntity.indInscEstadual}
            options={indInscrSocial}
            setValue={indInscEstadual =>
              setEditEntity({
                ...editEntity,
                indInscEstadual: indInscEstadual.value
              })
            }
          />
          <Input
            flex="1"
            type="string"
            label="Inscrição Estadual"
            value={editEntity.inscEstadual || ''}
            isInvalid={!validation.inscEstadualIsValid}
            invalidMessage="Campo obrigatório para contribuintes"
            isRequired={
              editEntity.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
            }
            isDisabled={
              loading ||
              editEntity.indInscEstadual === constants.IND_INSCR_SOCIAL_I
            }
            onChange={e =>
              setEditEntity({ ...editEntity, inscEstadual: e.target.value })
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
              editEntity.addresses.length > 0 ? editEntity.addresses[0].cep : ''
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
            editEntity.addresses.length > 0
              ? editEntity.addresses[0].address
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
            editEntity.addresses.length > 0
              ? editEntity.addresses[0].number
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
            editEntity.addresses.length > 0 ? editEntity.addresses[0].state : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Cidade"
          isDisabled={loading}
          onChange={e => setAddressProp('city', e.target.value)}
          value={
            editEntity.addresses.length > 0 ? editEntity.addresses[0].city : ''
          }
        />
        <Input
          flex="1"
          type="string"
          label="Bairro"
          isDisabled={loading}
          onChange={e => setAddressProp('district', e.target.value)}
          value={
            editEntity.addresses.length > 0
              ? editEntity.addresses[0].district
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
            editEntity.addresses.length > 0
              ? editEntity.addresses[0].complement
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
        value={editEntity.obs || ''}
        placeholder="Forneça mais detalhes"
        onChange={e => setEditEntity({ ...editEntity, obs: e.target.value })}
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
