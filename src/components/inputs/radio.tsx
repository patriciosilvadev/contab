import React from 'react'
import {
  Text,
  Box,
  RadioGroup,
  Radio as ChakraRadio,
  RadioGroupProps
} from '@chakra-ui/core'

interface RadioCustomProps extends RadioGroupProps {
  label?: string
  options?: { key: string; value: string }[]
}

const Radio: React.FC<RadioCustomProps> = props => {
  const { label, options, ...rest } = props

  return (
    <Box flex={rest.flex} marginRight={rest.mr}>
      {label && (
        <Text marginBottom="5px" fontSize={14} color="gray.600">
          {label}
        </Text>
      )}
      <RadioGroup {...rest}>
        {options.map(option => (
          <ChakraRadio key={option.key} value={option.key} variantColor="green">
            {option.value}
          </ChakraRadio>
        ))}
      </RadioGroup>
    </Box>
  )
}

export default Radio
