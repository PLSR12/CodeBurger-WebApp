import styled from 'styled-components'

export const Container = styled.div`
  background-color: #ffffff;
  padding: 25px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    width:80%;
    margin:10%;
  }

  .container-top {
    display: grid;
    grid-gap: 10px 60px;
    grid-template-areas:
      'title title'
      'items  items-price'
      'delivery-tax tax-price';
  }

  .title {
    grid-area: title;
    margin-bottom:20px;
  }

  .items {
    grid-area: items;
  }

  .items-price {
    grid-area: items-price;
  }

  .delivery-tax {
    grid-area: delivery-tax;
  }

  .tax-price {
    grid-area: tax-price;

    @media screen and (max-width: 1000px) {
      margin-top:10px;
    }
  }

  .container-bottom {
      display: flex;
      margin-top:50px;
      flex-direction: row;
      justify-content:space-between;
      font-size:24px;
      gap:20px;
  }
`
