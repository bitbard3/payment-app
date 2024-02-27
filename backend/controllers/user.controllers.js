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
                balance: parseInt((Math.random() * 1000))
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
export const loggedUser = (req, res) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
        res.status(403).json({ msg: "Not authorizated" })
        return
    }
    const token = header.split(' ')[1]
    try {
        const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET)
        req.username = jwtDecoded.username
        req.userId = jwtDecoded.userId
        res.json({ msg: "Verified" })
    } catch (error) {
        res.status(403).json({ msg: "Not authorizated" })
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
        res.status(403).json({ msg: "User doesn't exist/ Password is Incorrect" })
        return
    }
    const token = jwt.sign({
        username: req.user,
        userId: req.userId
    }, process.env.JWT_SECRET);
    res.json({
        token: token
    })
    return;
}

export const userInfo = async (req, res) => {
    const userId = req.userId;
    try {
        const userData = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { friends: '$friends' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$friends']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                firstName: 1,
                                lastName: 1
                            }
                        }
                    ],
                    as: 'friendsInfo'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { friendRequests: '$friendRequests' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$friendRequests']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                firstName: 1,
                                lastName: 1
                            }
                        }
                    ],
                    as: 'friendRequestsInfo'
                }
            },
            {
                $project: {
                    username: 1,
                    firstName: 1,
                    lastName: 1,
                    balance: 1,
                    sentFriendRequests: 1,
                    friendsInfo: 1,
                    friendRequestsInfo: 1
                }
            }
        ]);
        res.json({ userData: userData[0] });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};

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
    if (self == friend) {
        res.status(411).json({ msg: "Friend and Self id are same" })
        return
    }
    const validInput = addFriendSchema.safeParse(friend)
    if (!validInput.success) {
        res.status(411).json({ msg: "Please provide valid input" })
        return
    }
    try {
        const alrReq = await User.findOne({ _id: friend, friendRequests: self });
        const alrFriend = await User.findOne({ _id: friend, friends: self });
        if (alrReq) {
            throw new Error('Friend request already exists')
        }
        else if (alrFriend) {
            {
                throw new Error('Friend already exists')
            }
        }
        else {
            await User.updateOne({ _id: friend }, {
                '$push': {
                    friendRequests: self
                }
            });
            await User.updateOne({ _id: self }, {
                '$push': {
                    sentFriendRequests: friend
                }
            })
            res.json({ msg: "Friend request added" })
        }
    } catch (error) {
        if (error.message === 'Friend request already exists') {
            res.status(409).json({ msg: "Friend request already exists" })
            return
        }
        else if (error.message === 'Friend already exists') {
            res.status(409).json({ msg: "Friend already exists" })
            return
        }
        else {
            res.status(500).json({ msg: "Internal server error" })
            return
        }
    }
}


export const addFriend = async (req, res) => {
    const self = req.userId
    const friend = req.body.friend
    if (self == friend) {
        res.status(411).json({ msg: "Friend and Self id are same" })
        return
    }
    const validInput = addFriendSchema.safeParse(friend)
    if (!validInput.success) {
        res.status(411).json({ msg: "Please provide valid input" })
        return
    }
    try {
        const alrReq = await User.findOne({ _id: self, friendRequests: friend });
        if (!alrReq) {
            throw new Error('Friend request doesnt exist')
        } else {
            await User.updateOne({ _id: self }, {
                '$pull': {
                    friendRequests: friend
                },
                '$push': {
                    friends: friend
                }
            });
            await User.updateOne({ _id: friend }, {
                '$pull': {
                    sentFriendRequests: self
                },
                '$push': {
                    friends: self
                }
            })
            res.json({ msg: "Friend added" })
            return
        }
    } catch (error) {
        if (error.message === 'Friend request already exists') {
            res.status(404).json({ msg: "Friend request doesn't exists" })
            return
        }
        else {
            res.status(500).json({ msg: "Internal server error" })
            return
        }
    }
}

export const removeFrinedRequest = async (req, res) => {
    const self = req.userId
    const friend = req.body.friend
    if (self == friend) {
        res.status(411).json({ msg: "Friend and Self id are same" })
        return
    }
    const validInput = addFriendSchema.safeParse(friend)
    if (!validInput.success) {
        res.status(411).json({ msg: "Please provide valid input" })
        return
    }
    try {
        await User.updateOne({ _id: friend }, {
            '$pull': {
                sentFriendRequests: self
            }
        })
        await User.updateOne({ _id: self }, {
            '$pull': {
                friendRequests: friend
            }
        })
        res.json({ msg: "Friend request removed" })
        return
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
        return
    }
}