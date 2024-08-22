import {model, models, Schema} from "mongoose";

const RatingSchema = new Schema({
  name:String,
  email:String,
  title:String,
  rate:Number,
  text:String,
  productId:String,
}, {
  timestamps: true,
});

export const Rating = models?.Rating || model('Rating', RatingSchema);

