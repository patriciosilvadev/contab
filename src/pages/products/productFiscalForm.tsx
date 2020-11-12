import React from 'react'
import { Flex } from '@chakra-ui/core'
import constants from '../../config/constants'
import Input from '../../components/inputs/input'
import SectionForm from '../../components/sectionForm'
import Select from '../../components/inputs/select/select'
import { ProductFormProps } from '../../config/interfaces/product'

const ProductFiscalForm: React.FC<ProductFormProps> = props => {
  const { product, setProduct, loading } = props

  return (
    <SectionForm title="Dados fiscais">
      <Select
        value={product.origin}
        label="Origem do produto"
        options={constants.PRODUCT_ORIGIN_LIST}
        setValue={origin => {
          setProduct({ ...product, origin: origin.value })
        }}
      />

      <Flex direction="row" alignItems="center">
        <Select
          flex={1}
          mr="25px"
          value={product.unitType}
          label="Unidade de medida"
          options={constants.UNIT_LIST}
          setValue={unitType => {
            setProduct({ ...product, unitType: unitType.value })
          }}
        />

        <Input
          flex={1}
          mr="25px"
          type="text"
          isDisabled={loading}
          value={product.ncm}
          label="NCM"
          onChange={e => setProduct({ ...product, ncm: e.target.value })}
        />
        <Input
          flex={1}
          type="text"
          isDisabled={loading}
          value={product.cest}
          label="CEST"
          onChange={e => setProduct({ ...product, cest: e.target.value })}
        />
      </Flex>

      <Flex direction="row" alignItems="center">
        <Input
          mb="0"
          flex={1}
          mr="25px"
          type="number"
          isDisabled={loading}
          value={product.netWeight}
          label="Peso líquido"
          onChange={e => setProduct({ ...product, netWeight: e.target.value })}
        />
        <Input
          mb="0"
          flex={1}
          type="number"
          isDisabled={loading}
          value={product.grossWeight}
          label="Peso bruto"
          onChange={e =>
            setProduct({ ...product, grossWeight: e.target.value })
          }
        />
      </Flex>
    </SectionForm>
  )
}

export default ProductFiscalForm
