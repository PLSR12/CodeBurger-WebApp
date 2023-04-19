import React from 'react'

import CartBanner from '../../assets/Cart/CartImage.svg'

import * as Organisms from '../../components/Organisms'

import * as S from './styles'

export function Cart() {
  return (
    <S.Container>
      <S.CartImage src={CartBanner} alt="banner carrinho" />
      <S.Wrapper>
        <Organisms.CartItems />
        <Organisms.CartResume />
      </S.Wrapper>
    </S.Container>
  )
}
