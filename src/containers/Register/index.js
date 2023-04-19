import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import maskContactInput from '../../utils/formatContact'

import api from '../../services/api'

import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Logo from '../../assets/login/logo-codeburger.svg'

import * as Atoms from '../../components/Atoms'

import * as S from './styles'

export function Register() {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)

  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    address: Yup.string().required('O seu endreço é obrigatório'),
    complement: Yup.string().required(
      'O complemento do endereço é obrigatório'
    ),
    contact: Yup.string()
      .required('O seu contato é obrigatório')
      .test('len', 'O Contato deve ter no minímo 9 números ', (val) => {
        return val?.length === 14
      }),
    email: Yup.string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),

    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 digítos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          address: clientData.address,
          complement: clientData.complement,
          contact: clientData.contact,
          email: clientData.email,
          password: clientData.password,
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça Login para continuar')
      }
      setTimeout(() => {
        history.push('/login')
      }, 2500)
    } catch (err) {}
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <S.Container>
      <S.ContainerItens>
        <img src={Logo} alt="logo-codeburger" />
        <h1>Cadastre-se</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.Label error={errors.name?.message}> Nome</S.Label>
          <S.Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <Atoms.ErrorMessage> {errors.name?.message}</Atoms.ErrorMessage>

          <S.Label error={errors.address?.message}> Endereço</S.Label>
          <S.Input
            type="text"
            {...register('address')}
            error={errors.address?.message}
          />
          <Atoms.ErrorMessage> {errors.address?.message}</Atoms.ErrorMessage>
          <S.Label error={errors.complement?.message}> Complemento</S.Label>
          <S.Input
            type="text"
            {...register('complement')}
            error={errors.complement?.message}
          />
          <Atoms.ErrorMessage> {errors.complement?.message}</Atoms.ErrorMessage>
          <S.Label error={errors.contact?.message}> Contato</S.Label>
          <S.Input
            {...register('contact')}
            error={errors.contact?.message}
            onInput={maskContactInput}
          />
          <Atoms.ErrorMessage> {errors.contact?.message}</Atoms.ErrorMessage>
          <S.Label error={errors.email?.message}> Email</S.Label>
          <S.Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Atoms.ErrorMessage> {errors.email?.message}</Atoms.ErrorMessage>

          <S.Label error={errors.password?.message}> Senha</S.Label>
          <div>
            <S.Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={errors.password?.message}
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

          <S.Label error={errors.confirmPassword?.message}>
            Confirme Senha
          </S.Label>

          <div>
            <S.Input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
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
          <Atoms.ErrorMessage>
            {' '}
            {errors.confirmPassword?.message}
          </Atoms.ErrorMessage>
          <S.ContainerButton>
            <Atoms.Button type="submit" style={{ marginTop: '4vh' }}>
              Entrar
            </Atoms.Button>
          </S.ContainerButton>
          <S.LoginLink>
            Já possui conta? {''}
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
              to="/login"
            >
              Entre
            </Link>
          </S.LoginLink>
        </form>
      </S.ContainerItens>
    </S.Container>
  )
}
