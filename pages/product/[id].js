import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr ;
  }
  gap: 20px;
  margin: 40px 0;
`;
const Banner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
 
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr ;
    justify-items: center;
    align-items: center;
  
  }
  gap: 5px;
  margin: 10px 0px;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const PriceTachado = styled.div`
  font-size: 1.5rem;
  font-weight:600;
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
export default function ProductPage({product}) {
  const {cartProducts,addProduct} = useContext(CartContext);
  
  function moreOfThisProduct(id,{quantity}) {
    addProduct(id,quantity);
  }

  return (
    <>
      <Header />
      <Center>
      <Title style={{color:"#345",fontStyle:"italic",fontFamily:"serif",fontSize:"18px",marginLeft:"10px",marginBottom:"-20px"}}><Link style={{textDecoration:"none",color:"#345"}} href={'/'}>Inicio </Link>/<Link style={{textDecoration:"none",color:"#345"}} href={'/products'}> Productos </Link>/ Detalles</Title>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title style={{display:"flex",flexDirection:"column",alignContent:"center", fontFamily:"cursive", fontSize:"40px"}}>
              {product.title}
              
            </Title>
            <p>{product.description}</p>
            <PriceRow>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"15px"}}>
              <PriceTachado>
                ${product.price * 1.3}
              </PriceTachado>
              /
              <div style={{fontFamily:"serif",fontWeight:"bold"}}>
                <Price>${product.price}</Price>
              </div>
              <div>
              {cartProducts.filter(id => id === product._id).length < product.stock 
                ?
                <Button white onClick={() =>cartProducts.filter(id => id === product._id).length < product.stock && moreOfThisProduct(product._id,{quantity:cartProducts.filter(id => id === product._id).length})}>
                  <CartIcon />Agregar al carrito
                </Button>
                :
                <Button yellow onClick={() =>null}>
                  <CartIcon />Sin Stock
                </Button>
              }
              </div>
              </div>
            </PriceRow>
           
          </div>
        </ColWrapper>
        <Banner>
          {/* <div style={{display:"flex",gap:"50px",justifyContent:"space-around", marginTop:"80px"}}> */}
            <div style={{marginTop:"40px",height:"30px",display:"flex",alignItems:"center",gap:"20px"}}>
              <svg  width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
                <div>
                  <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                    COMPRÁ CON SEGURIDAD
                  </div>
                  <div>
                    Tus datos siempre protegidos
                  </div>
                </div>
            </div>
            <div style={{marginTop:"40px",height:"30px",display:"flex",alignItems:"center",gap:"20px"}}>
              <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <div>
                <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                  POLITICA DE DEVOLUCIÓN
                </div>
                <div>
                  No se aceptan cambios ni devoluciones
                </div>
                
              </div>
            </div>
            <div style={{marginTop:"40px",height:"30px",display:"flex",alignItems:"center",gap:"20px"}}>
              <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div>
                <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                  ENVIAMOS TU COMPRA
                </div>
                <div>
                  Entregas a todo el país
                </div>
                
              </div>
            </div>
          {/* </div> */}
          </Banner>
      </Center>
      <Sidebar itemCount={cartProducts.length}/>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}