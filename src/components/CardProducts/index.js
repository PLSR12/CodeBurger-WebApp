import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'

import { Container, Image, ProductName, ProductPrice } from './styles'

import { Button } from '../'

export function CardProducts ({ product }) {
  const { putProductsInCart } = useCart()

  return (
    <Container>
      <Image src={product.url} alt='foto do produto' />
      <div>
        <ProductName> {product.name} </ProductName> 
        <ProductPrice> {product.formatedPrice}</ProductPrice>
        <Button
          style={{ width: '1rem' }}
          onClick={() => {
            putProductsInCart(product)
            toast.success('Adicionado ao carrinho!', {
              position: 'top-right',
              autoClose: 1000
            })
          }}
        >
          Adicionar
        </Button>
      </div>
    </Container>
  )
}

CardProducts.propTypes = {
  product: PropTypes.object
}
