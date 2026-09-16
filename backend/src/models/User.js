const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: [
                "Inspector",
                "Mine Manager",
                "Government Officer",
                "Admin"
            ],
            default: "Inspector"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);