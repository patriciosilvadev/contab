import React from 'react'
import FiscalList from './fiscalList'
import { Flex } from '@chakra-ui/core'
import FiscalFilter from './fiscalFilter'
import Content from '../../components/content'
import PageTitle from '../../components/pageTitle'
import Breadcrumb from '../../components/breadcrumb'
import ListSearch from '../../components/list/listSearch'
import { FiscalProvider, useFiscal } from '../../hooks/fiscalContext'
import constants from '../../config/constants'

const NFIndex: React.FC = () => {
  const breadcrumb = [
    { label: 'Visão Geral', link: '/dashboard' },
    { label: 'Notas ficais de produto', link: '/fiscal/nf' }
  ]

  return (
    <FiscalProvider type={constants.TYPE_NF}>
      <Content title="Notas Fiscais de Produto">
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>NF&apos;s</PageTitle>

        <Flex direction="column" marginTop="25px">
          <ListSearch context={useFiscal} />
          <FiscalFilter />
          <FiscalList />
        </Flex>
      </Content>
    </FiscalProvider>
  )
}

export default NFIndex
