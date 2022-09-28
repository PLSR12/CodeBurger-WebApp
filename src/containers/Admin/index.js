import PropTypes from 'prop-types'
import React from 'react'

import * as S from './styles'

import EditProduct from './EditProduct'
import ListCategories from './ListCategories'
import ListProducts from './ListProducts'
import NewCategorie from './NewCategorie'
import NewProduct from './NewProduct'
import Orders from './Orders'

import * as Molecules from '../../components/Molecules'
import paths from '../../constants/paths'

export function Admin({ match: { path } }) {
  return (
    <S.Container>
      <Molecules.SideMenuAdmin path={path} />
      <S.ContainerItems>
        {path === paths.Order && <Orders />}
        {path === paths.Products && <ListProducts />}
        {path === paths.NewProduct && <NewProduct />}
        {path === paths.EditProduct && <EditProduct />}
        {path === paths.NewCategorie && <NewCategorie />}
        {path === paths.Category && <ListCategories />}
      </S.ContainerItems>
    </S.Container>
  )
}

Admin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}
