// models/Location.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    // GeoJSON Point: coordinates order is [longitude, latitude]
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Create a geospatial index for queries
locationSchema.index({ coordinates: "2dsphere" });

export default mongoose.model("Location", locationSchema);
