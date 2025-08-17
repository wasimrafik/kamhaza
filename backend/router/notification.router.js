import express from "express";
import {
    addNotification,
    getNotification,
    getNotifications,
    updateNotification,
    deleteNotification
} from '../controllers/notification.controllers.js';

const router = express.Router();

router.post("/addNotification", addNotification);
router.get("/getNotification", getNotifications);
router.get("/getSingleNotification/:id", getNotification);
router.put("/updateNotification/:id", updateNotification);
router.delete("/deleteNotification/:id", deleteNotification);

export default router;



