//-----------IMPORTACIONES-------

import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import productosRouter from "./routes/products.js";
import carts from "./routes/carts.js";
import ProductManager from "./DAO/fManager/Eccomerce.js";
import { productModel } from "./DAO/mongoManager/models/product.model.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//import session from "express-session";
import userRouter from "./routes/users.router.js";

//----------CONSTANTES----------

const productManager = new ProductManager(__dirname + "/bd/productos.json");
const app = express();

//------------APPS USES--------

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", productosRouter);
app.use("/api/carts", carts);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(session({}));
app.use("/api/users", userRouter);

//-----------(--------------)-----------

mongoose.set("strictQuery", false);
const URL =
  "mongodb+srv://rfacundo770:HNCTFaOamhZ6yyOy@cluster0.cx8ijuc.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(URL, {
    dbName: "ecoProy",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const httpServer = app.listen(8080);
    console.log("------EL PROGRAMA ESTA CORRIENDO------");

    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
      socket.on("new-product", async (data) => {
        console.log("Aqui es data", data);

        const result = await productManager.addProduct(
          data.title,
          data.description,
          data.price,
          data.thumbnail,
          data.code,
          data.stock
        );

        const products = await productManager.getProducts();

        //-------NUEVOS CAMBIOS PARA QUERER GUARDAR ARCHIVOS EN LA BASE DE DATOS
        // const result = new productModel(data)
        // await result.save()
        // const products = await productModel.find().lean().exec()

        console.log(products);
        io.emit("reload-table", products);
      });
    });
  })
  .catch((e) => {
    console.log("No se pudo conectar a la base", e);
  });
