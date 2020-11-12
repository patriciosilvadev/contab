import React from 'react'
import Content from '../../components/content'
import constants from '../../config/constants'
import Breadcrumb from '../../components/breadcrumb'
import { Flex, useDisclosure } from '@chakra-ui/core'
import PersonList from '../../components/person/listPerson'
import FilterButton from '../../components/person/filterButtons'
import { PersonIndexProps } from '../../config/interfaces/person'
import NewPersonModal from '../../components/person/newPersonModal'
import { EntityProvider, useEntity } from '../../hooks/entityContext'
import EditPersonModal from '../../components/person/editPersonModal'
import ListSearch from '../list/listSearch'
import PageTitle from '../pageTitle'

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
  const displayName = type + (type === constants.TYPE_SUPPLIER ? 'es' : 's')

  switch (type) {
    case constants.TYPE_SUPPLIER:
      breadcrumb.push({ label: 'Fornecedores', link: '/suppliers' })
      break
    default:
      breadcrumb.push({ label: 'Clientes', link: '/person' })
  }

  /**
   * Component
   */

  return (
    <EntityProvider
      type={type}
      service={service}
      onNewClose={onNewClose}
      onEditClose={onEditClose}
      onEditOpen={onEditOpen}
    >
      <Content title={displayName}>
        <Breadcrumb pages={breadcrumb} />
        <PageTitle>Cadastro de {type}</PageTitle>

        <Flex direction="column" marginTop="25px">
          <ListSearch context={useEntity} onNewOpen={onNewOpen} />
          <FilterButton name={displayName} />
          <PersonList />
        </Flex>

        <NewPersonModal isOpen={isNewOpen} />
        <EditPersonModal isOpen={isEditOpen} />
      </Content>
    </EntityProvider>
  )
}

export default PersonIndex
