import React from 'react'
import Content from '../components/landing/content'
import HowWorks from '../components/landing/sections/howWorks'
import Presentation from '../components/landing/sections/presentation'
import StepsToAquire from '../components/landing/sections/stepsToAquire'
import PricingContab from '../components/landing/sections/pricingContab'

const Home: React.FC = () => {
  return (
    <Content title="SympleCont - Contabilidade Digital">
      <Presentation />
      <HowWorks />
      <StepsToAquire />
      <PricingContab />
    </Content>
  )
}

export default Home
