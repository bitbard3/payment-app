import { Account } from "../db/db.js"



export const balance = async (req, res) => {
    const userId = req.userId
    try {
        const account = await Account.findOne({ userId })
        return res.json({ balance: account.balance })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
}