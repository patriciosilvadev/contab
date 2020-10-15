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
import NewClientForm from './newClientForm'
import { useClients } from '../../hooks/clientContext'

interface NewClientModalProps {
  isOpen: boolean
}

const NewClientModal: React.FC<NewClientModalProps> = props => {
  const { onNewClose } = useClients()
  const { isOpen } = props

  return (
    <SlideIn in={isOpen}>
      {styles =>
        (
          <Modal
            isOpen={true}
            onClose={() => onNewClose()}
            closeOnOverlayClick={false}
            isCentered
          >
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent {...styles} padding={4} paddingBottom={8}>
              <ModalHeader justifyContent="center">
                <Text color="green.600">Novo Cliente</Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                  Estas são as informações básicas de um cliente, caso queira
                  dar mais detalhes a ele basta selecionar a opção <b>Editar</b>{' '}
                  na lista, após a sua criacão.
                </Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NewClientForm />
              </ModalBody>
            </ModalContent>
          </Modal>
        ) as any
      }
    </SlideIn>
  )
}

export default NewClientModal
