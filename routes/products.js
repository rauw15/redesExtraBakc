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

// Ruta para eliminar un producto
router.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      // Buscar y eliminar el producto por su ID
      const result = await Product.findByIdAndDelete(id);
      
      if (!result) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  });
  

module.exports = router;
