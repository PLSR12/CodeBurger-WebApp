import React from "react";

import { Container } from "./styles";

export const TextAreaComponent = React.forwardRef(
  ({ type, name, id, placeholder, label, error, ...props }, ref) => {
    return (
      <Container data-testid="pure_textarea">
        <label htmlFor={name}>{label}</label>
        <textarea
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
