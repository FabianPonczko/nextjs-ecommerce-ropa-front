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

const emailNuevaVenta=async({email, name,adress,city,zipcode})=>{
    const mailOptions ={
        from:"Qtop! servicio de mensajes",
        to: "fabianponczko@live.com.ar",
        subject:"Nueva compra registrada",
        html:`
        <h1 style="color:blue;">El siguiente usuario realizo una compra</h1>
        <h3>Nombre: ${name} </h3>
        <h3>Email: ${email} </h3>
        <h3>Ciudad: ${city} </h3>
        <h3>Dirección: ${adress} </h3>
        <h3>Codigo postal: ${zipcode} </h3>
        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
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

module.exports ={emailNuevaVenta}