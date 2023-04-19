import React from "react";
import { Container } from "./styles";

export const InputComponent = React.forwardRef(
  ({ type, name, id, placeholder, label, error, ...props }, ref) => {
    return (
      <Container data-testid="pure_input">
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          {...props}
          name={name}
          id={id || name}
          type={type || "text"}
          placeholder={placeholder}
        />
        {!!error && <div>{error.message}</div>}
      </Container>
    );
  }
);
