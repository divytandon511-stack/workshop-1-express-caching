const express = require("express");
const router = express.Router();
const { cacheMiddleware } = require("../middleware/cache");
const productController = require("../controllers/productController");

// Route -> Middleware -> Controller -> Service -> Database
router.get("/products", cacheMiddleware, productController.getAllProducts);
router.get("/products/:id", cacheMiddleware, productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
