import crypto from 'crypto';
import {Order} from "@/models/Order";

import {emailNuevaVenta,emailAvisoCliente} from "@/servicio/nodemailer"

// SDK de Mercado Pago
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

export default async function handler(req, res) {

const headers = req.headers

   // Obtain the x-signature value from the header
const xSignature = headers['x-signature']; // Assuming headers is an object containing request headers
const xRequestId = headers['x-request-id']; // Assuming headers is an object containing request headers

// Obtain Query params related to the request URL

const dataID = req.query

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
    console.log("verification passed")
    // HMAC verification passed
    if (dataID.type==="payment"){
        console.log("id de pago encontrado",dataID["data.id"])
               
        const payment = await new Payment(client).get({id:dataID["data.id"]})
            const id = payment.external_reference
            
            console.log("encontro data: ", id)

            console.log("status del pago :",payment.status)
            if (payment.status==="approved"){
                const resp = await Order.findByIdAndUpdate({_id:id},{
                    paid:true,
                    dataid:dataID["data.id"]
                })
                await emailNuevaVenta(resp,id)
                await emailAvisoCliente(resp,id)
            }
             
    }
    res.status(200).end("Hello HMAC verification passed");
    
} else {
    // HMAC verification failed
    console.log("Hello HMAC verification failed")
    res.status(200).end("Hello HMAC verification failed");
    
}


}
  