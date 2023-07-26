//--------------------NUEVO 30/6

import fs from 'fs'
import FileManager from "./fManager.js"



// En el gestor de carritos (cartManager.js)

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = []; // Un array para almacenar los carritos
    }

    // Crear un nuevo carrito con una estructura específica
    create = async () =>  {
        const nextID = await this.getNextID();
        const newCart = {
            id: nextID, // se hereda el metodo para generar IDs únicos
            products: [],
        };
        
console.log(this.path)
        // Cargar los productos existentes del archivo JSON si el archivo existe
        if (fs.existsSync(this.path)) {
            this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            this.carts = []
        }

        // Agregar el nuevo producto al array de productos
        this.carts.push(newCart);
console.log(this.carts)
        // Escribir el array actualizado de productos al archivo JSON
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    };

    getcarts = () => {
        return JSON.parse(fs.readFileSync(this.path, "utf-8"));
      };

    getNextID = async () => {

        //let count = this.products.length;
        //return ++count;

        if (fs.existsSync(this.path)) {
            this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            return 1
        }
        // Encontrar el producto con el ID más alto y sumarle 1 para obtener el siguiente ID único
    const maxIDcarts = this.carts.reduce((prev, current) =>
    prev.id > current.id ? prev : current
  );
if(
    !maxIDcarts.id
)
{
    return 1
}
  return maxIDcarts.id + 1;
    }

    // Listar los productos pertenecientes a un carrito específico
    getProductsByCartId(cartId) {
        this.carts = this.getcarts()
        const cart = this.carts.find((c) => c.id === cartId);
        return cart ? cart.products : [];
    }

    // Agregar un producto al array de productos de un carrito existente
    addProductToCart(cartId, productId) {
        this.carts = this.getcarts()
        const cart = this.carts.find((c) => c.id === cartId);
        if (!cart) {
            return { error: 'Carrito no encontrado' };
        }

        const existingProduct = cart.products.find((p) => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity++; // Si el producto ya existe, incrementa la cantidad
        } else {
            cart.products.push({ id: productId, quantity: 1 }); // Agregar el producto al carrito
        }

        fs.writeFileSync(this.path, JSON.stringify(this.carts));
        return {
            carts : this.carts 
        }
    };
    
}

export default CartManager;
