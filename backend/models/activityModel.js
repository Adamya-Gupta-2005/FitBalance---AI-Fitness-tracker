import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        name: String,

        duration: Number,

        caloriesBurned: Number,

        activitType: {
            type: String,
            enum: [
                'walking','running','cycling','gym',
                'sports','yoga','other'
            ]
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Activity', activitySchema);