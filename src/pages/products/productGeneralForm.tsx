import React from 'react'
import { Flex } from '@chakra-ui/core'
import Input from '../../components/inputs/input'
import SectionForm from '../../components/sectionForm'
import TextArea from '../../components/inputs/textArea'
import { Category } from '../../config/interfaces/category'
import categoryService from '../../services/categoryService'
import { ProductFormProps } from '../../config/interfaces/product'
import SelectCreatable from '../../components/inputs/select/creatable'

const ProductGeneralForm: React.FC<ProductFormProps> = props => {
  const { product, setProduct, loading, validation } = props

  return (
    <>
      <Input
        type="text"
        label="Nome"
        isRequired={true}
        value={product.name}
        isDisabled={loading}
        invalidMessage="Campo obrigatório"
        isInvalid={!validation.nameIsValid}
        onChange={e => setProduct({ ...product, name: e.target.value })}
      />
      <Input
        type="text"
        isDisabled={loading}
        value={product.barCode}
        label="Código de barras"
        onChange={e => setProduct({ ...product, barCode: e.target.value })}
      />
      <SelectCreatable
        label="Categoria"
        entity="categoria"
        service={categoryService}
        value={product.categoryId}
        setValue={(category: Category) => {
          setProduct({ ...product, categoryId: category?.id || null })
        }}
      />

      <Flex direction="row">
        <Input
          flex={1}
          mr="20px"
          type="number"
          isDisabled={loading}
          value={product.price}
          label="Valor de venda"
          onChange={e => setProduct({ ...product, price: e.target.value })}
        />
        <Input
          flex={1}
          mr="20px"
          type="number"
          isDisabled={loading}
          value={product.cost}
          label="Custo médio"
          onChange={e => setProduct({ ...product, cost: e.target.value })}
        />
        <Input
          flex={1}
          type="number"
          isDisabled={loading}
          value={product.stokAvailable}
          label="Estoque disponível"
          onChange={e =>
            setProduct({ ...product, stokAvailable: e.target.value })
          }
        />
      </Flex>

      <SectionForm title="Observações">
        <TextArea
          flex="1"
          value={product.obs || ''}
          placeholder="Forneça mais detalhes"
          onChange={e => setProduct({ ...product, obs: e.target.value })}
        />
      </SectionForm>
    </>
  )
}

export default ProductGeneralForm
