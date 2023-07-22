import express from "express";
import ProductManager from "./manager/Eccomerce.js";

//--------------------NUEVO 30/6

import productosRouter from "./routes/products.js";
import carts from "./routes/carts.js";

//---------------------------



const app = express();
app.use(express.json());

//-------------CODIGO DE PRUEBA------------
/*
app.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);

  const products = await manager.getProducts();

  if (!limit) return res.json(products);

  if (limit) return res.json(products.slice(0, limit));
}); */



//--------------------NUEVO 30/6
app.use("/api/products", productosRouter);
app.use("/api/carts", carts);



//--------------------

app.listen(8080);
console.log("------EL PROGRAMA ESTA CORRIENDO------");
