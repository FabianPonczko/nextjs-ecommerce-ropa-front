import mongoose, {model, Schema, models} from "mongoose";

const CategoriesSchema = new Schema({
    name: {type:String, required:true},
    properties: {type:Object}
});

export const Categories = models?.Categories || model('Categories', CategoriesSchema);