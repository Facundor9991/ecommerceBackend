import fs from "fs" //------- Importador de modulos------------

export default class ProductManager {
  constructor(path) {
    this.products = []
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
      ); //novo (EN ESTE PUNTO SI CADA CAMPO CONTIENE DATOS SE MUESTRA SI NO, ERROR)
    }
    if (this.products.find((product) => product.code === code)) {
      // ------AQUI SE VALIDA SI: EXISTE O NO UN PRODUCTO CON EL MISMO CODE
      return console.log("Error, este producto ya existe!"); //novo
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

    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products)); //novo
  };

  getProductById = (id) => {
    const products = JSON.parse(fs.readFileSync(this.path, "utf-8")); //novo
    const [valid] = products.filter((producto) => producto.id === id); //novo
    if (!valid) {
      //novo ----- EN ESTE PUNTO SI NO ESTA EL PRODUCTO (CON SU ID) IMPRIME LAS SIGUIENTES LINEAS ENTERAS
      return this.console.log("no encontrado"); //novo
    }
    return valid; //novo
  };
}
