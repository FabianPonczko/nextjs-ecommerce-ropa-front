import {mongooseConnect} from "@/lib/mongoose";
import { Rating } from "@/models/Rating";


export default async function handle(req,res) {
  if (req.method === 'POST') {
    const {
      nombre,email,observacion,titulo,puntaje,productId
      } = req.body;
  
    
    await mongooseConnect();
    
    const ratingDoc = await Rating.create({
      name:nombre,email,text:observacion,title:titulo,rate:puntaje, productId
    });
    // const ids = req.body.ids;
  }
  res.json(await Rating.find({}, null, {sort: {'_id':-1}}))
}