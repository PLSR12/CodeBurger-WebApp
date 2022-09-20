import React from 'react'
import PropTypes from 'prop-types'

import { Container, ContainerItems } from './styles'

import Orders from './Orders'
import ListProducts from './ListProducts'
import NewProduct from './NewProduct'
import EditProduct from './EditProduct'
import NewCategorie from './NewCategorie'

import { SideMenuAdmin } from '../../components'
import paths from '../../constants/paths'

export function Admin({ match: { path } }) {
  return (
    <Container>
      <SideMenuAdmin path={path} />
      <ContainerItems>
        {path === paths.Order && <Orders />}
        {path === paths.Products && <ListProducts />}
        {path === paths.NewProduct && <NewProduct />}
        {path === paths.EditProduct && <EditProduct />}
        {path === paths.NewCategorie && <NewCategorie />}
      </ContainerItems>
    </Container>
  )
}

Admin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  })
}
