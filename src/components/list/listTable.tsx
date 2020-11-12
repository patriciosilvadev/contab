import React from 'react'
import theme from '../../styles/theme'
import { Flex, PseudoBoxProps } from '@chakra-ui/core'

const ListTable: React.FC<PseudoBoxProps> = props => {
  const { children, ...rest } = props

  /**
   * Component
   */

  return (
    <Flex
      borderWidth={1}
      borderRadius={5}
      direction="column"
      marginBottom="15px"
      borderColor={theme.colors.gray[300]}
      {...rest}
    >
      <table style={{ position: 'relative', borderCollapse: 'collapse' }}>
        {children}
      </table>
    </Flex>
  )
}

export default ListTable
