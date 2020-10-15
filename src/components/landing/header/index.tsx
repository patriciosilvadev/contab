import React from 'react'
import MainHeader from './header'
import Navigation from '../../header/navigation'
import { useRouter } from 'next/router'
import ButtonOut from '../../inputs/buttonOut'

const menuItems = [
  { label: 'Diferencial', link: '#qualities' },
  { label: 'Funcionalidades', link: '#functions' },
  { label: 'Planos e preços', link: '#plans' },
  { label: 'Contato', link: '#contact' }
]

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <MainHeader>
      <Navigation menu={menuItems} />
      <ButtonOut onClick={() => router.push('/login')}>Entrar</ButtonOut>
    </MainHeader>
  )
}

export default Header
