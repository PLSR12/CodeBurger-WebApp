import { yupResolver } from '@hookform/resolvers/yup'
import { React } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'

import * as S from './styles'
export function User() {
  const { userData } = useUser()

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
  return (
    <S.Container>
      <form noValidate>
        <div>
          <S.Label>Nome:</S.Label>
          <S.Input
            type="text"
            {...register('name')}
            defaultValue={userData.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <S.Label> Preço </S.Label>
          <S.Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <S.ContainerInput>
          <input type="checkbox" {...register('offer')} />
          <S.Label> Produto em oferta?</S.Label>
        </S.ContainerInput>
        <S.ButtonStyle type="submit"> Adicionar Produto </S.ButtonStyle>
      </form>{' '}
    </S.Container>
  )
}
