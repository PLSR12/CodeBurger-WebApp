import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

describe("Cart hook tests", () => {
  test("put items to cart", async () => {
    const itemAddedToCart = {
      id: 1,
      name: "Product Test",
      price: 90,
      quantity: 1,
      image: "image_path",
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    result.current.putProductsInCart(itemAddedToCart);

    await waitFor(() => {
      expect(result.current.cartProducts[0].name).toEqual("Product Test");
    });
  });
  test("increase item from cart", async () => {
    const itemAddedToCart = {
      id: 1,
      name: "Product Test",
      price: 90,
      quantity: 1,
      image: "image_path",
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    result.current.increaseProducts(itemAddedToCart.id);

    await waitFor(() => {
      expect(result.current.cartProducts[0].quantity).toEqual(2);
    });
  });

  test("get items from cart", async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const itemAddedToCart = {
      id: 1,
      name: "Product Test",
      price: 90,
      quantity: 1,
      image: "image_path",
    };

    await waitFor(() => {
      expect(result.current.cartProducts[0].id).toEqual(itemAddedToCart.id);
    });
  });

  test("decrease item from cart", async () => {
    const itemAddedToCart = {
      id: 1,
      name: "Product Test",
      price: 90,
      quantity: 1,
      image: "image_path",
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    result.current.decreaseProducts(itemAddedToCart.id);

    await waitFor(() => {
      expect(result.current.cartProducts[0].quantity).toEqual(1);
    });
  });
});
