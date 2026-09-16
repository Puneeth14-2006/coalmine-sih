const express = require("express");

const {
  generateComplianceReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/compliance", generateComplianceReport);

module.exports = router;