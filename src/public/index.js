import userModel from "../DAO/mongoManager/models/users.js";
import mongoose from "mongoose";

const uri = "mongodb+srv://rfacundo770:HNCTFaOamhZ6yyOy@cluster0.cx8ijuc.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, {dbName: 'ecoProy'})
    .then(async () =>{
        console.log('DB CONECTADA')
        
    })