import React, { useState } from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"
import { BsFillPersonCheckFill, BsFilePersonFill } from "react-icons/bs"
import { SidebarItem } from "shared/constants/sidebar"

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <>
      <S.StyledSidebarWrapper collapsed={collapsed}>
        {SidebarItem.map((item) => {
          return (
            <>
              <NavItem to={item.path}>
                <S.SidebarItem collapsed={collapsed}>
                  <item.icon /> <p>{item.label}</p>
                </S.SidebarItem>
              </NavItem>
            </>
          )
        })}
        <div className="hamburger-menu-container">
          <div className={collapsed ? "hamburger-menu cross" : "hamburger-menu"} onClick={() => setCollapsed(!collapsed)}>
            <div></div>
          </div>
        </div>
      </S.StyledSidebarWrapper>
    </>
  )
}

const NavItem: React.FC<{ to: string }> = (props) => {
  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    fontWeight: FontWeight.strong,
    color: "#fff",
    padding: "0px 20px 17px",
    transition: "0.4s",
    borderLeft: isActive ? "3px solid #ffff" : "",
    backgroundColor: isActive ? "#1b4f90" : Colors.blue.base,
  })
  return (
    <NavLink to={props.to} style={activeStyle}>
      {props.children}
    </NavLink>
  )
}

const S = {
  StyledSidebarWrapper: styled.div<{ collapsed?: boolean; mobile?: boolean }>`
    width: ${({ collapsed }) => (collapsed ? "56px" : "320px")};
    height: calc(100vh - 57px);
    top: 0;
    z-index: 100;
    background-color: ${Colors.blue.base};
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.3s;
    font-size: 1.3rem;
    opacity: ${({ mobile }) => (mobile ? 0 : 1)};
    p {
      display: ${({ collapsed }) => (collapsed ? "none" : "")};
    }
    &::after {
      content: '';
      z-index: 200;
      position: absolute;
      background-color: transparent;
      height: 50px;
      width: 25px;
      transition: all 0.3s;
      left:${({ collapsed }) => (collapsed ? "56px" : "320px")};
      border-top-left-radius: 25px;
      box-shadow: 0 -25px 0 0 ${Colors.blue.base};
    }
  `,
  SidebarItem: styled.div<{ collapsed?: boolean;}>`
    display: flex;
    align-items: center;
    column-gap: 15px;
    height: 4rem;
    width: ${({ collapsed }) => (collapsed ? "56px" : "320px")};
   
  `,
  HeaderItems: styled.nav`
    display: flex;
    height: 100%;
  `,
}
