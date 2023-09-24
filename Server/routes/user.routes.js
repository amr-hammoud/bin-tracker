const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const superAdminMiddleware = require("../middlewares/superadmin.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/drivers", authMiddleware, userController.getGroupDrivers)
router.get("/group/:id?", authMiddleware, userController.getGroupUser)
router.get("/:id?", superAdminMiddleware, userController.getUser)
router.put("/:id", authMiddleware, userController.updateUser)
router.delete("/:id", authMiddleware, userController.deleteUser)

module.exports = router;