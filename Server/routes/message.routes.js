const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:other_id", authMiddleware, messageController.getChatMessages)
router.post("/", authMiddleware, messageController.sendChatMessage)

module.exports = router;