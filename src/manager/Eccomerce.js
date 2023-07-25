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

    //let count = this.products.length;
    //return ++count;

    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }

    // Encontrar el producto con el ID más alto y sumarle 1 para obtener el siguiente ID único
    const maxIDProduct = this.products.reduce((prev, current) =>
      prev.id > current.id ? prev : current
    );

    return maxIDProduct.id + 1;

  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log(
        "Error, característica incompleta. Introducir datos nuevamente."
      );
    }
    if (this.products.find((product) => product.code === code)) {
      return console.log("Error, este producto ya existe!");
    }
  

    const nextID = await this.getNextID();
    const product = {
      //id: this.getNextID(),
      id: nextID,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
  
    // Cargar los productos existentes del archivo JSON si el archivo existe
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }
  
    // Agregar el nuevo producto al array de productos
    this.products.push(product);
  
    // Escribir el array actualizado de productos al archivo JSON
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



  //ACTUALIZAR
  updateProduct = (id, updatedProductData) => {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return null; // Producto no encontrado
    }
    products[index] = {
      ...products[index],
      ...updatedProductData,
    };
    fs.writeFileSync(this.path, JSON.stringify(products));
    return products[index]; // Producto actualizado
  };


  //BORRAR
  deleteProduct = (id) => {
    const products = this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
    return true; // Indicar que el producto fue eliminado correctamente
  };
}
