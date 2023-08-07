import mongoose from "mongoose";


export const productModel = mongoose.model('products',new mongoose.Schema({
    id: Number,
    title: {type: String, required: true},
    description: String,
    price: {Number},
    stock: Number
}) )
