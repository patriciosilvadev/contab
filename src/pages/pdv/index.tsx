import React from 'react'
import { Flex } from '@chakra-ui/core'
import Content from '../../components/content'
import PageTitle from '../../components/pageTitle'
import SelectSalesClient from './selectSalesClient'
import SelectSalesProducts from './selectSalesProducts'
import { SalesProvider } from '../../hooks/salesContext'
import SalesTable from './salesTable'
import SalesResult from './salesResult'

const PDV: React.FC = () => {
  return (
    <SalesProvider>
      <Content title="SympleCont - Frente de Caixa">
        <PageTitle marginTop="30px">Frente de Caixa</PageTitle>

        <Flex flex={1} marginTop="30px">
          <Flex flex={1} direction="column">
            <SelectSalesClient />
            <SelectSalesProducts />
          </Flex>
          <Flex flex={2} direction="column">
            <SalesTable />
            <SalesResult />
          </Flex>
        </Flex>
      </Content>
    </SalesProvider>
  )
}

export default PDV
