import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Footer from "@/components/Footer"
import { Router, useRouter } from "next/router";
import Title from "@/components/Title";
import Link from "next/link";
import Carousel from "@/components/Carrusel";
import {showAlert,showError} from "@/components/Alert";



const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
min-height: 20vh;
@media screen and (min-width: 768px) {
  grid-template-columns: 1.2fr .8fr;
  min-height: 400px
}
gap: 30px;
margin-top: 20px;
`;

const Box = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 30px;
`;

const ProductInfoCell = styled.td`
padding: 10px 0;
`;

const ProductImageBox = styled.div`
width: 70px;
height: 100px;
padding: 2px;
border: 1px solid rgba(0, 0, 0, 0.1);
display:flex;
align-items: center;
justify-content: center;
border-radius: 10px;
img{
  max-width: 60px;
  max-height: 60px;
}
@media screen and (min-width: 768px) {
  padding: 10px;
  width: 100px;
  height: 100px;
  img{
    max-width: 80px;
    max-height: 80px;
  }
  }
  `;

  const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
  `;
  
  const CityHolder = styled.div`
  display:flex;
  gap: 5px;
  `;
   
  
  export default function CartPage() {
    const {cartProducts,addProduct,removeProduct,clearCart,addClient,dataClient} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] =  useState(dataClient[0]) || ('');
    const [email,setEmail] = useState(dataClient[1]) || ('');
    const [city,setCity] = useState(dataClient[2]) || ('');
    const [postalCode,setPostalCode] = useState(dataClient[3]) || ('');
    const [streetAddress,setStreetAddress] =useState(dataClient[4]) || ('');
    const [country,setCountry] = useState('Argentina');
    const [isSuccess,setIsSuccess] = useState(false);
    const [mpReference,setMPreference] = useState(false);
    const [loading,setLoading] = useState(true)
    const [metodoEnvio, setMetodoEnvio] = useState('');
    
    const router = useRouter()    

    useEffect(() => {
      setLoading(true)
      if (cartProducts.length > 0) {
        axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        }).finally(setLoading(false))
    } else {
      setLoading(false)
      setProducts([]);
      setTimeout(() => {
      router.push("/")
      }, 3000);
    }
    if(dataClient.length>0){
      setName(dataClient[0])
      setEmail(dataClient[1])
      setCity(dataClient[2]) 
      setPostalCode(dataClient[3])
      setStreetAddress(dataClient[4])
    }
      
  }, [cartProducts]);
  
useEffect(() => {
  return () => {
    // Limpieza del estado de mpReference
    setMPreference(null);
  };
}, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);
  

   function moreOfThisProduct(id,{quantity}) {
    addProduct(id,quantity);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  
  const handleMetodoEnvioChange = (event) => {
    setMetodoEnvio(event.target.value);
  };

async function goToPaymentMP(e) {
    e.preventDefault()
    if (cartProducts.length > 0) {
      axios.post('/api/checkoutMercadopago', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,metodoEnvio
    }).then(response => {
      console.log({response})
      setMPreference(response.data);
      window.location.href = response.data;
    })
} else {
  setMPreference(null);
}
  const dataClientTosend=[
    name,
    email,
    city,
    postalCode,
    streetAddress,
  ]
  addClient(dataClientTosend)

}
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }
  let costoEnvio 
    if (cartProducts.length > 1){
        costoEnvio = 0
    }else{
      costoEnvio = 8500
}

  if (loading) {
    return (
      <>
        <Header />
        <Carousel/>
        <Center>
          <Title style={{color:"#345",fontStyle:"italic",fontFamily:"serif" , marginTop:"40px" , fontSize:"18px",marginLeft:"8px"}}><Link style={{textDecoration:"none",color:"#345",marginLeft:"2px"}} href={'/'}>Inicio </Link>/ <Link style={{textDecoration:"none",color:"#345"}} href={'/products'}> Productos </Link>/ Carrito</Title>
          <ColumnsWrapper>
            <Box>
               <h2>Carrito de compras</h2>
              <Table>
              <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                   <tr>
                    <td>
                      <div style={{width: "70px",height: "70px",backgroundColor:"#2222",borderRadius:"5px",marginTop:"5px"}}></div>
                    </td>
                    <td>
                      <div style={{width:"55px",height:"50px",marginLeft:"20px",backgroundColor:"#2222",borderRadius:"5px",marginTop:"5px"}}></div>
                    </td>
                    <td>
                      <div style={{width:"55px",height:"50px",backgroundColor:"#2222",borderRadius:"5px",marginTop:"5px"}}></div>
                    </td>
                   </tr>
                </tbody>
              </Table>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <Carousel/>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Gracias por su compra!</h1>
              <p>Le enviaremos un email cuando su orden este en camino.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Carousel/>
      <Center>
      <Title style={{color:"#345",fontStyle:"italic",fontFamily:"serif" , marginTop:"40px" , fontSize:"18px",marginLeft:"8px"}}><Link style={{textDecoration:"none",color:"#345",marginLeft:"2px"}} href={'/'}>Inicio </Link>/ <Link style={{textDecoration:"none",color:"#345"}} href={'/products'}> Productos </Link>/ Carrito</Title>
        <ColumnsWrapper>
          <Box>
            <h3>Carrito de compras</h3>
            {!cartProducts?.length && (
              <div>Su carrito esta vacio!</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="immage"/>
                        </ProductImageBox>
                      {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        
                        <Button
                          onClick={() =>cartProducts.filter(id => id === product._id).length < product.stock 
                            ?
                             moreOfThisProduct(product._id,{quantity:cartProducts.filter(id => id === product._id).length})
                             :
                             showError('Ultimas en stock')}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr style={{height:"15px"}}>
                  </tr>

                    {costoEnvio>0
                      ?
                      <>
                        <tr style={{height:"50px"}}> 
                          <td colspan="2">
                            <input
                            type="radio"
                            id="envio"
                            name="metodoEnvio"
                            value="envio"
                            checked={metodoEnvio === 'envio'}
                            onChange={handleMetodoEnvioChange}
                            />
                            <label>Envío a domicilio</label>
                          </td>
                          {costoEnvio>0?<td> ${costoEnvio}</td>:<td></td>}
                        </tr>
                        <tr style={{height:"50px"}}> 
                          <td colspan="2">
                            <input
                            type="radio"
                            id="entrega"
                            name="metodoEnvio"
                            value="entrega"
                            checked={metodoEnvio === 'entrega'}
                            onChange={handleMetodoEnvioChange}
                            />
                            <label>Punto de Entrega</label>
                          </td>
                          <td> $ 0</td>
                        </tr>
                      </>
                      :
                      <>
                      <td colspan="3" style={{height:"45px"}}>
                        <input
                          type="radio"
                          id="envio"
                          name="metodoEnvio"
                          value="envio"
                          checked={metodoEnvio === 'envio'}
                          onChange={handleMetodoEnvioChange}
                          />
                          Envío a domicilio gratis
                      </td>
                      <tr style={{height:"50px"}}> 
                          <td colspan="2">
                            <input
                            type="radio"
                            id="retiroPuntoEntrega"
                            name="metodoEnvio"
                            value="entrega"
                            checked={metodoEnvio === 'entrega'}
                            onChange={handleMetodoEnvioChange}
                            />
                            <label>Punto de Entrega</label>
                          </td>
                      </tr>
                      </>
                      // <td style={{color:"green",fontSize:"16px", fontWeight:"bold"}}>
                      //   Envío gratis!
                      //   </td>} 
                     
                      }
                 
                      
                    
                  
                  <tr style={{height:"5px"}}>
                  </tr>
                  {metodoEnvio===""
                    ?
                      <tr style={{height:"50px",color:"red"}}>
                        <td colSpan="3">
                          Seleccione un metodo de envio
                        </td>
                      </tr>
                    :
                      <tr style={{height:"50px",fontSize:"20px",fontWeight:"bold"}}>
                      <td >Total</td>
                      <td></td>
                      {metodoEnvio==="envio"
                        ?
                          <td>${total + costoEnvio}</td>
                        :
                          <td>${total}</td>
                      }
                      </tr>
                  }

                </tbody>
              </Table>
            )}
            {costoEnvio>0 && cartProducts?.length ?<tr style={{fontSize:"14px",color:"green"}}>* Comprando 2 o mas productos Envio Gratis !!! </tr>:null}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              {metodoEnvio==="envio"
              ?
              <>
              {metodoEnvio!=="" && <><h1 style={{color:"green"}}>Envío a domilicio</h1>
              <h6>
                Se notificara por mail el despacho de los productos
              </h6></>
              }
              <h3>Datos de usuario</h3>
              </>
              :
              <>
               {metodoEnvio!=="" && <><h1 style={{color:"green"}}>Punto de entrega </h1>
               <h6>
                Se notificara por mail el punto de entrega sobre(Av. Alem)
              </h6></>
              }
              <h3>Datos de usuario</h3>
              </>
              }
              <form onSubmit={goToPaymentMP}>
              <Input type="text"
                     placeholder="Nombre"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} required/>
              <Input type="text"
                     placeholder="Email"
                     value={email}
                     name="email"
                     onChange={ev => setEmail(ev.target.value)}required/>
              <CityHolder>
                <Input type="text"
                       placeholder="Ciudad"
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}required/>
                <Input type="text"
                       placeholder="Codigo Postal"
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}required/>
              </CityHolder>
              <Input type="text" 
                     placeholder="Calle"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}required/>
              <Input type="text"
                     placeholder="Argentina"
                     value={country}
                     name="country"
                      onChange={ev => setCountry(ev.target.value)} required/>
              {!mpReference && metodoEnvio &&
              <>
              <Button azulMP block
                      type="submit" value="submit"
                      // onClick={goToPaymentMP}
                      >
                Comprar ahora
              </Button>
                {/* <img src="../img/mercadopago@2x.png" alt="mercado pago" style={{width:"100%"}}/> */}
                <img src="../img/MP.jpg" alt="protección mercado pago" style={{width:"100%",marginTop:"20px"}} />
                        </>
              }
            </form>
              {/* {mpReference && 
                <a href ={mpReference} style={{textDecoration:"none"}}>
                  <Button azulMP block >
                    Pagar con Mercado Pago
                </Button>
                </a>
              } */}
              {!mpReference &&
              <div style={{display:"flex", justifyContent:"center", marginTop:"60px"}}>
                <Link href={"/products"}>
                  <button style={{border:"1px solid #0D3D29",minWidthwidth:"60px",width:"240px",borderRadius:"5px",padding:"5px",fontFamily:"Poppins",color:"#0D3D29"}}>Seguir Comprando</button>
                </Link>
              </div>
              }

            </Box>
          )}
        
        </ColumnsWrapper>
      </Center>
        <Footer />
    </>
  );
}
