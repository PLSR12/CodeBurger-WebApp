import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import api from '../../../services/api'
import * as Atoms from '../../../components/Atoms'
import * as Molecules from '../../../components/Molecules'
import { maskCurrencyInput } from '../../../utils/maskCurrencyInput'
import { formatDataSelect } from '../../../utils/formatDataSelect'
import * as S from './styles'

function EditProduct() {
  const [file, setFile] = useState([])
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)
  const { push } = useHistory()
  const { id } = useParams()

  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', customParseFloat(data.price))
    productDataFormData.append('category', data.category)
    productDataFormData.append('offer', data.offer)
    productDataFormData.append('file', file[0])

    setModalLoadingIsOpen(true)
    await toast
      .promise(api.put(`products/${product.id}`, productDataFormData), {
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto',
      })
      .then(() => {
        setModalLoadingIsOpen(false)
        setTimeout(() => {
          push('/produtos/listar')
        }, 2000)
      })
      .catch(() => {
        setModalLoadingIsOpen(false)
      })
  }

  const customParseFloat = (value) => {
    return parseFloat(value.replace(/\D/g, '')) / 100
  }

  const handleDrop = (acceptedFiles) =>
    setFile(acceptedFiles.map((file) => file))

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

  async function loadProducts() {
    const splitedId = id.split(':')[1]
    const { data: OneProduct } = await api.get(`/products/${splitedId}`)

    setProduct(OneProduct)
    setFile([{ name: OneProduct?.path }])
  }

  async function loadCategories() {
    const { data } = await api.get('categories')
    setCategories(data)
    setModalLoadingIsOpen(false)
  }
  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [id])

  useEffect(() => {
    reset(product)
    setValue('price', maskCurrency(product?.price))
    setValue('file', product?.url)
    setValue('category', product?.category_id)
  }, [product, categories])

  return (
    <S.Container>
      <Molecules.LoadingModal loading={modalLoadingIsOpen} />
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
          <S.BoxAreaImage>
            {product && (
              <div className="image-container">
                <img
                  style={{
                    width: '100%',
                  }}
                  src={product.url}
                  alt="imagem do produto"
                />
              </div>
            )}

            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('file')}
                    {...getInputProps()}
                  />
                  {file.length > 0 ? (
                    <p>
                      {file.map((file) => (
                        <li key={file}>{file?.name}</li>
                      ))}
                    </p>
                  ) : (
                    <p> Arraste sua imagem ou clique e selecione:</p>
                  )}
                </div>
              )}
            </Dropzone>
            {Object.keys(file).length <= 0 && (
              <Atoms.ErrorMessage> Carregue uma Imagem!</Atoms.ErrorMessage>
            )}
          </S.BoxAreaImage>
          <div style={{ marginTop: '20px' }}>
            <Atoms.SelectComponent
              label={'Selecione uma Categoria'}
              options={formatDataSelect(categories)}
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
