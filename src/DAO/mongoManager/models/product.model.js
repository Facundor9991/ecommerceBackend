import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollections = "products"

const productSchema = new mongoose.Schema({
    id: Number,
    title: {type: String, required: true},
    thumbnail: Array,
    code: {type: String, required: true},
    description: {type: String, required: true},
    price: Number,
    stock: Number,
    category: {type: String, required: true},
    status: {type: Boolean, default: true}
}) 

productSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollections, productSchema)

export default productsModel
