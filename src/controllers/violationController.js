const Violation = require("../models/Violation");

const createViolation = async (req, res) => {
  try {
    const violation = await Violation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Violation created successfully",
      data: violation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getViolations = async (req, res) => {
  try {
    const { mine, severity, status, search } = req.query;
    const filter = {};

    if (mine && mine !== "All Mines") filter.mine = mine;
    if (severity && severity !== "All") filter.severity = severity;
    if (status && status !== "All") filter.status = status;

    if (search) {
      filter.$or = [
        { violationId: { $regex: search, $options: "i" } },
        { mine: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ];
    }

    const violations = await Violation.find(filter).sort({ date: -1 });

    res.json({
      success: true,
      count: violations.length,
      data: violations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getViolation = async (req, res) => {
  try {
    const violation = await Violation.findOne({
      violationId: req.params.id,
    });

    if (!violation) {
      return res.status(404).json({
        success: false,
        message: "Violation not found",
      });
    }

    res.json({
      success: true,
      data: violation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateViolation = async (req, res) => {
  try {
    const violation = await Violation.findOneAndUpdate(
      { violationId: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!violation) {
      return res.status(404).json({
        success: false,
        message: "Violation not found",
      });
    }

    res.json({
      success: true,
      message: "Violation updated successfully",
      data: violation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateViolationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const violation = await Violation.findOneAndUpdate(
      { violationId: req.params.id },
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!violation) {
      return res.status(404).json({
        success: false,
        message: "Violation not found",
      });
    }

    res.json({
      success: true,
      message: "Violation status updated",
      data: violation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createViolation,
  getViolations,
  getViolation,
  updateViolation,
  updateViolationStatus,
};