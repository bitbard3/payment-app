import express from 'express';
import userRouter from './user.routes.js'
import accountRouter from './account.routes.js'
export const router = express.Router()
router.use('/user', userRouter)
router.use('/account', accountRouter)
