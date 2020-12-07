import { getCustomStyles } from './styles'
import { Box, InputProps, Text } from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { FindAllProps } from '../../../config/interfaces/list'

interface SelectCreatableProps extends InputProps {
  value: any
  service: any
  label?: string
  entity?: string
  isMulti?: boolean
  placeholder?: string
  setValue(value: any): void
}

const SelectCreatable: React.FC<SelectCreatableProps> = props => {
  const {
    label,
    value,
    entity,
    service,
    isMulti,
    setValue,
    placeholder,
    ...rest
  } = props

  const [options, setOptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadOptions()
  }, [])

  /**
   * Actions
   */

  const loadOptions = async () => {
    setIsLoading(true)

    // Only for entities that require params
    const params: FindAllProps = {
      skip: 0,
      limit: 9999999,
      order: null,
      orderAsc: true,
      search: '',
      filters: [{ field: 'active', value: 'ACTIVE' }]
    }

    const { data, status } = await service.findAll(params)

    if (status === 200) {
      setOptions(data.list || data)
    }

    setIsLoading(false)
  }

  const handleCreate = async (value: any) => {
    setIsLoading(true)

    const { data, status } = await service.create({ name: value })

    if (status === 200) {
      setValue(data)

      const optionList = [...options]
      optionList.push(data)
      setOptions(optionList)
    }

    setIsLoading(false)
  }

  const getValue = () => {
    const isArray = Array.isArray(value)

    if (isArray) {
      return options.filter(option => {
        return value.find(item => item.id === option.id)
      })
    } else {
      return options.find(option => option.id === value)
    }
  }

  /**
   * Component
   */

  return (
    <Box marginBottom="25px" {...rest}>
      {label && (
        <Text marginBottom="5px" fontSize={14} color="gray.600">
          {label}
        </Text>
      )}
      <CreatableSelect
        isClearable
        isMulti={isMulti}
        options={options}
        value={getValue()}
        onChange={setValue}
        isLoading={isLoading}
        isDisabled={isLoading}
        onCreateOption={handleCreate}
        styles={getCustomStyles(null)}
        placeholder={placeholder || 'Selecionar'}
        getOptionValue={option => option.id || option.value}
        getOptionLabel={option => option.name || option.label}
        formatCreateLabel={inputText => `Criar ${entity} "${inputText}"`}
      />
    </Box>
  )
}

export default SelectCreatable
