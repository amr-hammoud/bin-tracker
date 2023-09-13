const express = require("express");
const router = express.Router();
const userTypeController = require("../controllers/user-type.controllers");
const superadminMiddleware = require("../middlewares/superadmin.middleware");

router.get("/", superadminMiddleware, userTypeController.getUserType)
router.post("/", superadminMiddleware, userTypeController.createUserType)

module.exports = router;