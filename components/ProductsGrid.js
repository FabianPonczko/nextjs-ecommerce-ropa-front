import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { useEffect, useState } from "react";

const StyledProductsGrid = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({products,productRating}) {
  const [productRates,setProductRates] = useState('')

  useEffect(()=>{
    setProductRates(productRating?.filter(prod=>{
      return(
        prod.productId === products._id
      )
    }))
  },[]);
  
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} productRating={productRating} />
      ))}
    </StyledProductsGrid>
  );

  
}