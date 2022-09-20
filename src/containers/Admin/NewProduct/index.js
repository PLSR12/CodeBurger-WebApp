import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import * as Atoms from '../../../components/Atoms'

import * as S from './styles'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('offer', data.offer)
    productDataFormData.append('file', data.file[0])

    await toast.promise(api.post('products', productDataFormData), {
      success: 'Produto criado com sucesso',
      error: 'Falha ao criar o produto',
    })

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O name é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed().test('required', 'Carregue uma imagem', (value) => {
      return value && value.length > 0
    }),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      setCategories(data)
    }
    loadCategories()
  }, [])

  return (
    <S.Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.Label>Nome:</S.Label>
          <S.Input type="text" {...register('name')} />
          <Atoms.ErrorMessage>{errors.name?.message}</Atoms.ErrorMessage>
        </div>
        <div>
          <S.Label> Preço </S.Label>
          <S.Input type="number" {...register('price')} />
          <Atoms.ErrorMessage>{errors.price?.message}</Atoms.ErrorMessage>
        </div>
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
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder="Escolha a categoria"
                />
              )
            }}
          ></Controller>
          <Atoms.ErrorMessage>{errors.category?.message}</Atoms.ErrorMessage>
        </div>
        <S.ContainerInput>
          <input type="checkbox" {...register('offer')} />
          <S.Label> Produto em oferta?</S.Label>
        </S.ContainerInput>
        <S.ButtonStyle type="submit"> Adicionar Produto </S.ButtonStyle>
      </form>
    </S.Container>
  )
}

export default NewProduct
