import React from 'react'

import Input from './inputs/input'
import theme from '../styles/theme'
import { BsSearch } from 'react-icons/bs'
import { InputGroup, InputLeftElement, InputProps } from '@chakra-ui/core'

interface SearchProps extends InputProps {
  search: string
  setSearch(search: string): void
}

const Search: React.FC<SearchProps> = props => {
  const { search, setSearch, ...rest } = props

  return (
    <InputGroup flex={1}>
      <InputLeftElement style={{ height: '50px' }}>
        <BsSearch style={{ fill: theme.colors.gray[600] }} />
      </InputLeftElement>
      <Input
        flex="1"
        paddingLeft="40px"
        value={search}
        placeholder={rest.placeholder || 'Procurar'}
        onChange={e => setSearch(e.target.value)}
        {...rest}
      />
    </InputGroup>
  )
}

export default Search
