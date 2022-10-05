import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import * as Atoms from '../../../components/Atoms'
import { maskCurrencyInput } from '../../../utils/maskCurrencyInput'

import * as S from './styles'

function NewProduct() {
  const [file, setFile] = useState([])
  const [categories, setCategories] = useState([])
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', customParseFloat(data.price))
    productDataFormData.append('category_id', data.category)
    productDataFormData.append('offer', data.offer)
    productDataFormData.append('file', file[0])

    await toast.promise(api.post('products', productDataFormData), {
      success: 'Produto criado com sucesso',
      error: 'Falha ao criar o produto',
    })

    setTimeout(() => {
      push('/produtos/listar')
    }, 2000)
  }

  const customParseFloat = (value) => {
    return parseFloat(value.replace(/\D/g, '')) / 100
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.string().required('Escolha uma categoria'),
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

  const handleDrop = (acceptedFiles) =>
    setFile(acceptedFiles.map((file) => file))

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
            defaultValue={'R$ 0,00'}
          />
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
          <div style={{ marginTop: '20px' }}>
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
