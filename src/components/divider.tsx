import React from 'react'
import { Divider as ChakraDivider, Grid } from '@chakra-ui/core'

const Divider: React.FC = () => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={12} width="100%">
      <ChakraDivider marginY={6} borderColor="gray.600" />
      <ChakraDivider marginY={6} borderColor="gray.600" />
    </Grid>
  )
}

export default Divider
