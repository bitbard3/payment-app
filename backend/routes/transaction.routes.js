import express from 'express'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { transfer } from '../controllers/transaction.controllers.js'

const router = express.Router()
router.post('/transfer', validUser, transfer)


export default router 