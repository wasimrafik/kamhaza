// models/Message.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    // Optional: Reference to a conversation (if you use one)
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: false,
    },
    // The user who sends the message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // The user who receives the message
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // The actual message content
    message: {
      type: String,
      required: true,
    },
    // The type of message (for example: text, image, or file)
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    // Optional attachments (for image URLs, file paths, etc.)
    attachments: [
      {
        type: String,
      },
    ],
    // Indicates whether the message has been read by the receiver
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
