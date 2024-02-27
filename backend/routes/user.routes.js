import express from 'express'
import { userExist } from '../middlewares/userExist.middleware.js'
import { signup, login, update, bulk, userInfo, addFriendRequest, addFriend, removeFrinedRequest, loggedUser } from '../controllers/user.controllers.js'
import { validUser } from '../middlewares/userAuth.middleware.js'
import { userLogin } from '../middlewares/userLogin.middleware.js'

const router = express.Router()


router.post('/signup', userExist, signup)
router.post('/login', userLogin, login)
router.put('/', validUser, update)
router.get('/bulk', validUser, bulk)
router.get('/validUser', loggedUser)
router.get('/userInfo', validUser, userInfo)
router.post('/addFriendRequest', validUser, addFriendRequest)
router.post('/removeFriendRequest', validUser, removeFrinedRequest)
router.post('/addFriend', validUser, addFriend)
export default router