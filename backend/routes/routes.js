import express from 'express';
import userRouter from './user.routes.js'
import transactionRouter from './transaction.routes.js'
export const router = express.Router()
router.use('/user', userRouter)
router.use('/transaction', transactionRouter)
