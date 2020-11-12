import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, PseudoBox, Stack, Link, Flex, Text } from '@chakra-ui/core'

const MotionFlex = motion.custom(Flex)

export const SiteMenu = props => (
  <Stack
    ml="50px"
    as="ul"
    spacing={0}
    listStyleType="none"
    align="center"
    direction="row"
    color="white"
    height="100%"
    {...props}
  />
)

const SiteMenuItem = ({ link, sections, ...props }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <PseudoBox
      as="li"
      color="gray.600"
      fontSize={{ base: 'sm', lg: 'md' }}
      position="relative"
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      {...props}
    >
      <Link
        href={link}
        padding="22px"
        borderTop="4px solid white"
        borderBottom="4px solid white"
        color={showOptions ? 'white' : null}
        backgroundColor={showOptions ? 'green.300' : 'white'}
        borderTopColor={showOptions ? 'green.100' : 'white'}
        borderBottomColor={showOptions ? 'green.300' : 'white'}
        _hover={{
          textDecoration: 'none',
          color: !sections ? 'green.100' : 'white',
          borderBottomColor: 'green.300',
          backgroundColor: sections ? 'green.300' : 'white',
          borderTopColor: sections ? 'green.100' : 'white'
        }}
        _focus={{ outline: 'none' }}
        _active={{ outline: 'none' }}
        transition="all 0.1s"
        cursor="pointer"
      >
        {props.children}
      </Link>

      {sections && showOptions && (
        <MotionFlex
          position="absolute"
          top="47px"
          left="0"
          backgroundColor="green.300"
          color="white"
          borderBottomLeftRadius="5px"
          borderBottomRightRadius="5px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {sections.map((section, index) => {
            const isFirst = index === 0

            return (
              <Flex
                key={section.name}
                direction="column"
                width="300px"
                paddingY="30px"
                borderLeft={!isFirst ? '1px solid rgba(255,255,255,0.5)' : null}
              >
                <Text
                  fontSize={16}
                  marginBottom="15px"
                  paddingX="30px"
                  textTransform="uppercase"
                >
                  {section.name}
                </Text>
                {section.options.map(option => (
                  <Link
                    key={option.link}
                    href={option.link}
                    paddingY="5px"
                    paddingX="30px"
                    fontSize={16}
                    fontWeight="bold"
                    _hover={{ backgroundColor: 'green.100' }}
                  >
                    {option.label}
                  </Link>
                ))}
              </Flex>
            )
          })}
        </MotionFlex>
      )}
    </PseudoBox>
  )
}

const Navigation = ({ menu, ...props }) => (
  <Box
    as="nav"
    width="100%"
    height="100%"
    display={{ base: 'none', lg: 'block' }}
    {...props}
  >
    <SiteMenu>
      {menu.map(item => (
        <SiteMenuItem
          key={item.label}
          link={item.link}
          sections={item.sections}
        >
          {item.label}
        </SiteMenuItem>
      ))}
    </SiteMenu>
  </Box>
)

export default Navigation
