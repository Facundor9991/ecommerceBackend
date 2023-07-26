//--------------------NUEVO 30/6


import { Router } from 'express'
import CartManager from '../manager/cartManager.js'

const router = Router()
const cartManager = new CartManager('carts.json')

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    const result = await cartManager.create();
    res.send(result);
  });
  
  // Ruta para listar los productos de un carrito específico
  router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const products = cartManager.getProductsByCartId(cartId);
    res.send(products);
  });
  
  // Ruta para agregar un producto a un carrito específico
  router.post('/:cid/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.addProductToCart(+cartId, +productId);
    res.send(result);
  });
  
export default router