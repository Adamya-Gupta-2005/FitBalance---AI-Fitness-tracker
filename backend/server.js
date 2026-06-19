import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req,res) => {  
    res.send("API Running");
})

app.use('/api/auth',authRouter);
app.use('/api/user',userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
})