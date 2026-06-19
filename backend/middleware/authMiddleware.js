import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if(!token) {
            return res.status(400).json({
                success: false,
                message: "Not authoried. Please login."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.id
        ).select("-password") // used to tell mongoose to exclude specific field


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user // request mutation - injects new key-value pair in exissting request

        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid Token"
        });
    }
}