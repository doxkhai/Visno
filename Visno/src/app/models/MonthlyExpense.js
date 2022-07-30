const mongoose = require('mongoose')
const Schema = mongoose.Schema

//? should we altered it everytime we store new expense ?
//? if so, should we renew the total each, or just add what's new, and how can we implement that

const MoExpense = new Schema({
    month: { type: Date, default: Date.now() },
    userID: { type: String, required: true },
    totalEach: {
        type: Map,
        of: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('moExpense', MoExpense)