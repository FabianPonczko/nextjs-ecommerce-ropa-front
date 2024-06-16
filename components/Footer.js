import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  margin-top:50px;
  height: 200px;
  background-color: #222;
  color:#fff;

`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
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
      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",marginTop:"90px"}}>
           <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p>Navegación</p>
              <div>
                <NavLink href={'/'}>Inicio</NavLink>
                <NavLink href={'/products'}>Productos</NavLink>
                <NavLink href={'/categories'}>Categorias</NavLink>
              </div>
           </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Medios de pago</p>
            <img src="img/mercadopago@2x.png" style={{width:"50px"}}></img>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Formas de envío</p>
            <img src="img/correo.png" style={{width:"40px"}}></img>
          </div>
          
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Contactos</p>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" height={"20px"} >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
              quetop@gmail.com
            </div>
          </div>
          
                   
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"50px"}}>
            <span>Todos los derechos reservados - tiendagolden.com</span>
          </div>
    </StyledHeader>
  );
}