// components/Sidebar.js
import Link from "next/link";
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  bottom: 50vh; /* Ajusta la distancia desde abajo según sea necesario */
  left: 90%;
  transform: translateX(-40%);
  background-color: rgba(255, 255, 255, 0.5); /* Fondo semi-transparente blanco */
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(255, 0, 5, .2);
  z-index: 1000; /* Asegúrate de que esté por encima del contenido principal */
@media screen and (min-width: 768px) {
    display:none;
}
 
`;

const CartIcon = styled(FaShoppingCart)`
  font-size: 24px;
  color: rgba(0, 0, 0, .2); /* Fondo semi-transparente blanco */
`;
const ItemCount = styled.span`
position:absolute;  
font-size: 16px;
margin-top: -5px;
margin-left: -2px;
color:red;
  
`;

const Sidebar = ({ itemCount }) => {
  if(itemCount){
      return (
        <SidebarContainer>
           <Link href={'/cart'}>
            <CartIcon />
            <ItemCount>{itemCount}</ItemCount>
           </Link>
        </SidebarContainer>
  );
}
};

export default Sidebar;
