const express = require("express");

const {
  createViolation,
  getViolations,
  getViolation,
  updateViolation,
  updateViolationStatus,
} = require("../controllers/violationController");

const router = express.Router();

router.post("/", createViolation);
router.get("/", getViolations);
router.get("/:id", getViolation);
router.put("/:id", updateViolation);
router.patch("/:id/status", updateViolationStatus);

module.exports = router;
