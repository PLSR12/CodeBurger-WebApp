import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import api from '../../services/api'

import BannerProduct from '../../assets/home/banner-productpage(2).svg'

import formatCurrency from '../../utils/formatCurrency'

import { CardProducts } from '../../components'
import GenericModal from '../../components/Modal/GenericModal'
import { ModalContentLoading } from '../../components/Modal/styles'
import ImgLoading from '../../assets/img/loading.gif'

import {
  Container,
  HomeImg,
  CategoriesMenu,
  CategoryButton,
  ProductsContainer
} from './styles'

export function Products ({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProduct] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)
  const [modalIsOpen, setModalIsOpen] = useState(true)


  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCategories(newCategories)

      setModalIsOpen(false)

    }
    async function loadProducts () {
      const { data: allProducts } = await api.get('products')

      const newProducts = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
      setModalIsOpen(false)
    }

    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProduct(products)
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      )

      setFilteredProduct(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <>
    <GenericModal  isOpen={modalIsOpen}>
    <ModalContentLoading >
              <h2>Carregando...</h2>
              <img src={ImgLoading} alt="Loading" />
            </ModalContentLoading>
      </GenericModal>
    <Container>
      <HomeImg src={BannerProduct} alt='banner produtos' />   
      <CategoriesMenu>
        {categories &&
          categories.map(category => (
            <CategoryButton
              type='button'
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id)
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoriesMenu>
      <ProductsContainer>
        {filteredProducts &&
          filteredProducts.map(product => (
            <CardProducts key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
    </>

  )
}

Products.propTypes = {
  location: PropTypes.object
}
