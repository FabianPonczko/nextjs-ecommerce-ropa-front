import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer"
import Sidebar from "@/components/sidebar";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";
import Carousel from "@/components/carrusel";





export default function HomePage({featuredProduct,newProducts}) {
  const {cartProducts} = useContext(CartContext);
  return (
    <div>
      <Header />
      {/* <Featured product={featuredProduct} /> */}
      <Carousel/>
      <NewProducts products={newProducts} />
      <Sidebar itemCount={cartProducts.length}/>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '666ef60af1731487b5ba43d5';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:8});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}