import React from 'react'
import theme from '../styles/theme'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Collapse, Link, Flex, Text } from '@chakra-ui/core'

interface SectionFormProps {
  title: string
  forceOpen?: boolean
}

const SectionForm: React.FC<SectionFormProps> = props => {
  const { title, forceOpen, children } = props
  const [show, setShow] = React.useState(forceOpen || false)

  const handleToggle = () => {
    if (!forceOpen) {
      setShow(!show)
    }
  }

  const styleTitleHover = {
    color: 'green.100',
    textDecoration: 'none'
  }

  return (
    <Flex direction="column" marginBottom="30px">
      <Link
        display="flex"
        alignItems="center"
        width="100%"
        color="green.300"
        paddingBottom="10px"
        borderBottom={`1px solid ${
          show ? theme.colors.green[300] : theme.colors.gray[300]
        }`}
        _hover={forceOpen ? { cursor: 'default' } : styleTitleHover}
        onClick={handleToggle}
      >
        <Text width="100%">{title}</Text>
        {!forceOpen && (show ? <IoIosArrowUp /> : <IoIosArrowDown />)}
      </Link>
      <Collapse mt={4} isOpen={show}>
        {children}
      </Collapse>
    </Flex>
  )
}

export default SectionForm
