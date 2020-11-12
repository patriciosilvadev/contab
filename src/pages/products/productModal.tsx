import React, { useState } from 'react'

import {
  Product,
  ProductFormProps,
  ProductValidation
} from '../../config/interfaces/product'
import { useToast } from '@chakra-ui/core'
import Drawer from '../../components/drawer'
import ProductFiscalForm from './productFiscalForm'
import { useEntity } from '../../hooks/entityContext'
import ProductGeneralForm from './productGeneralForm'
import ProductSuppliersForm from './productSuppliersForm'

interface ProductModalProps {
  isOpen: boolean
  isEditMode: boolean
}

const ProductModal: React.FC<ProductModalProps> = props => {
  const {
    type,
    editEntity,
    setEditEntity,
    onNewClose,
    updateList,
    service
  } = useEntity()
  const toast = useToast()
  const { isOpen, isEditMode } = props
  const [loading, setLoading] = useState<boolean>(false)

  // Create entity
  const [product, setProduct] = useState<Product>({ name: '' } as Product)
  const [validation, setValidation] = useState<ProductValidation>({
    nameIsValid: true
  })

  const labelMode = isEditMode ? 'Editar' : 'Novo'
  const actionMode = isEditMode ? 'atualiza' : 'cria'

  /**
   * Actions
   */

  async function submit() {
    setLoading(true)

    const entityToSubmit = isEditMode ? editEntity : product
    const { isValid, newValidation } = service.isValidatedForm(entityToSubmit)
    setValidation(newValidation)

    if (isValid) {
      const handleServer = isEditMode ? service.update : service.create
      const { status } = await handleServer(entityToSubmit)
      const isError = status !== 200

      toast({
        title: `${labelMode} ${type}`,
        description: isError
          ? `Ocorreu um erro ao ${actionMode}r o ${type.toLowerCase()}.`
          : `${type} ${actionMode}do com sucesso.`,
        status: isError ? 'error' : 'success',
        duration: 9000,
        isClosable: true
      })

      updateList()
      onCloseDrawer()
    }

    setLoading(false)
  }

  const onCloseDrawer = () => {
    onNewClose()
    setProduct({ name: '' } as Product)
  }

  /**
   * Props
   */

  const formProps: ProductFormProps = {
    loading: loading,
    validation: validation,
    product: isEditMode ? editEntity : product,
    setProduct: isEditMode ? setEditEntity : setProduct
  }

  /**
   * Component
   */

  return (
    <Drawer
      size="md"
      title={`${labelMode} ${type}`}
      isOpen={isOpen}
      buttonText="Salvar"
      onClose={onCloseDrawer}
      submitForm={submit}
    >
      <ProductGeneralForm {...formProps} />
      <ProductFiscalForm {...formProps} />
      <ProductSuppliersForm {...formProps} />
    </Drawer>
  )
}

export default ProductModal
