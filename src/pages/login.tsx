import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/authContext'

import { Grid, Flex, Image, Text, useToast } from '@chakra-ui/core'
import Divider from '../components/divider'
import Input from '../components/inputs/input'
import Link from '../components/inputs/link'
import Button from '../components/inputs/button'
import Head from 'next/head'

import Loading from '../components/loading'

import logoImg from '../assets/logo-name.png'
import ForgotPassword from '../components/login/forgotPassword'

const Login: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const { isAuthenticated, loading, signIn } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard')
  }, [isAuthenticated])

  async function submitForm() {
    const payload = { email, password }
    const status = await signIn(payload)

    if (status === 200) {
      toast({
        title: 'Bem vindo!',
        description: 'Usuário autenticado com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Usuário inválido',
        description: 'Verifique as credênciais do seu usuário.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  if (loading) return <Loading visible={true} />

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr 480px 480px 1fr"
      templateRows="1fr 480px 1fr"
      templateAreas="
                '. . . .'
                '. logo form .'
                '. . . .'
            "
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>SympleCont - Entrar</title>
      </Head>

      <Flex gridArea="logo" flexDir="column" alignItems="center" padding={16}>
        <Image src={logoImg} alt="SympleCont" />
      </Flex>

      <Flex
        gridArea="form"
        height="100%"
        backgroundColor="gray.300"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={16}
      >
        <Input
          height="50px"
          placeholder="E-mail"
          value={email}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          height="50px"
          placeholder="Senha"
          marginTop={2}
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <ForgotPassword />

        <Button marginTop={6} onClick={submitForm}>
          Entrar
        </Button>

        <Divider />

        <Text textAlign="center" fontSize="sm" color="green.300">
          Ainda não faz parte da equipe?
        </Text>

        <Button
          variation="secondary"
          marginTop={6}
          onClick={() => router.push('/#pricing')}
        >
          Adquira um plano!
        </Button>
      </Flex>
    </Grid>
  )
}

export default Login
