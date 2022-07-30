const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    pNumber: { type: String, minLength: 8 },
    dob: { type: Date },
    address: { type: String },
    category: [
        { type: String }
    ],
    friendlist: [
        { type: String }
    ],
},
    { timestamps: true }
)

module.exports = mongoose.model('User', User)