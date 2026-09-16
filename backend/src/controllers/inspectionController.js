const Inspection = require("../models/Inspection");
const Mine = require("../models/Mine");


// CREATE INSPECTION
const createInspection = async (req, res) => {
    try {
        const {
            mine,
            zone,
            date,
            checklist
        } = req.body;

        if (!mine || !zone) {
            return res.status(400).json({
                success: false,
                message: "Mine and zone are required"
            });
        }

        // Check if mine exists
        const existingMine = await Mine.findById(mine);

        if (!existingMine) {
            return res.status(404).json({
                success: false,
                message: "Mine not found"
            });
        }

        const inspection = await Inspection.create({
            mine,
            zone,
            date: date || new Date(),
            checklist: checklist || [],
            status: "In Progress",
            inspector: req.user.id
        });

        const populatedInspection = await Inspection.findById(
            inspection._id
        )
            .populate("mine", "name location risk status")
            .populate("inspector", "name email role");

        res.status(201).json({
            success: true,
            message: "Inspection created successfully",
            inspection: populatedInspection
        });

    } catch (error) {
        console.error("Create inspection error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create inspection"
        });
    }
};


// GET ALL INSPECTIONS
const getInspections = async (req, res) => {
    try {
        const inspections = await Inspection.find()
            .populate("mine", "name location risk status")
            .populate("inspector", "name email role")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: inspections.length,
            inspections
        });

    } catch (error) {
        console.error("Get inspections error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get inspections"
        });
    }
};


// GET INSPECTION DETAILS
const getInspectionById = async (req, res) => {
    try {
        const inspection = await Inspection.findById(
            req.params.id
        )
            .populate("mine", "name location zones risk status")
            .populate("inspector", "name email role");

        if (!inspection) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }

        res.json({
            success: true,
            inspection
        });

    } catch (error) {
        console.error("Get inspection error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get inspection"
        });
    }
};


module.exports = {
    createInspection,
    getInspections,
    getInspectionById
};