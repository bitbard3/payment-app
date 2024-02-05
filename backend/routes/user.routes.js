import express from 'express'
import { userExist } from '../middlewares/userExist.middleware.js'
import { signup, login, update, bulk } from '../controllers/user.controllers.js'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { userLogin } from '../middlewares/userLogin.middleware.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ msg: "hi" })
})
router.post('/signup', userExist, signup)
router.post('/login', userLogin, login)
router.put('/', validUser, update)
router.get('/bulk', validUser, bulk)
export default router