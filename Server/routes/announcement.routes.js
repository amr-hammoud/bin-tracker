const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:group_id", authMiddleware, announcementController.getAnnouncements)
router.post("/", authMiddleware, announcementController.sendAnnouncement)

module.exports = router;