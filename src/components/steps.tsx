import React from 'react'
import { Text, Avatar, Flex, PseudoBox, Icon } from '@chakra-ui/core'

export interface Step {
  number: number
  text: string
  isFirst: boolean
  isLast: boolean
}

interface StepsProps {
  steps: string[]
}

const Steps: React.FC<StepsProps> = ({ steps }) => {
  const Step: React.FC<Step> = ({ number, text, isFirst, isLast }) => {
    return (
      <Flex flex={1} direction="column">
        <PseudoBox
          width="100%"
          height="24px"
          display="flex"
          marginTop="24px"
          alignItems="center"
        >
          <PseudoBox
            flex={1}
            height="2px"
            backgroundColor={isFirst ? 'transparent' : 'gray.300'}
          />
          {!isLast && (
            <Avatar name={number.toString()} backgroundColor="gray.400" />
          )}
          {isLast && (
            <PseudoBox
              width="48px"
              height="48px"
              display="flex"
              alignItems="center"
              borderRadius="100%"
              justifyContent="center"
              backgroundColor="green.100"
            >
              <Icon name="check" fontSize={20} color="white" />
            </PseudoBox>
          )}
          <PseudoBox
            flex={1}
            height="2px"
            backgroundColor={isLast ? 'transparent' : 'gray.300'}
          />
        </PseudoBox>

        <Text width="100%" marginTop="20px" textAlign="center" paddingX="20px">
          {text}
        </Text>
      </Flex>
    )
  }

  return (
    <Flex width="100%">
      {steps.map((step, index) => {
        return (
          <Step
            text={step}
            number={index + 1}
            key={`step_${index}`}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
          />
        )
      })}
    </Flex>
  )
}

export default Steps
