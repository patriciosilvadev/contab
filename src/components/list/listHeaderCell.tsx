import React from 'react'
import TH from './tH'
import Link from '../inputs/link'
import { Text } from '@chakra-ui/core'
import { ListHeader } from '../../config/interfaces/list'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

const HeaderCell: React.FC<ListHeader> = props => {
  const {
    order,
    orderAsc,
    selected,
    onChangeOrder,
    children,
    first,
    last
  } = props

  return (
    <TH borderTopLeftRadius={first ? 4 : 0} borderTopRightRadius={last ? 4 : 0}>
      {order ? (
        <Link
          onClick={() => onChangeOrder(order)}
          display="flex"
          flexDirection="row"
          alignItems="center"
          color="gray.600"
          _hover={{ opacity: 0.5 }}
        >
          {children}
          {orderAsc ? (
            <TiArrowSortedDown opacity={selected ? 1 : 0} />
          ) : (
            <TiArrowSortedUp opacity={selected ? 1 : 0} />
          )}
        </Link>
      ) : (
        <Text fontSize={14} color="gray.600">
          {children}
        </Text>
      )}
    </TH>
  )
}

export default HeaderCell
