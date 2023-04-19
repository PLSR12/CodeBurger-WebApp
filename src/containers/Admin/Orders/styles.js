import styled from 'styled-components'

import ReactSelect from 'react-select'

export const Container = styled.div`
  background-color: #efefef;
  min-height: 100vh;
`

export const ReactSelectStyle = styled(ReactSelect)`
  width: 250px;

  .css-1s2u09g-control {
    cursor: pointer;
  }
`
export const Menu = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 7vh;
  justify-content:center;
  margin: 20px 0;

`
export const LinkMenu = styled.a`
  color: #323D5D;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props =>(props.isActiveStatus ? 'bold' : 'normal')};
  border-bottom: ${props => props.isActiveStatus && '3px solid #9758A6'};
  padding-bottom: 4px;
`
