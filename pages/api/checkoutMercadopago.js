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
      cartProducts,metodoEnvio
      } = req.body;
      await mongooseConnect();
      const productsIds = cartProducts;
      const uniqueIds = [...new Set(productsIds)];
      const productsInfos = await Product.find({_id:uniqueIds});
      
      const line_items = [];
      const MPitem=[];
      let MP_id=null;
      const id_mp=[]
      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            product_data: {
              id:productId,
              title:productInfo.title,
              price:productInfo.price,
              quantity:quantity,
              amount:quantity * productInfo.price,
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

let costoEnvio 
    if (cartProducts.length > 1 || metodoEnvio ==="entrega"){
        costoEnvio = 0
    }else{
      costoEnvio = 7300
}

// MERCADO PAGO 
const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,dataid:"",
    metodoEnvio
  });


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
      shipments:{
            "cost": {costoEnvio},
            "mode": "not_specified",
          },
      external_reference: orderDoc._id.toString(),
      back_urls:{
        success: process.env.PUBLIC_URL + '/cart?success=1',
        failure: process.env.PUBLIC_URL + '/cart?failure=1',
        pending: process.env.PUBLIC_URL + '/cart?pending=1',
      },
      auto_return:"approved",
      notification_url: process.env.PUBLIC_URL + "/api/notification",
      shipments:{
        "cost": costoEnvio,
        "mode": "not_specified",
      }
    }
  })
  .then((e)=>{
    // res.json(e.sandbox_init_point)
    res.json(e.init_point)
    
    // res.json({respuesta:e.body.init_point})
    })    
    .catch(console.log);


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