import React, { useEffect, useState } from 'react'

import { usePerson } from '../../hooks/personContext'
import { Checkbox, Flex, Text } from '@chakra-ui/core'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { Person, ListHeader } from '../../config/interfaces/person'

import Link from '../inputs/link'
import Pagination from '../pagination'
import theme from '../../styles/theme'
import PersonListItem from './listItem'
import ButtonOut from '../inputs/buttonOut'
import constants from '../../config/constants'

const PersonList: React.FC = () => {
  const padding = 10
  const itemsPerPage = 10
  const {
    type,
    service,
    persons,
    filter,
    order,
    search,
    setPage,
    setOrder,
    updateList
  } = usePerson()

  const [pageCount, setPageCount] = useState<number>()
  const [orderAsc, setOrderAsc] = useState<boolean>(true)
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0)
  const [filteredPerson, setFilteredPerson] = useState<Person[]>([])

  const hasItemToShow = filteredPerson.length > 0

  useEffect(() => {
    applyFilters()
    setPageCount(Math.ceil(filteredPerson.length / itemsPerPage))
  }, [persons, filter, order, search, orderAsc])

  /**
   * Actions
   */

  const applyFilters = () => {
    const verifySearch = (person: Person) => {
      const commonSearch = search.toLowerCase()
      const verifyPropertie = value => {
        return value ? value.toLowerCase().includes(commonSearch) : false
      }

      return (
        verifyPropertie(person.name) ||
        verifyPropertie(person.email) ||
        verifyPropertie(person.cpf) ||
        verifyPropertie(person.cnpj) ||
        verifyPropertie(person.phone) ||
        verifyPropertie(person.celphone)
      )
    }

    const verifyFilter = (person: Person) => {
      switch (filter) {
        case constants.FILTER_PERSON_ACTIVE:
          return person.active
        case constants.FILTER_PERSON_INACTIVE:
          return !person.active
        default:
          return true
      }
    }

    const filteredList = persons
      .filter(person => {
        person.selected = false
        return verifyFilter(person) && verifySearch(person)
      })
      .sort((firstPerson, secondPerson) => {
        const asc = orderAsc ? 1 : -1
        const desc = orderAsc ? -1 : 1
        return firstPerson[order] > secondPerson[order] ? asc : desc
      })

    setNumberOfSelected(0)
    setFilteredPerson(filteredList)
  }

  const toggleAllPerson = checkBox => {
    const checked = checkBox.checked
    const indeterminate = checkBox.indeterminate
    const status = indeterminate ? true : checked

    let countSelected = 0
    const selectedPerson = filteredPerson.map(person => {
      person.selected = status
      countSelected += status ? 1 : 0
      return person
    })

    setFilteredPerson(selectedPerson)
    setNumberOfSelected(countSelected)
  }

  const batchToggleActive = async () => {
    await filteredPerson.forEach(async person => {
      if (person.selected) {
        await service.toggleActive(person)
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
        <b>{numberOfSelected}</b> {type.toLowerCase()}(
        {type === constants.PERSON_TYPE_SUPPLIER ? 'es' : 's'}) selecionado(s)
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
                      !(numberOfSelected === filteredPerson.length)
                    }
                    isChecked={numberOfSelected === filteredPerson.length}
                    onChange={e => toggleAllPerson(e.target)}
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
              filteredPerson.map((person, key) => (
                <PersonListItem
                  key={key}
                  person={person}
                  numberOfSelected={numberOfSelected}
                  setNumberOfSelected={setNumberOfSelected}
                  filteredPerson={filteredPerson}
                  setFilteredPerson={setFilteredPerson}
                />
              ))}
            {!hasItemToShow && (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  Nenhum {type.toLowerCase()} foi encontrado
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

export default PersonList
