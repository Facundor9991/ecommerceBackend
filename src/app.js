import express from "express";
import ProductManager from "./manager/Eccomerce.js";

//--------------------NUEVO 30/6

import products from './routes/products.js'
import cart from './routes/carts.js'
//---------------------------


const manager = new ProductManager("./src/productos.json");

const app = express();
app.use(express.json());

//-------------CODIGO DE PRUEBA------------
app.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);

  const products = await manager.getProducts();

  if (!limit) return res.json(products);

  if (limit) return res.json(products.slice(0, limit));
});

app.get("/productos", async (req, res) => {
  const limit = parseInt(req.query.limit);

  const products = await manager.getProducts();

  if (!limit) return res.json(products);

  if (limit) return res.json(products.slice(0, limit));
});

app.get("/producto/:id", async (req, res) => {
  const products = await manager.getProducts();

  const id = parseInt(req.params.id);

  const product = products.find((element) => element.id === id);

  if (!products.some((element) => element.id === id))
    return res.json({
      id: id,
      message: "El producto solicitado no esta disponible",
    });

  return res.send(product);
});


//--------------------NUEVO 30/6
app.use('/api/products', products)
app.use('/api/carts', cart)

//--------------------



app.listen(8080);
console.log("De PrOnTo FlAsH");
