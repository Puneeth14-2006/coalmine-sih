const Violation = require("../models/Violation");
const CorrectiveAction = require("../models/CorrectiveAction");

const getDashboard = async (req, res) => {
  try {
    const totalViolations = await Violation.countDocuments();

    const openViolations = await Violation.countDocuments({
      status: "Open",
    });

    const inProgressActions = await CorrectiveAction.countDocuments({
      status: "In Progress",
    });

    const completedActions = await CorrectiveAction.countDocuments({
      status: "Completed",
    });

    const mines = await Violation.distinct("mine");
    const totalMines = mines.length;

    let complianceScore = 100;

    if (totalViolations > 0) {
      complianceScore = Math.round(
        ((totalViolations - openViolations) / totalViolations) * 100
      );
    }

    const highRisk = await Violation.countDocuments({
      severity: "High",
      status: { $ne: "Closed" },
    });

    const mediumRisk = await Violation.countDocuments({
      severity: "Medium",
      status: { $ne: "Closed" },
    });

    const lowRisk = await Violation.countDocuments({
      severity: "Low",
      status: { $ne: "Closed" },
    });

    res.json({
      success: true,
      data: {
        totalMines,
        openViolations,
        inProgressActions,
        completedActions,
        complianceScore,
        riskData: {
          high: highRisk,
          medium: mediumRisk,
          low: lowRisk,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};