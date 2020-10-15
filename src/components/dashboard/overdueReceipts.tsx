import React from 'react'
import { Text, PseudoBox, PseudoBoxProps } from '@chakra-ui/core'
import theme from '../../styles/theme'
import CardInfo from '../../components/cardInfo'

const OverdueReceipts: React.FC<PseudoBoxProps> = props => {
  return (
    <CardInfo title="Recebimentos em atraso" {...props}>
      <PseudoBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="30px"
      >
        <Text fontSize={28} color={theme.colors.green[100]}>
          R$749,00
        </Text>
      </PseudoBox>
    </CardInfo>
  )
}

export default OverdueReceipts
