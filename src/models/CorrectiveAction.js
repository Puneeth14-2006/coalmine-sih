const mongoose = require("mongoose");

const correctiveActionSchema = new mongoose.Schema(
  {
    actionId: {
      type: String,
      unique: true,
      required: true,
    },
    violationId: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CorrectiveAction",
  correctiveActionSchema
);