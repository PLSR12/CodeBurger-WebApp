import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import ImgLoading from '../../../assets/img/loading.gif'
import * as Atoms from '../../../components/Atoms'
import GenericModal from '../../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../../components/Molecules/Modal/styles'
import { maskCurrencyInput } from '../../../utils/maskCurrencyInput'
import * as S from './styles'
function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [product, setProduct] = useState()
  const [categories, setCategories] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const { push } = useHistory()
  const { id } = useParams()

  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', customParseFloat(data.price))
    productDataFormData.append('category', data.category)
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto',
      }
    )

    setTimeout(() => {
      push('/produtos/listar')
    }, 2000)
  }

  const customParseFloat = (value) => {
    return parseFloat(value.replace(/\D/g, '')) / 100
  }

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(valor)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O name é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.string().required('Escolha uma categoria'),
    offer: Yup.boolean(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadProducts() {
      const splitedId = id.split(':')[1]
      const { data: OneProduct } = await api.get(`/products/${splitedId}`)

      setProduct(OneProduct)
    }
    loadProducts()
  }, [id])

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      data.map((category) => {
        const categroyId = category.id
        const categoryLabel = category.name

        const categoryOption = {
          id: `${categroyId}`,
          label: `${categoryLabel}`,
        }

        setCategories((prevState) => [...prevState, categoryOption])
        setModalIsOpen(false)
      })
    }
    loadCategories()
  }, [])
  useEffect(() => {
    reset(product)
    setValue('price', maskCurrency(product?.price))

    setValue('file', product?.url)
    setValue('category', product?.category_id)
    setFileName(product?.path)
  }, [product, categories])

  return (
    <S.Container>
      <GenericModal isOpen={modalIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>
      <Atoms.Box>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Atoms.InputComponent
            type="text"
            label="Nome"
            {...register('name')}
            error={errors.name}
            style={{ marginBottom: '10px' }}
            placeholder="Digite o Nome:"
          />

          <Atoms.InputComponent
            type="text"
            label="Preço"
            min={0}
            {...register('price')}
            error={errors.price}
            onInput={maskCurrencyInput}
            placeholder="Digite o Preço:"
          />
          <div>
            <S.LabelUpload>
              {fileName || (
                <>
                  <CloudUploadIcon />
                  Caregue a imagem do produto
                </>
              )}

              <input
                type="file"
                accept="image/png , image/jpeg"
                {...register('file')}
                onChange={(value) => {
                  setFileName(value.target.files[0]?.name)
                }}
              />
            </S.LabelUpload>
            <Atoms.ErrorMessage>{errors.file?.message}</Atoms.ErrorMessage>
          </div>
          <div>
            <Atoms.SelectComponent
              label={'Selecione uma Categoria'}
              options={categories}
              {...register('category')}
              error={errors.category}
            />
          </div>

          <S.ContainerInput>
            <input type="checkbox" {...register('offer')} />
            <S.Label> Produto em oferta?</S.Label>
          </S.ContainerInput>
          <S.ButtonStyle type="submit"> Editar Produto </S.ButtonStyle>
        </form>
      </Atoms.Box>
    </S.Container>
  )
}

export default EditProduct
