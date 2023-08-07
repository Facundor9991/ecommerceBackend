import express, { urlencoded } from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import productosRouter from "./routes/products.js";
import carts from "./routes/carts.js";
import ProductManager from "./DAO/fManager/Eccomerce.js";
//---------------------------


import mongoose from "mongoose";
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://admin:admin@localhost:27017', {
  bdName:'ECOPROYECT'
})
.then(()=>{
  const httpServer = app.listen(8080);
  console.log("------EL PROGRAMA ESTA CORRIENDO------");
  
  const io = new Server(httpServer)
  
  
  io.on('connection', socket =>{
    socket.on('new-product', async data =>{
    
      
      const productManager = new ProductManager()
      const result = await productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock)
  
      const products = await productManager.list()
      io.emit('reload-table', products)
      console.log(result)
    })
  })
})
.catch(e =>{
  console.log('No se pudo conectar a la base')
})



const app = express();
app.use(urlencoded({extended: true}))
app.use(express.json());



//--------------------NUEVO 30/6
app.use("/api/products", productosRouter);
app.use("/api/carts", carts);


//-----------------NUEVO 26/7
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

app.use(express.urlencoded({ extended: true }));




//--------------------

