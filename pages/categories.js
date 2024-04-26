import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Categories} from "@/models/Categories";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Input from "@/components/Input";
import { useEffect, useState } from "react";


export default function CategoriesPage({products,categories}) {
    const[selected,setSelected]=useState("")
    const[filtrados,setFiltrados]=useState("")
    const[catfiltrados,setCatFiltrados]=useState("")
    const[properties,setProperties]=useState([])
  useEffect(()=>{
    setFiltrados(products.filter(e=>{
      if(properties){
        console.log("e.properties",e.properties , "properties",properties)
        return(
          e.category === selected   && e.properties[properties[0]] === properties[1]
        )
      }
      return(
        e.category === selected
      )
    }))
    setCatFiltrados(categories.filter(e=>{
      return(
        e._id === selected
      )
    }))
  },[selected,properties])
  
    
    return (
    <>
      <Header />
      <Center>
        <Title>Categories </Title>
      <div style={{display:"flex", gap:"15px" }}>
        <label>Category </label>
        <select  value={selected}
          
          onChange={e=>(
            setSelected(e.target.value),
            setProperties(null)
            )}>
        <option value="" >All</option>
            {categories.length > 0 && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>))}
       </select>
       
        

      
          
        {catfiltrados.length >0 && catfiltrados.map(filtro =>(
          <div style={{display:"flex", gap:"15px" }}>
            {filtro.properties.map(e=>(
              <div style={{display:"flex", gap:"5px" }}>
                <label>{e.name}</label>
                <select value={properties? properties[e.name]:e.name}
                onChange={ev=>setProperties([e.name,ev.target.value])}
                >
                <option value="" >All</option>
                  {e.values?.map(v=>(
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      
      </div>  
      
          {/* // console.log("filtro ",filtro)
          // filtro.properties.map(e=>(
            //   //  <select>
            //   // console.log("filtro.propiedad ",e.name) 
            
            //   // </select>
            // ))
          */}
      

      

          
            {/* <option value="" >All</option>
            {categories.length > 0 && categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>))}
          </select> */}
            
        
        
      <ProductsGrid  products= {filtrados.length ? filtrados: products}/>
      </Center>
    </>
  );
}


export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
     const category = await Categories.find({}, null, {sort:{'_id':-1}})
    
    return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(category)),
    }
};
}