import Activity from '../models/activityModel.js';

export const addActivity = async (req,res) => {
    const {name, duration, caloriesBurned, activityType} = req.body;

    const activity = await Activity.create({
        user: req.user._id,
        name,
        duration,
        caloriesBurned,
        activityType
    });

    res.status(200).json({
        success: true,
        activity
    });
};


export const getActivities = async (req,res) => {
    const activities = await Activity.find({
        user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        activities
    });
};

export const deleteActivity = async (req,res) => {
    await Activity.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    });
};

export const getActivityDashboard = async (req,res) => {
    
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const activities = await Activity.find({
        user: req.user._id,
        createdAt: {
            $gte: startOfDay
        }
    });

    const totalBurned = activities.reduce(
        (sum,activity) => sum + activity.caloriesBurned, 0
    );

    const totalMinutes = activities.reduce(
        (sum,activity) => sum + activity.duration,0
    );

    const workoutsLogged = activities.length;

    res.status(200).json({
        success: true,
        totalBurned,
        totalMinutes,
        workoutsLogged
    });
};