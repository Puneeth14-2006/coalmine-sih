const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES

const authRoutes = require("./routes/authRoutes");
const mineRoutes = require("./routes/mineRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");


// AUTH
app.use("/api/auth", authRoutes);

// MINES
app.use("/api/mines", mineRoutes);

// INSPECTIONS
app.use("/api/inspections", inspectionRoutes);


// HOME
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MineGuard AI Backend is running"
    });
});


module.exports = app;