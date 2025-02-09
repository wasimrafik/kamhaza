// controllers/notificationController.js
import asyncHandler from "../utils/asyncHandler.js";
import Notification from "../models/notification.models.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create a new notification
 * @route  POST /api/notifications
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON):
 * {
 *   "user": "60d9f2b3f1a4e12a0c8b1111",
 *   "type": "order",         // Example types: "order", "message", "alert", etc.
 *   "message": "Your order has been shipped."
 * }
 */
export const addNotification = asyncHandler(async (req, res) => {
  const { user, type, message } = req.body;

  if (!user || !type || !message) {
    throw new ApiErrors(400, "User, type, and message are required");
  }

  const notification = new Notification({
    user,
    type,
    message,
  });

  await notification.save();

  return res
    .status(201)
    .json(new ApiResponse(201, notification, "Notification created successfully"));
});

/**
 * @desc   Get all notifications, optionally filtered by user using a query parameter
 * @route  GET /api/notifications?user=<userId>
 * @access Private (or as needed)
 */
export const getNotifications = asyncHandler(async (req, res) => {
  const { user } = req.query;
  const filter = {};

  if (user) {
    filter.user = user;
  }

  // You can sort notifications by creation date (most recent first)
  const notifications = await Notification.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

/**
 * @desc   Get a single notification by its ID
 * @route  GET /api/notifications/:id
 * @access Private (or as needed)
 */
export const getNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findById(id);

  if (!notification) {
    throw new ApiErrors(404, "Notification not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification fetched successfully"));
});

/**
 * @desc   Update a notification by its ID
 *         For example, you might update the notification to mark it as read.
 * @route  PUT /api/notifications/:id
 * @access Private (or as needed)
 *
 * Expected Request Body (JSON):
 * {
 *   "isRead": true
 * }
 */
export const updateNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const notification = await Notification.findByIdAndUpdate(id, updateData, { new: true });
  if (!notification) {
    throw new ApiErrors(404, "Notification not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification updated successfully"));
});

/**
 * @desc   Delete a notification by its ID
 * @route  DELETE /api/notifications/:id
 * @access Private (or as needed)
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findById(id);
  
  if (!notification) {
    throw new ApiErrors(404, "Notification not found");
  }

  const deletedNotification = await Notification.findByIdAndDelete(id);
  if (deletedNotification) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Notification deleted successfully"));
  } else {
    throw new ApiErrors(400, "Notification not deleted");
  }
});
