import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectComponent } from ".";

describe("Select component tests", () => {
  test("render without crashing", () => {
    render(<SelectComponent label="Teste" options={[]} />);

    const select = screen.getByText("Teste");

    expect(select).toBeInTheDocument();
  });
  test("render without crashing", () => {
    const mockOptions = [{ id: 1, label: "Teste" }];

    render(<SelectComponent label="Teste" options={mockOptions} />);

    const select = screen.getByTestId("pure_select").querySelector("select");

    fireEvent.change(select, { target: { value: 1 } });

    expect(select.value).toBe("1");
  });
});
