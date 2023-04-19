import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SideMenuAdmin } from ".";
import { BrowserRouter } from "react-router-dom";
import * as hookUser from "../../../hooks/UserContext";

describe("SideMenuAdmin component test", () => {
  test("renders without crashing", () => {
    render(<SideMenuAdmin path={""} />, {
      wrapper: BrowserRouter,
    });

    const sideMenuAdmin = screen.getByTestId("pure_side-menu-admin");

    expect(sideMenuAdmin).toBeInTheDocument();
  });
  test("button menu it's working ", () => {
    render(<SideMenuAdmin path={""} />, {
      wrapper: BrowserRouter,
    });

    const buttonLink = screen.getByTestId("button-link-pedidos");

    fireEvent.click(buttonLink);

    const pathnameActual = window.location.pathname;

    expect(pathnameActual).toEqual("/pedidos");
  });
});
