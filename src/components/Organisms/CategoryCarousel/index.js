import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import CategoryText from '../../../assets/home/categorias-text.png'
import * as Molecules from '../../../components/Molecules'
import api from '../../../services/api'
import * as S from './styles'

export function CategoryCarousel() {
  const [categories, setCategories] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)

  async function loadCategories() {
    const { data } = await api.get('categories')

    setCategories(data)
    setModalLoadingIsOpen(false)
  }

  useEffect(() => {
    loadCategories()
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
      <S.CategoryImage src={CategoryText} alt="banner da home" />
      <Molecules.LoadingModal loading={modalLoadingIsOpen} />
      <Carousel
        itemsToShow={4}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {categories &&
          categories.map((category) => (
            <S.ContainerItems key={category.id}>
              <S.Image src={category.url} alt="foto da categoria" />
              <S.Button
                to={{
                  pathname: '/produtos',
                  state: { categoryId: category.id },
                }}
              >
                {' '}
                {category.name}
              </S.Button>
            </S.ContainerItems>
          ))}
      </Carousel>
    </S.Container>
  )
}
