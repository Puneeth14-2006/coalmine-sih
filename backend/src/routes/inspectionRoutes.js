const express = require("express");

const {
    createInspection,
    getInspections,
    getInspectionById
} = require("../controllers/inspectionController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// All inspection routes require login
router.use(protect);

// Create inspection
router.post("/", createInspection);

// Get all inspections
router.get("/", getInspections);

// Get inspection details
router.get("/:id", getInspectionById);

module.exports = router;