import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Image from "next/image";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 10px ;
  height: 210px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
    img{
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
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
    gap: 5px;
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

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = title!=="Sin STOCK"? '/product/'+_id:"";
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div key={_id}>
          <Image src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        
        {title==="Sin STOCK"
        ?<Title href={url} style={{color: "#FF0000"}}>{title}</Title>
        :<Title href={url}>{title}</Title>}
        
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button block onClick={() => title!=="Sin STOCK"?addProduct(_id):null} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}