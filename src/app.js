import express from "express";
import ProductManager from "./manager/Eccomerce.js";

//--------------------NUEVO 30/6

import products from "./routes/products.js";
import carts from "./routes/carts.js";
import e from "express";
//---------------------------

const manager = new ProductManager("./src/productos.json");

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

app.get("/productos", async (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    const products = await manager.getProducts();

    if (!limit) return res.json(products);
    if (limit < -0)
      return res.json({
        message: "Este producto no existe",
      });
    if (limit) return res.json(products.slice(0, limit));
  } catch (error) {
    res.send(error);
  }
});

app.get("/productos/:id", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const id = parseInt(req.params.id);
    const product = products.find((element) => element.id === id);

    if (!products.some((element) => element.id === id))
      return res.json({
        id: id,
        message: "El producto solicitado no esta disponible",
      });

    return res.send(product);
  } catch (error) {
    res.send(error);
  }
});

//--------------------NUEVO 30/6
app.use("/api/products", products);
app.use("/api/carts", carts);

//--------------------

app.listen(8080);
console.log("------EL PROGRAMA ESTA CORRIENDO------");
