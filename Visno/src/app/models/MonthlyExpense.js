// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// //? should we altered it everytime we store,delete, update new expense ?
// //? if so, should we renew the total each, or just add what's new, and how can we implement that

// //? if no, what's the purpose of it's existance now that we recalculate it every time we get it

// const MoExpense = new Schema({
//     month: { type: Date, default: Date.now() },
//     userID: { type: String, required: true },
//     totalEach: {
//         type: Map,
//         of: Number
//     }
// }, { timestamps: true })

// module.exports = mongoose.model('moExpense', MoExpense)

const moment = require('moment')

module.exports = function MonthlyExpense(expenses) {
    
    if(expenses.length === 0) return {total : 0}

    this.month = moment(expenses[0].date).utc().month() + 1
    this.year = moment(expenses[0].date).utc().year()
    this.totalEach = {}
    this.total = 0
    
    this.add = function (total, category) {
        let each = this.totalEach[category]
        if(!each)
            this.totalEach[category] = 0
        this.totalEach[category] += total
        this.total += total
    }

    for(const exp of expenses) {
        this.add(exp.total, exp.category)
    }

}