import React from "react";
import PropTypes from "prop-types";

import { ErrorMessageStyles } from "./styles";

export function ErrorMessage({ children }) {
  return (
    <ErrorMessageStyles data-testid="pure_error_message">
      {" "}
      {children}{" "}
    </ErrorMessageStyles>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string,
};
