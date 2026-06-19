import express from 'express';

import { registeredUser, loginUser } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registeredUser);
authRouter.post('/login',loginUser);

export default authRouter;