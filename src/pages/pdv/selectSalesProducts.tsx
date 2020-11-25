import SelectSalesItem from './selectSalesItem'
import { IoIosClose } from 'react-icons/io'
import Search from '../../components/search'
import CardInfo from '../../components/cardInfo'
import { RiEmotionSadLine } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import { useSales } from '../../hooks/salesContext'
import productService from '../../services/productService'
import { FindAllProps } from '../../config/interfaces/list'
import { Category } from '../../config/interfaces/category'
import categoryService from '../../services/categoryService'
import { Flex, FlexProps, PseudoBox, Text, Tooltip } from '@chakra-ui/core'
import { FindAllProductsProps, Product } from '../../config/interfaces/product'

const SelectSalesProducts: React.FC = () => {
  const { salesProducts, setSalesProducts } = useSales()

  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<Category>()
  const [categories, setCategories] = useState<Category[]>([])
  const [showProducts, setShowProducts] = useState<boolean>(false)
  const [filteredProducts, setFilteredProducts] = useState<Category[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (search || category) {
      loadProducts()
    } else {
      setShowProducts(false)
    }
  }, [search, category])

  /**
   * Actions
   */

  const loadCategories = async () => {
    const params: FindAllProps = {
      skip: 0,
      order: null,
      orderAsc: true,
      limit: 9999999
    }

    const { data, status } = await categoryService.findAll(params)

    if (status === 200) {
      setCategories(data)
    }
  }

  const loadProducts = async () => {
    const params: FindAllProductsProps = {
      skip: 0,
      order: null,
      limit: 9999999,
      orderAsc: true,
      search: search,
      categoryId: category?.id
    }

    const { data, status } = await productService.findAll(params)

    if (status === 200) {
      setFilteredProducts(data.list)
      setShowProducts(true)
    }
  }

  const addProduct = (product: Product) => {
    const salesProductsCopy = [...salesProducts]
    const index = salesProductsCopy.findIndex(
      salesFound => salesFound.product.id === product.id
    )

    if (index > -1) {
      salesProductsCopy[index].quantity += 1
    } else {
      salesProductsCopy.push({ product: product, quantity: 1 })
    }

    setSalesProducts(salesProductsCopy)
  }

  /**
   * Elements
   */

  const ScrollContent: React.FC<FlexProps> = ({ children, ...rest }) => (
    <Flex
      direction="column"
      position="absolute"
      top="185px"
      left="30px"
      right="30px"
      bottom="30px"
      overflowY="scroll"
      {...rest}
    >
      {children}
    </Flex>
  )

  const EmptyList: React.FC = () => {
    return (
      <ScrollContent justifyContent="center" alignItems="center">
        <Text marginBottom="10px" fontSize={30} color="yellow.400">
          <RiEmotionSadLine />
        </Text>
        <Text color="gray.400">Nenhum item encontrado</Text>
      </ScrollContent>
    )
  }

  /**
   * Component
   */

  return (
    <CardInfo
      title="Produtos"
      cursor="default"
      position="relative"
      height="calc(100vh - 400px)"
    >
      <Flex direction="column" marginTop="20px">
        <Search search={search} setSearch={setSearch} marginBottom="20px" />
        {(search || category) && (
          <Flex
            display="flex"
            color="gray.400"
            marginBottom="10px"
            fontSize={14}
          >
            <Text display="flex">
              Produtos
              {search && (
                <Text display="flex" marginLeft={1}>
                  com{' '}
                  <Text as="b" marginLeft={1}>
                    {search}
                  </Text>
                </Text>
              )}
              {category && (
                <Text display="flex" marginLeft={1}>
                  da categoria{' '}
                  <Text as="b" marginLeft={1}>
                    {category.name}
                  </Text>
                </Text>
              )}
            </Text>
            <Tooltip aria-label="" label="Remover filtros" placement="top">
              <PseudoBox
                flex={1}
                fontSize={20}
                display="flex"
                color="gray.400"
                cursor="pointer"
                justifyContent="flex-end"
                _hover={{ color: 'red.600' }}
                onClick={() => {
                  setSearch('')
                  setCategory(null)
                }}
              >
                <IoIosClose />
              </PseudoBox>
            </Tooltip>
          </Flex>
        )}

        {!search && !category && (
          <Text color="gray.400" marginBottom="10px" fontSize={14}>
            Busque por Categorias
          </Text>
        )}

        {!showProducts && (
          <ScrollContent>
            {categories.map(category => (
              <SelectSalesItem
                key={`category_${category.id}`}
                entity={category}
                onSetEntity={setCategory}
              />
            ))}
          </ScrollContent>
        )}

        {showProducts && filteredProducts.length > 0 && (
          <ScrollContent>
            {filteredProducts.map(product => (
              <SelectSalesItem
                isAdd
                entity={product}
                key={`product_${product.id}`}
                onSetEntity={addProduct}
              />
            ))}
          </ScrollContent>
        )}

        {showProducts && filteredProducts.length === 0 && <EmptyList />}
        {!showProducts && categories.length === 0 && <EmptyList />}
      </Flex>
    </CardInfo>
  )
}

export default SelectSalesProducts
