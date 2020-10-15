import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Text,
  Flex,
  Heading,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/core'

import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FormValidation } from '../../config/interfaces'
import Content from '../../components/landing/content'
import Input from '../../components/inputs/input'
import Link from '../../components/inputs/link'
import Button from '../../components/inputs/button'
import userService from '../../services/userService'

const ForgotPassword: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [validation, setValidation] = useState<FormValidation>({
    passwordIsValid: true
  })

  async function resetPassword() {
    setLoading(true)

    const token = router.query.token as string

    if (!password || !password.trim()) {
      setValidation({ ...validation, passwordIsValid: false })
    } else {
      const { data } = await userService.resetPasswod(token, password)

      if (data && data.updated) {
        toast({
          title: 'Resetar Senha',
          description: 'Senha resetada com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        router.push('/login')
      } else {
        toast({
          title: 'Resetar Senha',
          description: data.error,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }

    setLoading(false)
  }

  return (
    <Content title="Resetar senha">
      <Flex
        width="100vw"
        height="calc(100vh - 224px)"
        align="center"
        justify="center"
      >
        <Flex width="300px" direction="column">
          <Heading color="green.300">Redefinir Senha</Heading>
          <Text marginY="20px" color="gray.600">
            Informe sua nova senha de acesso e não esqueça de conferir se as
            informações estão corretas.
          </Text>
          <InputGroup size="md" marginBottom="15px" flexDirection="column">
            <Input
              pr="4.5rem"
              placeholder="Nova senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              isDisabled={loading}
              isInvalid={!validation.passwordIsValid}
              invalidMessage="Senha inválida"
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement top="12px" right="5px">
              <Link
                fontSize={24}
                height="100%"
                justifyContent="center"
                alignItems="center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </Link>
            </InputRightElement>
          </InputGroup>
          <Button
            loading={loading}
            isDisabled={loading}
            onClick={resetPassword}
          >
            Redefinir
          </Button>
        </Flex>
      </Flex>
    </Content>
  )
}

export default ForgotPassword
