import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';


// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

export default async function Mp(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
    }
    const {
      name,email,city,
      postalCode,streetAddress,country,
      cartProducts,
      } = req.body;
      await mongooseConnect();
      const productsIds = cartProducts;
      const uniqueIds = [...new Set(productsIds)];
      const productsInfos = await Product.find({_id:uniqueIds});
      
      let line_items = [];
      const MPitem=[];
      let MP_id=null;
      const id_mp=[]
      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'AR',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price,
          },
          });
          }
          if (quantity > 0 && productInfo) {
            MPitem.push({
              quantity,
              title:productInfo.title,
              price: productInfo.price ,
              });
              }
              }
            

  // const orderDoc = await Order.create({
  //   line_items,name,email,city,postalCode,
  //   streetAddress,country,paid:false,id_MP
  // });
console.log({MPitem})

// MERCADO PAGO 

const preference = new Preference(client);
  MPitem.length > 0 && preference.create({
    body: {
      items: 
        MPitem.map(item=>({
          title: item.title,
          quantity: item.quantity,
          unit_price:item.price
        })
      ),
      back_urls:{
        success: process.env.PUBLIC_URL + '/cart?success=1',
        failure: process.env.PUBLIC_URL + '/cart?failure=1',
        pending: process.env.PUBLIC_URL + '/cart?pending=1',
        // metadata: {orderId:orderDoc._id.toString(),test:'ok'},
      },
      auto_return:"approved"
      
    }
  
  })
  .then((e)=>{
    MP_id=e;
    console.log(MP_id.collector_id)
    id_mp.push(MP_id)
    res.json(e.sandbox_init_point)
    
    // res.json({respuesta:e.body.init_point})
    })    
    .catch(console.log);
    
   await Order.create({
      line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,
    mp_id:id_mp.collector_id
    });


  // ---------------------

  // const session = await stripe.checkout.sessions.create({
  //   line_items,
  //   mode: 'payment',
  //   customer_email: email,
  //   success_url: process.env.PUBLIC_URL + '/cart?success=1',
  //   cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
  //   metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  // });

  // res.json({
  //   url:session.url,
  // })

}