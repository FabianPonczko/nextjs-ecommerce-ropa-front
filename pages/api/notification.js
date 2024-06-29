import crypto from 'crypto';
import {Order} from "@/models/Order";


import {emailNuevaVenta,emailAvisoCliente} from "@/servicio/nodemailer"



// SDK de Mercado Pago
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { useState ,useEffect} from 'react';


// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });


export default async function Dandler(req, res) {
const [mp,setMp]=useState("")
const [respuesta,setRespuesta]=useState("")
const [respuestaId,setRespuestaId]=useState("")



async function mandamail () {
    await emailNuevaVenta(respuesta,respuestaId,mp)
    await emailAvisoCliente(respuesta,respuestaId,mp)
}
useEffect(()=>{
    mandamail()
},[mp])
const headers = req.headers

   // Obtain the x-signature value from the header
const xSignature = headers['x-signature']; // Assuming headers is an object containing request headers
const xRequestId = headers['x-request-id']; // Assuming headers is an object containing request headers

// Obtain Query params related to the request URL

const dataID = req.query

console.log({dataID})
// Separating the x-signature into parts
const parts = xSignature?.split(',');

// Initializing variables to store ts and hash
let ts;
let hash;

// Iterate over the values to obtain ts and v1
parts?.forEach(part => {
    // Split each part into key and value
    const [key, value] = part.split('=');
    if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === 'ts') {
            ts = trimmedValue;
        } else if (trimmedKey === 'v1') {
            hash = trimmedValue;
        }
    }
});

// Obtain the secret key for the user/application from Mercadopago developers site
const secret = process.env.SECRET;

// Generate the manifest string
const manifest = `id:${dataID["data.id"]};request-id:${xRequestId};ts:${ts};`;

// Create an HMAC signature

const hmac = crypto.createHmac('sha256', secret);
hmac.update(manifest);

// Obtain the hash result as a hexadecimal string
const sha = hmac.digest('hex');


// async function getdata(id){
//     console.log("llego id: ", id)
//     await Order.findByIdAndUpdate({_id:id},{
//         paid:true,
//     })
// }

if (sha === hash) {
    console.log("en inicio verification passed")
    // HMAC verification passed
    if (dataID.type==="payment"){
        console.log("pagado, buscando pago")
        console.log("id de pago",dataID["data.id"])
        console.log("id_mp :",id_mp)
        const payment = await new Payment(client).get({id:dataID["data.id"]})
            const id = payment.external_reference
            console.log("encontro data: ", id)
             const resp = await Order.findByIdAndUpdate({_id:id},{
                paid:true,
                dataid:dataID["data.id"]
            })
            setRespuestaId(id)
            setRespuesta(resp)
            setMp(dataID["data.id"])
    }
    res.status(200).end("Hello HMAC verification passed");
    
} else {
    // HMAC verification failed
    console.log("Hello HMAC verification failed")
    res.status(200).end("Hello HMAC verification failed");
    
}


}
  