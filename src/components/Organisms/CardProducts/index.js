import PropTypes from 'prop-types'
import React from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../../hooks/CartContext'
import * as Atoms from '../../Atoms'
import * as S from './styles'

export function CardProducts({ product }) {
  const { putProductsInCart } = useCart()

  return (
    <S.Container>
      <S.Image src={product.url} alt="foto do produto" />
      <div>
        <S.ProductName> {product.name} </S.ProductName>
        <S.ProductPrice> {product.formatedPrice}</S.ProductPrice>
        <Atoms.Button
          style={{ width: '1rem' }}
          onClick={() => {
            putProductsInCart(product)
            toast.success('Adicionado ao carrinho!', {
              position: 'top-right',
              autoClose: 1000,
            })
          }}
        >
          Cadastrar
        </Atoms.Button>
      </div>
    </S.Container>
  )
}

CardProducts.propTypes = {
  product: PropTypes.object,
}
