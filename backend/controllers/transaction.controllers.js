import { Transaction, User } from "../db/db.js"
import mongoose from 'mongoose'
import { transferSchmea } from "./validations/account.validation.js"

export const transfer = async (req, res) => {
    const validInput = transferSchmea.safeParse(req.body)
    if (!validInput.success) {
        return res.status(422).json({ msg: "Invalid input" })
    }
    const sender = req.userId
    const receiver = req.body.receiver
    if (sender == receiver) {
        res.status(411).json({ msg: "Sender and receiver cant be same" })
        return
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const senderUser = await User.findOne({ _id: sender }).session(session)
        const balance = senderUser.balance
        if (!senderUser || balance < req.body.amount) {
            await session.abortTransaction()
            return res.status(400).json({ msg: "Insufficent balance" })
        }
        try {
            await User.findOne({ _id: receiver }).session(session)
        } catch (error) {
            await session.abortTransaction()
            return res.status(404).json({ msg: "Account doesnt exist" })
        }
        await User.updateOne({ _id: sender }, { $inc: { balance: - req.body.amount } }).session(session)
        await User.updateOne({ _id: receiver }, { $inc: { balance: req.body.amount } }).session(session)
        await Transaction.create([{
            sender,
            receiver,
            amount: req.body.amount,
            date: new Date()
        }], { session: session })
        await session.commitTransaction()
        return res.json({ msg: 'Transaction successful' })
    } catch (error) {
        return res.status(400).json({ msg: "Transaction failed" })
    }
    finally {
        await session.endSession();
    }
}
export const transactions = async (req, res) => {
    const userId = req.userId
    try {
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    $or: [
                        { sender: new mongoose.Types.ObjectId(userId) },
                        { receiver: new mongoose.Types.ObjectId(userId) }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderInfo'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'receiverInfo'
                }
            },
            {
                $unwind: "$senderInfo"
            },
            {
                $unwind: "$receiverInfo"
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    date: 1,
                    senderId: "$senderInfo._id",
                    receiverId: "$receiverInfo._id",
                    senderFirstName: "$senderInfo.firstName",
                    senderLastName: "$senderInfo.lastName",
                    receiverFirstName: "$receiverInfo.firstName",
                    receiverLastName: "$receiverInfo.lastName"
                }
            }
        ]);
        return res.json({ transactions });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
        return
    }

}