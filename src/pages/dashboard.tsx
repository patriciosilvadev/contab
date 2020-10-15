import React from 'react'
import { useAuth, ProtectRoute } from '../hooks/authContext'
import { Flex } from '@chakra-ui/core'

import AlertPlan from '../components/alertPlan'
import Content from '../components/content'
import BillsToReceive from '../components/dashboard/billsToReceive'
import BankAccounts from '../components/dashboard/bankAccounts'
import BillsToPay from '../components/dashboard/billsToPay'
import OverdueReceipts from '../components/dashboard/overdueReceipts'
import LatePayments from '../components/dashboard/latePayments'
import CashFlowChart from '../components/dashboard/cashFlowChart'
import SalesChart from '../components/dashboard/salesChart'

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
