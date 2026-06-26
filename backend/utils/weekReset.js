import User from "../models/userModel.js";
import WeeklyStats from "../models/WeeklyStats.js";

export const resetWeekIfNeeded = async (userId) => {

    const user = await User.findById(userId);

    if (!user) return;

    const today = new Date();

    // Monday = 1
    const isMonday = today.getDay() === 1;

    const lastReset = new Date(user.lastWeekReset);

    const sameWeek =
        lastReset.getFullYear() === today.getFullYear() &&
        getWeekNumber(lastReset) === getWeekNumber(today);

    if (isMonday && !sameWeek) {

        await WeeklyStats.deleteMany({
            user: userId
        });

        user.lastWeekReset = today;

        await user.save();
    }

};

function getWeekNumber(date) {

    const firstJan = new Date(date.getFullYear(), 0, 1);

    return Math.ceil((((date - firstJan) / 86400000) + firstJan.getDay() + 1) / 7);
}