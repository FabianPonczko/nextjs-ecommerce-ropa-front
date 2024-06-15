'use client';
import crypto from 'crypto';
import {Order} from "@/models/Order";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
        }
const headers = req.headers
   // Obtain the x-signature value from the header
const xSignature = headers['x-signature']; // Assuming headers is an object containing request headers
const xRequestId = headers['x-request-id']; // Assuming headers is an object containing request headers

// Obtain Query params related to the request URL

const dataID = req.query

console.log(dataID)
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
const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

// Create an HMAC signature

const hmac = crypto.createHmac('sha256', secret);
hmac.update(manifest);

// Obtain the hash result as a hexadecimal string
const sha = hmac.digest('hex');

if (sha === hash) {
    // HMAC verification passed
    if (dataID.status==="approved"){
        await Order.findByIdAndUpdate(dataID.preference_id,{
            paid:true,
        })
    }
    res.status(200).end("Hello HMAC verification passed");
    
} else {
    // HMAC verification failed
    res.status(200).end("Hello HMAC verification failed");
}


}
  