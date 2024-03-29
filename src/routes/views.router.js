import { Router, query } from "express";
import ProductManager from "../DAO/fManager/Eccomerce.js";
import __dirname from "../utils.js";
import  productsModel  from "../DAO/mongoManager/models/product.model.js";
import CartManager from "../DAO/fManager/cartManager.js";
const router = Router();
const productManager = new ProductManager(__dirname + "/bd/productos.json");


router.get("/", (req, res) => {
  res.render("index", {});
});

router.get("/products", async (req, res) => {
  try {
    const products = await productsModel.find().lean().exec();
    console.log("products", {products})
    res.render("products",  {products} );
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

//--------NUEVA CON PAGINATE--------
router.get("/list", async (req, res) => {
  try {
    const page = parseInt(req.query?.page || 2)
    const limit = parseInt(req.query?.limit || 4)
    const queryParams = req.query?.query || ''
    const query = {}
    
    if(queryParams){
      const field = queryParams.split(',')[0] //
      let value = queryParams.split(',')[1] //

      if(!isNaN(parseInt(value))) value = parseInt(value)

      query[field] = value
      
    }
    //EN ESTE PUNTO EL LIMIT SIGNIFICA LA CANT DE PRODUCTOS A MOSTRAR POR PAGINA POR EJ SI TENGO 6 PRODUCTOS Y MUESTRO 2 POR PAG DEBERIA DE TENER 3 PAG PARA MOSTRAR LOS 6
    //const result = await productModel.paginate({},{ ----- DE ESE MODO FUNCIONA
    //const result = await productModel.paginate(query,{ ---- Y ASI NO
    //NO FUNCIONA AL QUERER FILTRAR POR NOMBRE O PRECIO
    const result = await productsModel.paginate(query,{
      page,
      limit,
      lean: true
    })
    res.render("productsList", result);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

//-----------------------------------------
router.get("/products_realtime", async (req, res) => {
  try {
    const products = await productsModel.find().lean().exec();
    res.render("products_realtime", { products });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/form-products", async (req, res) => {
  res.render("form", {});
});

//---------CREAR PRODUCTOS---------

router.post("/form-products", async (req, res) => {
  const data = req.body;

  //-------NUEVOS CAMBIOS PARA QUERER GUARDAR ARCHIVOS EN LA BASE DE DATOS
   const result = new productsModel(data)
   await result.save()

  res.redirect("/products");
});

//-------------CHAT--------------
router.get('/chat', async (req, res) =>{
  res.render('chat', )
})


export default router;
