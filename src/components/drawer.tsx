import React from 'react'
import {
  Button as ChakraButton,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
  Drawer as DrawerChakra
} from '@chakra-ui/core'
import Button from './inputs/button'

interface DrawerProps {
  title: string
  buttonText: string
  submitForm?(): void
  isOpen: boolean
  onClose(): void
  size?: any
}

const Drawer: React.FC<DrawerProps> = props => {
  const {
    title,
    buttonText,
    submitForm,
    isOpen,
    onClose,
    children,
    size
  } = props

  return (
    <>
      <DrawerChakra
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={size || 'sm'}
      >
        <DrawerOverlay />
        <DrawerContent overflow="scroll">
          <DrawerCloseButton top="15px" />
          <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

          <DrawerBody overflowY="scroll">
            <Stack spacing="24px">{children}</Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <ChakraButton
              variant="outline"
              height="50px"
              borderRadius="sm"
              marginRight={3}
              onClick={onClose}
            >
              {submitForm ? 'Cancelar' : 'Fechar'}
            </ChakraButton>
            {submitForm && (
              <Button width="200px" onClick={submitForm}>
                {buttonText}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerChakra>
    </>
  )
}

export default Drawer
