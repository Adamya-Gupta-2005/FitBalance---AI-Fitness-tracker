import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const token = jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );
    return token;
};

//Register

export const registeredUser = async (req, res) => {
    try {
        
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message:"All Feilds required"
            });
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                success: false,
                message:"User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,email,password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 *60 * 1000
        })

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,    
            }
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//Login 

export const loginUser = async (req,res) => {
    try {
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credntials"
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 *60 * 1000
        })

        res.status(200).json({
            success:true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                age: user.age,
                weight: user.weight,
                height: user.height,
                goal: user.goal,
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};