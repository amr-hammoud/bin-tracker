const express = require("express");
const router = express.Router();
const truckController = require("../controllers/truck.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:id?", authMiddleware, truckController.getTruck)
router.post("/:id?", authMiddleware, truckController.createOrUpdateTruck)
router.delete("/:id", authMiddleware, truckController.deleteTruck)

module.exports = router;