import React from 'react'
import { IoIosClose } from 'react-icons/io'
import CardInfo from '../../components/cardInfo'
import { useSales } from '../../hooks/salesContext'
import clientService from '../../services/clientService'
import { Avatar, Text, Flex, Button, Tooltip } from '@chakra-ui/core'
import SelectCreatable from '../../components/inputs/select/creatable'

const SelectSalesClient: React.FC = () => {
  const { client, setClient } = useSales()

  return (
    <CardInfo title="Cliente" cursor="default" marginBottom="20px">
      {!client && (
        <SelectCreatable
          marginBottom={0}
          marginTop="20px"
          service={clientService}
          setValue={setClient}
          value={client}
          entity="cliente"
        />
      )}
      {client && (
        <Flex direction="column">
          <Flex alignItems="center" marginTop="20px">
            <Flex>
              <Avatar name={client?.name} width="40px" height="40px" />
            </Flex>
            <Flex flex={1} direction="column" marginX="15px">
              <Text fontWeight="bold">{client.name}</Text>
              <Text color="gray.600">
                {client.celphone ||
                  client.phone ||
                  client.email ||
                  'sem contato'}
              </Text>
            </Flex>
            <Tooltip aria-label="" label="Remover cliente" placement="top">
              <Button
                variant="link"
                display="flex"
                fontSize={30}
                cursor="point"
                color="gray.300"
                alignItems="center"
                justifyContent="flex-end"
                _hover={{ color: 'red.600' }}
                _focus={{ outline: 'none' }}
              >
                <IoIosClose
                  onClick={() => {
                    setClient(null)
                  }}
                />
              </Button>
            </Tooltip>
          </Flex>
          <Flex></Flex>
        </Flex>
      )}
    </CardInfo>
  )
}

export default SelectSalesClient
