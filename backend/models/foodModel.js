import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        foodName: String,

        calories: Number,

        mealType: {
            type: String,
            enum: [
                'breakfast',
                'lunch',
                'snack',
                'dinner'
            ]
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Food", foodSchema)