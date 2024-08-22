import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Rating} from "@/models/Rating"
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

import Footer from "@/components/Footer"
import Sidebar from "@/components/sidebar";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";
import Carousel from "@/components/Carrusel";
import Link from "next/link";

export default function ProductsPage({products,productRating}) {
  const {cartProducts} = useContext(CartContext);
  return (
    <>
      <Header />
      <Carousel/>
      <Center>
        <Title style={{color:"#345",fontStyle:"italic",fontFamily:"serif" , marginTop:"40px" , fontSize:"18px",marginLeft:"10px"}}><Link style={{textDecoration:"none",color:"#345"}} href={'/'}>Inicio </Link>/ Productos  </Title>
        <ProductsGrid products={products} productRating={productRating}/>
      </Center>
      <Sidebar itemCount={cartProducts.length}/>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  const productRating = await Rating.find({}, null, {sort: {'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
      productRating: JSON.parse(JSON.stringify(productRating)),
    }
  };
}