// controllers/transactionController.js
import asyncHandler from "../utils/asyncHandler.js";
import Transaction from "../models/transaction.models.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new transaction
 * @route  POST /api/transactions
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON):
 * {
 *   "buyer": "60d9f2b3f1a4e12a0c8b1111",
 *   "seller": "60d9f2b3f1a4e12a0c8b2222",
 *   "product": "60d9f2b3f1a4e12a0c8b3333",
 *   "amount": 250,
 *   "status": "pending",      // optional (default is "pending")
 *   "paymentDetails": {}      // optional, can be an object with payment info
 * }
 */
export const addTransaction = asyncHandler(async (req, res) => {
  const { buyer, seller, product, amount, status, paymentDetails } = req.body;

  // Validate required fields
  if (!buyer || !seller || !product || !amount) {
    throw new ApiErrors(400, "Buyer, seller, product, and amount are required");
  }

  // Create new transaction document
  const transaction = new Transaction({
    buyer,
    seller,
    product,
    amount,
    status: status || "pending",
    paymentDetails: paymentDetails || {}
  });

  await transaction.save();

  return res
    .status(201)
    .json(new ApiResponse(201, transaction, "Transaction created successfully"));
});

/**
 * @desc   Get a single transaction by ID
 * @route  GET /api/transactions/:id
 * @access Private (or as needed)
 */
export const getTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id)
    .populate("buyer", "username email")
    .populate("seller", "username email")
    .populate("product"); // Adjust populated fields as needed

  if (!transaction) {
    throw new ApiErrors(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction fetched successfully"));
});

/**
 * @desc   Get all transactions
 *         Optionally, filter by buyer or seller using query parameters
 *         e.g., GET /api/transactions?buyer=60d9f2b3f1a4e12a0c8b1111
 * @route  GET /api/transactions
 * @access Private (or as needed)
 */
export const getTransactions = asyncHandler(async (req, res) => {
  const { buyer, seller } = req.query;
  const filter = {};

  if (buyer) filter.buyer = buyer;
  if (seller) filter.seller = seller;

  const transactions = await Transaction.find(filter)
    .populate("buyer", "username email")
    .populate("seller", "username email")
    .populate("product");

  return res
    .status(200)
    .json(new ApiResponse(200, transactions, "Transactions fetched successfully"));
});

/**
 * @desc   Update a transaction by ID
 * @route  PUT /api/transactions/:id
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON):
 * {
 *   "status": "completed",
 *   "paymentDetails": { "transactionId": "abc123", "method": "credit card" }
 * }
 */
export const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const transaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
  if (!transaction) {
    throw new ApiErrors(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction updated successfully"));
});

/**
 * @desc   Delete a transaction by ID
 * @route  DELETE /api/transactions/:id
 * @access Private (or as needed)
 */
export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  
  if (!transaction) {
    throw new ApiErrors(404, "Transaction not found");
  }

  const deletedTransaction = await Transaction.findByIdAndDelete(id);
  if (deletedTransaction) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Transaction deleted successfully"));
  } else {
    throw new ApiErrors(400, "Transaction not deleted");
  }
});
