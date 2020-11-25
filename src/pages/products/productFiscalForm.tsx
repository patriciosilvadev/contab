import React from 'react'
import { Flex } from '@chakra-ui/core'
import constants from '../../config/constants'
import Input from '../../components/inputs/input'
import SectionForm from '../../components/sectionForm'
import Select from '../../components/inputs/select/select'
import { ProductFormProps } from '../../config/interfaces/product'
import InputLabel from '../../components/labelIcon'

const ProductFiscalForm: React.FC<ProductFormProps> = props => {
  const { product, setProduct, loading } = props

  return (
    <SectionForm title="Dados fiscais">
      <InputLabel
        label="Origem do produto"
        tooltip="Indique a procedência do seu produto. Consulte os detalhes
        com seu fornecedor ou contador."
      >
        <Select
          value={product.origin}
          options={constants.PRODUCT_ORIGIN_LIST}
          setValue={origin => {
            setProduct({ ...product, origin: origin.value })
          }}
        />
      </InputLabel>

      <Flex direction="row" alignItems="center">
        <InputLabel
          flex={1}
          label="Unid. de medida"
          tooltip="Modo em que seus produtos são comercializados para seus
          clientes (por kilo, por quantidade, entre outros)."
        >
          <Select
            mr="25px"
            value={product.unitType}
            options={constants.UNIT_LIST}
            setValue={unitType => {
              setProduct({ ...product, unitType: unitType.value })
            }}
          />
        </InputLabel>

        <InputLabel
          flex={2}
          label="NCM"
          tooltip="NCM significa 'Nomenclatura Comum do Mercosul' e
          trata-se de um código de oito dígitos estabelecido pelo Governo
          Brasileiro para identificar a natureza das mercadorias.
          Fale com seu contador para saber qual NCM deve ser utilizado para
          cada produto que sua empresa vende."
        >
          <Input
            type="text"
            value={product.ncm}
            isDisabled={loading}
            onChange={e => setProduct({ ...product, ncm: e.target.value })}
          />
        </InputLabel>
      </Flex>

      <Flex direction="row" alignItems="center">
        <InputLabel
          flex={1}
          label="CSOSN"
          tooltip="Para empresas participantes do
          SIMPLES a situação tributária é definida pelo CSOSN.
          Este código determina a tributação (referente ao ICMS) do produto.
          Entre em contato com seu contador para saber qual Situação Tributária
          deve ser utilizada para cada produto e cliente."
        >
          <Input
            mr="25px"
            type="text"
            isDisabled={loading}
            value={product.csosn}
            onChange={e => setProduct({ ...product, csosn: e.target.value })}
          />
        </InputLabel>

        <InputLabel
          flex={1}
          label="CFOP"
          tooltip="Trata-se de um código numérico que identifica a natureza de
          circulação da mercadoria ou a prestação de serviço de transportes.
          Consulte esta informação com seu contador."
        >
          <Input
            mr="25px"
            type="text"
            isDisabled={loading}
            value={product.cfop}
            onChange={e => setProduct({ ...product, cfop: e.target.value })}
          />
        </InputLabel>

        <InputLabel
          flex={1}
          label="CEST"
          tooltip="Código Especificador da Substituição Tributária -
          Identifica a mercadoria sujeita aos regimes de substituição tributária
          e de antecipação do recolhimento do ICMS ST."
        >
          <Input
            type="text"
            isDisabled={loading}
            value={product.cest}
            onChange={e => setProduct({ ...product, cest: e.target.value })}
          />
        </InputLabel>
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
