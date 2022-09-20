import React from 'react'
import { Container } from './styles'

export function Box({ children, ...props }) {
  return <Container {...props}>{children}</Container>
}
