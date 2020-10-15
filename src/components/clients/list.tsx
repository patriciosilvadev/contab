import React, { useEffect, useState } from 'react'

import { useClients } from '../../hooks/clientContext'
import { Checkbox, Flex, Text } from '@chakra-ui/core'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { Client, ListHeader } from '../../config/interfaces/clients'

import Link from '../inputs/link'
import Pagination from '../pagination'
import theme from '../../styles/theme'
import ClientListItem from './listItem'
import ButtonOut from '../inputs/buttonOut'
import constants from '../../config/constants'
import clientService from '../../services/clientService'

const ClientList: React.FC = () => {
  const padding = 10
  const itemsPerPage = 10
  const {
    clients,
    filter,
    order,
    search,
    setPage,
    setOrder,
    updateList
  } = useClients()

  const [pageCount, setPageCount] = useState<number>()
  const [orderAsc, setOrderAsc] = useState<boolean>(true)
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0)
  const [filteredClients, setFilteredClients] = useState<Client[]>([])

  const hasItemToShow = filteredClients.length > 0

  useEffect(() => {
    applyFilters()
    setPageCount(Math.ceil(filteredClients.length / itemsPerPage))
  }, [clients, filter, order, search, orderAsc])

  /**
   * Actions
   */

  const applyFilters = () => {
    const verifySearch = (client: Client) => {
      const commonSearch = search.toLowerCase()
      const verifyPropertie = value => {
        return value ? value.toLowerCase().includes(commonSearch) : false
      }

      return (
        verifyPropertie(client.name) ||
        verifyPropertie(client.email) ||
        verifyPropertie(client.cpf) ||
        verifyPropertie(client.cnpj) ||
        verifyPropertie(client.phone) ||
        verifyPropertie(client.celphone)
      )
    }

    const verifyFilter = (client: Client) => {
      switch (filter) {
        case constants.FILTER_CLIENTS_ACTIVE:
          return client.active
        case constants.FILTER_CLIENTS_INACTIVE:
          return !client.active
        default:
          return true
      }
    }

    const filteredList = clients
      .filter(client => {
        client.selected = false
        return verifyFilter(client) && verifySearch(client)
      })
      .sort((firstClient, secondClient) => {
        const asc = orderAsc ? 1 : -1
        const desc = orderAsc ? -1 : 1
        return firstClient[order] > secondClient[order] ? asc : desc
      })

    setNumberOfSelected(0)
    setFilteredClients(filteredList)
  }

  const toggleAllClients = checkBox => {
    const checked = checkBox.checked
    const indeterminate = checkBox.indeterminate
    const status = indeterminate ? true : checked

    let countSelected = 0
    const selectedClients = filteredClients.map(client => {
      client.selected = status
      countSelected += status ? 1 : 0
      return client
    })

    setFilteredClients(selectedClients)
    setNumberOfSelected(countSelected)
  }

  const batchToggleActive = async () => {
    await filteredClients.forEach(async client => {
      if (client.selected) {
        await clientService.toggleActive(client)
      }
    })

    updateList()
    setNumberOfSelected(0)
  }

  /**
   * Elements
   */

  const TH: React.FC<ListHeader> = props => {
    const { order: orderParam, children } = props

    const setOrderHeader = () => {
      if (orderParam) {
        if (order === orderParam) {
          setOrderAsc(!orderAsc)
        }
        setOrder(orderParam)
      }
    }

    return (
      <th style={{ padding: padding }}>
        {orderParam ? (
          <Link
            onClick={setOrderHeader}
            display="flex"
            flexDirection="row"
            alignItems="center"
            color="gray.600"
            _hover={{ opacity: 0.5 }}
          >
            {children}
            {order === orderParam &&
              (orderAsc ? <TiArrowSortedDown /> : <TiArrowSortedUp />)}
          </Link>
        ) : (
          <Text fontSize={14} color="gray.600">
            {children}
          </Text>
        )}
      </th>
    )
  }

  return (
    <>
      <Text marginBottom="10px" fontSize={12} color="gray.600">
        <b>{numberOfSelected}</b> clientes selecionado(s)
        <ButtonOut
          fontSize={12}
          height="20px"
          marginLeft="10px"
          isDisabled={numberOfSelected === 0}
          onClick={batchToggleActive}
        >
          Ativar/Inativar
        </ButtonOut>
      </Text>
      <Flex
        direction="column"
        borderWidth={1}
        borderColor={theme.colors.gray[300]}
        borderRadius={10}
        overflow="hidden"
        marginBottom="40px"
      >
        <table>
          <thead
            style={{
              textAlign: 'left',
              borderBottomWidth: 1,
              borderColor: theme.colors.gray[300],
              backgroundColor: theme.colors.gray[100]
            }}
          >
            <tr>
              <TH>
                {hasItemToShow && (
                  <Checkbox
                    size="lg"
                    backgroundColor="white"
                    borderColor={theme.colors.gray[300]}
                    borderRadius={5}
                    isIndeterminate={
                      numberOfSelected > 0 &&
                      !(numberOfSelected === filteredClients.length)
                    }
                    isChecked={numberOfSelected === filteredClients.length}
                    onChange={e => toggleAllClients(e.target)}
                  />
                )}
              </TH>
              <TH order="name">Nome</TH>
              <TH>CPF/CNPJ</TH>
              <TH order="email">Email</TH>
              <TH>Telefone</TH>
              <TH order="active">Status</TH>
              <TH></TH>
            </tr>
          </thead>
          <tbody>
            {hasItemToShow &&
              filteredClients.map((client, key) => (
                <ClientListItem
                  key={key}
                  client={client}
                  numberOfSelected={numberOfSelected}
                  setNumberOfSelected={setNumberOfSelected}
                  filteredClients={filteredClients}
                  setFilteredClients={setFilteredClients}
                />
              ))}
            {!hasItemToShow && (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  Nenhum cliente foi encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Flex>

      {hasItemToShow && pageCount > 1 && (
        <Pagination pageCount={pageCount} setPage={setPage} />
      )}
    </>
  )
}

export default ClientList
