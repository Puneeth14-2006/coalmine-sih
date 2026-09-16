const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema(
    {
        mine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mine",
            required: true
        },

        zone: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true,
            default: Date.now
        },

        checklist: [
            {
                item: {
                    type: String,
                    required: true
                },

                checked: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        status: {
            type: String,
            enum: [
                "Not Started",
                "In Progress",
                "Completed"
            ],
            default: "Not Started"
        },

        inspector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inspection", inspectionSchema);