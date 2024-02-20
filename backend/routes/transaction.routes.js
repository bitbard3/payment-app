import express from 'express'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { transactions, transfer } from '../controllers/transaction.controllers.js'

const router = express.Router()
router.post('/transfer', validUser, transfer)
router.get('/transactions', validUser, transactions)


export default router 