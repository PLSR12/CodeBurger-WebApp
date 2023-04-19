import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputComponent } from ".";

describe("Input component tests", () => {
  test("render without crashing", () => {
    render(<InputComponent label="Teste" />);

    const input = screen.getByText("Teste");

    expect(input).toBeInTheDocument();
  });
  test("check value inputed is correct", () => {
    render(<InputComponent label="Teste" />);

    const input = screen.getByTestId("pure_input").querySelector("input");

    fireEvent.change(input, { target: { value: "React Native" } });
    expect(input.value).toBe("React Native");
  });
});
