import mongoose from "mongoose";

const weeklyStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    day: {
      type: String,
      required: true,
    },

    intake: {
      type: Number,
      default: 0,
    },

    burn: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// One record per user per day makes sure only one entry per day removes dublicate data
weeklyStatsSchema.index(
  { user: 1, day: 1 },
  { unique: true }
);

export default mongoose.model("WeeklyStats", weeklyStatsSchema);