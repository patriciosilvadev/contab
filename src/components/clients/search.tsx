import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { InputGroup, InputLeftElement } from '@chakra-ui/core'

import theme from '../../styles/theme'
import Input from '../../components/inputs/input'
import { useClients } from '../../hooks/clientContext'

const Search: React.FC = () => {
  const { search, setSearch } = useClients()

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
