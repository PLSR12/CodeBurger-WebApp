import React from 'react'

import { Container, Error } from './styles'

export const TextAreaComponent: React.FC<any> = React.forwardRef(
  ({ type, name, id, placeholder, label, error, ...props }, ref) => {
    return (
      <Container>
        <label htmlFor={name}>{label}</label>
        <textarea
          ref={ref}
          {...props}
          name={name}
          id={id || name}
          type={type || 'text'}
          placeholder={placeholder}
        />
        {!!error && <Error>{error.message}</Error>}
      </Container>
    )
  }
)
