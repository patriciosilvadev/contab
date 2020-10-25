import React from 'react'
import Content from '../../components/content'
import Button from '../../components/inputs/button'
import Search from '../../components/person/search'
import Breadcrumb from '../../components/breadcrumb'
import { Flex, useDisclosure } from '@chakra-ui/core'
import { ProductProvider } from '../../hooks/productContext'

const ProductIndex: React.FC = () => {
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNewClose
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()

  const breadcrumb = [
    { label: 'Visão Geral', link: '/' },
    { label: 'Produtos', link: '/products' }
  ]

  return (
    <ProductProvider
      onNewClose={onNewClose}
      onEditClose={onEditClose}
      onEditOpen={onEditOpen}
    >
      <Content title="Produtos">
        <Breadcrumb pages={breadcrumb} />

        <Flex direction="column" marginTop="40px">
          <Flex>
            <Button width="200px" marginRight="auto" onClick={onNewOpen}>
              Criar novo
            </Button>
            <Search />
          </Flex>
        </Flex>
      </Content>
    </ProductProvider>
  )
}

export default ProductIndex
