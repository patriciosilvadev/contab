import React from 'react'
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as Input,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper
} from '@chakra-ui/core'

interface CustomNumberInputProps extends NumberInputProps {
  min?: number
  max?: number
  value: number
  hideSteps?: boolean
  setValue(value: number): void
}

const NumberInput: React.FC<CustomNumberInputProps> = props => {
  const { value, setValue, min, max, hideSteps, ...rest } = props

  return (
    <Input
      borderColor="gray.300"
      borderRadius="2px"
      min={min || 0}
      value={value}
      onChange={setValue}
      max={max || 999999}
      {...rest}
    >
      <NumberInputField
        borderRadius={5}
        _focus={{ borderColor: 'green.100' }}
      />
      {!hideSteps && (
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      )}
    </Input>
  )
}

export default NumberInput
