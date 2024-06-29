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

const emailNuevaVenta=async({email, name,city,postalCode,streetAddress,id})=>{
    const mailOptions ={
        from:"qtopq@gmail.com",
        to: "qtopq@gmail.com",
        subject:"Nueva compra registrada",
        html:`
        <h1 style="color:red;">El usuario ${name} realizo una compra</h1>
        <h3>Id de compra: ${id} </h3>
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
const emailAvisoCliente=async({email, name,city,postalCode,streetAddress,id})=>{
    const mailOptions ={
        from:"quetopq@gmail.com",
        to: {email},
        subject:"Nueva compra registrada",
        html:`
        <h1 style="color:red;">Hola ${name} gracias por confiar en QueTop!, se registro tu compra</h1>
        <h2>Te avisaremos cuando tu producto este en camino!</h1>
        <h3>Codigo de compra: ${id} </h3>
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