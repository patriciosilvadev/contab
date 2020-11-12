import React from 'react'
import FiscalList from './list'
import { Flex } from '@chakra-ui/core'
import Content from '../../components/content'
import PageTitle from '../../components/pageTitle'
import Breadcrumb from '../../components/breadcrumb'
import ListSearch from '../../components/list/listSearch'
import { EntityProvider, useEntity } from '../../hooks/entityContext'
import salesService from '../../services/salesService'

const SalesIndex: React.FC = () => {
  const breadcrumb = [
    { label: 'Visão Geral', link: '/dashboard' },
    { label: 'Vendas', link: '/sales' }
  ]

  return (
    <EntityProvider type="Venda" service={salesService}>
      <Content title="Vendas">
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>Vendas</PageTitle>

        <Flex direction="column" marginTop="25px">
          <ListSearch context={useEntity} />
          <FiscalList />
        </Flex>
      </Content>
    </EntityProvider>
  )
}

export default SalesIndex
