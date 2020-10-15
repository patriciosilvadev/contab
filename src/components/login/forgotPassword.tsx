import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideIn,
  useDisclosure,
  Text,
  useToast
} from '@chakra-ui/core'
import React, { useState } from 'react'
import { FormValidation } from '../../config/interfaces'
import userService from '../../services/userService'
import Button from '../inputs/button'
import ButtonOut from '../inputs/buttonOut'
import Input from '../inputs/input'
import Link from '../inputs/link'

const ForgotPassword: React.FC = () => {
  const toast = useToast()
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [validation, setValidation] = useState<FormValidation>({
    emailIsValid: true
  })

  async function sendEmail() {
    setLoading(true)

    if (!email || !email.trim()) {
      setValidation({ ...validation, emailIsValid: false })
    } else {
      const { data } = await userService.requestResetPasswod(email)

      if (data?.sent) {
        toast({
          title: 'Redefinir Senha',
          description: 'Email de redefinição de senha enviado!',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        onClose()
      } else {
        toast({
          title: 'Redefinir Senha',
          description: data?.error,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }

    setLoading(false)
  }

  return (
    <>
      <Link marginTop={2} onClick={onOpen}>
        Esqueci minha senha
      </Link>

      <SlideIn in={isOpen}>
        {styles =>
          (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent {...styles}>
                <ModalHeader>Esqueceu a senha?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text marginBottom="15px">
                    Informe seu email cadastrado no sistema que você receberá um
                    link para redefinir sua senha.
                  </Text>
                  <Input
                    label="E-mail"
                    value={email}
                    type="email"
                    isRequired={true}
                    isDisabled={loading}
                    isInvalid={!validation.emailIsValid}
                    onChange={e => setEmail(e.target.value)}
                    invalidMessage="Você não informou um e-mail"
                  />
                </ModalBody>
                <ModalFooter>
                  <ButtonOut mr={3} isDisabled={loading} onClick={onClose}>
                    Cancelar
                  </ButtonOut>
                  <Button
                    width="150px"
                    height="2.5rem"
                    isDisabled={loading}
                    loading={loading}
                    onClick={sendEmail}
                  >
                    Redefinir senha
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ) as any
        }
      </SlideIn>
    </>
  )
}

export default ForgotPassword
