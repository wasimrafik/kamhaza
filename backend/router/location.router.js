import express from "express";
import {
  addLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
  getProductsByLocation,
} from "../controllers/location.controllers.js";

const router = express.Router();

router.post("/addLocation", addLocation);
router.get("/getLocation", getLocations);
router.get("/getUserLocation/:id", getLocation);
router.put("/updateLocation/:id", updateLocation);
router.delete("/deleteLocation/:id", deleteLocation);
router.get("/productWiseLocation/:id/products", getProductsByLocation);

export default router;
