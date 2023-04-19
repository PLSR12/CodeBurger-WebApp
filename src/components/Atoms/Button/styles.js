import styled from 'styled-components'

export const ComponentButton = styled.button`
  min-width: 15vh;
  height: 5vh;
  background: #9758a6;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: #eeeeee;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`
