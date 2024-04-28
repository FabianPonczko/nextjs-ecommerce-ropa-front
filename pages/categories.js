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
    const[selected,setSelected]=useState("All")
    const[filtrados,setFiltrados]=useState(products)
    const[catfiltrados,setCatFiltrados]=useState("")
    const[properties,setProperties]=useState([])

  useEffect(()=>{
    setFiltrados(products.filter(prod=>{
      return(
        prod.category === selected
      )
    }))
    setCatFiltrados(categories.filter(cat=>{
      return(
        cat._id === selected
      )
    }))
  },[selected])

  useEffect(()=>{
    setFiltrados(products.filter(prod=>{
      if(properties?.length && properties[1] !=="All" ){
        return(
          console.log(prod.category === selected   &&  prod.properties[properties[0]] === properties[1]),
            prod.category === selected   &&  prod.properties[properties[0]] === properties[1]
          )
      }
      return(
        prod.category === selected
      )
    }))
    setCatFiltrados(categories.filter(cat=>{
      return(
        cat._id === selected
      )
    }))
  },[properties])
  
    
    return (
    <>
      <Header />
      <Center>
        <Title>Categories </Title>
      <div style={{display:"flex", gap:"15px" }}>
        <label>Category </label>
        <select  value={selected}
          
          onChange={e=>(
            setSelected(e.target.value)
            )}>
        <option value="All" >All</option>
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
                <option value="All" >All</option>
                  {e.values?.map(v=>(
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      
      </div>  
      <ProductsGrid  products= {filtrados.length ? filtrados: properties[1] ==="All" || selected==="All" ? products :[{_id:"",title:"Sin STOCK",description:"",price:"",images:["img/logo.jpg"]}]}/>
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