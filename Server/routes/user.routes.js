const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/drivers", authMiddleware, userController.getGroupDrivers)
router.get("/group/:id?", authMiddleware, userController.getGroupUser)
router.get("/:id?", authMiddleware, userController.getUser)
router.put("/profile", authMiddleware, userController.updateProfile)
router.put("/image", authMiddleware, userController.updateImage)
router.put("/:id", authMiddleware, userController.updateUser)
router.delete("/:id", authMiddleware, userController.deleteUser)

module.exports = router;