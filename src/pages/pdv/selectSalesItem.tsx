import React from 'react'
import theme from '../../styles/theme'
import { HiOutlineFilter } from 'react-icons/hi'
import { FiAlertTriangle } from 'react-icons/fi'
import { RiShoppingCartLine } from 'react-icons/ri'
import { Button, PseudoBox, Text } from '@chakra-ui/core'

interface SalesItemProps {
  isAdd?: boolean
  entity: any
  onSetEntity(entity: any): void
}

const SelectSalesItem: React.FC<SalesItemProps> = props => {
  const { entity, onSetEntity, isAdd } = props
  const unvailableItem = isAdd && parseInt(entity.stokAvailable) === 0

  return (
    <Button
      role="group"
      display="flex"
      padding="25px 20px"
      color="green.300"
      borderRadius="5px"
      marginBottom="10px"
      transition="all 0.1s"
      justifyContent="start"
      _focus={{ outline: 'none' }}
      onClick={() => onSetEntity(entity)}
      _hover={{ background: theme.colors.green[100], color: 'white' }}
      _active={{ background: theme.colors.green[300], color: 'white' }}
    >
      <Text
        isTruncated
        width={unvailableItem ? '150px' : '190px'}
        textAlign="start"
      >
        {entity.name}
      </Text>
      <PseudoBox
        flex={1}
        fontSize={20}
        display="none"
        justifyContent="flex-end"
        _groupHover={{ display: 'flex' }}
      >
        {isAdd ? <RiShoppingCartLine /> : <HiOutlineFilter />}
      </PseudoBox>
      {unvailableItem && (
        <PseudoBox
          flex={1}
          fontSize={20}
          display="flex"
          justifyContent="flex-end"
          _groupHover={{ display: 'none' }}
        >
          <FiAlertTriangle color={theme.colors.red[400]} />
        </PseudoBox>
      )}
    </Button>
  )
}

export default SelectSalesItem
