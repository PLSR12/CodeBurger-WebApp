import styled from 'styled-components'

export const Container = styled.div`
  background-color: #e5e5e5;
  width: 100%;
  min-height: calc(100vh - 70px);
`

export const CartImage = styled.img`
  width: 100%;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  padding-bottom: 30px;

  @media screen and (max-width: 1000px) {
  display: flex;
  flex-direction: column;
  justify-content:center;
  flex-wrap: wrap;
  gap: 30px;
  padding-bottom: 30px;
  }
`
