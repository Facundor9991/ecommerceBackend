//--------------------NUEVO 30/6


import { Router } from 'express'
import ProductManager from '../manager/Eccomerce.js'

const router = Router()
const productManager = new ProductManager("productos.json")

router.get("/", async (req, res) => {
   
    const limit = parseInt(req.query.limit);
  
    try {
      const products = await productManager.getProducts();
      
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
        
      const products = await productManager.getProducts();
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


router.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    const result = productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock)
    res.send(result)
})

export default router