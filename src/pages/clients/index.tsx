import React from 'react'

import { Flex, useDisclosure } from '@chakra-ui/core'
import { ProtectRoute } from '../../hooks/authContext'
import { ClientsProvider } from '../../hooks/clientContext'

import Content from '../../components/content'
import Button from '../../components/inputs/button'
import Breadcrumb from '../../components/breadcrumb'

import Search from '../../components/clients/search'
import ClientList from '../../components/clients/list'
import FilterButton from '../../components/clients/filterButtons'
import NewClientModal from '../../components/clients/newClientModal'
import EditClientModal from '../../components/clients/editClientModal'

const Clients: React.FC = () => {
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNewClose
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()

  const breadcrumb = [
    { label: 'Visão Geral', link: '/' },
    { label: 'Clientes', link: '/clients' }
  ]

  return (
    <ClientsProvider
      onNewClose={onNewClose}
      onEditClose={onEditClose}
      onEditOpen={onEditOpen}
    >
      <Content title="Clientes">
        <Breadcrumb pages={breadcrumb} />

        <Flex direction="column" marginTop="40px">
          <Flex>
            <Button width="200px" marginRight="auto" onClick={onNewOpen}>
              Criar novo
            </Button>
            <Search />
          </Flex>
          <FilterButton />
          <ClientList />
        </Flex>

        <NewClientModal isOpen={isNewOpen} />
        <EditClientModal isOpen={isEditOpen} />
      </Content>
    </ClientsProvider>
  )
}

export default ProtectRoute(Clients)
