import User from "../models/userModel.js";
import WeeklyStats from "../models/WeeklyStats.js";

export const resetWeekIfNeeded = async (userId) => {

    const user = await User.findById(userId);

    if (!user) return;

    const today = new Date();

    const lastReset = user.lastWeekReset ? new Date(user.lastWeekReset) : null;

    if (
        !lastReset ||
        getWeekNumber(lastReset) !== getWeekNumber(today) ||
        lastReset.getFullYear() !== today.getFullYear()
    ) {

        await WeeklyStats.deleteMany({
            user: userId
        });

        user.lastWeekReset = today;

        await user.save();
    }

};

function getWeekNumber(date) {

    const d = new Date(date);

    d.setHours(0,0,0,0);

    d.setDate(
        d.getDate() + 4 - (d.getDay() || 7)
    );

    const yearStart = new Date(
        d.getFullYear(),
        0,
        1
    );

    return Math.ceil(
        (((d - yearStart) / 86400000) + 1) / 7
    );

}