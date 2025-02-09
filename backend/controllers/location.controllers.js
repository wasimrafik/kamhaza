// controllers/locationController.js
import asyncHandler from "../utils/asyncHandler.js";
import Location from "../models/location.models.js";
import Product from "../models/products.models.js"; // Make sure your Product model includes a "location" field
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new location
 * @route  POST /api/locations
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON):
 * {
 *   "name": "Downtown Area",
 *   "city": "New York",
 *   "state": "NY",
 *   "country": "USA",
 *   "coordinates": [-74.0060, 40.7128] // [longitude, latitude]
 * }
 */
export const addLocation = asyncHandler(async (req, res) => {
  const { name, city, state, country, coordinates } = req.body;

  // Validate required fields
  if (!name || !city || !state || !country || !coordinates) {
    throw new ApiErrors(400, "All fields (name, city, state, country, coordinates) are required");
  }

  const location = new Location({
    name,
    city,
    state,
    country,
    // GeoJSON expects coordinates in [longitude, latitude] order
    coordinates: { type: "Point", coordinates }
  });

  await location.save();

  return res.status(201).json(new ApiResponse(201, location, "Location created successfully"));
});

/**
 * @desc   Get all locations
 * @route  GET /api/locations
 * @access Public
 */
export const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find();
  return res.status(200).json(new ApiResponse(200, locations, "Locations fetched successfully"));
});

/**
 * @desc   Get a single location by ID
 * @route  GET /api/locations/:id
 * @access Public
 */
export const getLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  if (!location) {
    throw new ApiErrors(404, "Location not found");
  }
  return res.status(200).json(new ApiResponse(200, location, "Location fetched successfully"));
});

/**
 * @desc   Update a location by ID
 * @route  PUT /api/locations/:id
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON) may include any of the location fields.
 * If updating coordinates, provide an array of [longitude, latitude].
 */
export const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // If coordinates are provided, wrap them in the GeoJSON format.
  if (updatedData.coordinates) {
    updatedData.coordinates = { type: "Point", coordinates: updatedData.coordinates };
  }

  const location = await Location.findByIdAndUpdate(id, updatedData, { new: true });
  if (!location) {
    throw new ApiErrors(404, "Location not found");
  }
  return res.status(200).json(new ApiResponse(200, location, "Location updated successfully"));
});

/**
 * @desc   Delete a location by ID
 * @route  DELETE /api/locations/:id
 * @access Private (or as needed)
 */
export const deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  if (!location) {
    throw new ApiErrors(404, "Location not found");
  }

  const deletedLocation = await Location.findByIdAndDelete(id);
  if (deletedLocation) {
    return res.status(200).json(new ApiResponse(200, location, "Location deleted successfully"));
  } else {
    throw new ApiErrors(400, "Location not deleted");
  }
});

/**
 * @desc   Get all products for a given location (by location ID)
 * @route  GET /api/locations/:id/products
 * @access Public
 *
 * This endpoint assumes that your Product model has a field "location" that
 * references the Location model.
 */
export const getProductsByLocation = asyncHandler(async (req, res) => {
  const { id } = req.params; // location ID
  const products = await Product.find({ location: id });
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
