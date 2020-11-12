import TD from './tD'
import React from 'react'
import { TR } from './styles'
import theme from '../../styles/theme'
import { Badge, Checkbox } from '@chakra-ui/core'
import CustomMenuButton from '../inputs/menuButton'
import { ListItemProps } from '../../config/interfaces/list'

const ListItem: React.FC<ListItemProps> = props => {
  const { item, context, headers, options, hasCheck } = props
  const { list, setList, numberOfSelected, setNumberOfSelected } = context()

  const statusColor = { SENT: 'green', PENDING: 'yellow', CANCELED: 'red' }

  /**
   * Actions
   */

  const setSelected = (selected: boolean) => {
    let countSelected = numberOfSelected
    const updatedItem = list.map(itemFound => {
      if (itemFound === item) {
        itemFound.selected = selected
        countSelected += selected ? 1 : -1
      }

      return itemFound
    })

    setList(updatedItem)
    setNumberOfSelected(countSelected)
  }

  /**
   * Elements
   */

  return (
    <TR>
      {hasCheck && (
        <TD>
          <Checkbox
            size="lg"
            variantColor="green"
            isChecked={item.selected}
            borderColor={theme.colors.gray[300]}
            onChange={e => setSelected(e.target.checked)}
          />
        </TD>
      )}

      {headers.map(header => {
        let data = item[header.field]
        let [objectProp, property, subProperty] = ['', '', '']

        if (header.fieldObject) {
          ;[objectProp, property, subProperty] = header.fieldObject
          const object = item[objectProp]

          if (object) {
            const propertyData = object[property]
            data = subProperty
              ? propertyData
                ? propertyData[subProperty]
                : null
              : propertyData
          }
        }

        const key = header.field || objectProp + property
        header.field = header.field || property || subProperty

        const getDataFormat = (data: any, format: string) => {
          if (data) {
            switch (format) {
              case 'decimal':
              case 'currency':
                return parseFloat(data).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })
              case 'date':
                return new Date(data).toLocaleDateString('pt-BR')
              default:
                return data
            }
          } else {
            return '-'
          }
        }

        switch (header.field) {
          case 'active':
            return (
              <TD key={key}>
                <Badge
                  verticalAlign="-webkit-baseline-middle"
                  borderRadius="20px"
                  padding="2px 8px"
                  variantColor={data ? 'green' : 'yellow'}
                >
                  {data ? 'Ativo' : 'Inativo'}
                </Badge>
              </TD>
            )

          case 'status':
            return (
              <TD key={key}>
                <Badge
                  verticalAlign="-webkit-baseline-middle"
                  borderRadius="20px"
                  padding="2px 8px"
                  variantColor={statusColor[data]}
                >
                  {data}
                </Badge>
              </TD>
            )

          case 'serie':
            // eslint-disable-next-line no-case-declarations
            const entity = item.nf || item
            return (
              <TD key={key}>
                {entity.serie} - {entity.nfNumber}
              </TD>
            )

          case 'cpf':
          case 'cnpj':
            return <TD key={key}>{item.cpf || item.cnpj || '-'}</TD>

          case 'phone':
          case 'celphone':
            return <TD key={key}>{item.phone || item.celphone || '-'}</TD>

          default:
            return <TD key={key}>{getDataFormat(data, header.type)}</TD>
        }
      })}

      {options.length > 0 && (
        <TD width="100px">
          <CustomMenuButton
            item={item}
            options={options}
            borderColor="gray.300"
            color="gray.600"
            height="35px"
            fontSize={14}
          >
            Ações
          </CustomMenuButton>
        </TD>
      )}
    </TR>
  )
}

export default ListItem
