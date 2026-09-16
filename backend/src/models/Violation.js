const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema(
  {
    violationId: {
      type: String,
      unique: true,
      required: true,
    },
    mine: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Violation", violationSchema);