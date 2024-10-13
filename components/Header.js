import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  position: sticky;
  top: 0px;
  z-index:20;
  background-color: white;
  border: 1px solid #2222;

`;
const Logo = styled(Link)`
  text-decoration:none;
    margin:auto;
   color:white;
   background-color:red;

   font-Size: 12px;
   position: relative;
   padding: 5px 10px;
  @media screen and (min-width: 768px) {
   color:#fff;
  text-decoration:none;
  position: relative;
  display :flex;
  justify-content: center;
  z-index: 3;
  padding: 0;
  font-Size: 16px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
    z-index: 3;
  ` : `
    display: none;
  `}
  gap: 25px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: white;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#333;
  text-decoration:none;
  padding: 5px 0px;
  @media screen and (min-width: 768px) {
    padding:0px;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: #333;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>En el mes de Mamá! 40% de descuento 
          </Logo>
            <StyledNav mobileNavActive={mobileNavActive}style={{fontFamily:"serif" }}>
            <NavLink href={'/'}>Inicio</NavLink>
            <NavLink href={'/products'}>Productos</NavLink>
            <NavLink href={'/categories'}>Categorias</NavLink>
            {/* <NavLink href={'/account'}>Datos de Usuario</NavLink> */}
            <NavLink href={'/cart'}>Carrito ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}