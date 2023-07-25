//--------------------NUEVO 30/6


import { Router } from 'express'
import CartManager from '../manager/cartManager.js'

const router = Router()
const cartManager = new CartManager()

router.get('/', async (req, res) => {
    const result = await cartManager.list()
    res.send(result)
})

router.get('/:idc/:idp', async (req, res) => {
    const cartId = parseInt(req.params.idc)
    const productId = parseInt(req.params.idp)

    const result = await cartManager.addProduct(cartId, productId)
    res.send(result)
})

router.post('/', async (req, res) => {
    const result = await cartManager.create()
    res.send(result)
})

export default router