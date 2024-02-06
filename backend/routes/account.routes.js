import express from 'express'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { balance } from '../controllers/account.controllers.js'

const router = express.Router()

router.get('/balance', validUser, balance)

export default router   