import express from 'express'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { addMoney, transactions, transfer } from '../controllers/transaction.controllers.js'

const router = express.Router()
router.post('/transfer', validUser, transfer)
router.get('/transactions', validUser, transactions)
router.post('/addMoney', validUser, addMoney)

export default router 