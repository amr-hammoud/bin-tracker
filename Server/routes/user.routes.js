const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const superAdminMiddleware = require("../middlewares/superadmin.middleware");

router.get("/:id?", superAdminMiddleware, userController.getUser)
router.put("/:id", superAdminMiddleware, userController.updateUser)
router.delete("/:id", superAdminMiddleware, userController.deleteUser)

module.exports = router;