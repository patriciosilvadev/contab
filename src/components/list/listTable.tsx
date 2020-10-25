import React from 'react'

import theme from '../../styles/theme'
import { Flex } from '@chakra-ui/core'

const ListTable: React.FC = props => {
  const { children } = props

  /**
   * Component
   */

  return (
    <Flex
      direction="column"
      borderWidth={1}
      borderColor={theme.colors.gray[300]}
      borderRadius={10}
      overflow="hidden"
      marginBottom="15px"
    >
      <table>{children}</table>
    </Flex>
  )
}

export default ListTable
