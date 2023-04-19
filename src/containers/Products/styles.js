import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: #e5e5e5;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;

  .count-products {
    font-size: 17px;
    padding-bottom: 15px;
    padding-left: 15px;
  }
`

export const HomeImg = styled.img`
  width: 100%;
`

export const CategoriesMenu = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vw;
  margin-top: 3vh;
`

export const CategoryButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${(props) => props.isActiveCategory && '2px solid #9758a6'};
  color: ${(props) => (props.isActiveCategory ? '#9758a6' : '#9a9a9a')};
  font-size: 1rem;
  line-height: 22px;
  padding-bottom: 5px;
`
export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  padding: 4vw;

  .nothing-notice {
    font-size: 20px;
    font-weight: bold;
  }
`
