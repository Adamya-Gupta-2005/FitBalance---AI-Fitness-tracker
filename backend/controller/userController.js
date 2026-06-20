import User from '../models/userModel.js'

export const goalSetup = async (req, res) => {

    try {

        const { age, weight, height, goal, dailyCalorieIntake, dailyCalorieBurn } = req.body;

        if (!age || !weight || !height || !goal) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.age = age;
        user.weight = weight;
        user.height = height;
        user.goal = goal;

        user.dailyCalorieIntake = dailyCalorieIntake;
        user.dailyCalorieBurn = dailyCalorieBurn;


        await user.save();

        res.status(200).json({
            success: true,
            message: "Goal setup completed",
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}


//for protected rotes
export const aboutMe = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            user: req.user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//----------Profile------------------------------------------------------
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {

        const { age, height, weight, goal } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.age = age || user.age;
        user.weight = weight || user.weight;
        user.height = height || user.height;
        user.goal = goal || user.goal;

        await user.save();

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logoutUser = async (req, res) => {
    //deletes token 
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}