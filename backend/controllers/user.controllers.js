import { User } from "../db/db.js";
import { userSchema, userUpdateSchema } from "./validations/user.validation.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()

export const signup = (req, res) => {
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
export const login = (req, res) => {
    const validInput = userSchema.pick({ username: true, password: true }).safeParse(req.body)
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Input" })
        return
    }
    if (!userExist) {
        res.status(411).json({ msg: "User doesn't exist" })
        return
    }
    const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET)
    res.json({ token: token })
}
export const update = async (req, res) => {
    const validInput = userUpdateSchema.safeParse(req.body)
    if (!validInput.success) {
        res.status(411).json({ msg: "Please provide invalid input" })
        return
    }
    const username = req.username
    try {
        await User.updateOne({
            username: username
        }, req.body)
        res.json({ msg: "User updated successfully" })
        return
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}