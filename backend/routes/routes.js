import express from 'express';
import userRouter from './user.routes.js'
export const router = express.Router()
router.use('/user', userRouter)
