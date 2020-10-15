import React from 'react'
import { PseudoBox, PseudoBoxProps, Text } from '@chakra-ui/core'
import theme from '../../styles/theme'
import CardInfo from '../../components/cardInfo'
import Button from '../inputs/button'

const BillsToPay: React.FC<PseudoBoxProps> = props => {
  return (
    <CardInfo title="A pagar hoje" {...props}>
      <PseudoBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="30px"
      >
        <Text fontSize={28} fontWeight="100" color={theme.colors.red[400]}>
          R$149,00
        </Text>
        <Text fontSize={14} color={theme.colors.gray[600]} marginBottom="30px">
          Restante do mês: <b>R$749,00</b>
        </Text>
        <Button
          height="40px"
          width="200px"
          backgroundColor={theme.colors.red[600]}
          _hover={{ backgroundColor: theme.colors.red[400] }}
        >
          Novo Pagamento
        </Button>
      </PseudoBox>
    </CardInfo>
  )
}

export default BillsToPay
