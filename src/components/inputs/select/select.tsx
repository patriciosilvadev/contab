import React from 'react'
import Select from 'react-select'
import { getCustomStyles } from './styles'
import { Text, InputProps, Flex } from '@chakra-ui/core'

interface SelectCreatableProps extends InputProps {
  value: any
  label?: string
  placeholder?: string
  isDisabled?: boolean
  setValue(value: any): void
  options: { label: string; value: any }[]
}

const SelectCreatable: React.FC<SelectCreatableProps> = props => {
  const {
    label,
    value,
    options,
    setValue,
    isDisabled,
    placeholder,
    ...rest
  } = props

  /**
   * Component
   */

  return (
    <Flex direction="column" justifyContent="center" mb="25px" {...rest}>
      {label && (
        <Text marginBottom="5px" fontSize={14} color="gray.600">
          {label}
        </Text>
      )}
      <Select
        options={options}
        onChange={setValue}
        styles={getCustomStyles(rest)}
        isDisabled={isDisabled}
        placeholder={placeholder || 'Selecionar'}
        value={options.find(option => option.value === value)}
      />
    </Flex>
  )
}

export default SelectCreatable
