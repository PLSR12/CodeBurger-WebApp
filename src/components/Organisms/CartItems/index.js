import React from 'react'

import { useCart } from '../../../hooks/CartContext'
import formatCurrency from '../../../utils/formatCurrency'
import * as S from './styles'

export function CartItems() {
  const { cartProducts, increaseProducts, decreaseProducts } = useCart()
  return (
    <S.Container>
      <S.Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p style={{ paddingRight: '30px' }}>Quantidade</p>
        <p>Total</p>
      </S.Header>

      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <S.Body key={product.id}>
            <img src={product.url} alt="imagem produto" />
            <p>{product.name}</p>
            <p>{product.formatedPrice}</p>
            <div className="quantity-container">
              <button onClick={() => decreaseProducts(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => increaseProducts(product.id)}>+</button>
            </div>
            <p>{formatCurrency(product.quantity * product.price)}</p>
          </S.Body>
        ))
      ) : (
        <S.EmptyCart>Carrinho Vazio</S.EmptyCart>
      )}
    </S.Container>
  )
}
