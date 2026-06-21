import Food from '../models/foodModel.js'
import Activity from '../models/activityModel.js'

export const getWeeklyStats = async (req, res) => {
    try {

        const weeklyData = [];

        for (let i = 6; i >= 0; i--) {
            const start = new Date();

            start.setDate(start.getDate() - i);
            start.setHours(0, 0, 0, 0);

            const end = new Date(start);

            end.setHours(23, 59, 59, 999);

            const foods = await Food.find({
                user: req.user._id,
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            });

            const activities = await Activity.find({
                user: req.user._id,
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            });

            const intake = foods.reduce(
                (sum, food) => sum + food.calories,
                0
            );

            const burn = activities.reduce(
                (sum, activity) =>
                    sum + activity.caloriesBurned,
                0
            );

            const day = start.toLocaleDateString("en-US",
                {
                    weekday: "short"
                }
            );

            weeklyData.push({
                day, intake, burn
            });
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