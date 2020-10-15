import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import Button from './inputs/button'

const AlertPlan: React.FC = () => {
  const router = useRouter()

  return (
    <Box
      position="fixed"
      bottom="0"
      left="calc(50vw - 165px)"
      width="300px"
      paddingX="30px"
      paddingY="20px"
      backgroundColor="gray.300"
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      boxShadow="-8px 9px 18px -2px rgba(0,72,20,.15)"
    >
      <Text fontSize={16} marginBottom="10px">
        Adquira já um plano que tenha tudo haver com seu negócio!
      </Text>
      <Button width="100%" onClick={() => router.push('/subscription')}>
        Contratar um plano
      </Button>
    </Box>
  )
}

export default AlertPlan
