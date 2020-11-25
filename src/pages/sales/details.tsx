import React, { useEffect, useState } from 'react'
import { Avatar, Flex, Text, Divider } from '@chakra-ui/core'
import Drawer from '../../components/drawer'
import { useEntity } from '../../hooks/entityContext'
import constants from '../../config/constants'
import salesService from '../../services/salesService'
import ListTable from '../../components/list/listTable'
import ListHeader from '../../components/list/listHeader'
import ListItem from '../../components/list/listItem'
import { parseCurrency } from '../../config/support'

interface SalesDetailsModalProps {
  isOpen: boolean
}

const SalesDetails: React.FC<SalesDetailsModalProps> = props => {
  const { isOpen } = props
  const { editEntity, onEditClose } = useEntity()
  const [salesProducts, setSalesProducts] = useState<[]>([])

  /**
   * Watchers
   */

  useEffect(() => {
    loadProducts()
  }, [editEntity])

  /**
   * Actions
   */

  const loadProducts = async () => {
    if (editEntity && editEntity.id) {
      const { data, status } = await salesService.findProducts(editEntity.id)
      if (status === 200) {
        setSalesProducts(data)
      }
    }
  }

  /**
   * Parameters
   */

  const headers = [
    { field: 'quantity', displayName: 'Qtd.' },
    { fieldObject: ['product', 'name'], displayName: 'Produto' },
    {
      fieldObject: ['product', 'price'],
      displayName: 'Valor (R$)',
      type: 'currency'
    }
  ]

  /**
   * Component
   */

  return (
    <Drawer
      size="md"
      title={`Venda #${editEntity?.id}`}
      isOpen={isOpen}
      buttonText="Salvar"
      onClose={onEditClose}
    >
      {editEntity && (
        <Flex direction="column">
          {editEntity.client && (
            <Flex direction="column" marginTop="10px">
              <Text color="gray.600">Cliente</Text>
              <Flex alignItems="center" marginTop="10px">
                <Flex>
                  <Avatar
                    name={editEntity?.client?.name}
                    width="40px"
                    height="40px"
                  />
                </Flex>
                <Flex flex={1} direction="column" marginX="15px">
                  <Text fontWeight="bold">{editEntity?.client.name}</Text>
                  <Text color="gray.600">
                    {editEntity?.client.celphone ||
                      editEntity?.client.phone ||
                      editEntity?.client.email ||
                      'sem contato'}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}

          <Flex direction="column" marginTop="20px">
            <Text color="gray.600">Data da venda</Text>
            <Text>
              {new Date(editEntity.createdAt).toLocaleDateString('pt-BR')}
            </Text>
          </Flex>

          <Flex marginTop="20px">
            <Flex flex={1} direction="column">
              <Text color="gray.600">Forma de pagamento</Text>
              <Text>
                {
                  constants.PAY_TYPES.find(
                    type => type.value === editEntity.payForm
                  ).label
                }
              </Text>
            </Flex>
            <Flex flex={1} direction="column">
              <Text color="gray.600">Condição</Text>
              <Text>
                {editEntity.payCondition === 'IN_CASH'
                  ? constants.PAY_CONDITIONS.IN_CASH
                  : editEntity.payCondition.replace('IN_', '')}
              </Text>
            </Flex>
          </Flex>

          {(editEntity.payForm === 'DEBIT_CARD' ||
            editEntity.payForm === 'CREDIT_CARD') && (
            <Flex marginTop="20px">
              <Flex flex={1} direction="column">
                <Text color="gray.600">Cartão</Text>
                <Text>
                  {
                    constants.CREDENTIALS.find(
                      type => type.value === editEntity.payCardAcc
                    ).label
                  }
                </Text>
              </Flex>
              <Flex flex={1} direction="column">
                <Text color="gray.600">Bandeira</Text>
                <Text>
                  {
                    constants.BANDS.find(
                      type => type.value === editEntity.payCardBand
                    ).label
                  }
                </Text>
              </Flex>
              <Flex flex={1} direction="column">
                <Text color="gray.600">Transação</Text>
                <Text>{editEntity.payCardTransaction}</Text>
              </Flex>
            </Flex>
          )}

          <Flex direction="column" marginTop="20px">
            <Text color="gray.600" marginBottom="10px">
              Produtos
            </Text>
            <ListTable>
              <ListHeader
                context={useEntity}
                headers={headers}
                hasCheck={false}
                hasItemOptions={false}
              />
              <tbody>
                {salesProducts.map((sales, key) => (
                  <ListItem
                    key={key}
                    item={sales}
                    headers={headers}
                    context={useEntity}
                    hasCheck={false}
                    options={[]}
                  />
                ))}
              </tbody>
            </ListTable>
          </Flex>

          <Flex marginTop="10px">
            <Flex flex={1} />
            <Flex flex={2} direction="column">
              {editEntity.discount > 0 && (
                <>
                  <Flex marginBottom="10px">
                    <Text width="80px" color="gray.600" marginRight="10px">
                      Total
                    </Text>
                    <Text color="blue.400">
                      {parseCurrency(editEntity.valor + editEntity.discount)}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text width="80px" color="gray.600" marginRight="10px">
                      Desconto
                    </Text>
                    <Text color="red.400">
                      -{parseCurrency(editEntity.discount)}
                    </Text>
                  </Flex>
                  <Divider borderColor="gray.300" />
                </>
              )}
              <Flex alignItems="center">
                <Text width="80px" color="gray.600" marginRight="10px">
                  Total Pago
                </Text>
                <Text fontSize={18} fontWeight="bold" color="green.400">
                  {parseCurrency(editEntity.valor)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Drawer>
  )
}

export default SalesDetails
