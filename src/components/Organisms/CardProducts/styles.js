import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
  border-radius: 30px;
  display: flex;
  gap: 15px;
  padding: 15px;
  max-width: min-content;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const Image = styled.img`
  min-width: 15vh;
  width: 10vw;
  min-height: 10vw;
  border-radius: 10px;
`

export const ProductName = styled.p`
  flex-wrap: wrap;
  font-size: 1rem;
  color: #000000;
`
/*
export const ProductDescription = styled.p`
  margin-top: 5px;
  flex-wrap: wrap;
  word-wrap: break-word;
  font-size: 1rem;
  color: #000000;
`
*/
export const ProductPrice = styled.p`
  font-weight: 500;
  font-size: 1rem;
  line-height: 21px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #000000;
`
