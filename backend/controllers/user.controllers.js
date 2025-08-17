import asyncHandler from '../utils/asyncHandler.js';
import ApiErrors from '../utils/apiErrors.js';
import ApiResponse from '../utils/apiRespones.js';
import validator from "validator";
import userModels from '../models/user.models.js';


export const addUser = asyncHandler(async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;
  
    // Validate required fields
    if (!username || !email || !password || !phoneNumber) {
      throw new ApiErrors(400, "All fields are required");
    }
  
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new ApiErrors(400, "Invalid email format");
    }
  
    // Check for existing user
    const userAlreadyExists = await userModels.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (userAlreadyExists) {
      throw new ApiErrors(400, "Email or phone number already in use");
    }
  
    // Create user
    const newUser = new userModels({
      username,
      email,
      password,
      phoneNumber,
    });
  
    await newUser.save(); // Save will trigger the password hashing pre-middleware
    console.log("User successfully created:", newUser);
  
    // Check if user is created successfully
    const createdUser = await userModels
      .findById(newUser._id)
      .select("-password -refreshToken");
    if (!createdUser) {
      throw new ApiErrors(500, "Failed to create user");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  });

export const updateUser = asyncHandler(async (req, res) => {
    const { userID } = req.params;

    const { username, email, password, phoneNumber } = req.body;

    // Validate required fields
    [username, email, password, phoneNumber].forEach((field) => {
        if (typeof field === ("string" || Number || Boolean) && field.trim() === "") {
            throw new ApiErrors(400, "All fields are required");
        }
    });

    // Validate email format
    if (!validator.isEmail(email)) {
        throw new ApiErrors(400, "Invalid email format");
    }

    // check if user is not registered
    const user = await userModels.findById(userID);
    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    // update user
    const updateUser = await userModels.findByIdAndUpdate(userID, {
        username,
        email,
        password,
        phoneNumber,
    }, { new: true });

    // check if user updated
    if (!updateUser) {
        throw new ApiErrors(500, "Something went wrong while updating user");
    }

    return res.status(200).json(new ApiResponse(200, updateUser, "User updated successfully"));
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { userID } = req.params;

    const user = await userModels.findByIdAndDelete(userID);

    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
})

export const findUser = asyncHandler(async (req, res) => {
    const { userID } = req.params;

    const user = await userModels.findById(userID)

    if (!user) {
        throw new ApiErrors(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User found successfully"));

})

export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Login attempt with email:", email);
  
    if (!email || !password) {
      throw new ApiErrors(400, "Both email and password are required");
    }
  
    const user = await userModels.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      throw new ApiErrors(404, "User not found");
    }
  
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      console.error("Invalid password for user:", email);
      throw new ApiErrors(400, "Invalid email or password");
    }
  
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken; // Store the refresh token in the DB
    await user.save();
  
    console.log("Login successful for user:", email);
    return res.status(200).json(
      new ApiResponse(200, { accessToken, refreshToken }, "User logged in successfully")
    );
  });

  
  export const userLogout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
  
    // Validate if refreshToken is provided
    if (!refreshToken) {
      throw new ApiErrors(400, "Refresh token is required to logout");
    }
  
    console.log("Logout attempt with refreshToken:", refreshToken);
  
    // Find the user associated with the refresh token
    const user = await userModels.findOne({ refreshToken });
    if (!user) {
      console.log("Invalid or expired refresh token during logout.");
      throw new ApiErrors(400, "Invalid or expired refresh token");
    }
  
    // Clear the refresh token from the user record
    user.refreshToken = null; // Or set it to an empty string
    await user.save();
  
    console.log("User logged out successfully:", user.email);
  
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  });
  


