// controllers/productController.js
import { Product, FixedProduct, AuctionProduct } from "../models/products.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new product (fixed-price or auction)
 * @route  POST /api/products
 * @access Private (seller)
 */
export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    condition,
    image,
    seller,
    status,
    saleType,
  } = req.body;

  // Validate required common fields
  if (
    !name ||
    !description ||
    !category ||
    !condition ||
    !image ||
    !seller ||
    !status ||
    !saleType
  ) {
    throw new ApiErrors(400, "All common fields are required");
  }

  // Validate saleType value
  if (saleType !== "fixed" && saleType !== "auction") {
    throw new ApiErrors(400, "Invalid sale type. Must be 'fixed' or 'auction'");
  }

  let newProduct;
  if (saleType === "fixed") {
    // Fixed-price specific field
    const { buyNow } = req.body;
    if (!buyNow) {
      throw new ApiErrors(400, "Buy now price is required for fixed-price products");
    }

    newProduct = new FixedProduct({
      name,
      description,
      category,
      condition,
      image,
      seller,
      status,
      buyNow,
    });
  } else if (saleType === "auction") {
    // Auction-specific fields
    const { startingBid, currentBid } = req.body;
    if (startingBid == null || currentBid == null) {
      throw new ApiErrors(400, "startingBid and currentBid are required for auction products");
    }

    newProduct = new AuctionProduct({
      name,
      description,
      category,
      condition,
      image,
      seller,
      status,
      startingBid,
      currentBid, // Typically, currentBid is set to startingBid at the beginning
      bids: [],
    });
  }

  await newProduct.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product created successfully"));
});

/**
 * @desc   Get a single product by ID
 * @route  GET /api/products/:id
 * @access Public
 */
export const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiErrors(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

/**
 * @desc   Get all products
 * @route  GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

/**
 * @desc   Update a product by ID
 * @route  PUT /api/products/:id
 * @access Private (seller/admin)
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiErrors(404, "Product not found");
  }

  // Update common fields if provided
  const { name, description, category, condition, image, seller, status } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (condition) product.condition = condition;
  if (image) product.image = image;
  if (seller) product.seller = seller;
  if (status) product.status = status;

  // Update fields specific to the product type
  if (product.saleType === "fixed") {
    const { buyNow } = req.body;
    if (buyNow) product.buyNow = buyNow;
  } else if (product.saleType === "auction") {
    const { startingBid, currentBid } = req.body;
    if (startingBid != null) product.startingBid = startingBid;
    if (currentBid != null) product.currentBid = currentBid;
    // Optionally, update bids if needed.
  }

  await product.save();
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

/**
 * @desc   Delete a product by ID
 * @route  DELETE /api/products/:id
 * @access Private (seller/admin)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);
  const findProduct = await Product.findById(productId);
if (findProduct) {
    throw new ApiErrors(500, "Something went wrong while deleting product");
}
  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully"));
});
