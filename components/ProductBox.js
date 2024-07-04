import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  position: relative;
  background-color: #fff;
  padding: 5px ;
  height: 170px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
    img{
    max-width: 100%;
    max-height: 150px;
    border-radius: 10px;
  }
  @media screen and (min-width: 768px) {
  height: 270px;  
    img{
      max-width: 100%;
      max-height: 250px;
      border-radius: 10px;
    }
  }
    
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;
const PriceTachado = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  text-decoration: line-through;
  color: #EF8281; /* Color gris para simular que está descontado */
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
      text-decoration: line-through;
  color: #EF8281; /* Color gris para simular que está descontado */
  }
`;
const Descuento = styled.div`
  position: absolute;
  top: 20px; /* Ajusta la posición verticalmente */
  border-radius: 5px;
  right: 85px; /* Ajusta la posición horizontalmente */
  background-color: #E53232; /* Color de fondo del texto */
  color: white; /* Color del texto */
  padding: 2px; /* Espacio alrededor del texto */
  font-size: 12px; /* Tamaño de fuente */
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 25px; /* Ajusta la posición verticalmente */
    right: 195px; /* Ajusta la posición horizontalmente */
  }
`;

export default function ProductBox({_id,stock,title,description,price,images}) {
  const {cartProducts,addProduct} = useContext(CartContext);
  const url = title!=="Sin STOCK"? '/product/'+_id:"";
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <Descuento>30% OFF</Descuento>          
        <div key={_id}>
          <img src={images?.[0]}  alt="imagen"/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        
        {title==="Sin STOCK"
        ?<Title href={url} style={{color: "#FF0000"}}>{title}</Title>
        :<Title href={url}>{title}</Title>}
        
        <PriceRow>
          <PriceTachado>
            ${price * 1.3}
          </PriceTachado>
          <Price>
            ${price}
          </Price>
          
          {cartProducts.filter(id => id === _id).length < stock 
          ?
          <Button outline primary block onClick={() => title!=="Sin STOCK"?addProduct(_id):null} >
            <CartIcon />Agregar
          </Button>
          :
          <Button outline primary block onClick={() => null} >
            <CartIcon />Sin stock
          </Button>
          }
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}