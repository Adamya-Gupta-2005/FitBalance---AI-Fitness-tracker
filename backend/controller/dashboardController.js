import WeeklyStats from "../models/WeeklyStats.js";
import { resetWeekIfNeeded } from "../utils/weekReset.js";

export const getWeeklyStats = async (req, res) => {

    try {

        await resetWeekIfNeeded(req.user._id);

        const order = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];

        const weeklyData = [];

        for (const day of order) {

            let stat = await WeeklyStats.findOne({
                user: req.user._id,
                day
            });

            if (!stat) {

                stat = {
                    day,
                    intake: 0,
                    burn: 0
                };

            }

            weeklyData.push(stat);

        }

        res.status(200).json({
            success: true,
            weeklyData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};