import { Flex, Text, PseudoBoxProps } from '@chakra-ui/core'
import React from 'react'
import CardInfo from '../../components/cardInfo'
import { BankAccountElement } from '../../config/interfaces'

const BankAccounts: React.FC<PseudoBoxProps> = props => {
  const banksAccounts = [
    {
      icon: 'ibb-bradesco',
      iconColor: 'red.600',
      name: 'Bradesco',
      description: 'Conta Corrente',
      valor: 'R$1.250,00'
    },
    {
      icon: 'ibb-nubank',
      iconColor: 'purple.600',
      name: 'Nubank',
      description: 'Conta Corrente',
      valor: 'R$2.050,00'
    },
    {
      icon: 'ibb-itau',
      iconColor: 'blue.600',
      name: 'Itau',
      description: 'Conta Corrente',
      valor: 'R$250,00'
    }
  ]

  const Account: React.FC<BankAccountElement> = props => {
    const { bankAccount } = props
    return (
      <>
        <Flex alignItems="center">
          <Flex>
            <Text
              as="i"
              className={bankAccount.icon}
              fontSize={30}
              color={bankAccount.iconColor}
              marginRight="15px"
            />
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">{bankAccount.name}</Text>
            <Text color="grey.600" fontSize={14}>
              {bankAccount.description}
            </Text>
          </Flex>
        </Flex>
        <Text
          position="absolute"
          bottom="20px"
          right="30px"
          fontSize={16}
          color="gray.600"
        >
          {bankAccount.valor}
        </Text>
      </>
    )
  }

  return (
    <>
      <CardInfo
        header="Contas"
        headerInfo="R$108.154,56"
        headerTooltip="Saldo total das contas cadastradas"
        {...props}
      />

      {banksAccounts.map((bankAccount, index) => {
        const isFirst = index === 0
        const isLast = index === banksAccounts.length - 1
        const isMiddle = !isFirst && !isLast

        return (
          <CardInfo
            key={bankAccount.icon}
            height="250px"
            position="relative"
            borderBottomColor={isLast ? null : 'white'}
            borderRadius={isMiddle ? 0 : 5}
            borderBottomLeftRadius={isFirst ? 0 : null}
            borderBottomRightRadius={isFirst ? 0 : null}
            borderTopLeftRadius={isLast ? 0 : null}
            borderTopRightRadius={isLast ? 0 : null}
          >
            <Account bankAccount={bankAccount} />
          </CardInfo>
        )
      })}
    </>
  )
}

export default BankAccounts
