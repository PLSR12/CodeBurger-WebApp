import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Link,useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import api from '../../services/api'

import Logo from '../../assets/login/logo-codeburger.svg'
import {MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { Button,ErrorMessage } from '../../components'

import {
  Container,
  ContainerItens,
  ContainerButton,
  Label,
  Input,
  LoginLink
} from './styles'

export function Register () {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)

  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    address: Yup.string().required('O seu endreço é obrigatório'),
    complement: Yup.string().required('O complemento do endereço é obrigatório'),
    contact: Yup.number().required('O seu contato é obrigatório'),
    email: Yup.string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),

    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 digítos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
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
    } catch (err) {}

    setTimeout(() => {
      history.push('/login')
    }, 2500)  }


    const handleShowPassword = () => {
      setShowPassword((show) => !show)
    }
  

  return (
    <Container>
      <ContainerItens>
        <img src={Logo} alt='logo-codeburger' />
        <h1>Cadastre-se</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}> Nome</Label>
          <Input
            type='text'
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage> {errors.name?.message}</ErrorMessage>

          <Label error={errors.address?.message}> Endereço</Label>
          <Input
            type='text'
            {...register('address')}
            error={errors.address?.message}
          />
          <ErrorMessage> {errors.address?.message}</ErrorMessage>
          <Label error={errors.complement?.message}> Complemento</Label>
          <Input
            type='text'
            {...register('complement')}
            error={errors.complement?.message}
          />
          <ErrorMessage> {errors.complement?.message}</ErrorMessage>
          <Label error={errors.contact?.message}> Contato</Label>
          <Input
            type='number'
            {...register('contact')}
            error={errors.contact?.message}
          />
          <ErrorMessage> {errors.contact?.message}</ErrorMessage>
          <Label error={errors.email?.message}> Email</Label>
          <Input
            type='email'
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage> {errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}> Senha</Label>
          <div>
            <Input
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
          <ErrorMessage> {errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirme Senha</Label>
         
          <div>
            <Input
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
          <ErrorMessage> {errors.confirmPassword?.message}</ErrorMessage>
          <ContainerButton>
            <Button
              type='submit'
              style={{ marginTop: '4vh' }}
            >
              Entrar
            </Button>
          </ContainerButton>
          <LoginLink>
          Já possui conta? {''}
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} to='/login'>
            Entre
          </Link>
        </LoginLink>
        </form>
      </ContainerItens>
    </Container>
  )
}
