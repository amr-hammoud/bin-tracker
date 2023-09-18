const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:id?", authMiddleware, userController.getUser)
router.put("/:id", authMiddleware, userController.updateUser)
router.delete("/:id", authMiddleware, userController.deleteUser)

module.exports = router;