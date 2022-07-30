const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Expense = new Schema({
    exName: { type: String, required: true },
    userID: { type: String, required: true },
    total: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String},
    date: { type: Date, default: Date.now() },
}, { timestamps: true })

module.exports = mongoose.model('Expense', Expense)