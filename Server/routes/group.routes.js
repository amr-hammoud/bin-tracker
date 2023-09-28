const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controllers");
const superadminMiddleware = require("../middlewares/superadmin.middleware");

router.get("/", superadminMiddleware, groupController.getAllGroups)
router.post("/:id?", superadminMiddleware, groupController.createOrUpdateGroup)
router.delete("/:id", superadminMiddleware, groupController.deleteGroup)

module.exports = router;