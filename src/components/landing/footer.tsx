import { Box, PseudoBox, SimpleGrid } from '@chakra-ui/core'
import React from 'react'

const FooterSection = props => (
  <Box
    as="footer"
    pos="relative"
    bg="gray.300"
    py={{ base: '32px', lg: '40px' }}
    {...props}
  />
)

const FooterSectionGroup = props => (
  <SimpleGrid
    columns={{ base: 1, md: 3 }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    {...props}
  />
)

const FooterSectionItem = props => (
  <PseudoBox padding="24px" color="green.100" textAlign="center" {...props} />
)

const Footer: React.FC = () => {
  return (
    <FooterSection alignSelf="flex-end">
      <FooterSectionGroup>
        <FooterSectionItem
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          © {new Date().getFullYear()} SympleCont
        </FooterSectionItem>

        <FooterSectionItem
          fontWeight="bold"
          fontFamily="heading"
          textTransform="uppercase"
        >
          Made with SympleCont
        </FooterSectionItem>
      </FooterSectionGroup>
    </FooterSection>
  )
}

export default Footer
