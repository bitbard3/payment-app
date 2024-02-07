import { Account } from "../db/db.js"
import mongoose from 'mongoose'
import { transferSchmea } from "./validations/account.validation.js"


export const balance = async (req, res) => {
    const userId = req.userId
    try {
        const account = await Account.findOne({ userId })
        return res.json({ balance: account.balance })
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })
    }
}
export const transfer = async (req, res) => {
    const userId = req.userId
    const validInput = transferSchmea.safeParse(req.body)
    if (!validInput.success) {
        return res.status(422).json({ msg: "Invalid input" })
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const account = await Account.findOne({ userId }).session(session)
        const balance = account.balance
        if (!account || balance < req.body.amount) {
            await session.abortTransaction()
            return res.status(400).json({ msg: "Insufficent balance" })
        }
        try {
            await Account.findOne({ userId: req.body.to }).session(session)
        } catch (error) {
            await session.abortTransaction()
            return res.status(404).json({ msg: "Account doesnt exist" })
        }
        await Account.updateOne({ userId }, { $inc: { balance: - req.body.amount } }).session(session)
        await Account.updateOne({ userId: req.body.to }, { $inc: { balance: req.body.amount } }).session(session)
        await session.commitTransaction()
        return res.json({ msg: 'Transaction successful' })
    } catch (error) {
        return res.status(400).json({ msg: "Transaction failed" })
    }
    finally {
        await session.endSession();
    }
}