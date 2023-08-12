import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    id: Number,
    title: {type: String, required: true},
    description: String,
    price: {Number},
    stock: Number
}) 

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('products', productSchema )
