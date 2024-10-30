import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import StarRating from "@/components/StartRating";
import StarRatingPorcent from "./StartRatingPorcent";
import { desc } from "@/lib/descuento";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  position: relative;
  background-color: #fff;
  padding: 5px ;
  height: 130px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
    img{
    max-width: 100%;
    max-height: 120px;
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
  left: 25px; /* Ajusta la posición horizontalmente */
  background-color: #E53232; /* Color de fondo del texto */
  color: white; /* Color del texto */
  padding: 2px; /* Espacio alrededor del texto */
  font-size: 12px; /* Tamaño de fuente */
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 25px; /* Ajusta la posición verticalmente */
    left: 25px; /* Ajusta la posición horizontalmente */
  }
`;
const Rotar = styled.div`
position:absolute;
transform: rotate(-15deg);
color :white;
background-color:#E53232 ;
width: 100%;
padding:1px;
border: 1px solid white;
border-radius:3px
`

export default function ProductBox({_id,stock,title,description,price,images,productRating}) {
  const {cartProducts,addProduct} = useContext(CartContext);
  const [productRates,setProductRates] = useState('')
  const url = title!=="Sin STOCK"? '/product/'+_id:"";

  useEffect(()=>{
    setProductRates(productRating?.filter(item=> item.productId === _id))
  },[])
  
  const handleRate = (productRating) => {
    console.log('Rating selected:', productRating?.rate);
  };
  
  function promedioRates(){
    let suma = 0
    for (let index = 0; index < productRates?.length; index++) {
       suma = suma + productRates[index].rate
    }
   if (suma)  
     return  (suma/productRates?.length).toFixed(1)
   return 0
  } 
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
      {stock!==0 &&<Descuento>{desc}% OFF</Descuento>}
        <div key={_id}>
          <img src={images?.[0]}  alt="imagen"/>
        </div>
        {stock==0 && <Rotar>Agotado</Rotar>}
        

      </WhiteBox>
      <ProductInfoBox>
        
        {stock==0
        ?<Title href={url} style={{color: "#FF0000"}}>{title}</Title>

        :<Title href={url}>{title}</Title>}
        
        <PriceRow>
          <div style={{display:"flex",justifyContent:"center",gap:"5px"}}>
            <PriceTachado>
              ${Math.ceil( price * 1.335) }
            </PriceTachado>
            /
            <Price>
              ${price}
            </Price>
          </div>
          
            {cartProducts.filter(id => id === _id).length < stock 
            ?
            <Button outline primary flex onClick={() => title!=="Sin STOCK"?addProduct(_id):null} >
              <CartIcon count={cartProducts.filter(id => id === _id).length} tono="black"/>Agregar 
            </Button>
            :
            <Button outline primary flex onClick={() => null} >
              <CartIcon count={cartProducts.filter(id => id === _id).length} tono="black"/>Sin stock
            </Button>
            }
        </PriceRow>

            <div style={{fontSize:"12px",display:"flex",alignItems:"center",marginTop:"5px"}}>
              {/* <StarRating totalStars={5} onRate={promedioRates()} isDisabled = {true}/> */}
              <StarRatingPorcent percentage={promedioRates()} />
              ({promedioRates()})
            </div>

      </ProductInfoBox>
    </ProductWrapper>
  );
}