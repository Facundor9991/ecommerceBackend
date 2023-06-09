//--------------------NUEVO 30/6


import FileManager from "./fManager.js"

export default class CartManager extends FileManager {
    
    constructor() {
        super('./carts.json')
    }

    create = async() => {
        const data = {
            products: []
        }

        return await this.set(data)
    }

    addProduct = async(idc, idp) => {
        const cart = await this.getById(idc)
        cart.products.push(idp)

        return await this.update(cart)
    }

    list = async () => {
        return await this.get()
    }
}