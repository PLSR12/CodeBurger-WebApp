import PropTypes from "prop-types";
import React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "../../../hooks/UserContext";
import listLinks from "./menu-list";
import * as S from "./styles";

export function SideMenuAdmin({ path }) {
  const { logout } = useUser();

  return (
    <S.Container data-testid="pure_side-menu-admin">
      <hr></hr>
      {listLinks.map((item) => (
        <S.ItemContainer key={item.id} isActive={path === item.link}>
          <item.icon className="icon" />
          <S.ListLink
            data-testid={`button-link-${item.label.toLowerCase()}`}
            to={item.link}
          >
            {item.label}{" "}
          </S.ListLink>
        </S.ItemContainer>
      ))}
      <hr></hr>
      <S.ItemContainer>
        <LogoutIcon className="icon-logout" />
        <S.ListLink to="/login" onClick={logout}>
          Sair
        </S.ListLink>
      </S.ItemContainer>
    </S.Container>
  );
}

SideMenuAdmin.propTypes = {
  path: PropTypes.string,
};
