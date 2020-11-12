import React from 'react'
import { useAuth, ProtectRoute } from '../../hooks/authContext'
import { Flex } from '@chakra-ui/core'

import AlertPlan from '../../components/alertPlan'
import Content from '../../components/content'
import BillsToReceive from './billsToReceive'
import BankAccounts from './bankAccounts'
import BillsToPay from './billsToPay'
import OverdueReceipts from './overdueReceipts'
import LatePayments from './latePayments'
import CashFlowChart from './cashFlowChart'
import SalesChart from './salesChart'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const spacing = 30

  return (
    <Content title="Dashboard">
      <Flex marginTop={spacing}>
        <Flex
          direction="column"
          width="30%"
          paddingRight={spacing / 2}
          marginBottom={spacing}
        >
          <BankAccounts marginBottom={spacing} />
        </Flex>

        <Flex direction="column" width="70%" paddingLeft={spacing / 2}>
          <Flex direction="row" marginBottom={spacing}>
            <BillsToReceive marginRight={spacing} />
            <BillsToPay />
          </Flex>

          <Flex direction="row" marginBottom={spacing}>
            <OverdueReceipts marginRight={spacing} />
            <LatePayments />
          </Flex>

          <Flex direction="row" marginBottom={spacing}>
            <CashFlowChart />
          </Flex>

          <Flex direction="row" marginBottom={spacing}>
            <SalesChart />
          </Flex>
        </Flex>
      </Flex>

      {!user?.plan && <AlertPlan />}
    </Content>
  )
}

export default ProtectRoute(Dashboard)
