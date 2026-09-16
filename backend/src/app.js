const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES

const violationRoutes = require("./routes/violationRoutes");
const correctiveActionRoutes = require("./routes/correctiveActionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const mineRoutes = require("./routes/mineRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");


// AUTH
app.use("/api/auth", authRoutes);

// MINES
app.use("/api/mines", mineRoutes);

// INSPECTIONS
app.use("/api/inspections", inspectionRoutes);
app.use("/api/inspections", inspectionRoutes);

// VIOLATIONS
app.use("/api/violations", violationRoutes);

// CORRECTIVE ACTIONS
app.use("/api/corrective-actions", correctiveActionRoutes);

// DASHBOARD
app.use("/api/dashboard", dashboardRoutes);

// REPORTS
app.use("/api/reports", reportRoutes);


// HOME
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MineGuard AI Backend is running"
    });
});


module.exports = app;