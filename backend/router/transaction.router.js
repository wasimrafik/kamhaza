// routes/transactionRoutes.js
import express from "express";
import {
  addTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/addTransaction", addTransaction);
router.get("/getTransaction", getTransactions);
router.get("/getSingleTransaction/:id", getTransaction);
router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);

export default router;
 
