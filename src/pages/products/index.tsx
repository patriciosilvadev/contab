import React, { useState } from 'react'
import ProductList from './productList'
import ProductModal from './productModal'
import Content from '../../components/content'
import constants from '../../config/constants'
import PageTitle from '../../components/pageTitle'
import Breadcrumb from '../../components/breadcrumb'
import { Flex, useDisclosure } from '@chakra-ui/core'
import ListSearch from '../../components/list/listSearch'
import productService from '../../services/productService'
import { EntityProvider, useEntity } from '../../hooks/entityContext'

const ProductIndex: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editMode, setEditMode] = useState<boolean>(false)

  const breadcrumb = [
    { label: 'Visão Geral', link: '/' },
    { label: 'Produtos', link: '/products' }
  ]

  const onNewOpen = () => {
    setEditMode(false)
    onOpen()
  }

  return (
    <EntityProvider
      onEditOpen={onOpen}
      onNewClose={onClose}
      onEditClose={onClose}
      service={productService}
      type={constants.TYPE_PRODUCT}
    >
      <Content title="Produtos">
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>Cadastro de Produtos</PageTitle>

        <Flex direction="column" marginTop="25px">
          <ListSearch context={useEntity} onNewOpen={onNewOpen} />
          <ProductList setEditMode={setEditMode} />
        </Flex>
      </Content>

      <ProductModal isOpen={isOpen} isEditMode={editMode} />
    </EntityProvider>
  )
}

export default ProductIndex
