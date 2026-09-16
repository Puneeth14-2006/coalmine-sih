const Violation = require("../models/Violation");
const CorrectiveAction = require("../models/CorrectiveAction");

const generateComplianceReport = async (req, res) => {
  try {
    const { mine, startDate, endDate } = req.query;

    const violationFilter = {};

    if (mine) {
      violationFilter.mine = mine;
    }

    if (startDate || endDate) {
      violationFilter.date = {};

      if (startDate) {
        violationFilter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        violationFilter.date.$lte = new Date(endDate);
      }
    }

    const violations = await Violation.find(violationFilter);
    const actions = await CorrectiveAction.find();

    const totalViolations = violations.length;

    const openViolations = violations.filter(
      (v) => v.status === "Open"
    ).length;

    const closedViolations = violations.filter(
      (v) => v.status === "Closed"
    ).length;

    const complianceScore =
      totalViolations === 0
        ? 100
        : Math.round((closedViolations / totalViolations) * 100);

    const highRisk = violations.filter(
      (v) => v.severity === "High"
    ).length;

    const mediumRisk = violations.filter(
      (v) => v.severity === "Medium"
    ).length;

    const lowRisk = violations.filter(
      (v) => v.severity === "Low"
    ).length;

    res.json({
      success: true,
      report: {
        generatedAt: new Date(),

        summary: {
          totalViolations,
          openViolations,
          closedViolations,
          totalCorrectiveActions: actions.length,
          complianceScore,
        },

        riskData: {
          high: highRisk,
          medium: mediumRisk,
          low: lowRisk,
        },

        violations,
        correctiveActions: actions,
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
  generateComplianceReport,
};