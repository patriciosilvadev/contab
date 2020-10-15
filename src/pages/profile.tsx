import React from 'react'
import { ProtectRoute, useAuth } from '../hooks/authContext'
import { Flex, Text } from '@chakra-ui/core'

import Content from '../components/content'
import EditUser from '../components/profile/editUser'
import BoxPrice from '../components/subscription/boxPrice'
import { plans } from '../components/subscription/setPlan'
import Button from '../components/inputs/button'
import { useRouter } from 'next/router'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const plan: any = user.plan

  return (
    <Content
      title="Perfil do usuário"
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Flex direction="row" width="750px" height="500px">
        <Flex
          direction="column"
          justifyContent="center"
          width="40%"
          height="100%"
          paddingRight="15px"
          borderRightWidth={1}
          borderRightColor="gray.300"
        >
          <EditUser />
        </Flex>
        <Flex
          direction="column"
          justifyContent="center"
          width="60%"
          height="100%"
          paddingRight="15px"
        >
          {plan && (
            <BoxPrice
              style={{ width: '80%', marginX: '10%', boxShadow: null }}
              first={true}
              last={true}
              title={plans[plan.type].title}
              description={plans[plan.type].description}
              oldPrice={plans[plan.type].oldPrice}
              price={plans[plan.type].price}
              priceDecimal={plans[plan.type].priceDecimal}
              details={plans[plan.type].details}
              obs={plans[plan.type].obs}
            />
          )}
          {!plan && (
            <Flex padding="15px" direction="column">
              <Text textAlign="center" marginBottom="15px" color="gray.600">
                Você ainda não possui plano contratado
              </Text>
              <Button onClick={() => router.push('/subscription')}>
                Assinar plano
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Content>
  )
}

export default ProtectRoute(Profile)
