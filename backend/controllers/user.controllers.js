import { User } from "../db/db";
import { userSchema } from "./validations/user.validation.js";
import jwt from 'jsonwebtoken'
require('dotenv').config()

const signup = (req, res) => {
    const validInput = userSchema.safeParse(req.body)
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Inputs" })
        return
    }
    if (!userExist) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        res.json({ msg: "User created" })
        return
    }
    else {
        res.status(409).json({ msg: "User already exist" })
        return
    }
}
const login = (req, res) => {
    const validInput = userSchema.pick({ username: true, password: true })
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Input" })
        return
    }
    if (!userExist) {
        res.status(411).json({ msg: "User doesn't exist" })
        return
    }
    const token = jwt.sign(req.body.username, process.env.JWT_SECRET)
    res.json({ token: token })
}