const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema

const Expense = new Schema({
    exName: { type: String, required: true },
    userID: { type: String, required: true },
    total: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String},
    date: { type: Date, default: Date.now() },
}, { timestamps: true })

Expense.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true
});

module.exports = mongoose.model('Expense', Expense)