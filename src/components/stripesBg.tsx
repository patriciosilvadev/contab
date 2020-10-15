import { Box, PseudoBox } from '@chakra-ui/core'
import React from 'react'

interface StripesProps {
  fixedBottom?: boolean
}

const Stripes = props => (
  <PseudoBox as="span" height="200px" position="absolute" {...props} />
)

const StripesBg: React.FC<StripesProps> = props => {
  return (
    <Box
      zIndex={-1}
      bottom={props.fixedBottom ? 0 : null}
      width="100%"
      height="520px"
      position="absolute"
      transform="skewY(-5deg)"
      transformOrigin="0"
      backgroundColor="green.300"
    >
      <Stripes
        width="45%"
        top="0"
        left="0"
        borderBottomRightRadius="100px"
        backgroundColor="green.100"
      />
      <Stripes
        width="90%"
        top="200px"
        right="0"
        borderTopLeftRadius="100px"
        background="linear-gradient(to right,#004814 -30%,#019c2b 35%)"
      />
      <Stripes
        width="75%"
        right="0"
        bottom="-80px"
        opacity=".55"
        borderBottomLeftRadius="100px"
        backgroundColor="green.100"
      />
    </Box>
  )
}

export default StripesBg
