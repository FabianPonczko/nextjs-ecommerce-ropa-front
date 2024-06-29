import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";
import ButtonLink from "./ButtonLink";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title style={{fontStyle:"italic",fontFamily:"serif"}}>Nuevos Ingresos</Title>
      <ProductsGrid products={products} />
      <div style={{display:"flex", justifyContent:"center", marginTop:"40px"}}>
        <Link href={"/products"}>
          <button style={{minWidthwidth:"60px",width:"240px",borderRadius:"5px",padding:"5px",fontFamily:"Poppins",color:"#0D3D29"}}>Todos los productos</button>
        </Link>
      </div>
    </Center>
  )
}