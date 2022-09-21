import { yupResolver } from '@hookform/resolvers/yup'
import { React } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import * as Atoms from '../../components/Atoms'
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
      <Atoms.Box>
        <Atoms.TitlePage> Dados do Usuário </Atoms.TitlePage>
        <form noValidate>
          <Atoms.InputComponent
            type="text"
            label="Nome"
            {...register('name')}
            error={errors.name}
            style={{ marginBottom: '10px' }}
            placeholder="Digite o Nome:"
            defaultValue={userData.name}
          />

          <Atoms.InputComponent
            type="email"
            label="Email"
            {...register('email')}
            error={errors.email}
            placeholder="Digite o Email:"
            defaultValue={userData.email}
          />
          <Atoms.InputComponent
            type="number"
            label="Contato"
            min={0}
            {...register('contact')}
            error={errors.contact}
            placeholder="Digite o Contato:"
            defaultValue={userData.contact}
          />
          <Atoms.InputComponent
            type="text"
            label="Endereço"
            {...register('adress')}
            error={errors.adress}
            placeholder="Digite o Endereço:"
            defaultValue={userData.address}
          />
          <Atoms.InputComponent
            type="text"
            label="Complemento"
            {...register('complement')}
            error={errors.complement}
            placeholder="Digite o Complemento:"
            defaultValue={userData.complement}
          />
          <S.ButtonStyle type="submit"> Editar Dados </S.ButtonStyle>
        </form>{' '}
      </Atoms.Box>
    </S.Container>
  )
}
