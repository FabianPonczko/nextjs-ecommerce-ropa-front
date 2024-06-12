'use client';
import crypto from 'crypto';
export default async function handler(req, res) {
    const headers = req.headers
   // Obtain the x-signature value from the header
const xSignature = headers['x-signature']; // Assuming headers is an object containing request headers
const xRequestId = headers['x-request-id']; // Assuming headers is an object containing request headers

// Obtain Query params related to the request URL

    const urlParams =  new  URLSearchParams() 
    //  const urlParams = new URLSearchParams(window.location.urlParams);
     const dataID = urlParams.get('data.id');
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

const hmac = crypto.createHmac('sha256', "ac277b8713e8bed60c1c0f9a39b1b8c41d73287238acea88e6a4b94bf7bad671");
hmac.update(manifest);

// Obtain the hash result as a hexadecimal string
const sha = hmac.digest('hex');

if (sha === hash) {
    // HMAC verification passed
    console.log("HMAC verification passed");
} else {
    // HMAC verification failed
    console.log("HMAC verification failed");
}

res.status(200)

}
  