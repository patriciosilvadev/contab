import React from 'react'
import TH from '../../components/list/tH'
import TD from '../../components/list/tD'
import { HiOutlineTrash } from 'react-icons/hi'
import THead from '../../components/list/tHead'
import { TR } from '../../components/list/styles'
import { PseudoBox, Text, Tooltip } from '@chakra-ui/core'
import { useSales } from '../../hooks/salesContext'
import ListTable from '../../components/list/listTable'
import NumberInput from '../../components/inputs/numberInput'
import { SalesProduct } from '../../config/interfaces/salesProduct'

const SalesTable: React.FC = () => {
  const { salesProducts, setSalesProducts } = useSales()

  /**
   * Actions
   */

  const setSalesQuantity = (sales: SalesProduct, quantity: number) => {
    const salesProductsCopy = [...salesProducts]
    const salesIndex = salesProductsCopy.findIndex(salesFound => {
      return salesFound.product.id === sales.product.id
    })

    if (salesIndex > -1 && quantity >= 0) {
      salesProductsCopy[salesIndex].quantity = quantity
    }

    setSalesProducts(salesProductsCopy)
  }

  const removeSalesProduct = (sales: SalesProduct) => {
    const salesProductsCopy = salesProducts.filter(
      salesFound => salesFound.product.id !== sales.product.id
    )
    setSalesProducts(salesProductsCopy)
  }

  /**
   * Component
   */

  return (
    <ListTable
      marginLeft="20px"
      height="calc(100vh - 400px)"
      overflowY="scroll"
    >
      <THead>
        <tr>
          <TH></TH>
          <TH>Produtos</TH>
          <TH>Quantidade</TH>
          <TH>
            Total{' '}
            <Text as="span" fontSize={12}>
              (R$)
            </Text>
          </TH>
          <TH></TH>
        </tr>
      </THead>
      <tbody>
        {salesProducts.map(sales => (
          <TR key={`product_item_${sales.product.id}`}>
            <TD></TD>
            <TD>{sales.product.name}</TD>
            <TD>
              <NumberInput
                min={1}
                width="85px"
                height="40px"
                margin={0}
                value={sales.quantity}
                setValue={quantity => setSalesQuantity(sales, quantity)}
              />
            </TD>
            <TD>{(sales.product.price * sales.quantity).toFixed(2)}</TD>
            <TD>
              <Tooltip
                zIndex={3}
                aria-label=""
                label="Remover produto"
                placement="top"
              >
                <PseudoBox
                  fontSize={20}
                  color="gray.400"
                  cursor="pointer"
                  _hover={{ color: 'red.600' }}
                >
                  <HiOutlineTrash onClick={() => removeSalesProduct(sales)} />
                </PseudoBox>
              </Tooltip>
            </TD>
          </TR>
        ))}
      </tbody>
    </ListTable>
  )
}

export default SalesTable
