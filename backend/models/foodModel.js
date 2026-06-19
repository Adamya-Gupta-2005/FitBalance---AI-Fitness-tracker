import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        name: String,

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
        Timestamp: true
    }
);

export default mongoose.model("Food", foodSchema)