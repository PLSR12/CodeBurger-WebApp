import React from 'react'
import BannerHome from '../../assets/home/banner-homepage.svg'
import * as Organisms from '../../components/Organisms'
import * as S from './styles'

export function Home() {
  return (
    <S.Container>
      <S.HomeImage src={BannerHome} alt="banner da home" />
      <Organisms.CategoryCarousel />
      <Organisms.OffersCarousel />
    </S.Container>
  )
}
