import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import api from '../../../services/api'

import { ErrorMessage } from '../../../components'
import maskCode from '../../../utils/maskCode'

import GenericModal from '../../../components/Modal/GenericModal'
import { ModalContentLoading } from '../../../components/Modal/styles'
import ImgLoading from '../../../assets/img/loading.gif'

import {
  Container,
  Label,
  Input,
  ButtonStyle,
  LabelUpload,
  ContainerInput
} from './styles'

function EditProduct () {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const {
    push,
    location: {
      state: { product }
    }
  } = useHistory()

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto'
      }
    )

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O name é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.boolean()
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('categories')

      setCategories(data)
      setModalIsOpen(false)
    }
    loadCategories()
  }, [])

  return (
    <Container>
      <GenericModal  isOpen={modalIsOpen}>
    <ModalContentLoading >
              <h2>Carregando...</h2>
              <img src={ImgLoading} alt="Loading" />
            </ModalContentLoading>
      </GenericModal>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome:</Label>
          <Input
            type='text'
            {...register('name')}
            onInput={maskCode}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label> Preço </Label>
          <Input
            type='number'
            {...register('price')}
            onInput={maskCode}
            defaultValue={product.price}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon />
                Caregue a imagem do produto
              </>
            )}
            <input
              type='file'
              accept='image/png , image/jpeg'
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name='category'
            control={control}
            defaultValue={product.category}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  defaultValue={product.category}
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>

        <ContainerInput>
          <input
            type='checkbox'
            {...register('offer')}
            defaultChecked={product.offer}
          />
          <Label> Produto em oferta?</Label>
        </ContainerInput>

        <ButtonStyle type='submit'> Editar Produto </ButtonStyle>
      </form>
    </Container>
  )
}

export default EditProduct
