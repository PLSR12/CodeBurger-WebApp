import React from "react";

import { ComponentButton } from "./styles";

export function Button({ children, ...props }) {
  return (
    <ComponentButton data-testid="pure_button" {...props}>
      {" "}
      {children}{" "}
    </ComponentButton>
  );
}
