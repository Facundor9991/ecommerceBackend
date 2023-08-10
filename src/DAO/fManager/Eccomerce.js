import fs from "fs"; //------- Importador de modulos------------
import __dirname from "../../utils.js";

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  getProducts = () => {
    console.log(this.path);
    //return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    try {
      if (fs.existsSync(this.path)) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
        this.products = [];
      }

      // Procesar la información del archivo aquí...
      return this.products;
    } catch (err) {
      console.error("Error al leer el archivo:", err);

      return null; // o cualquier valor de retorno apropiado para indicar un fallo
    }
  };

  getNextID = async () => {
    //let count = this.products.length;
    //return ++count;

    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }

    if (this.products.length === 0) {
      //si aca esto esta vacio el siguinte sera el 1 y asi sucesivamente
      return 1;
    }

    // Encontrar el producto con el ID más alto y sumarle 1 para obtener el siguiente ID único
    const maxIDProduct = this.products.reduce((prev, current) =>
      current.id > prev.id ? current : prev
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
    //fs.writeFileSync(this.path, JSON.stringify(this.products));

    //return product;
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
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
