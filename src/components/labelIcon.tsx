import React from 'react'
import { Flex, Tooltip, Icon, Text, PseudoBoxProps } from '@chakra-ui/core'

interface InputLabelProps extends PseudoBoxProps {
  label: string
  tooltip?: string
}

const InputLabel: React.FC<InputLabelProps> = props => {
  const { label, tooltip, children, ...rest } = props
  return (
    <Flex direction="column" {...rest}>
      <Text
        display="flex"
        alignItems="center"
        marginBottom="5px"
        fontSize={14}
        color="gray.600"
      >
        {label}
        {tooltip && (
          <Tooltip zIndex={1500} label={tooltip} placement="top" aria-label="">
            <Icon name="info" marginLeft="10px" />
          </Tooltip>
        )}
      </Text>
      {children}
    </Flex>
  )
}

export default InputLabel
