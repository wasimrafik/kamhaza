// controllers/messageController.js
import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.models.js";
import ApiErrors from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiRespones.js";

/**
 * @desc   Create (send) a new message
 * @route  POST /api/messages
 * @access Public (or protected, as needed)
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { conversation, sender, receiver, message, messageType, attachments } = req.body;

  // Validate required fields
  if (!sender || !receiver || !message) {
    throw new ApiErrors(400, "Sender, receiver, and message are required");
  }

  // Create new message document
  const newMessage = new Message({
    conversation: conversation || null,
    sender,
    receiver,
    message,
    messageType: messageType || "text",
    attachments: attachments || []
  });

  await newMessage.save();

  // Emit a socket event to notify connected clients of the new message
  const io = req.app.get("socketio");
  io.emit("newMessage", newMessage);

  return res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

// /**
//  * @desc   Get a single message by ID
//  * @route  GET /api/messages/:id
//  * @access Public
//  */
// export const getMessage = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const messageData = await Message.findById(id);
//   if (!messageData) {
//     throw new ApiErrors(404, "Message not found");
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, messageData, "Message fetched successfully"));
// });

/**
 * @desc   Get messages with optional filtering by conversation, sender, or receiver.
 *         Use query parameters: conversationId, senderId, receiverId.
 * @route  GET /api/messages
 * @access Public
 */
export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId, senderId, receiverId } = req.query;
  const filter = {};
  if (conversationId) filter.conversation = conversationId;
  if (senderId) filter.sender = senderId;
  if (receiverId) filter.receiver = receiverId;

  const messages = await Message.find(filter);
  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

/**
 * @desc   Update a message by ID (for example, to update the message text or mark it as read)
 * @route  PUT /api/messages/:id
 * @access Public (or protected, as needed)
 */
export const updateMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const messageData = await Message.findById(id);
  if (!messageData) {
    throw new ApiErrors(404, "Message not found");
  }

  // Update allowed fields
  const { message, read } = req.body;
  if (message !== undefined) messageData.message = message;
  if (read !== undefined) messageData.read = read;

  await messageData.save();

  // Emit an update event
  const io = req.app.get("socketio");
  io.emit("updateMessage", messageData);

  return res
    .status(200)
    .json(new ApiResponse(200, messageData, "Message updated successfully"));
});

/**
 * @desc   Delete a message by ID
 * @route  DELETE /api/messages/:id
 * @access Public (or protected, as needed)
 */
export const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const messageData = await Message.findById(id);
  if (!messageData) {
    throw new ApiErrors(404, "Message not found");
  }

  const deletedMessage = await Message.findByIdAndDelete(id);
  if (deletedMessage) {
    // Emit a delete event
    const io = req.app.get("socketio");
    io.emit("deleteMessage", messageData);
    
    return res
      .status(200)
      .json(new ApiResponse(200, "Message deleted successfully"));
  } else {
    throw new ApiErrors(400, "Message not deleted");
  }
});
