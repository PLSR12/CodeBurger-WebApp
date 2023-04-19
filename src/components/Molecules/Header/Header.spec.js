import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from ".";
import { BrowserRouter } from "react-router-dom";
import * as hookUser from "../../../hooks/UserContext";

describe("Header component tests", () => {
  test("renders without crashing", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
    });

    render(<Header />, { wrapper: BrowserRouter });

    const header = screen.getByTestId("pure_header");

    expect(header).toBeInTheDocument();
  });

  test("button logout renders without crashing", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
      logout: jest.fn(),
    });
    render(<Header />, { wrapper: BrowserRouter });

    const buttonLogout = screen.getByTestId("button-logout");

    expect(buttonLogout).toBeInTheDocument();
  });

  test("button logout making logout", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
      logout: jest.fn(),
    });
    render(<Header />, { wrapper: BrowserRouter });

    const buttonLogout = screen.getByTestId("button-logout");

    fireEvent.click(buttonLogout);

    const pathnameActual = window.location.pathname;

    expect(pathnameActual).toEqual("/login");
  });

  test("button cart renders without crashing", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
    });
    render(<Header />, { wrapper: BrowserRouter });

    const buttonCart = screen.getByTestId("button-cart");

    expect(buttonCart).toBeInTheDocument();
  });

  test("button cart making redirect", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
      logout: jest.fn(),
    });
    render(<Header />, { wrapper: BrowserRouter });

    const buttonCart = screen.getByTestId("button-cart");

    fireEvent.click(buttonCart);

    const pathnameActual = window.location.pathname;

    expect(pathnameActual).toEqual("/carrinho");
  });

  test("button profile making redirect", () => {
    jest.spyOn(hookUser, "useUser").mockReturnValue({
      userData: {
        name: "Teste",
        admin: true,
      },
    });
    render(<Header />, { wrapper: BrowserRouter });

    const buttonProfile = screen.getByTestId("button-profile");

    fireEvent.click(buttonProfile);

    const pathnameActual = window.location.pathname;

    expect(pathnameActual).toEqual("/usuario");
  });
});
