//--------------------NUEVO 30/6


import FileManager from "./fManager.js"

export default class CartManager extends FileManager {
    
    constructor() {
        super();
        this.carts = [];
      }

      getCarts = () => {
        return JSON.parse(fs.readFileSync('carts.json', 'utf-8'));
      };

      getNextCartID = () => {
        const carts = this.getCarts();
        if (carts.length === 0) {
          return 1;
        }
        const maxIDCart = carts.reduce((prev, current) => (prev.id > current.id ? prev : current));
        return maxIDCart.id + 1;
      };

      create = () => {
        const newCart = {
          id: this.getNextCartID(),
          products: [],
        };
    
        const carts = this.getCarts();
        carts.push(newCart);
        fs.writeFileSync('carts.json', JSON.stringify(carts));
    
        return newCart;
      };

      list = () => {
        return this.getCarts();
      };

      addProduct = (cartId, productId) => {
        const carts = this.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    
        if (cartIndex === -1) {
          return { message: 'Carrito no encontrado' };
        }
     
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((product) => product.product === productId);
    
        if (productIndex === -1) {
          // El producto no existe en el carrito, se agrega como un nuevo elemento
          cart.products.push({ product: productId, quantity: 1 });
        } else {
          // El producto ya existe en el carrito, se incrementa la cantidad
          cart.products[productIndex].quantity++;
        }
    
        fs.writeFileSync('carts.json', JSON.stringify(carts));
    
        return cart;
      };

}