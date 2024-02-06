import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export function validUser(req, res, next) {
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
        next()
    } catch (error) {
        res.status(403).json({ msg: "Not authorizated" })
        return
    }

}