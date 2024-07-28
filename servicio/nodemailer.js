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

const emailNuevaVenta= async ({email, name,city,postalCode,streetAddress,id,paid,dataid,metodoEnvio})=>{
    
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
        <h3>Metodo de envio: ${metodoEnvio} </h3>
        `
    }

    try {
        const info= await transporter.sendMail(mailOptions)
        console.log({info})
    } catch (error) {
        console.log({error})
    }
}
const emailAvisoCliente=async({email, name,city,postalCode,streetAddress,id,dataid,metodoEnvio})=>{
    let textodemail 
    if (metodoEnvio==="envio"){
       textodemail = "Te avisaremos cuando tu compra este en camino!"
    } else{
        textodemail = `Podes retirar tu compra por Av. Alem coordina día y horario con el siguiente numero de tel.: 351-6413639`
    }

    // const mailOptions ={
    //     from:process.env.EMAILUSER,
    //     to: email,
    //     subject:"Nueva compra registrada",
    //     html:`
    //     <h1 style="color:blue">Hola ${name}, gracias por confiar en QueTop!</h1>
    //     ${textodemail}
    //     <h3>Codigo de compra: ${id} </h3>
    //     <h3>Codigo de compra MP: ${dataid} </h3>
    //     <h2 style="color:red">Datos de envío:</h2>
    //     <h3>Nombre: ${name} </h3>
    //     <h3>Email: ${email} </h3>
    //     <h3>Ciudad: ${city} </h3>
    //     <h3>Dirección: ${streetAddress} </h3>
    //     <h3>Codigo postal: ${postalCode} </h3>
    //     <h4>**********************************</h4>
    //     <h5>Mail automatico! no responda este email</h5>
    //     `
    // }
    const mailOptions = {
        from: process.env.EMAILUSER,
        to: email,
        subject: "Nueva compra registrada",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #1E90FF;">Hola ${name}, ¡gracias por confiar en QueTop!</h1>
            <p>${textodemail}</p>
            <h3 style="color: #4CAF50;">Código de compra: ${id}</h3>
            <h3 style="color: #4CAF50;">Código de compra MP: ${dataid}</h3>
            <h2 style="color: #FF6347;">Datos de envío:</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Nombre:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Email:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Ciudad:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${city}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Dirección:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${streetAddress}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Código postal:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${postalCode}</td>
                </tr>
            </table>
            <p style="color: #777; text-align: center;">**********************************</p>
            <p style="font-size: 0.9em; color: #999; text-align: center;">Mail automático, ¡no responda este email!</p>
        </div>
        `
    };
    
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