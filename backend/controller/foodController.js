import Food from "../models/foodModel.js";
import { analyzeFoodImage } from "../servives/foodAiService.js";

export const addFood = async (req, res) => {
    const { name, calories, mealType } = req.body;

    const food = await Food.create({
        user: req.user._id,
        name,
        calories,
        mealType
    });

    res.status(200).json({
        success: true,
        food
    });
};


export const getFoods = async (req, res) => {
    const foods = await Food.find({
        user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        foods
    })
}

export const deleteFood = async (req, res) => {
    await Food.findByIdAndDelete(req.params.id); // used to extract dynamic value

    res.status(200).json({
        success: true,
        message: "Food Deleted"
    })
}


export const getDashboardStats = async (req, res) => {

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const foods = await Food.find({
        user: req.user._id,
        createdAt: {
            $gte: startOfDay
        }
    });

    const totalCalories = foods.reduce(
        (sum, food) => sum + food.calories,
        0
    );

    const mealsLogged = foods.length;

    res.json({
        success: true,
        totalCalories,
        mealsLogged
    })

}

export const analyzeFood = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image required"
            });
        }

        console.log(req.file)

        const result = await analyzeFoodImage(
            req.file.buffer, req,file.mimetype
        )

        console.log(result)

        res.status(200).json({
            success: true,
            food: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};