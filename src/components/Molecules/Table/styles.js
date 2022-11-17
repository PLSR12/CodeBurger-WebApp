import styled from 'styled-components'

export const ContainerTable = styled.div`
  width: 100%;

  .dropdown-toggle {
    background: none;
    border: none;

    &::after {
      display: none;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table thead tr th {
    padding: 13px 20px;

    span.iconSortBy {
      opacity: 0;
      display: none;
    }

    &:first-child {
      span {
        display: none;
      }
    }

    span {
      padding-left: 8px;
    }
  }

  table thead tr th:nth-child(n + 2):nth-child(-n + 5) {
    cursor: pointer;

    &:hover {
      background: #f8f8f8;
    }

    &:hover {
      span.iconSortBy {
        display: initial;
        position: absolute;
        opacity: 0.5;
      }
    }
  }

  table td,
  table th {
    height: 40px;
    padding: 10px 20px;
    background: #fff;
  }

  table tr {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  table tr:hover {
    background-color: #ddd;
  }

  table th {
    padding: 15px 0;
    text-align: left;
    color: #11142d;
    border: none;
  }

  table thead tr {
    border: none;
  }
`

export const BoxFastFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  select,
  button {
    padding: 6px 12px;
    border: none;
    border: 1px solid #000;
    border-radius: 4px;

    font-weight: 500;
    font-size: 11.11px;
    line-height: 125%;
    color: #000;
    background: transparent;
    cursor: pointer;
  }
`

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const BoxRightBar = styled.div`
  display: flex;
`

export const BoxSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .text-field-container {
    margin-right: 17px;
  }

  input {
    box-sizing: border-box;
    width: 288px;
    height: 40px;
    left: 124px;
    top: 133px;
    background: #ffffff;
    border-radius: 4px;
    padding: 5px;
  }

  button {
    box-sizing: border-box;
    width: 48px;
    height: 32px;
    border: none;
    background: #0671e0;
    border-radius: 0px 4px 4px 0px;

    svg {
      width: 16px;
      path {
        fill: #fff;
      }
    }
  }
`

export const ContainerSearchTable = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  h2 {
    font-weight: lighter;
  }
`

export const ButtonCreate = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;
  background: #9758a6;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  p {
    color: #fff;
    font-weight: 500;
    margin-right: 20px;
  }

  svg {
    margin: 0 10px;
  }

  &:hover {
    background: #a070ab;

    p {
      color: #fff;
    }

    svg {
      path {
        fill: #fff;
      }
    }
  }
`

export const InputCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-neutral-500);
  border-radius: 2px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover {
    border-color: var(--color-primary-first-darker);
  }

  &:checked:before {
    content: ' ';
    display: block;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' background='green' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M17.7778 0H2.22222C0.988889 0 0 1 0 2.22222V17.7778C0 19 0.988889 20 2.22222 20H17.7778C19.0111 20 20 19 20 17.7778V2.22222C20 1 19.0111 0 17.7778 0ZM7.77778 15.5556L2.22222 10L3.78889 8.43333L7.77778 12.4111L16.2111 3.97778L17.7778 5.55556L7.77778 15.5556Z' fill='%23A81C00' /%3E%3C/svg%3E");
    background-size: 20px 20px;
    height: 20px;
    width: 20px;
    position: absolute;

    svg {
      fill: green;
    }
  }
`
export const ContainerHeaderTable = styled.div``

export const ContainerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`
