import React from 'react'

import { Flex, useDisclosure } from '@chakra-ui/core'
import { PersonProvider } from '../../hooks/personContext'

import Content from '../../components/content'
import Button from '../../components/inputs/button'
import Breadcrumb from '../../components/breadcrumb'

import Search from '../../components/person/search'
import PersonList from '../../components/person/list'
import FilterButton from '../../components/person/filterButtons'
import NewPersonModal from '../../components/person/newPersonModal'
import EditPersonModal from '../../components/person/editPersonModal'
import { PersonIndexProps } from '../../config/interfaces/person'
import constants from '../../config/constants'

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
          <Flex>
            <Button width="200px" marginRight="auto" onClick={onNewOpen}>
              Criar novo
            </Button>
            <Search />
          </Flex>
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
