const mongoose = require("mongoose");

const mineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        zones: [
            {
                type: String,
                trim: true
            }
        ],

        production: {
            type: String,
            default: "Not specified"
        },

        compliance: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        risk: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Low"
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Mine", mineSchema);