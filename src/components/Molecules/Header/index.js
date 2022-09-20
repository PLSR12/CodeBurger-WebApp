import React from 'react'
import { useHistory } from 'react-router-dom'

import { useUser } from '../../../hooks/UserContext'

import Cart from '../../../assets/Header/Cartheader.svg'
import Person from '../../../assets/Header/Personheader.png'

import * as S from './styles'

export function Header() {
  const { logout, userData } = useUser()

  const {
    push,
    location: { pathname },
  } = useHistory()

  const logoutUser = () => {
    logout()
    push('/login')
  }

  return (
    <S.Container>
      <S.ContainerLeft>
        <S.PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Home
        </S.PageLink>
        <S.PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Produtos
        </S.PageLink>
      </S.ContainerLeft>
      <S.ContainerRight>
        <S.PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt="carrinho" />
        </S.PageLink>
        <S.Line> </S.Line>
        <S.PageLink>
          <img src={Person} alt="boneco" onClick={() => push('/usuario')} />
        </S.PageLink>

        <S.ContainerText>
          <p> Olá, {userData.name} </p>
          <S.PageLinkExit onClick={logoutUser}> Sair </S.PageLinkExit>
        </S.ContainerText>
      </S.ContainerRight>
    </S.Container>
  )
}
