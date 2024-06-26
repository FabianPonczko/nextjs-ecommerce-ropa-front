import {createTransport} from "nodemailer"

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.PASSUSER
    },
     tls : { rejectUnauthorized: false }
})

const emailNuevaVenta= async ({email, name,city,postalCode,streetAddress,id,paid,dataid})=>{
    
    const mailOptions ={
        from:process.env.EMAILUSER,
        to: "quetopq@gmail.com",
        subject:"Nueva compra registrada",
        html:`
        <h1 style="color:red;">El usuario ${name} realizo una compra</h1>
        <h3>Id de compra: ${id} </h3>
        <h3>Codigo de compra MP: ${dataid} </h3>
        <h3>paid: ${paid} </h3>
        <h3>Nombre: ${name} </h3>
        <h3>Email: ${email} </h3>
        <h3>Ciudad: ${city} </h3>
        <h3>Dirección: ${streetAddress} </h3>
        <h3>Codigo postal: ${postalCode} </h3>
        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log({info})
    } catch (error) {
        console.log({error})
    }
}
const emailAvisoCliente=async({email, name,city,postalCode,streetAddress,id,dataid})=>{
    const mailOptions ={
        from:process.env.EMAILUSER,
        to: email,
        subject:"Nueva compra registrada",
        html:`
        <h1 style="color:blue">Hola ${name}, gracias por confiar en QueTop!</h1>
        <h2>Te avisaremos cuando tu compra este en camino!</h1>
        <h3>Codigo de compra: ${id} </h3>
        <h3>Codigo de compra MP: ${dataid} </h3>
        <h2 style="color:red">Datos de envío:</h2>
        <h3>Nombre: ${name} </h3>
        <h3>Email: ${email} </h3>
        <h3>Ciudad: ${city} </h3>
        <h3>Dirección: ${streetAddress} </h3>
        <h3>Codigo postal: ${postalCode} </h3>
        <h4>**********************************</h4>
        <h5>Mail automatico! no responda este email</h5>
        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log({info})
    } catch (error) {
        console.log({error})
    }
}
// const emailNuevoOrder=async(datosUser,total,email)=>{
//     const data = datosUser.map(element =>{
//             return `<h3>Articulo:  ${element.products.title}, valor:  $${element.products.price}, Cantidad: ${element.quantity} </h3>
//              `
//     })
    
//     const mailOptions ={
//         from:"servidor node",
//         to: `${process.env.newUserAndOrderEmail}`,
//         subject:"Nueva compra",
//         html:`<h1 style="color:blue;">Productos comprados</h1> 
//         ${data}
//         <h1>Total: $${total}</h1>`
//     }

//     try {
//         const info= await transporter.sendMail(mailOptions)
//         console.log(info)
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports ={emailNuevaVenta,emailAvisoCliente}