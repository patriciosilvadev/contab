import React from 'react'
import MainHeader from './header'
import Navigation from './navigation'
// import { useRouter } from 'next/router'
import ButtonOut from '../../inputs/buttonOut'
import constants from '../../../config/constants'

const menuItems = [
  { label: 'Como Funciona?', link: '#howworks' },
  { label: 'Passo a Passo', link: '#steps' },
  { label: 'Planos', link: '#plans' }
]

const Header: React.FC = () => {
  // const router = useRouter()

  const redirect = () => {
    window.open(constants.URL_WHATSAPP_CONTAB)
  }

  return (
    <MainHeader>
      <Navigation menu={menuItems} />
      {/* <ButtonOut onClick={() => router.push('/login')}>Entrar</ButtonOut> */}
      <ButtonOut width="200px" onClick={redirect}>
        Trocar Contador
      </ButtonOut>
    </MainHeader>
  )
}

export default Header
