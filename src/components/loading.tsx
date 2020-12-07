import React, { useEffect, useState } from 'react'
import { Image, Flex } from '@chakra-ui/core'
import { motion } from 'framer-motion'

import logoImg from '../assets/logo.png'

const MotionFlex = motion.custom(Flex)
const MotionImage = motion.custom(Image)

interface LoadingProps {
  visible: boolean
}

const Lading: React.FC<LoadingProps> = props => {
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    if (!props.visible) {
      setTimeout(() => {
        setShow(false)
      }, 1000)
    }
  }, [props.visible])

  if (!show) {
    return <></>
  }

  return (
    <MotionFlex
      zIndex={99}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#00c837"
      opacity={1}
      animate={{
        opacity: props.visible ? null : [1, 0]
      }}
    >
      <MotionImage
        src={logoImg}
        size={75}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </MotionFlex>
  )
}

export default Lading
