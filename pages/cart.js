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


const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
  grid-template-columns: 1.2fr .8fr;
  min-height: 400px
}
gap: 40px;
margin-top: 40px;
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
    
    const router = useRouter()    

    useEffect(() => {
      setLoading(true)
      if (cartProducts.length > 0) {
        axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
      setTimeout(() => {
      router.push("/")
      }, 4000);
    }
    setLoading(false)
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
  

   function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  async function goToPaymentMP(e) {
    e.preventDefault()
    if (cartProducts.length > 0) {
      axios.post('/api/checkoutMercadopago', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    }).then(response => {
      console.log({response})
      setMPreference(response.data);
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
  async function pagar(){
    href=mpReference
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
      costoEnvio = 7300
}
console.log(products.length)
  if (loading) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Cargando valores</h1>
              <p>Por favor espere,</p>
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
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Carrito de compras</h2>
            {!cartProducts?.length && (
              <div>Su carrito esta vacio!</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
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
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr style={{height:"15px"}}>
                  </tr>
                  <tr style={{height:"35px"}}>
                    {costoEnvio>0?<td style={{color:"red"}}>Envio por correo</td>:<td style={{color:"gray",fontSize:"20px"}}>Envio gratis!!!</td>}
                    <td></td>
                    {costoEnvio>0?<td> ${costoEnvio}</td>:<td></td>}
                  </tr>
                    {costoEnvio>0?<tr style={{fontSize:"10px",color:"green"}}>Envio Gratis !!! Comprando 2 o mas productos</tr>:null}
                  <tr style={{height:"5px"}}>
                  </tr>
                  <tr style={{height:"50px",fontSize:"20px"}}>
                    <td >Total</td>
                    <td></td>
                    <td>${total+costoEnvio}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Información para el pedido</h2>
              <form onSubmit={goToPaymentMP}>
              <Input type="text"
                     placeholder="Name"
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
                       placeholder="City"
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}required/>
                <Input type="text"
                       placeholder="Postal Code"
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}required/>
              </CityHolder>
              <Input type="text" 
                     placeholder="Street Address"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}required/>
              <Input type="text"
                     placeholder="Argentina"
                     value={country}
                     name="country"
                      onChange={ev => setCountry(ev.target.value)} required/>
              <Button primary block
                      type="submit" value="submit"
                      // onClick={goToPaymentMP}
                      >
                Continuar con el pago
              </Button>
            </form>
              
              {mpReference && 
                <a href ={mpReference} style={{textDecoration:"none"}}>
                  <Button azulMP block >
                    Pagar con Mercado Pago
                </Button>
                </a>
              }

            </Box>
          )}
        
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
