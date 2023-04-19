import { Pagination as PaginationPage } from '@mui/material'
import { Container } from './styles'

export function Pagination({ gotoPage, pageOptions }) {
  return (
    <Container>
      <PaginationPage
        count={pageOptions.length}
        shape="rounded"
        onChange={(e, page) => gotoPage(page)}
      />
    </Container>
  )
}
