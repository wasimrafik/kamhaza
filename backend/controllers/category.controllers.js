// controllers/categoryController.js
import asyncHandler from "../utils/asyncHandler.js";
import Category from "../models/category.models.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new category (can be top-level or nested)
 * @route  POST /api/categories
 * @access Public (or protected, as needed)
 */
export const addCategory = asyncHandler(async (req, res) => {
  const { name, parent } = req.body;

  // Validate required field
  if (!name) {
    throw new ApiErrors(400, "Category name is required");
  }

  // If a parent is provided, ensure it exists
  if (parent) {
    const parentCategory = await Category.findById(parent);
    if (!parentCategory) {
      throw new ApiErrors(400, "Parent category does not exist");
    }
  }

  // Create and save the new category
  const category = new Category({ name, parent: parent || null });
  await category.save();

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

/**
 * @desc   Get a single category by ID (populating its children)
 * @route  GET /api/categories/:id
 * @access Public
 */
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the category and populate its children
  const category = await Category.findById(id).populate("children");
  if (!category) {
    throw new ApiErrors(404, "Category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

/**
 * @desc   Get all categories (with their direct children populated)
 * @route  GET /api/categories
 * @access Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("children");
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

/**
 * @desc   Update a category by ID
 * @route  PUT /api/categories/:id
 * @access Public (or protected, as needed)
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, parent } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiErrors(404, "Category not found");
  }

  // Update the category name if provided
  if (name) category.name = name;

  // If updating parent, validate the new parent (or allow setting to null for top-level)
  if (parent !== undefined) {
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        throw new ApiErrors(400, "Parent category does not exist");
      }
      // Prevent a category from being its own parent
      if (parentCategory._id.equals(category._id)) {
        throw new ApiErrors(400, "Category cannot be its own parent");
      }
    }
    category.parent = parent;
  }

  await category.save();
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

/**
 * @desc   Delete a category by ID
 * @route  DELETE /api/categories/:id
 * @access Public (or protected, as needed)
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiErrors(404, "Category not found");
  }

  const deleteCategory = await Category.findByIdAndDelete(id);

  if(deleteCategory){
    return res
    .status(200)
    .json(new ApiResponse(200, "Category deleted successfully"));
  }else{
    throw new ApiErrors(400, "Category not deleted");
  }

});
