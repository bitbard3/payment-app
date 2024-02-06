import express from 'express'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { balance, transfer } from '../controllers/account.controllers.js'

const router = express.Router()

router.get('/balance', validUser, balance)
router.post('/transfer', validUser, transfer)


export default router   