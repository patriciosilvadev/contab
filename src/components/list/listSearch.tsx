import React from 'react'
import Search from '../search'
import Button from '../inputs/button'
import { Flex, PseudoBoxProps } from '@chakra-ui/core'

interface ListSearchProps extends PseudoBoxProps {
  context(): any
  onNewOpen?(): void
}

const ListSearch: React.FC<ListSearchProps> = props => {
  const { context, onNewOpen, ...rest } = props
  const { search, setSearch } = context()

  return (
    <Flex {...rest}>
      {onNewOpen && (
        <Button width="200px" marginRight="auto" onClick={onNewOpen}>
          Criar novo
        </Button>
      )}
      <Flex width={onNewOpen ? '50%' : '100%'}>
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
