import { User } from "../db/db.js";

export async function userExist(req, res, next) {
    const username = req.body.username
    const isUser = await User.findOne({ username })
    if (isUser) {
        req.user = username
    }
    next()
}