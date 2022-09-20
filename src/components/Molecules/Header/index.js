import React from 'react'
import { useHistory } from 'react-router-dom'

import { useUser } from '../../hooks/UserContext'

import Cart from '../../assets/Header/Cartheader.svg'
import Person from '../../assets/Header/Personheader.png'

import {
  Container,
  ContainerLeft,
  ContainerRight,
  ContainerText,
  Line,
  PageLink,
  PageLinkExit,
} from './styles'

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
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Home
        </PageLink>
        <PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Produtos
        </PageLink>
      </ContainerLeft>
      <ContainerRight>
        <PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt="carrinho" />
        </PageLink>
        <Line> </Line>
        <PageLink>
          <img src={Person} alt="boneco" onClick={() => push('/usuario')} />
        </PageLink>

        <ContainerText>
          <p> Olá, {userData.name} </p>
          <PageLinkExit onClick={logoutUser}> Sair </PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>
  )
}
