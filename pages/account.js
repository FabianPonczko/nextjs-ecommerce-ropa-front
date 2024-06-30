import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Table from "@/components/Table";
import {CartContext} from "@/components/CartContext";
import Input from "@/components/Input";
import Footer from "@/components/Footer"
import {useContext, useEffect, useState} from "react";
import axios from "axios";

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

export default function User(){
    const {cartProducts,addProduct,removeProduct,clearCart,addClient,dataClient} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] =  useState(dataClient[0]) || ('');
    const [email,setEmail] = useState(dataClient[1]) || ('');
    const [city,setCity] = useState(dataClient[2]) || ('');
    const [postalCode,setPostalCode] = useState(dataClient[3]) || ('');
    const [streetAddress,setStreetAddress] =useState(dataClient[4]) || ('');
    const [country,setCountry] = useState('Argentina');
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (cartProducts.length > 0) {
          axios.post('/api/cart', {ids:cartProducts})
          .then(response => {
            setProducts(response.data);
          })
      } else {
        setProducts([]);
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
  
    let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }
    return (
        <>
          <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                    <h2>Información de Usuario para pedido</h2>
                    
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
                    </Box>
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
                  <tr style={{height:"50px"}}>
                    <td >Total</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
                </ColumnsWrapper>
            </Center>
            <Footer />
    </>
  );
}