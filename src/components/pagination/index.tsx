import React from 'react'
import ReactPaginate from 'react-paginate'
import { PaginationContent } from './styles'

interface PaginationProps {
  pageCount: number
  setPage(page: number): void
}

const Pagination: React.FC<PaginationProps> = props => {
  const { pageCount, setPage } = props

  return (
    <PaginationContent>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
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
    </PaginationContent>
  )
}

export default Pagination
