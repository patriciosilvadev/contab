import {
  Flex,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/core'
import Link from './link'
import Input from './input'
import React, { useState } from 'react'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

interface InputPassword extends InputProps {
  label?: string
  invalidMessage?: string
}

const InputPassword: React.FC<InputPassword> = props => {
  const { invalidMessage, label, ...rest } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <Flex>
      <InputGroup marginBottom="15px" flex={1}>
        <Input
          flex={1}
          label={label}
          placeholder="Nova senha"
          invalidMessage={invalidMessage}
          type={showPassword ? 'text' : 'password'}
          {...rest}
        />
        <InputRightElement top={label ? '38px' : '12px'}>
          <Link
            height="100%"
            fontSize={24}
            alignItems="center"
            justifyContent="center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </Link>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}

export default InputPassword
