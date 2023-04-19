import styled from 'styled-components'

export const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 35px;
  padding: 35px 0;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #ffffff;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border: none;
  }

  .rec.rec-arrow:hover {
    border: 2px solid #9758a6;
    background-color: #ffffff;
    color: #9758a6;
  }

  .rec.rec-arrow:disabled {
    border: none;
    color: #ffffff;
  }
`

export const OffersImage = styled.img`
  max-width: 60vh;
  width: 30vh;
  max-height: 60vh;
  height: 10vh;
  border: none;
`
export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 120%;
    margin: 10px 0px;
    color: #424242;
  }

  h2 {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 120%;
    margin: 0px 8px;
    color: #424242;
  }
`

export const Image = styled.img`
  width: 28vh;
  min-width: 23vh;
  height: 28vh;
  min-height: 23vh;
  border-radius: 1vw;
`

export const Button = styled.button`
  margin-top: 5px;
  background: #9758a6;
  box-shadow: 0px 5px 10px rgba(151, 88, 166, 0.22),
    0px 20px 40px rgba(151, 88, 166, 0.24);
  border-radius: 8px;

  width: 200px;
  height: 50px;
  border: none;

  font-family: 'Source Sans Pro';
  font-style: bold;
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;

  text-align: center;

  color: #ffffff;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
