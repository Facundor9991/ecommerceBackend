class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  getNextID = () => {
    const count = this.products.length;
    if (count > 0) {
      return this.products[count - 1].id + 1;
    } else {
      return 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
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
  };

  getProductById = (id) => {
    const [valid] = this.products.filter((producto) => producto.id === id);
    if (!valid) {
      return console.log("not found");
    }
    return console.log(valid);
  };
}

const manager = new ProductManager();
manager.addProduct("Torta escondida D/D", "Duraznos escondidos", 1236, "img", "0001", 5);
manager.addProduct("Lemon pie", "Merengue suizo", 3060, "img", "0002", 3);
manager.addProduct("Muffin", "Relleno de arandanos", 543, "img", "0003", 7);
manager.addProduct("Inverter", "Torta invertida", 2100, "img", "0004", 2);

console.log(manager.getProducts());
console.log(manager.getProductById(4));
