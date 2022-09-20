import React from 'react'

import CartBanner from '../../assets/Cart/CartImage.svg'

import { CartItems, CartResume } from '../../components'

import { Container, CartImage, Wrapper } from './styles'

export function Cart () {
  return (
    <Container>
      <CartImage src={CartBanner} alt='banner carrinho' />
      <Wrapper>
        <CartItems />
        <CartResume />
      </Wrapper>
    </Container>
  )
}
