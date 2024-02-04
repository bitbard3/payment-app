import express from 'express'
import { userExist } from '../middlewares/userExist.middleware.js'
import { signup, login } from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ msg: "hi" })
})
router.post('/signup', userExist, signup)
router.post('/login', userExist, login)

export default router