import React from 'react'
import FiscalList from './list'
import SalesFilter from './filterSales'
import Content from '../../components/content'
import PageTitle from '../../components/pageTitle'
import Breadcrumb from '../../components/breadcrumb'
import { Flex, useDisclosure } from '@chakra-ui/core'
import salesService from '../../services/salesService'
import ListSearch from '../../components/list/listSearch'
import { EntityProvider, useEntity } from '../../hooks/entityContext'
import SalesDetails from './details'

const SalesIndex: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const breadcrumb = [
    { label: 'Visão Geral', link: '/dashboard' },
    { label: 'Vendas', link: '/sales' }
  ]

  return (
    <EntityProvider
      type="Venda"
      onEditOpen={onOpen}
      onEditClose={onClose}
      service={salesService}
    >
      <Content title="Vendas">
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>Vendas</PageTitle>

        <Flex direction="column" marginTop="25px">
          <Flex alignItems="center" marginBottom="15px">
            <SalesFilter />
            <ListSearch flex={1} context={useEntity} />
          </Flex>
          <FiscalList />
        </Flex>
      </Content>

      <SalesDetails isOpen={isOpen} />
    </EntityProvider>
  )
}

export default SalesIndex
