// routes/messageRoutes.js
import express from "express";
import {
  sendMessage,
  getMessage,
  getMessages,
  updateMessage,
  deleteMessage
} from "../controllers/message.controllers.js";

const router = express.Router();

router.post("/sendMessage", sendMessage);
router.get("/getMessage", getMessages);
router.put("/updateMessage/:id", updateMessage);
router.delete("/deleteMessage/:id", deleteMessage);

export default router;
