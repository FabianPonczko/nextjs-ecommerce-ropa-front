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
import Footer from "@/components/Footer"


export default function CategoriesPage({products,categories}) {
    const[selected,setSelected]=useState("All")
    const[filtrados,setFiltrados]=useState(products)
    const[catfiltrados,setCatFiltrados]=useState("")
    const[propertiesfound,setPropertiesfound]=useState([])

    const prop =[];

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
    setPropertiesfound("")

  },[selected,categories,products])

  useEffect(()=>{
    setFiltrados(products.filter(prod=>{
      if(propertiesfound?.length && propertiesfound[0] !=="All"){
        return(
          prod.category === selected && Object.values(prod.properties).includes(propertiesfound[0])
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
  },[propertiesfound,categories,products,selected])
  
  const groupedValues = {};
    {for (const i in filtrados) {
      prop.push(filtrados[i].properties)
    }}

    return (
    <>
      <Header />
      <Center>
        <Title style={{fontStyle:"italic",fontFamily:"serif"}}>Categorias</Title>
      <div style={{display:"flex", gap:"15px" , alignItems:"center" }}>
        <label>Filtro </label>
        <select style={{backgroundColor:"#fafaf3", borderRadius:"5px" , padding:"1px"}}
          value ={selected}
          onChange={e=>(
            setSelected(e.target.value)
            )}>
        <option value="All" >All</option>
            {categories.length > 0 && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>))}
       </select>

      {prop.length > 0 && prop.map((ind, index) => {
         // Objeto para agrupar valores por clave
          // Iterar sobre las entradas del objeto para agrupar los valores
          ind && Object.entries(ind).forEach(([key, value]) => {
          
            // no incluira la key stock
            if (!groupedValues[key]) {
              key!=="stock" ? groupedValues[key] = [value]:null; // Inicializar el array si la clave no existe
            } else {
              !groupedValues[key].includes(value) ? groupedValues[key].push(value):null // Agregar el valor al array existente
            }
          });
        
        })
      }
    <div  style={{display:"flex", gap:"15px"}}>
             {Object.entries(groupedValues).map(([key, values], innerIndex) => (
               <div key={key} style={{ display: "flex", gap: "5px", alignItems:"center" }}>
                 <label>{key}</label>
                 <select style={{backgroundColor:"#fafaf3", borderRadius:"5px", padding:"1px"}}
                   onChange={ev => setPropertiesfound([ev.target.value])}
                   value={propertiesfound[0]}
                 >
                   <option value="All">All</option>
                   {values.map((value, valueIndex) => (
                     <option key={valueIndex} value={value}>{value}</option>
                   ))}
                 </select>
               </div>
             ))}
           </div>
      </div>  
      <ProductsGrid  products= {filtrados.length ? filtrados: propertiesfound ==="All" || selected==="All" ? products :[{_id:"",title:"Sin STOCK",description:"",price:"",images:["img/logo.jpg"]}]}/>
      </Center>
      <Footer />
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