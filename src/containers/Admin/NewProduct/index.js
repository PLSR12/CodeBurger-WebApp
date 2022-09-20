import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import * as Atoms from '../../../components/Atoms'
import { maskCurrencyInput } from '../../../utils/maskCurrencyInput'

import * as S from './styles'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', customParseFloat(data.price))
    productDataFormData.append('category_id', data.category)
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

  const customParseFloat = (value) => {
    return parseFloat(value.replace(/\D/g, '')) / 100
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.string().required('Escolha uma categoria'),
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

      data.map((category) => {
        const categroyId = category.id
        const categoryLabel = category.name

        const categoryOption = {
          id: `${categroyId}`,
          label: `${categoryLabel}`,
        }

        setCategories((prevState) => [...prevState, categoryOption])
      })
    }
    loadCategories()
  }, [])

  return (
    <S.Container>
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
          <S.ButtonStyle type="submit"> Adicionar Produto </S.ButtonStyle>
        </form>
      </Atoms.Box>
    </S.Container>
  )
}

export default NewProduct
