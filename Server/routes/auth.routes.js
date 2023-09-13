const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const superadminMiddleware = require("../middlewares/superadmin.middleware");

router.post("/login", authController.login)
router.post("/register", superadminMiddleware, authController.register)
router.get("/verify", authMiddleware, authController.verify)

module.exports = router;