import mongoose from "mongoose";

const userCollection = 'usuarios'

const userSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    age:Number

})

export const userModel = mongoose.model(userCollection, userSchema);



