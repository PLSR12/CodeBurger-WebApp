import styled from 'styled-components'

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
