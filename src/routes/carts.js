//--------------------NUEVO 30/6


import { Router } from 'express'
import CartManager from '../DAO/fManager/cartManager.js'
import ProductManager from '../DAO/fManager/Eccomerce.js'

const router = Router()
const cartManager = new CartManager('carts.json')
const productManager = new ProductManager('productos.json')

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const result = await cartManager.create();
    res.send(result);
  });
  
  // Ruta para listar los productos de un carrito específico
  router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const products = cartManager.getProductsByCartId(cartId);
    res.send(products);
  });
  
  // Ruta para agregar un producto a un carrito específico
  router.post('/:cid/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

//nuevo 26/06

    try {
    const products = await productManager.getProducts();
      //console.log('aqui', products)
      const product = products.find((element) => element.id === productId);
  
      if (!products.some((element) => element.id === productId))
        return res.json({
          message: "El producto solicitado no esta disponible",
        });

        const result = await cartManager.addProductToCart(+cartId, +productId);
        return res.send(result);
    } catch (error) {
      return res.send(error);
    }




    
  });
  
export default router