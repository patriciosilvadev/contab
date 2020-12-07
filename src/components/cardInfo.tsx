import React from 'react'
import { PseudoBox, PseudoBoxProps, Text, Tooltip } from '@chakra-ui/core'
import theme from '../styles/theme'

interface CardInfoProps extends PseudoBoxProps {
  title?: string
  header?: string
  headerInfo?: string
  hideBorders?: boolean
  headerTooltip?: string
}

const CardInfo: React.FC<CardInfoProps> = props => {
  const {
    title,
    header,
    headerInfo,
    headerTooltip,
    hideBorders,
    ...rest
  } = props

  return (
    <PseudoBox
      width="100%"
      border={!hideBorders ? `1px solid ${theme.colors.gray[300]}` : ''}
      borderRadius="5px"
      transition="all 0.3s"
      cursor="pointer"
      _hover={
        !hideBorders ? { border: `1px solid ${theme.colors.green[300]}` } : {}
      }
      {...rest}
    >
      {header && (
        <Text
          padding={!hideBorders ? '20px 30px' : ''}
          display="flex"
          flexDirection="row"
          borderBottom={
            props.children || title ? `1px solid ${theme.colors.gray[300]}` : ''
          }
          fontSize={18}
          color="gray.600"
        >
          {header}
          {headerTooltip ? (
            <Tooltip
              aria-label={headerTooltip}
              label={headerTooltip}
              placement="top-end"
            >
              <Text as="span" width="100%" textAlign="end">
                {headerInfo}
              </Text>
            </Tooltip>
          ) : (
            <Text width="100%" textAlign="end">
              {headerInfo}
            </Text>
          )}
        </Text>
      )}

      {(props.children || title) && (
        <PseudoBox padding={!hideBorders ? '30px' : 0} width="100%">
          {title && (
            <Text fontSize={18} color="gray.600">
              {title}
            </Text>
          )}
          {props.children}
        </PseudoBox>
      )}
    </PseudoBox>
  )
}

export default CardInfo
