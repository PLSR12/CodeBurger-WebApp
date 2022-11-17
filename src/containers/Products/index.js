import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import api from '../../services/api'

import BannerProduct from '../../assets/home/banner-productpage(2).svg'

import formatCurrency from '../../utils/formatCurrency'

import ImgLoading from '../../assets/img/loading.gif'
import GenericModal from '../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../components/Molecules/Modal/styles'
import * as Organisms from '../../components/Organisms'

import * as S from './styles'

export function Products({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProduct] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCategories(newCategories)

      setModalLoadingIsOpen(false)
    }
    async function loadProducts() {
      const { data: allProducts } = await api.get('products')

      const newProducts = allProducts.map((product) => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
      setModalLoadingIsOpen(false)
    }

    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProduct(products)
    } else {
      const newFilteredProducts = products.filter(
        (product) => product.category_id === activeCategory
      )

      setFilteredProduct(newFilteredProducts)
    }
  }, [activeCategory, products])

  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>
      <S.Container>
        <S.HomeImg src={BannerProduct} alt="banner produtos" />
        <S.CategoriesMenu>
          {categories &&
            categories.map((category) => (
              <S.CategoryButton
                type="button"
                key={category.id}
                isActiveCategory={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                }}
              >
                {category.name}
              </S.CategoryButton>
            ))}
        </S.CategoriesMenu>
        <S.ProductsContainer>
          {filteredProducts &&
            filteredProducts.map((product) => (
              <Organisms.CardProducts key={product.id} product={product} />
            ))}
        </S.ProductsContainer>
        <p className="count-products">
          {filteredProducts
            ? `${
                filteredProducts.length > 1
                  ? `${filteredProducts.length} Produtos encontrados`
                  : `${filteredProducts.length} Produto encontrado`
              }`
            : ''}
        </p>
      </S.Container>
    </>
  )
}

Products.propTypes = {
  location: PropTypes.object,
}
