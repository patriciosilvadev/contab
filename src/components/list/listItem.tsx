import React from 'react'
import { TR } from './styles'
import { Badge, Checkbox } from '@chakra-ui/core'
import CustomMenuButton from '../inputs/menuButton'
import { ListItemProps } from '../../config/interfaces/list'

const ListItem: React.FC<ListItemProps> = props => {
  const { item, context, headers, options, hasCheck } = props
  const { list, setList, numberOfSelected, setNumberOfSelected } = context()

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

  const TD: React.FC<any> = props => (
    <td style={{ padding: 10, fontSize: 14 }} {...props}>
      {props.children}
    </td>
  )

  return (
    <TR>
      {hasCheck && (
        <TD>
          <Checkbox
            size="lg"
            isChecked={item.selected}
            onChange={e => setSelected(e.target.checked)}
          />
        </TD>
      )}

      {headers.map(header => {
        const data = item[header.field]

        switch (header.field) {
          case 'active':
            return (
              <TD key={header.field}>
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

          case 'cpf':
          case 'cnpj':
            return <TD key={header.field}>{item.cpf || item.cnpj || '-'}</TD>

          case 'phone':
          case 'celphone':
            return (
              <TD key={header.field}>{item.phone || item.celphone || '-'}</TD>
            )

          default:
            return <TD key={header.field}>{data || '-'}</TD>
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
