import styled from 'styled-components'

export const Container = styled.div`
  .pagination {
    display: inline-block;
  }

  .MuiPagination-root .MuiPagination-ul .MuiPaginationItem-root
    font-weight: 600 !important;
  }

  .MuiPagination-root .MuiPagination-ul .Mui-selected {
    background-color: #0671E0 !important;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
`;