import {
  AiFillHeart,
  AiFillFacebook,
  AiOutlineWhatsApp,
  AiOutlineInstagram
} from 'react-icons/ai'
import React from 'react'
import Link from '../inputs/link'
import LogoImage from '../../assets/logo-green-sb.png'
import { Flex, Image, PseudoBox, Text } from '@chakra-ui/core'

interface SocialLinkProps {
  color: string
  link?: string
}

const Footer: React.FC = () => {
  const SocialLink: React.FC<SocialLinkProps> = ({ color, link, children }) => {
    return (
      <PseudoBox
        width="40px"
        height="40px"
        display="flex"
        fontSize={20}
        color={color}
        cursor="pointer"
        marginRight="10px"
        borderRadius="100%"
        alignItems="center"
        transition="all 0.3s"
        backgroundColor="white"
        justifyContent="center"
        _hover={{ backgroundColor: 'green.100', color: 'white' }}
      >
        {children}
      </PseudoBox>
    )
  }

  return (
    <Flex
      width="100%"
      padding="50px 10%"
      borderTopWidth={1}
      justifyContent="center"
      borderTopColor="gray.300"
      backgroundColor="gray.100"
    >
      <Flex width="500px" direction="column">
        <Flex
          alignItems="center"
          paddingBottom="20px"
          borderBottomWidth={1}
          borderBottomColor="gray.300"
        >
          <Image src={LogoImage} size={50} marginRight="20px" />
          <Text color="gray.500">© SympleCont - 2020</Text>
        </Flex>
        <Flex marginTop="20px">
          <Flex flex={1}>
            <SocialLink color="purple.400">
              <AiOutlineInstagram />
            </SocialLink>
            <SocialLink color="blue.400">
              <AiFillFacebook />
            </SocialLink>
            <SocialLink color="green.100">
              <AiOutlineWhatsApp />
            </SocialLink>
          </Flex>
          <Flex flex={1} direction="column">
            <Link>cliente@symplecont.com</Link>
            <Text display="flex" alignItems="center" fontSize={12}>
              Feito por gente arretada que{' '}
              <Text as="span" color="red.300" marginX="2px">
                <AiFillHeart />
              </Text>{' '}
              Recife
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Footer
