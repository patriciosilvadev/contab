import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/core'
import React from 'react'

interface BreadcrumbProps {
  pages: { label: string; link: string }[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { pages } = props

  return (
    <ChakraBreadcrumb separator=">" marginY="20px">
      {pages.map((page, key) => {
        const isLast = pages.length - 1 === key

        return (
          <BreadcrumbItem key={key} isCurrentPage={isLast}>
            <BreadcrumbLink
              href={page.link}
              color={!isLast ? 'green.300' : null}
              _hover={
                !isLast ? { textDecoration: 'none', color: 'green.100' } : null
              }
            >
              {page.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </ChakraBreadcrumb>
  )
}

export default Breadcrumb
