import React, { createContext, useContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCardProducts] = useState([]);

  const updatedLocalStorage = (products) => {
    localStorage.setItem("codeburger:cartInfo", JSON.stringify(products));
  };

  const putProductsInCart = (product) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

    let newCartProducts = [];

    if (cartIndex >= 0) {
      newCartProducts = cartProducts;

      newCartProducts[cartIndex].quantity =
        newCartProducts[cartIndex].quantity + 1;

      setCardProducts(newCartProducts);
    } else {
      product.quantity = 1;
      newCartProducts = [...cartProducts, product];
      setCardProducts(newCartProducts);
    }

    localStorage.setItem(
      "codeburger:cartInfo",
      JSON.stringify(newCartProducts)
    );
  };

  const deleteProducts = (productId) => {
    const newCart = cartProducts.filter((product) => product.id !== productId);

    setCardProducts(newCart);

    localStorage.setItem("codeburger:cartInfo", JSON.stringify(newCart));
  };

  const increaseProducts = (productId) => {
    const newCart = cartProducts.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });
    setCardProducts(newCart);

    updatedLocalStorage(newCart);
  };

  const decreaseProducts = (productId) => {
    const cartIndex = cartProducts.findIndex((pd) => pd.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((product) => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
      setCardProducts(newCart);

      localStorage.removeItem("codeburger:cartInfo", JSON.stringify(newCart));
    } else {
      deleteProducts(productId);
    }
  };

  useEffect(() => {
    const loadUserData = () => {
      const clientCartData = localStorage.getItem("codeburger:cartInfo");

      if (clientCartData) {
        setCardProducts(JSON.parse(clientCartData));
      }
    };
    loadUserData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        putProductsInCart,
        cartProducts,
        increaseProducts,
        decreaseProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used with UserContext");
  }

  return context;
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
