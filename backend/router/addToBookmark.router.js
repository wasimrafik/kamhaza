// routes/bookmarkRoutes.js
import express from "express";
import {
  addBookmark,
  getBookmarks,
  getUserBookmarks,
  getBookmark,
  deleteBookmark,
} from "../controllers/addToBookmark.controllers.js";

const router = express.Router();

router.post("/addBookmark", addBookmark);
router.get("/getBookmark", getBookmarks);
router.get("/userBookmark/:userId", getUserBookmarks);
router.get("/getSingleBookmark/:id", getBookmark);
router.delete("/deleteBookmark/:id", deleteBookmark);

export default router;
