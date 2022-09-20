import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 9vh;
  background-color: #ffffff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 1;
`

export const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4vh;
  @media screen and (max-width: 1000px) {
  gap:2vh;
}
`

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 3vh;

@media screen and (max-width: 1000px) {
  gap:2vh;
}
`

export const ContainerText = styled.div`
  p {
    flex-wrap: wrap;
    font-weight: 300;
    font-size: 1rem;
    align-items: center;
    color: #555555;
  }
`

export const PageLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: ${props => (props.isActive ? '#9758a6' : '#555555')};
  font-size: 1rem;
  line-height: 19px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`

export const PageLinkExit = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  line-height: 16px;
  color: #9758a6;
`
export const Line = styled.div`
  height: 4vh;
  border: 0.5px solid #bababa;
`
