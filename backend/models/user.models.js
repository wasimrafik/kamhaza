import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: [2, "Username must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String, // Store URL or file path
      default: "",
    },
    productListed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productListed",
      },
    ],
    productsBought: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productListed",
      },
    ],
    bidsPlaced: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "productListed" },
        amount: { type: Number, required: true },
        bidAt: { type: Date, default: Date.now },
      },
    ],
    notifications: [
      {
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productListed",
      },
    ],
    verificationStatus: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
      phoneVerified: {
        type: Boolean,
        default: false,
      },
      identityVerified: {
        type: Boolean,
        default: false,
      },
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productListed",
      },
    ],
    refreshToken: {
        type: String,
        // required: true
    },
  },
  { timestamps: true }
);


// // Indexing
// userSchema.index({ email: 1 });
// userSchema.index({ phoneNumber: 1 });


// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    const secretKey = process.env.ACCESS_TOKEN_SECRET || "fallback-secret-key";
    console.log("Using Access Token Secret:", secretKey); // Debug only
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
        username: this.username,
      },
      secretKey,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRED || "1h" }
    );
  };
  
  // Generate Refresh Token
  userSchema.methods.generateRefreshToken = function () {
    const secretKey = process.env.REFRESH_TOKEN_SECRET || "fallback-refresh-key";
    console.log("Using Refresh Token Secret:", secretKey); // Debug only
    return jwt.sign(
      { _id: this._id },
      secretKey,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRED || "7d" }
    );
  };
  

export default mongoose.model("User", userSchema);
