import React,{useState} from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"
import { BsFillPersonCheckFill,BsFilePersonFill } from "react-icons/bs"

export const Sidebar: React.FC = () => {
  const [collapsed,setCollapsed]=useState(false)
  return (
    <>
          <S.StyledSidebarWrapper collapsed={collapsed}>
          <S.SidebarCorner collapsed={collapsed} />
            <NavItem to="daily-care">
                    <div style={{display:"flex",alignItems:"baseline"}}>
                        <BsFillPersonCheckFill/> {!collapsed && <p>Daily Care</p>}
                    </div>
            </NavItem>           
            <NavItem to="activity">
                <div style={{display:"flex",alignItems:"baseline"}}>
                    <BsFilePersonFill/> {!collapsed && <p>Activity</p>}
                </div>
            </NavItem>
            <div className="hamburger-menu-container">
            <div
              className={collapsed ? 'hamburger-menu cross' : 'hamburger-menu'}
              onClick={() => setCollapsed(!collapsed)}
            >
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
    padding: "18px 20px 17px",
    backgroundColor: isActive ? "#1b4f90" : Colors.blue.base,
  })
  return (
    <NavLink to={props.to} style={activeStyle}>
      {props.children}
    </NavLink>
  )
}

const S = {
  StyledSidebarWrapper : styled.div<{ collapsed?: boolean; mobile?: boolean }>`
      width: ${({ collapsed }) => (collapsed ? '56px' : '240px')};
      height:calc(100vh - 57px);
      top: 0;
      z-index: 100;
      padding: 12px 0;
      background-color: ${Colors.blue.base};
      display: flex;
      flex-direction: column;
      position: relative;
      transition: all 0.3s;
      opacity: ${({ mobile }) => (mobile ? 0 : 1)};
`,
  SidebarCorner : styled.div<{ collapsed?:boolean }>`
      position: absolute;
      left: 232px;
      top: 0%;
      transition: 200ms ease-in-out;
      z-index: -500;
      &::before {
        content: '';
        z-index: 200;
        position: absolute;
        left: -28px;
        background-color: transparent;
        bottom: -50px;
        height: 50px;
        width: 25px;
        border-top-left-radius: 25px;
        box-shadow: 0 -25px 0 0 ${Colors.blue.base};
      }

      ${({ collapsed }) => collapsed && `left:48px`}
`,

  HeaderItems: styled.nav`
    display: flex;
    height: 100%;
  `,
}
