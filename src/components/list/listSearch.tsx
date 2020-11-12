import React from 'react'
import Search from '../search'
import Button from '../inputs/button'
import { Flex } from '@chakra-ui/core'

interface ListSearchProps {
  context(): any
  onNewOpen?(): void
}

const ListSearch: React.FC<ListSearchProps> = props => {
  const { context, onNewOpen } = props
  const { search, setSearch } = context()

  return (
    <Flex>
      {onNewOpen && (
        <Button width="200px" marginRight="auto" onClick={onNewOpen}>
          Criar novo
        </Button>
      )}
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

export default ListSearch
