import { Account, User } from "../db/db.js";
import mongoose from 'mongoose'
import { userSchema, userUpdateSchema } from "./validations/user.validation.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
export const signup = async (req, res) => {
    const validInput = userSchema.safeParse(req.body)
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Inputs" })
        return
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        if (!userExist) {
            var user = await User.create([{
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }], { session: session })
        }
        else {
            session.abortTransaction()
            return res.status(409).json({ msg: "User already exist" })
        }
        const userId = user[0]._id
        await Account.create([{ userId, balance: parseFloat((Math.random() * 1000).toFixed(2)) }], { session: session })
        await session.commitTransaction()
        return res.json({ msg: "User created" })
    } catch (error) {
        await session.abortTransaction()
        return res.status(400).json({ msg: "Error occured" })
    }
    finally {
        await session.endSession();
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
        res.status(411).json({ msg: "User doesn't exist/ Password is Incorrect" })
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
        return
    }
}
export const bulk = async (req, res) => {
    const filter = req.query.filter || ''
    try {
        const users = await User.find({
            $or:
                [
                    { 'firstName': { '$regex': new RegExp(filter, "i") } },
                    { 'lastName': { '$regex': new RegExp(filter, "i") } }
                ]
        })
        const filterUser = users.map((user) => {
            return {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
        res.json(filterUser)
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        return
    }
}