// controllers/bookmarkController.js
import asyncHandler from "../utils/asyncHandler.js";
import Bookmark from "../models/addToBookmark.models.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new bookmark (favorite a product)
 * @route  POST /api/bookmarks
 * @access Private (or as needed)
 */
export const addBookmark = asyncHandler(async (req, res) => {
  const { user, product } = req.body;
  console.log("🚀 ~ addBookmark ~ user:", user)
  console.log("🚀 ~ addBookmark ~ product:", product)

  // Validate required fields
  if (!user || !product) {
    throw new ApiErrors(400, "User and product are required");
  }

  // Optionally, check if this bookmark already exists
  const existingBookmark = await Bookmark.findOne({ user, product });
  if (existingBookmark) {
    throw new ApiErrors(400, "Bookmark already exists");
  }

  const bookmark = new Bookmark({
    user,
    product,
  });

  await bookmark.save();

  return res
    .status(201)
    .json(new ApiResponse(201, bookmark, "Bookmark created successfully"));
});

/**
 * @desc   Get all bookmarks, optionally filtered by user via query parameter
 * @route  GET /api/bookmarks?user=<userId>
 * @access Private (or as needed)
 */
export const getBookmarks = asyncHandler(async (req, res) => {
  const { user } = req.query;
  const filter = {};

  if (user) {
    filter.user = user;
  }

  // Optionally, populate product details
  const bookmarks = await Bookmark.find(filter).populate("product");

  return res
    .status(200)
    .json(new ApiResponse(200, bookmarks, "Bookmarks fetched successfully"));
});

/**
 * @desc   Get all bookmarks for the currently authenticated user
 * @route  GET /api/bookmarks/user
 * @access Private
 */
export const getUserBookmarks = asyncHandler(async (req, res) => {
  // Ensure that req.user is set by your authentication middleware
  const userId = req.user._id;
  const bookmarks = await Bookmark.find({ user: userId }).populate("product");

  return res
    .status(200)
    .json(new ApiResponse(200, bookmarks, "User bookmarks fetched successfully"));
});

/**
 * @desc   Get a single bookmark by ID
 * @route  GET /api/bookmarks/:id
 * @access Private (or as needed)
 */
export const getBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bookmark = await Bookmark.findById(id).populate("product");

  if (!bookmark) {
    throw new ApiErrors(404, "Bookmark not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, bookmark, "Bookmark fetched successfully"));
});

/**
 * @desc   Delete a bookmark by ID
 * @route  DELETE /api/bookmarks/:id
 * @access Private (or as needed)
 */
export const deleteBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bookmark = await Bookmark.findById(id);
  
  if (!bookmark) {
    throw new ApiErrors(404, "Bookmark not found");
  }

  const deletedBookmark = await Bookmark.findByIdAndDelete(id);

  if (deletedBookmark) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Bookmark deleted successfully"));
  } else {
    throw new ApiErrors(400, "Bookmark not deleted");
  }
});
