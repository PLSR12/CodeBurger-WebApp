import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from ".";

describe("Button component tests", () => {
  test("renders without crashing", () => {
    render(<Button />);

    const button = screen.getByTestId("pure_button");

    expect(button).toBeInTheDocument();
  });
});
