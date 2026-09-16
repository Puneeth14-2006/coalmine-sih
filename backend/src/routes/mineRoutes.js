const express = require("express");

const {
    createMine,
    getMines,
    getMineById,
    updateMine,
    deleteMine
} = require("../controllers/mineController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// All mine routes require login
router.use(protect);

// Create mine
router.post("/", createMine);

// Get all mines
router.get("/", getMines);

// Get single mine
router.get("/:id", getMineById);

// Update mine
router.put("/:id", updateMine);

// Delete mine
router.delete("/:id", deleteMine);

module.exports = router;