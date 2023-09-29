const express = require("express");
const router = express.Router();
const binController = require("../controllers/bin.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/best-route", authMiddleware, binController.calculateOptimalRoute)
router.get("/:id?", authMiddleware, binController.getBin)
router.post("/:id?", authMiddleware, binController.createOrUpdateBin)
router.delete("/:id", authMiddleware, binController.deleteBin)
router.get("/:id/stamp/", binController.addPickupStamp)
router.post("/:id/records/", binController.addBinRecord)
router.delete("/:bin_id/records/:record_id", binController.deleteBinRecord)

module.exports = router;