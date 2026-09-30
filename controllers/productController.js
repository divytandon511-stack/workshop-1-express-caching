const productService = require("../services/productService");
const { cache, invalidateCache } = require("../middleware/cache");

async function getAllProducts(req, res) {
  try {
    let products = await productService.getAllProducts();
    cache[req.url] = { value: products, createdAt: Date.now() };
    res.set("X-Cache", "MISS");
    return res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    let id = Number(req.params.id);
    let data = await productService.getProductById(id);
    cache[req.url] = { value: data, createdAt: Date.now() };
    res.set("X-Cache", "MISS");
    return res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createProduct(req, res) {
  try {
    let newProduct = await productService.createProduct(req.body);
    invalidateCache();
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  try {
    let id = Number(req.params.id);
    let updated = await productService.updateProduct(id, req.body);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    invalidateCache();
    return res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteProduct(req, res) {
  try {
    let id = Number(req.params.id);
    let deleted = await productService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    invalidateCache();
    return res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
