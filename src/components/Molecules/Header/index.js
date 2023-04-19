import React from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../hooks/UserContext";

import Cart from "../../../assets/Header/Cartheader.svg";
import Person from "../../../assets/Header/Personheader.png";

import * as S from "./styles";

export function Header() {
  const { logout, userData } = useUser();

  const {
    push,
    location: { pathname },
  } = useHistory();

  const logoutUser = () => {
    logout();
    push("/login");
  };

  return (
    <S.Container data-testid={"pure_header"}>
      <S.ContainerLeft>
        <S.PageLink onClick={() => push("/")} isActive={pathname === "/"}>
          Home
        </S.PageLink>
        <S.PageLink
          onClick={() => push("/produtos")}
          isActive={pathname.includes("produtos")}
        >
          Produtos
        </S.PageLink>
        {userData.admin === true && (
          <S.PageLink
            onClick={() => push("/pedidos")}
            isActive={pathname.includes("pedidos")}
          >
            Admin
          </S.PageLink>
        )}
      </S.ContainerLeft>
      <S.ContainerRight>
        <S.PageLink onClick={() => push("/carrinho")}>
          <img src={Cart} alt="carrinho" data-testid={"button-cart"} />
        </S.PageLink>
        <S.Line> </S.Line>
        <S.PageLink>
          <img
            src={Person}
            alt="boneco"
            onClick={() => push("/usuario")}
            data-testid={"button-profile"}
          />
        </S.PageLink>

        <S.ContainerText>
          <p> Olá, {userData.name} </p>
          <S.PageLinkExit data-testid={"button-logout"} onClick={logoutUser}>
            {" "}
            Sair{" "}
          </S.PageLinkExit>
        </S.ContainerText>
      </S.ContainerRight>
    </S.Container>
  );
}
