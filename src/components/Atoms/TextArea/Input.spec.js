import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextAreaComponent } from ".";

describe("TextArea component tests", () => {
  test("render without crashing", () => {
    render(<TextAreaComponent label="Teste" />);

    const textarea = screen.getByText("Teste");

    expect(textarea).toBeInTheDocument();
  });
  test("check value is correct", () => {
    render(<TextAreaComponent label="Teste" />);

    const textarea = screen
      .getByTestId("pure_textarea")
      .querySelector("textarea");

    fireEvent.change(textarea, { target: { value: "Lorem Teste" } });
    expect(textarea.value).toBe("Lorem Teste");
  });
});
