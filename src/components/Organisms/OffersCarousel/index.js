import React, { useEffect, useState } from 'react'

import OffersText from '../../../assets/home/ofert-text.png'

import { useCart } from '../../../hooks/CartContext'

import Carousel from 'react-elastic-carousel'
import { useHistory } from 'react-router-dom'
import * as S from './styles'

import ImgLoading from '../../../assets/img/loading.gif'
import GenericModal from '../../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../../components/Molecules/Modal/styles'
import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'

export function OffersCarousel() {
  const [offers, setOffers] = useState([])
  const { putProductsInCart } = useCart()
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const { push } = useHistory()

  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('products')

      const onlyOffers = data
        .filter((product) => product.offer)
        .map((product) => {
          return { ...product, formatedPrice: formatCurrency(product.price) }
        })

      setOffers(onlyOffers)
      setModalIsOpen(false)
    }

    loadOffers()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 },
  ]

  return (
    <S.Container>
      <GenericModal isOpen={modalIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>
      <S.OffersImage src={OffersText} alt="banner da home" />

      <Carousel
        itemsToShow={4}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers &&
          offers.map((product) => (
            <S.ContainerItems key={product.id}>
              <S.Image src={product.url} alt="foto da oferta" />
              <h1>{product.name}</h1>
              <h2>{product.formatedPrice}</h2>

              <S.Button
                onClick={() => {
                  putProductsInCart(product)
                  push('/carrinho')
                }}
              >
                Peça Agora
              </S.Button>
            </S.ContainerItems>
          ))}
      </Carousel>
    </S.Container>
  )
}
