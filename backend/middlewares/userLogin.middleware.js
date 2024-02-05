import { User } from "../db/db.js";

export async function userLogin(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    const isUser = await User.findOne({ username, password })
    if (isUser) {
        req.user = username
    }
    next()
}