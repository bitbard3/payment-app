import express from 'express';
import { userRouter } from './user.routes.js'
const app = express()
export const router = express.Router()

app.use('/user', userRouter)