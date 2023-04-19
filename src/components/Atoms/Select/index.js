import React from "react";
import { Container, Error } from "./styles";

export const SelectComponent = React.forwardRef(
  ({ name, id, placeholder, label, error, options, ...props }, ref) => {
    return (
      <Container data-testid="pure_select">
        <label htmlFor={name}>{label}</label>
        <select
          ref={ref}
          name={name}
          id={id}
          placeholder={placeholder}
          {...props}
        >
          <option value="">Selecione:</option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {!!error && <Error>{error.message}</Error>}
      </Container>
    );
  }
);
