import React from 'react'
import theme from '../../styles/theme'
import { HiOutlineFilter } from 'react-icons/hi'
import { RiShoppingCartLine } from 'react-icons/ri'
import { Button, PseudoBox } from '@chakra-ui/core'
import { Product } from '../../config/interfaces/product'
import { Category } from '../../config/interfaces/category'

interface SalesItemProps {
  isAdd?: boolean
  entity: Category | Product
  onSetEntity(entity: Category | Product): void
}

const SelectSalesItem: React.FC<SalesItemProps> = props => {
  const { entity, onSetEntity, isAdd } = props

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
      {entity.name}
      <PseudoBox
        flex={1}
        opacity={0}
        fontSize={20}
        display="flex"
        justifyContent="flex-end"
        _groupHover={{ opacity: 1 }}
      >
        {isAdd ? <RiShoppingCartLine /> : <HiOutlineFilter />}
      </PseudoBox>
    </Button>
  )
}

export default SelectSalesItem
