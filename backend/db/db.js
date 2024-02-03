import mongoose from 'mongoose';
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const userSchmea = mongoose.Schema({
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
    }
})
const User = mongoose.model('User', userSchmea)

export default User