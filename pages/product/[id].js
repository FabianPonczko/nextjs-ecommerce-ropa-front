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
import {showError} from "@/components/Alert";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr ;
  }
  gap: 10px;
  margin: 40px 0;
`;
const Banner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap:20px;
  font-size: 12px;
  justify-items: center;
  

  @media screen and (min-width: 768px) {
    display:none
    
  }
  
`;
const PriceRow = styled.div`
max-width: 90vw;
@media screen and (min-width: 768px) {
max-width: 440px;
}
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const PriceTachado = styled.div`
  font-size: 1.5rem;
  font-weight:600;
  text-align: center;
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
const Tarjetas = styled.div`
display:grid;
grid-Template-Columns: 1fr 1fr;
background-color: white;
@media screen and (min-width: 768px) {
  grid-Template-Columns: 1fr 1fr 1fr 1fr;
  
}
justify-items: center;
align-items: center;

`;
const Servicios= styled.div`
display:grid;
grid-Template-Columns: 1fr;
gap:30px;
@media screen and (min-width: 768px) {
display:grid;
grid-Template-columns: 1fr 1fr 1fr;
justify-Content: center;
gap:30px;
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
            <Title style={{display:"flex",flexDirection:"column",alignContent:"center", fontFamily:"", fontSize:"40px"}}>
              {product.title}
            </Title>
            <div style={{display:"flex",marginTop:"-25px"}}> 
              <p>{product.description}</p>
            </div>
            <PriceRow>
              <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
              <PriceTachado>
                ${product.price * 1.3}
              </PriceTachado>
              /
              <div style={{fontFamily:"serif",fontWeight:"bold"}}>
                <Price>${product.price}</Price>
              </div>
              
              </div>
              <div >
                {cartProducts.filter(id => id === product._id).length < product.stock 
                  ?
                  <Button white onClick={() =>cartProducts.filter(id => id === product._id).length < product.stock && moreOfThisProduct(product._id,{quantity:cartProducts.filter(id => id === product._id).length})}>
                    <CartIcon count={cartProducts.filter(id => id === product._id).length} tono="white"/>Agregar al carrito
                  </Button>
                  :
                  <Button white onClick={() =>showError('Ultimas unidades en stock')}>
                    <CartIcon count={cartProducts.filter(id => id === product._id).length} tono="white"/>Agregar al carrito
                  </Button>
                }
              </div>
                <Title style={{marginTop:"50px",fontSize:"30px"}}>Medios de pago</Title>
                <Tarjetas>
                  <img src="../img/agro.png" alt="tarjeta agro" />
                  <img src="../img/american.png" alt="tarjeta american" />
                  <img src="../img/argend.png" alt="tarjeta argend" />
                  <img src="../img/cabal.png" alt="tarjeta cabal" />
                  <img src="../img/cmr.png" alt="tarjeta cmr" />
                  <img src="../img/cordobeza.png" alt="tarjeta cordobeza" />
                  <img src="../img/diners.png" alt="tarjeta diners" />
                  <img src="../img/naranja.png" alt="tarjeta naranja" />
                  <img src="../img/nativa.png" alt="tarjeta nativa" />
                  <img src="../img/shoping.png" alt="tarjeta shoping" />
                  <img src="../img/visa.png" alt="tarjeta visa" />
                </Tarjetas>
                  <img  style={{maxWidth:"90vw",marginTop:"20px"}} src="../img/MP.jpg" alt="mercado pago protegido" />
                  <Title style={{marginTop:"30px",fontSize:"30px"}}>Métodos de envío</Title>
                    <Tarjetas style={{display:"flex",gap:"10px",padding:"10px"}}>
                    <div>
                      <img src="../img/correo.png" alt="tarjeta visa" style={{width:"80px"}} />      
                    </div>
                    <div>
                      <p>Envios a todo el país a través de correo argentino</p>
                    </div>
                    </Tarjetas>
                    <div style={{display:"flex",justifyContent:"center",marginTop:"45px"}}>
                      <Link href={"/cart"}>
                        <button style={{border:"1px solid #0D3D29",minWidthwidth:"60px",width:"240px",borderRadius:"5px",padding:"5px",fontFamily:"Poppins",color:"#0D3D29"}}>Carrito de compras</button>
                      </Link>
                    </div>
            </PriceRow>
           
          </div>
        </ColWrapper>
          

        
        <Banner>
          <div style={{display:"flex",flexDirection:"column",gap:"25px",marginBottom:"25px"}}>

          
          {/* <div style={{display:"flex",gap:"50px",justifyContent:"space-around", marginTop:"80px"}}> */}
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
              <svg  width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
                <div>
                  <div>
                  <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                    Comprá con seguridad
                  </div>
                    Tus datos siempre protegidos
                  </div>
                </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
              <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <div>
                <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                  Politica de devolución
                </div>
                <div>
                  No se aceptan cambios ni devoluciones
                </div>
                
              </div>
            </div>
            <div style={{marginBottom:"10px",display:"flex",alignItems:"center",gap:"20px"}}>
              <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div>
                <div style={{fontFamily:"sans-serif",fontWeight:"bold" , fontSize:"12px"}}>
                  Enviamos tu pedido
                </div>
                <div>
                  Entregas a todo el país
                </div>
                
              </div>
            </div>
          
          {/* </div> */}
          </div>
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