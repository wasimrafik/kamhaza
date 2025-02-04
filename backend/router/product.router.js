// routes/productRoutes.js
import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

// Create a new product
router.post("/addProduct", addProduct);

// Get all products
router.get("/getAllProduct", getProducts);

// Get a specific product by ID
router.get("/getProduct/:id", getProduct);

// Update a product by ID
router.put("/updateProduct/:id", updateProduct);

// Delete a product by ID
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
