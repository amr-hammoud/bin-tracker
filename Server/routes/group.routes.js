const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controllers");
const superadminMiddleware = require("../middlewares/superadmin.middleware");

router.post("/", superadminMiddleware, groupController.createGroup)

module.exports = router;