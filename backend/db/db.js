import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DB_URL)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercarse: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    balance: {
        type: Number,
        required: true
    },
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
const transactionSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    senderName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    receiverName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    }
})


export const User = mongoose.model('User', userSchema)
export const Transaction = mongoose.model('Transaction', transactionSchema)