import React from 'react'
import Link from '../inputs/link'
import Button from '../inputs/button'
import constants from '../../config/constants'
import { BiRightArrowAlt } from 'react-icons/bi'

const LinksToAquire: React.FC = () => {
  const redirectContab = () => {
    window.open(constants.URL_WHATSAPP_CONTAB)
  }

  const redirectNewBusiness = () => {
    window.open(constants.URL_WHATSAPP_NEW_BUSINESS)
  }

  return (
    <>
      <Button textTransform="uppercase" onClick={redirectContab}>
        Quero trocar de contador
      </Button>

      <Link
        display="flex"
        fontSize={16}
        marginTop="20px"
        alignSelf="center"
        color="yellow.600"
        alignItems="center"
        onClick={redirectNewBusiness}
        _hover={{ color: 'yellow.500' }}
      >
        Quero abrir uma empresa <BiRightArrowAlt />
      </Link>
    </>
  )
}

export default LinksToAquire
