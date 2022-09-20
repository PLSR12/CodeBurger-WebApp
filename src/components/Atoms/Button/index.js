import React from 'react'

import { ComponentButton } from './styles'

export function Button ({ children, ...props }) {
  return <ComponentButton {...props}> {children} </ComponentButton>
}
