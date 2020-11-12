import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  Scale
} from '@chakra-ui/core'
import React from 'react'

interface DialogProps {
  title: string
  handle(): void
  isOpen: boolean
  message: string
  actionText: string
  setIsOpen(isOpen: boolean): void
}

const Dialog: React.FC<DialogProps> = props => {
  const { title, handle, isOpen, message, actionText, setIsOpen } = props
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <Scale in={isOpen}>
      {styles =>
        (
          <AlertDialog
            isOpen={true}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay opacity={styles.opacity} />
            <AlertDialogContent {...styles}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {title}
              </AlertDialogHeader>
              <AlertDialogBody>{message}</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button variantColor="red" onClick={handle} ml={3}>
                  {actionText}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) as any
      }
    </Scale>
  )
}

export default Dialog
