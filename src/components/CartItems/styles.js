import styled from 'styled-components'

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  padding: 10px;
  width: fit-content;  
`

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;
  border-bottom: 1px solid #b5b5b5;
  p {
    font-size: 1rem;
    color: #b5b5b5;
  }
`

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  grid-gap: 10px 15px;
  padding: 10px;
  

  @media screen and (max-width: 1000px) {
    width:100%;
    grid-gap: 10px 10px;
    flex-direction: column;
    flex-wrap: wrap;
  }
  img {
    border-radius: 10px;
    width: 120px;

    @media screen and (max-width: 1000px) {
      border-radius: 10px;
      width: 50px;
  }
  }
  p {
    font-size: 1rem;
    color: #000000;
    @media screen and (max-width: 1000px) {
    font-size: 0.8rem;
    }
  }
  .quantity-container {
    display: flex;
    gap: 20px;
    
    button {
      height: 30px;
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
    p {
      margin-top: 5px;
    }
  }
`
export const EmptyCart = styled.p`
  padding: 20px;
  text-align: center;
  font-weight: bold;
`