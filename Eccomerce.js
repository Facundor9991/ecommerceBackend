const fs = require("fs"); //novo

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  getProducts = () => {
    //return this.products;
    return JSON.parse(fs.readFileSync(this.path, "utf-8")); //novo
  };

  getNextID = () => {
    /* const count = this.products.length;
    if (count > 0) {
      return this.products[count - 1].id + 1;
    } else {
      return 1;
    } */
    let count = this.products.length;
    return ++count; //novo
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
    /*const [valid] = this.products.filter((producto) => producto.id === id);
    if (!valid) {
      return console.log("not found");
    }
    return console.log(valid);
 */

    const products = JSON.parse(fs.readFileSync(this.path, "utf-8")); //novo
    const [valid] = products.filter((producto) => producto.id === id); //novo
    if (!valid) {
      //novo ----- EN ESTE PUNTO SI NO ESTA EL PRODUCTO (CON SU ID) IMPRIME LAS SIGUIENTES LINEAS ENTERAS
      return this.console.log("no encontrado"); //novo
    }
    return console.log(valid); //novo
  };
}

const manager = new ProductManager("products,json"); //novo

manager.addProduct("Torta escondida D/D","Duraznos escondidos",1236,"img","0001",5);
manager.addProduct("Lemon pie", "Merengue suizo", 3060, "img", "0002", 3);
manager.addProduct("Muffin", "Relleno de arandanos", 543, "img", "0003", 7);
manager.addProduct("Inverter", "Torta invertida manzana", 2100, "img", "0004", 2);
manager.addProduct("Inverter1", "Torta invertida banana", 2100, "img", "0005", 6);
manager.addProduct("Inverter2", "Torta invertida durazno", 2100, "img", "0006", 8);

console.log(manager.getProducts());
console.log(manager.getProductById(2));
