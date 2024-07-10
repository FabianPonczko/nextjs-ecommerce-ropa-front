import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
position:sticky;
  left:10px;
  botton:0px;
  
  background-color: #1111;
  display: block;
  font-Size: 10px;
  justify-content: space-between;
  padding: 0px;
@media screen and (min-width: 768px) {
   margin-top:50px;
    height: 210px;
    background-color: #222;
    color:#fff;
    font-Size: 16px;
  }
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
  color:black;
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
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",backgroundColor:"white"}}>

            <img src="img/mercadopago@2x.png" style={{width:"30px"}}></img>
            <img src="../img/agro.png" alt="tarjeta agro" style={{width:"30px"}}/>
                  <img src="../img/american.png" alt="tarjeta american" style={{width:"30px"}}/>
                  <img src="../img/argend.png" alt="tarjeta argend" style={{width:"30px"}}/>
                  <img src="../img/cabal.png" alt="tarjeta cabal" style={{width:"30px"}}/>
                  <img src="../img/cmr.png" alt="tarjeta cmr"style={{width:"30px"}} />
                  <img src="../img/cordobeza.png" alt="tarjeta cordobeza" style={{width:"30px"}}/>
                  <img src="../img/diners.png" alt="tarjeta diners" style={{width:"30px"}}/>
                  <img src="../img/naranja.png" alt="tarjeta naranja" style={{width:"30px"}}/>
                  <img src="../img/nativa.png" alt="tarjeta nativa" style={{width:"30px"}}/>
                  <img src="../img/shoping.png" alt="tarjeta shoping" style={{width:"30px"}}/>
                  <img src="../img/visa.png" alt="tarjeta visa" style={{width:"30px"}}/>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Formas de envío</p>
            <img src="img/correo.png" style={{width:"65px"}}></img>
          </div>
          
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>Contactos</p>
            <div style={{display:"flex",flexDirection:"column"}}>
              <div>
              <img style={{width:"20px",height:"20px",margin:"1px"}} src="../img/email.png" alt="icono email" />
                quetop@gmail.com
              </div>
              <div>
              <img style={{width:"22px",height:"24px",margin:"1px"}} src="../img/instagram.png" alt="icono instagram" />
                quetopoficial
              </div>
            </div>
          </div>
                   
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"50px"}}>
            <span>Todos los derechos reservados - tiendaqtop - COPYRIGHT 2024</span>
      </div>
    </StyledHeader>
  );
}