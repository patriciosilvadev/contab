import Head from 'next/head'
import { useRouter } from 'next/router'
import Loading from '../components/loading'
import Divider from '../components/divider'
import logoImg from '../assets/logo-name.png'
import { useAuth } from '../hooks/authContext'
import Input from '../components/inputs/input'
import Button from '../components/inputs/button'
import React, { useState, useEffect } from 'react'
import ForgotPassword from '../components/login/forgotPassword'
import { Grid, Flex, Image, Text, useToast } from '@chakra-ui/core'

const Login: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const { isAuthenticated, signIn } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard')
    } else {
      setLoading(false)
    }
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
      templateRows="1fr 1fr 1fr"
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
        padding={16}
        height="100%"
        gridArea="form"
        flexDir="column"
        borderRadius="md"
        alignItems="stretch"
        backgroundColor="gray.300"
      >
        <Input
          mb={0}
          type="email"
          height="60px"
          value={email}
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          mb={0}
          height="60px"
          marginTop={2}
          type="password"
          value={password}
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />

        <ForgotPassword />

        <Button marginTop={6} onClick={submitForm}>
          Entrar
        </Button>

        <Divider />

        <Text textAlign="center" fontSize="sm" color="green.300">
          Que tal controlar melhor sua empresa?
        </Text>

        <Button
          marginTop={6}
          variation="secondary"
          onClick={() => router.push('/#pricing')}
        >
          Adquira um plano!
        </Button>
      </Flex>
    </Grid>
  )
}

export default Login
