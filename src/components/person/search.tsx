import React from 'react'

import Input from '../inputs/input'
import theme from '../../styles/theme'
import { BsSearch } from 'react-icons/bs'
import { usePerson } from '../../hooks/personContext'
import { InputGroup, InputLeftElement } from '@chakra-ui/core'

const Search: React.FC = () => {
  const { search, setSearch } = usePerson()

  return (
    <InputGroup width="50%" marginLeft="30px">
      <InputLeftElement
        style={{ height: '50px' }}
        children={<BsSearch style={{ fill: theme.colors.gray[600] }} />}
      />
      <Input
        flex="1"
        type="phone"
        placeholder="Procure por nome, cnpj, email..."
        paddingLeft="40px"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </InputGroup>
  )
}

export default Search
