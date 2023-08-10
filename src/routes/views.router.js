import { Router } from "express";
import ProductManager from "../DAO/fManager/Eccomerce.js";
import __dirname from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/bd/productos.json");

router.get("/", (req, res) => {
  res.render("index", {});
});

router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("products", { products });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/products_realtime", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("products_realtime", { products });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/form-products", async (req, res) => {
  res.render("form", {});
});

//---------CREAR PRODUCTOS---------

router.post("/form-products", async (req, res) => {
  const data = req.body;
  const result = productManager.addProduct(
    data.title,
    data.description,
    data.price,
    data.thumbnail,
    data.code,
    data.stock
  );
  res.redirect("/products");
});

export default router;
