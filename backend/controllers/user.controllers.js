import { User } from "../db/db.js";
import mongoose from 'mongoose'
import { userSchema, userUpdateSchema } from "./validations/user.validation.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { addFriendSchema } from "./validations/friend.validation.js";
dotenv.config()
export const signup = async (req, res) => {
    const validInput = userSchema.safeParse(req.body)
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Inputs" })
        return
    }
    try {
        if (!userExist) {
            var user = await User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                balance: parseFloat((Math.random() * 1000).toFixed(2))
            })
        }
        else {
            return res.status(409).json({ msg: "User already exist" })
        }
        const userId = user._id
        const token = jwt.sign({ username: req.body.username, userId }, process.env.JWT_SECRET)
        return res.json({ msg: "User created", token, balance: user.balance })
    } catch (error) {
        return res.status(400).json({ msg: "Error occured" })
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
}

export const userInfo = async (req, res) => {
    const userId = req.params.userId
    try {
        const userData = await User.findOne({ _id: userId })
        delete userData['password']
        res.json({ userData })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        return
    }
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
        }).filter((user) => {
            return user._id != req.userId
        })
        res.json(filterUser)
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        return
    }
}
export const addFriendRequest = async (req, res) => {
    const friend = req.body.friend
    const self = req.userId
    const validInput = addFriendSchema.safeParse(friend)
    if (!validInput.success) {
        res.status(411).json({ msg: "Please provide invalid input" })
        console.log(validInput.error)
        return
    }
    try {
        const alrReq = await User.findOne({ _id: friend, friendRequests: self });
        if (alrReq) {
            throw new Error('Friend request already exists')
        } else {
            const add = await User.updateOne({ _id: friend }, {
                '$push': {
                    friendRequests: self
                }
            });
            res.json({ msg: "Friend request added" })
        }
    } catch (error) {
        if (error.message === 'Friend request already exists') {
            res.status(409).json({ msg: "User already exists" })
            return
        }
        else {
            res.status(500).json({ msg: "Internal server error" })
            return
        }
    }
}