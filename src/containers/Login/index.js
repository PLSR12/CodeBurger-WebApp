import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import api from '../../services/api'
import { useUser } from '../../hooks/UserContext'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Logo from '../../assets/login/logo-codeburger.svg'
import * as Atoms from '../../components/Atoms'
import * as S from './styles'

export function Login() {
  const history = useHistory()
  const { putUserData } = useUser()
  const [showPassword, setShowPassword] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigátoria')
      .min(6, 'A senha deve ter pelo menos 6 digítos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        success: 'Login Efetuado!',
        error: 'Verifique seus Dados!',
      }
    )
    putUserData(data)

    setTimeout(() => {
      history.push('/')
    }, 2000)
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <S.Container>
      <S.ContainerItens>
        <img src={Logo} alt="logo-codeburger" />
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.Label> Email:</S.Label>
          <S.Input type="email" name="email" {...register('email')} />
          <Atoms.ErrorMessage> {errors.email?.message}</Atoms.ErrorMessage>

          <S.Label> Senha:</S.Label>

          <div>
            <S.Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={errors.password}
            />
            <span>
              {showPassword ? (
                <MdVisibility
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              ) : (
                <MdVisibilityOff
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              )}
            </span>
          </div>

          <Atoms.ErrorMessage> {errors.password?.message}</Atoms.ErrorMessage>
          <S.ContainerButton>
            <Atoms.Button type="submit" style={{ marginTop: '6vh' }}>
              Entrar
            </Atoms.Button>
          </S.ContainerButton>
          <S.CadastrarLink>
            Não possui conta? {''}
            <Link
              style={{
                color: 'white',
                alignItems: 'center',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
              to="/cadastro"
            >
              Se cadastre
            </Link>
          </S.CadastrarLink>
        </form>
      </S.ContainerItens>
    </S.Container>
  )
}
