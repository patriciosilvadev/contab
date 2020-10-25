import React from 'react'
import Search from '../../components/search'
import Content from '../../components/content'
import constants from '../../config/constants'
import Button from '../../components/inputs/button'
import Breadcrumb from '../../components/breadcrumb'
import { Flex, useDisclosure } from '@chakra-ui/core'
import PersonList from '../../components/person/listPerson'
import FilterButton from '../../components/person/filterButtons'
import { PersonIndexProps } from '../../config/interfaces/person'
import NewPersonModal from '../../components/person/newPersonModal'
import { PersonProvider, usePerson } from '../../hooks/personContext'
import EditPersonModal from '../../components/person/editPersonModal'

const PersonIndex: React.FC<PersonIndexProps> = props => {
  const { type, service } = props
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNewClose
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()

  const breadcrumb = [{ label: 'Visão Geral', link: '/' }]
  const displayName =
    type + (type === constants.PERSON_TYPE_SUPPLIER ? 'es' : 's')

  switch (type) {
    case constants.PERSON_TYPE_SUPPLIER:
      breadcrumb.push({ label: 'Fornecedores', link: '/suppliers' })
      break
    default:
      breadcrumb.push({ label: 'Clientes', link: '/person' })
  }

  /**
   * Elements
   */

  const SearchList: React.FC = () => {
    const { search, setSearch } = usePerson()

    return (
      <Flex>
        <Button width="200px" marginRight="auto" onClick={onNewOpen}>
          Criar novo
        </Button>
        <Flex width="50%">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Procure por qualquer campo"
          />
        </Flex>
      </Flex>
    )
  }

  /**
   * Component
   */

  return (
    <PersonProvider
      type={type}
      service={service}
      onNewClose={onNewClose}
      onEditClose={onEditClose}
      onEditOpen={onEditOpen}
    >
      <Content title={displayName}>
        <Breadcrumb pages={breadcrumb} />

        <Flex direction="column" marginTop="40px">
          <SearchList />
          <FilterButton name={displayName} />
          <PersonList />
        </Flex>

        <NewPersonModal isOpen={isNewOpen} />
        <EditPersonModal isOpen={isEditOpen} />
      </Content>
    </PersonProvider>
  )
}

export default PersonIndex
