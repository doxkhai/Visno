const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoExpense = new Schema({
    month: {type: Date, default: Date.now()},
    userID : {type:String, required: true},
    total: {type: Number, required: true},
    totalEach: {
        type: Map,
        of: Number
    }
}, {timestamps: true})

module.exports = mongoose.model('moExpense', MoExpense)