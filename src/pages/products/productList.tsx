import React, { useState } from 'react'
import List from '../../components/list'
import { useToast } from '@chakra-ui/core'
import Dialog from '../../components/dialog'
import { useEntity } from '../../hooks/entityContext'
import { Product } from '../../config/interfaces/product'

interface PoductListProps {
  setEditMode(editMode: boolean): void
}

const ProductList: React.FC<PoductListProps> = props => {
  const {
    type,
    service,
    onEditOpen,
    updateList,
    setEditEntity,
    removeListItem,
    setNumberOfSelected
  } = useEntity()
  const toast = useToast()

  const { setEditMode } = props
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [productToDelete, setProductToDelete] = useState<Product>()
  const [showBatchDelete, setShowBatchDelete] = useState<boolean>(false)
  const [productsToDelete, setProductsToDelete] = useState<Product[]>([])

  /**
   * Actions
   */

  const edit = (product: Product) => {
    setEditMode(true)
    setEditEntity(product)
    onEditOpen()
  }

  /**
   * Delete products in batch
   */

  const showBatchDeleteDialog = (products: Product[]) => {
    setProductsToDelete(products)
    setShowBatchDelete(true)
  }

  const batchDelete = async () => {
    const statusList = []
    await productsToDelete.forEach(async product => {
      if (product.selected) {
        const { status } = await service.delete(product.id)
        statusList.push(status)
      }
    })

    const deleted = !statusList.includes([500, 400])

    toast({
      title: 'Excluir produtos',
      description: deleted
        ? 'Produtos selecionados excluídos com sucesso'
        : 'Ocorreu algum erro ao executar esta opção. Por favor, tente novamente.',
      status: deleted ? 'success' : 'error',
      duration: 9000,
      isClosable: true
    })

    updateList()
    setNumberOfSelected(0)
    setShowBatchDelete(false)
  }

  /**
   * Delete a product
   */

  const showDeleteDialog = (productParam: Product) => {
    setProductToDelete(productParam)
    setShowDelete(true)
  }

  const deleteProduct = async () => {
    const { status } = await service.delete(productToDelete.id)

    const deleted = status === 200

    if (deleted) {
      removeListItem(productToDelete)
    }

    setShowDelete(false)

    toast({
      title: `Excluir ${type}`,
      description: deleted
        ? 'Produto excluído com sucesso'
        : 'Ocorreu algum erro ao executar esta opção. Por favor, tente novamente.',
      status: deleted ? 'success' : 'error',
      duration: 9000,
      isClosable: true
    })
  }

  /**
   * Properties
   */

  const actions = [{ label: 'Excluir', handle: showBatchDeleteDialog }]

  const headers = [
    { field: 'id', displayName: 'Código' },
    { field: 'name', displayName: 'Nome' },
    { fieldObject: ['category', 'name'], displayName: 'Categoria' },
    { field: 'price', displayName: 'Preço (R$)', type: 'currency' },
    {
      field: 'stokAvailable',
      displayName: 'Estoque disponível',
      type: 'decimal'
    }
  ]

  const options = [
    { value: 'Editar', handle: edit },
    { value: 'Excluir', handle: showDeleteDialog }
  ]

  /**
   * Elements
   */

  return (
    <>
      <List
        entityName={type}
        headers={headers}
        actions={actions}
        context={useEntity}
        itemOptions={options}
      />

      <Dialog
        handle={deleteProduct}
        actionText="Excluir"
        isOpen={showDelete}
        setIsOpen={setShowDelete}
        title="Deseja excluir este produto?"
        message="Excluindo este produto você não conseguirá
                acessar no ambiente de Vendas e Relatórios."
      />
      <Dialog
        handle={batchDelete}
        actionText="Excluir Todos"
        isOpen={showBatchDelete}
        setIsOpen={setShowBatchDelete}
        title="Deseja excluir os produtos selecionados?"
        message="Excluindo estes produtos você não conseguirá acessa-los
                 no ambiente de Vendas e Relatórios."
      />
    </>
  )
}

export default ProductList
