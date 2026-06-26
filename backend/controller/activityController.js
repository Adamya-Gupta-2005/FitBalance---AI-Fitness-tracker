import Activity from "../models/activityModel.js";
import WeeklyStats from "../models/WeeklyStats.js";

export const addActivity = async (req, res) => {

    try {

        const {
            name,
            duration,
            caloriesBurned,
            activityType
        } = req.body;

        const activity = await Activity.create({
            user: req.user._id,
            name,
            duration,
            caloriesBurned,
            activityType
        });

        const day = new Date().toLocaleDateString("en-US", {
            weekday: "short"
        });

        let stats = await WeeklyStats.findOne({
            user: req.user._id,
            day
        });

        if (!stats) {

            stats = await WeeklyStats.create({
                user: req.user._id,
                day,
                intake: 0,
                burn: caloriesBurned
            });

        } else {

            stats.burn += caloriesBurned;
            await stats.save();

        }

        res.status(200).json({
            success: true,
            activity
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getActivities = async (req, res) => {

    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        await Activity.deleteMany({
            user: req.user._id,
            createdAt: {
                $lt: startOfDay
            }
        });

        const activities = await Activity.find({
            user: req.user._id,
            createdAt: {
                $gte: startOfDay
            }
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            activities
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteActivity = async (req, res) => {

    try {

        const activity = await Activity.findById(req.params.id);

        if (!activity) {

            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });

        }

        const day = activity.createdAt.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const stats = await WeeklyStats.findOne({
            user: req.user._id,
            day
        });

        if (stats) {

            stats.burn -= activity.caloriesBurned;

            if (stats.burn < 0)
                stats.burn = 0;

            await stats.save();

        }

        await Activity.findByIdAndDelete(req.params.id);

        res.json({
            success: true
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getActivityDashboard = async (req, res) => {

    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const activities = await Activity.find({
            user: req.user._id,
            createdAt: {
                $gte: startOfDay
            }
        });

        const totalBurned = activities.reduce(
            (sum, a) => sum + a.caloriesBurned,
            0
        );

        const totalMinutes = activities.reduce(
            (sum, a) => sum + a.duration,
            0
        );

        res.json({
            success: true,
            totalBurned,
            totalMinutes,
            workoutsLogged: activities.length
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};