import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        age: Number,

        weight: Number,

        height: Number,

        goal: {
            type: String,
            enum: ["lose", "maintain", "gain"]
        },
         
        dailyCalorieIntake: Number,
        dailyCalorieBurn: Number,

    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);