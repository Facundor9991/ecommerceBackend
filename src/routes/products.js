import { Router } from "express";
import ProductManager from "../DAO/fManager/Eccomerce.js";
import { productModel } from "../DAO/mongoManager/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    const products = await productModel.find();

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

router.get("/:id", async (req, res) => {
  try {
    const products = await productModel.getProducts();

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

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);

  const result = await productModel.addProduct(
    data.title,
    data.description,
    data.price,
    data.thumbnail,
    data.code,
    data.stock
  );
  res.send(result);
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedProductData = req.body;

    const updatedProduct = productManager.updateProduct(id, updatedProductData);
    if (!updatedProduct) {
      return res.json({
        message: "Producto no encontrado",
      });
    }

    return res.json(updatedProduct);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const isDeleted = productManager.deleteProduct(id);
    if (!isDeleted) {
      return res.json({
        message: "Producto no encontrado",
      });
    }

    return res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.send(error);
  }
});

export default router;
