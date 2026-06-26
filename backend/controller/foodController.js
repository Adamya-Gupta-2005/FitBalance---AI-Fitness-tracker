import Food from "../models/foodModel.js";
import WeeklyStats from "../models/WeeklyStats.js";
import { analyzeFoodImage } from "../servives/foodAiService.js";

export const addFood = async (req, res) => {
    try {

        const { foodName, calories, mealType } = req.body;

        const food = await Food.create({
            user: req.user._id,
            foodName,
            calories,
            mealType
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
                intake: calories,
                burn: 0
            });
        } else {
            stats.intake += calories;
            await stats.save();
        }

        res.status(200).json({
            success: true,
            food
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getFoods = async (req, res) => {

    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        await Food.deleteMany({
            user: req.user._id,
            createdAt: {
                $lt: startOfDay
            }
        });

        const foods = await Food.find({
            user: req.user._id,
            createdAt: {
                $gte: startOfDay
            }
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            foods
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteFood = async (req, res) => {

    try {

        const food = await Food.findById(req.params.id);

        if (!food) {

            return res.status(404).json({
                success: false,
                message: "Food not found"
            });

        }

        const day = food.createdAt.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const stats = await WeeklyStats.findOne({
            user: req.user._id,
            day
        });

        if (stats) {

            stats.intake -= food.calories;

            if (stats.intake < 0)
                stats.intake = 0;

            await stats.save();
        }

        await Food.findByIdAndDelete(req.params.id);

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

export const getDashboardStats = async (req, res) => {

    try {

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

        res.json({
            success: true,
            totalCalories,
            mealsLogged: foods.length
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const analyzeFood = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Image required"
            });

        }

        const result = await analyzeFoodImage(
            req.file.buffer,
            req.file.mimetype
        );

        res.json({
            success: true,
            food: result
        });

    } catch (error) {

        if (error.status === 429) {

            return res.status(429).json({
                success: false,
                message: "Gemini quota exceeded."
            });

        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};