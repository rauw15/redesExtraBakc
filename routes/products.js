const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Obtener productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error al obtener productos: " + error.message);
  }
});

// Añadir producto
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).send("Producto añadido");
  } catch (error) {
    res.status(500).send("Error al añadir producto: " + error.message);
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Producto eliminado");
  } catch (error) {
    res.status(500).send("Error al eliminar producto: " + error.message);
  }
});

module.exports = router;
