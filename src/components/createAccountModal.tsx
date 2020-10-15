import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SlideIn,
  Text
} from '@chakra-ui/core'
import CreateAccountForm from './createAccountForm'

interface CreateAccountModalProps {
  isOpen: boolean
  onClose(): void
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = props => {
  const { isOpen, onClose } = props

  return (
    <SlideIn in={isOpen}>
      {styles =>
        (
          <Modal isOpen={true} onClose={() => onClose()} isCentered>
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent {...styles} padding={4}>
              <ModalHeader justifyContent="center">
                <Text color="green.600">Olá! Vamos nos conhecer melhor...</Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                  Preencha o formulário para realizar seu cadastro.
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CreateAccountForm
                  onSubmit={() => {
                    console.log('')
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        ) as any
      }
    </SlideIn>
  )
}

export default CreateAccountModal
