import React from 'react'
import SectionForm from '../../components/sectionForm'
import supplierService from '../../services/supplierService'
import { ProductFormProps } from '../../config/interfaces/product'
import SelectCreatable from '../../components/inputs/select/creatable'

const ProductSuppliersForm: React.FC<ProductFormProps> = props => {
  const { product, setProduct } = props

  return (
    <SectionForm title="Fornecedor">
      <SelectCreatable
        isMulti
        entity="fornecedor"
        service={supplierService}
        value={product.suppliers}
        setValue={(value: any) => {
          if (value.length) {
            setProduct({ ...product, suppliers: value })
          } else {
            setProduct({
              ...product,
              suppliers: [...(product.suppliers || []), value]
            })
          }
        }}
      />
    </SectionForm>
  )
}

export default ProductSuppliersForm
