import { Text } from '@chakra-ui/core'
import React, { useState } from 'react'
import { useAuth } from '../hooks/authContext'

import Link from './inputs/link'
import Input from './inputs/input'
import Button from './inputs/button'
import Select from './inputs/select'
import { FormValidation } from '../config/interfaces'
import userService from '../services/userService'

interface CreateAccountFormProps {
  onSubmit(): void
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = () => {
  const { signUp } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>('Ricardo Paz')
  const [email, setEmail] = useState<string>('ricardopdsf@gmail.com')
  const [cellphone, setCellphone] = useState<string>('81998778051')
  const [password, setPassword] = useState<string>('1234')
  const [role, setRole] = useState<string>('mei')

  const [validation, setValidation] = useState<FormValidation>({
    nameIsValid: true,
    emailIsValid: true,
    cellphoneIsValid: true,
    passwordIsValid: true,
    roleIsValid: true
  })

  async function submitSignUp() {
    setLoading(true)

    const payload = { name, email, password, cellphone, role }
    const { isValid, newValidation } = userService.isValidatedForm(payload)

    setValidation(newValidation)

    if (isValid) {
      await signUp(payload)
    }

    setLoading(false)
  }

  return (
    <>
      <Input
        label="Nome"
        value={name}
        type="text"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.nameIsValid}
        onChange={e => setName(e.target.value)}
        invalidMessage="Você não informou seu nome"
      />
      <Input
        label="E-mail"
        value={email}
        type="email"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.emailIsValid}
        onChange={e => setEmail(e.target.value)}
        invalidMessage="Você não informou um e-mail"
      />
      <Input
        label="Celular"
        value={cellphone}
        type="text"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.cellphoneIsValid}
        onChange={e => setCellphone(e.target.value)}
        invalidMessage="Número de celular inválido"
      />
      <Input
        label="Senha de acesso"
        value={password}
        type="password"
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.passwordIsValid}
        onChange={e => setPassword(e.target.value)}
        invalidMessage="Você não informou sua senha"
      />
      <Select
        label="Você já possui empresa formalizada?"
        placeholder="Selcione uma opção"
        value={role}
        isRequired={true}
        isDisabled={loading}
        isInvalid={!validation.roleIsValid}
        onChange={e => setRole(e.target.value)}
        invalidMessage="Você não selecionou sua situação"
      >
        <option value="services">Sim, de serviços</option>
        <option value="retail">Sim, de varejo</option>
        <option value="industry">Sim, uma industria</option>
        <option value="mei">Sim, sou MEI</option>
        <option value="default">Não</option>
        <option value="accountant">Sou contador</option>
      </Select>

      <Button width="100%" loading={loading} onClick={submitSignUp}>
        Assinar agora
      </Button>
      <Text marginTop="10px" fontSize={11} color="gray.600" textAlign="center">
        Clicando no botão acima você concorda com nossos{' '}
        <Link>termos de uso</Link>
      </Text>
    </>
  )
}

export default CreateAccountForm
