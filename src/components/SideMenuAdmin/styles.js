import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: #3c3c3c;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width:max-content;
  margin-top: 0;
  margin-left: 0;

  @media screen and (max-width: 1000px) {
    width:80px;
  }

  hr {
    margin: 50px 15px;

    @media screen and (max-width: 1000px) {
      margin: 70px 15px;
    }
  }
`
export const ItemContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background:${props => (props => props.isActive ? '#565656' : '' )} ;
  border-radius: 2px;
  margin: 10px;
  padding: 15px;

  @media screen and (max-width: 1000px) {
    height:100px;
  }

  .icon {
    color: #ffff;
  }
  .icon-logout {
    color: #ffffff;
  }
`

export const ListLink = styled(Link)`
  font-weight: 400;
  font-size: 17px;
  line-height: 19px;
  color: #ffffff;
  text-decoration: none;
  padding-left: 15px;

  @media screen and (max-width: 1000px) {
    color: #3c3c3c;
    font-size:1px;
    padding-left: 0;
  }

`
