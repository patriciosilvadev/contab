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
    { label: 'Notas ficais de consumidor', link: '/fiscal/nfc' }
  ]

  return (
    <FiscalProvider type={constants.TYPE_NFC}>
      <Content title="Notas Fiscais de Consumidor">
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>NFC&apos;s</PageTitle>

        <Flex direction="column" marginTop="25px">
          <Flex>
            <Flex flex={1} />
            <ListSearch flex={1} context={useFiscal} />
          </Flex>
          <FiscalFilter />
          <FiscalList />
        </Flex>
      </Content>
    </FiscalProvider>
  )
}

export default NFIndex
