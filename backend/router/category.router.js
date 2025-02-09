// routes/categoryRoutes.js
import express from "express";
import {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controllers.js";

const router = express.Router();

router.post("/addCategory", addCategory);
router.get("/getAllCategory", getCategories);
router.get("/getCategory/:id", getCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;
