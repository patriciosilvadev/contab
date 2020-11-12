import React from 'react'
import { PseudoBox, PseudoBoxProps, Text } from '@chakra-ui/core'
import theme from '../../styles/theme'
import CardInfo from '../../components/cardInfo'
import Button from '../../components/inputs/button'

const BillsToReceive: React.FC<PseudoBoxProps> = props => {
  return (
    <CardInfo title="A receber hoje" {...props}>
      <PseudoBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="30px"
      >
        <Text fontSize={28} fontWeight="100" color={theme.colors.green[100]}>
          R$749,00
        </Text>
        <Text fontSize={14} color={theme.colors.gray[600]} marginBottom="30px">
          Restante do mês: <b>R$749,00</b>
        </Text>
        <Button height="40px" width="200px">
          Novo Recebimento
        </Button>
      </PseudoBox>
    </CardInfo>
  )
}

export default BillsToReceive
