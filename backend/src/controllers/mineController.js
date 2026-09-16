const Mine = require("../models/Mine");

// CREATE MINE
const createMine = async (req, res) => {
    try {
        const {
            name,
            location,
            zones,
            production,
            compliance,
            risk,
            status
        } = req.body;

        if (!name || !location) {
            return res.status(400).json({
                success: false,
                message: "Mine name and location are required"
            });
        }

        const mine = await Mine.create({
            name,
            location,
            zones: zones || [],
            production: production || "Not specified",
            compliance: compliance || 0,
            risk: risk || "Low",
            status: status || "Active",
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Mine created successfully",
            mine
        });

    } catch (error) {
        console.error("Create mine error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create mine"
        });
    }
};


// GET ALL MINES
const getMines = async (req, res) => {
    try {
        const mines = await Mine.find()
            .populate("createdBy", "name email role")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: mines.length,
            mines
        });

    } catch (error) {
        console.error("Get mines error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get mines"
        });
    }
};


// GET SINGLE MINE
const getMineById = async (req, res) => {
    try {
        const mine = await Mine.findById(req.params.id)
            .populate("createdBy", "name email role");

        if (!mine) {
            return res.status(404).json({
                success: false,
                message: "Mine not found"
            });
        }

        res.json({
            success: true,
            mine
        });

    } catch (error) {
        console.error("Get mine error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get mine"
        });
    }
};


// UPDATE MINE
const updateMine = async (req, res) => {
    try {
        const mine = await Mine.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!mine) {
            return res.status(404).json({
                success: false,
                message: "Mine not found"
            });
        }

        res.json({
            success: true,
            message: "Mine updated successfully",
            mine
        });

    } catch (error) {
        console.error("Update mine error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update mine"
        });
    }
};


// DELETE MINE
const deleteMine = async (req, res) => {
    try {
        const mine = await Mine.findByIdAndDelete(req.params.id);

        if (!mine) {
            return res.status(404).json({
                success: false,
                message: "Mine not found"
            });
        }

        res.json({
            success: true,
            message: "Mine deleted successfully"
        });

    } catch (error) {
        console.error("Delete mine error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete mine"
        });
    }
};


module.exports = {
    createMine,
    getMines,
    getMineById,
    updateMine,
    deleteMine
};