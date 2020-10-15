import { Flex } from '@chakra-ui/core'
import React from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
  pageCount: number
  setPage(page: number): void
}

const Pagination: React.FC<PaginationProps> = props => {
  const { pageCount, setPage } = props

  return (
    <Flex direction="row">
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={page => {
          setPage(page)
        }}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </Flex>
  )
}

export default Pagination
