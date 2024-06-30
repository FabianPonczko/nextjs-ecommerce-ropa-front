import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

import Footer from "@/components/Footer"
import Sidebar from "@/components/sidebar";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";

export default function ProductsPage({products}) {
  const {cartProducts} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <Title style={{fontStyle:"italic",fontFamily:"serif" , marginTop:"55px"}}>Listado de Todos los Productos </Title>
        <ProductsGrid products={products} />
      </Center>
      <Sidebar itemCount={cartProducts.length}/>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}