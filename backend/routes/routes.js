import express from 'express';
import { userRouter } from './user.routes'
const app = express()
export const router = express.Router()

app.use('/user', userRouter)