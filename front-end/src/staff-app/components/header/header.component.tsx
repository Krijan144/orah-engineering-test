import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"

export const Header: React.FC = () => {
  return (
    <S.Header>
      <NavLink to="/">
        <h4>Orah</h4>
      </NavLink>
    </S.Header>
  )
}
const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    height: 56px;
    background-color: ${Colors.blue.base};
    color: #fff;
    h4 {
      padding-left: 10px;
      font-size: 1.5rem;
      color: white;
    }
  `,
  HeaderItems: styled.nav`
    display: flex;
    height: 100%;
  `,
}
