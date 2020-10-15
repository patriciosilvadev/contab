import React from 'react'

import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/core'
import { useAuth } from '../../hooks/authContext'
import { useRouter } from 'next/router'

const MenuProfile: React.FC = () => {
  const router = useRouter()
  const { user, signOut } = useAuth()

  return (
    <Menu>
      <MenuButton _focus={{ outline: 'none' }}>
        <Avatar name={user?.name} width="40px" height="40px">
          <AvatarBadge size="0.75em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Perfil">
          <MenuItem onClick={() => router.push('/profile')}>
            Minha conta
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Ajuda">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem onClick={signOut}>Sair</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default MenuProfile
