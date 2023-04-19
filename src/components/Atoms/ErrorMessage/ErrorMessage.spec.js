import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorMessage } from ".";

describe("Error Message component tests", () => {
  test("render without crashing", () => {
    render(<ErrorMessage />);

    const errorMessage = screen.getByTestId("pure_error_message");

    expect(errorMessage).toBeInTheDocument();
  });
});
