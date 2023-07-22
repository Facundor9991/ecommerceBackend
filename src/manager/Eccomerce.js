import fs from "fs"; //------- Importador de modulos------------

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  getProducts = () => {
    return JSON.parse(fs.readFileSync(this.path, "utf-8"));
  };

  getNextID = async () => {
    let count = this.products.length;
    return ++count;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log(
        "Error, caracterisitica incompleta. Introducir datos nuevamente."
      );  
    }
    if (this.products.find((product) => product.code === code)) {
      
      return console.log("Error, este producto ya existe!"); 
    }
    const product = {
      id: this.getNextID(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products)); 

  };

  getProductById = (id) => {
    const products = JSON.parse(fs.readFileSync(this.path, "utf-8")); 
    const [valid] = products.filter((producto) => producto.id === id); 
    if (!valid) {
      
      return this.console.log("no encontrado"); 
    }
    return valid; 
  };
}
