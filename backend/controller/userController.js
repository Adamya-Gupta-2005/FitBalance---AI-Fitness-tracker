import User from '../models/userModel.js'

export const goalSetup = async ( req, res ) => {

    try {
        
        const { age,weight,height,goal} = req.body;

        if (!age || !weight || !height || !goal) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.age = age;
        user.weight = weight;
        user.height = height;
        user.goal = goal;

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


export const aboutMe = async (req,res) => {
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