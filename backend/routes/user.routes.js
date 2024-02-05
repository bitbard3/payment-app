import express from 'express'
import { userExist } from '../middlewares/userExist.middleware.js'
import { signup, login, update } from '../controllers/user.controllers.js'
import { validUser } from '../middlewares/userAuth.middleware.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ msg: "hi" })
})
router.post('/signup', userExist, signup)
router.post('/login', userExist, login)
router.put('/', validUser, update)
export default router