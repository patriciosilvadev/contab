import React from 'react'
import Dropzone from 'react-dropzone'
import { Flex, Text, Heading, Stack } from '@chakra-ui/core'
import { FormValidation, User } from '../../config/interfaces'
import ButtonOut from '../../components/inputs/buttonOut'
import Input from '../../components/inputs/input'
import InputPassword from '../../components/inputs/inputPassword'
import Link from '../../components/inputs/link'

interface GenericInfoProps {
  editUser: User
  loading: boolean
  validation: FormValidation
  setEditUser(editUser: User): void
}

const DigitalCertificateForm: React.FC<GenericInfoProps> = props => {
  const { editUser, setEditUser, loading, validation } = props

  /**
   * Actions
   */

  const onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        setEditUser({
          ...editUser,
          certificate: reader.result,
          certificateName: file.name
        })
      }
      reader.readAsBinaryString(file)
    })
  }

  const remoreFile = () => {
    setEditUser({
      ...editUser,
      certificate: null,
      certificateName: null,
      certificateExpirate: null
    })
  }

  /**
   * Component
   */

  return (
    <Flex
      flex={1}
      marginTop="10px"
      paddingY="30px"
      borderTopWidth={1}
      borderColor="gray.300"
    >
      <Flex flex={1} direction="column" marginRight="20px">
        <Flex alignItems="center">
          <Heading size="md">Certificado Digital A1</Heading>
          {editUser.certificateName && (
            <ButtonOut
              height="30px"
              fontSize={12}
              marginLeft="10px"
              variantColor="red"
              onClick={remoreFile}
            >
              Remover Certificado
            </ButtonOut>
          )}
        </Flex>
        <Text color="gray.400" marginBottom="15px">
          O certificado digital é usado para assinar eletronicamente suas notas
          fiscais, mesmo se sua empresa for optante do SIMPLES. É obrigatório
          vinculá-lo ao SympleCont para emitir notas fiscais.
        </Text>

        <Dropzone onDrop={onDrop} maxFiles={1} accept=".pfx" disabled={loading}>
          {({ getRootProps, getInputProps }) => (
            <Flex
              height="100px"
              borderWidth={1}
              borderRadius={4}
              cursor="pointer"
              alignItems="center"
              marginBottom="20px"
              borderStyle="dashed"
              borderColor="gray.300"
              justifyContent="center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!editUser.certificateName && (
                <Text color="gray.400">
                  Puxe o arquivo ou clique para selecionar
                </Text>
              )}
              {editUser.certificateName && (
                <Flex direction="column" alignItems="center">
                  <Text color="gray.400">Certificado Selecionado</Text>
                  <Text color="green.300">{editUser.certificateName}</Text>

                  {editUser.certificateExpirate && (
                    <Text fontSize={12} color="blue.300">
                      Expira em:{' '}
                      {new Date(
                        editUser.certificateExpirate
                      ).toLocaleDateString('pt-BR')}
                    </Text>
                  )}

                  {!editUser.certificateExpirate && (
                    <Text fontSize={12} color="yellow.500">
                      Salve o perfil para enviar seu certificado
                    </Text>
                  )}
                </Flex>
              )}
            </Flex>
          )}
        </Dropzone>

        <InputPassword
          isDisabled={loading}
          label="Senha do Certificado"
          invalidMessage="Senha invlálida"
          value={editUser.certificatePass}
          isRequired={!!editUser.certificate}
          isInvalid={!validation.certificatePassIsValid}
          onChange={e =>
            setEditUser({ ...editUser, certificatePass: e.target.value })
          }
        />
      </Flex>

      <Flex flex={1} alignItems="center" justifyContent="center" padding="20px">
        <Text>
          Ainda com dúvidas? Então entre em contato com nossa equipe de
          atendimento através do chat, ele fica no canto inferior direito da sua
          tela. Ou entre em contato pelo e-mail{' '}
          <Link href="mailto:symplecont@gmail.com">symplecont@gmail.com</Link>.
        </Text>
      </Flex>
    </Flex>
  )
}

export default DigitalCertificateForm
