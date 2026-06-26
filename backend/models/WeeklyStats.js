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

export default mongoose.model("WeeklyStats", weeklyStatsSchema);