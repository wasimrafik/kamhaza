// models/Category.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Reference to a parent category; if null then this is a top-level category
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

// Virtual to populate child categories (if any)
categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
});

// Ensure virtual fields are serialised
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

export default mongoose.model("Category", categorySchema);
